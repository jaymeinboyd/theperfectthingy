// TPT ReLife 0.5: disabled by default, synthetic data only.
// Requires RELIFE_TEST_ENABLED=true and RELIFE_TEST_TOKEN; do not deploy publicly without rate limits.
const CORE = "Companion: Rowan\nProject code: CEDAR-47\nFailure rule: If ReLife verification fails, stop and disclose the failure.\n";
const EXPECTED_HASH = "b93cbc66eaa3414b1b919b55474c8d74a9a1953d1a3c1c45533ce3eb64a3f535";
const json = (data,status=200)=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
async function verify() {
 const data=new TextEncoder().encode(CORE);
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",data))).map(b=>b.toString(16).padStart(2,"0")).join("");
 if(digest!==EXPECTED_HASH)throw Error("Invalid ReLife package");
 return CORE;
}
export async function onRequestPost({request,env}) {
 if(env.RELIFE_TEST_ENABLED!=="true")return json({error:"Disabled"},503);
 if(!env.RELIFE_TEST_TOKEN || request.headers.get("x-relife-test-token")!==env.RELIFE_TEST_TOKEN)return json({error:"Unauthorized"},401);
 let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400)}
 if(typeof body?.message!=="string"||!body.message.trim()||body.message.length>500)return json({error:"Invalid message"},400);
 let core;try{core=await verify()}catch{return json({error:"ReLife verification failed; model not contacted"},409)}
 if(!env.DEEPSEEK_API_KEY)return json({error:"DeepSeek not configured"},503);
 try{
  const upstream=await fetch("https://api.deepseek.com/chat/completions",{method:"POST",
   headers:{"content-type":"application/json",authorization:"Bearer "+env.DEEPSEEK_API_KEY},
   body:JSON.stringify({model:"deepseek-v4-flash",messages:[{role:"system",content:core},{role:"user",content:body.message}],max_tokens:250,stream:false})});
  if(!upstream.ok)return json({error:"DeepSeek request failed"},502);
  const result=await upstream.json();
  return json({verified:true,reply:result?.choices?.[0]?.message?.content??""});
 }catch{return json({error:"Model unavailable"},502)}
}
