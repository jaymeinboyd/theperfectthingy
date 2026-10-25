// ReLife 0.5 — protected staging experiment, synthetic data only.
// Production remains unchanged. Requires three preview environment bindings:
// RELIFE_TEST_ENABLED="true", RELIFE_TEST_TOKEN (secret), DEEPSEEK_API_KEY (secret),
// plus QUESTION_LOG KV binding. No customer vault access.
const CORE = "Companion: Rowan\nProject code: CEDAR-47\nFailure rule: If ReLife verification fails, stop and disclose the failure.\n";
const EXPECTED_SHA256 = "b93cbc66eaa3414b1b919b55474c8d74a9a1953d1a3c1c45533ce3eb64a3f535";
const enc = new TextEncoder();
const json = (data, status=200) => new Response(JSON.stringify(data), {status,headers:{
  "content-type":"application/json; charset=utf-8","cache-control":"no-store",
  "x-content-type-options":"nosniff"
}});
const sha256 = async bytes => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes)))
  .map(n=>n.toString(16).padStart(2,"0")).join("");
async function verify(mode) {
  // Failure injection happens BEFORE any model request.
  const files = mode === "missing" ? [] : [{path:"core.md",data: mode === "altered" ?
    CORE.replace("CEDAR-47","CEDAR-48") : CORE}];
  if(files.length!==1)throw Error("Required ReLife file missing");
  const bytes=enc.encode(files[0].data);
  if(bytes.length!==115)throw Error("ReLife file length mismatch");
  if(await sha256(bytes)!==EXPECTED_SHA256)throw Error("ReLife file hash mismatch");
  return files[0].data;
}
function authorized(request,env) {
  const provided=request.headers.get("x-relife-test-token")||"";
  return typeof env.RELIFE_TEST_TOKEN==="string" && env.RELIFE_TEST_TOKEN.length>=24 &&
    provided.length===env.RELIFE_TEST_TOKEN.length && provided===env.RELIFE_TEST_TOKEN;
}
async function quota(kv) {
  if(!kv)throw Error("Rate-limit KV unavailable");
  // Simple demonstration quota. KV is eventually consistent, not a production-grade atomic limiter.
  const day=new Date().toISOString().slice(0,10);
  const key="relife-test-05:"+day;
  const count=Number(await kv.get(key)||"0");
  if(!Number.isFinite(count)||count>=12)return false;
  await kv.put(key,String(count+1),{expirationTtl:172800});
  return true;
}
export async function onRequestPost({request,env}) {
  if(env.RELIFE_TEST_ENABLED!=="true")return json({error:"Test disabled"},503);
  if(!authorized(request,env))return json({error:"Unauthorized"},401);
  if(!env.DEEPSEEK_API_KEY || !env.QUESTION_LOG)return json({error:"Preview bindings incomplete"},503);
  let body;try{body=await request.json()}catch{return json({error:"Invalid request"},400)}
  const mode=body?.mode||"normal";
  if(!["normal","missing","altered"].includes(mode))return json({error:"Invalid test mode"},400);
  const message=body?.message;
  if(typeof message!=="string"||!message.trim()||message.length>400)return json({error:"Enter a message (up to 400 characters)"},400);
  let core;try{core=await verify(mode)}catch(e){return json({verified:false,blocked:true,reason:e.message,modelCalled:false},409)}
  try{if(!await quota(env.QUESTION_LOG))return json({error:"Test request limit reached"},429)}
  catch{return json({error:"Rate-limit verification unavailable"},503)}
  try{
    const upstream=await fetch("https://api.deepseek.com/chat/completions",{
      method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+env.DEEPSEEK_API_KEY},
      body:JSON.stringify({model:"deepseek-v4-flash",messages:[
        {role:"system",content:core},{role:"user",content:message}
      ],max_tokens:220,stream:false})
    });
    if(!upstream.ok)return json({verified:true,error:"Model request failed",upstreamStatus:upstream.status},502);
    const data=await upstream.json();
    const response=data?.choices?.[0]?.message?.content;
    if(typeof response!=="string")return json({verified:true,error:"Model returned no text"},502);
    return json({verified:true,modelCalled:true,reply:response,provider:"DeepSeek",mode});
  }catch{return json({verified:true,error:"Model unavailable"},502)}
}
