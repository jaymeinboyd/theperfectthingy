"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4679],{24679:(e,t,a)=>{let r;a.d(t,{createGalaxyRenderer:()=>q});let o={faceOn:!1,speed:1},i=new Float32Array(16),n=new Float32Array(16),l=new Float32Array(16),f=2*Math.PI,s=(e,t,a)=>Math.min(Math.max(e,t),a),h=(e,t,a)=>{let r=s((a-e)/(t-e),0,1);return r*r*(3-2*r)},u=(e,t,a)=>e+(t-e)*a,d=e=>{let t=new Float32Array(2049);for(let a=0;a<=2048;a+=1)t[a]=e(a/2048);return t},p=d(e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4),c=d(e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055),m=(e,t)=>{let a=2048*s(t,0,1),r=Math.trunc(a),o=e[Math.min(r+1,2048)];return e[r]+(o-e[r])*(a-r)},M=e=>{let t,a=s(e,1500,4e4)/100,r=255,o=255;return a>66?(r=329.698727446*(a-60)**-.1332047592,t=288.1221695283*(a-60)**-.0755148492):(t=99.4708025861*Math.log(a)-161.1195681661,o=a<=19?0:138.5177312231*Math.log(a-10)-305.0447927307),[s(r,0,255),s(t,0,255),s(o,0,255)]},g=(()=>{let e=new Float32Array(1539);for(let t=0;t<=512;t+=1){let[a,r,o]=M(1500+75.1953125*t);e[3*t]=a,e[3*t+1]=r,e[3*t+2]=o}return e})(),v=[0,0,0],A=e=>{let t=s((e-1500)/75.1953125,0,512),a=Math.trunc(t),r=3*Math.min(a+1,512),o=t-a;for(let e=0;e<3;e+=1){let t=g[3*a+e];v[e]=t+(g[r+e]-t)*o}return v},x=(e,t)=>0===t?e:x(t,e%t),b=e=>{let t=4096,a=new Float32Array(36864),r=new Uint8Array(a.buffer),o=0;return{add:(i,n,l,f,h,u,d,p,c,m,M,g)=>{if(o===t){let e=new Float32Array(9*(t*=2));e.set(a),r=new Uint8Array((a=e).buffer)}let v=9*o,A=36*o+32,[x,b,w]=e(c,m,M);a[v]=i,a[v+1]=n,a[v+2]=l,a[v+3]=f,a[v+4]=h,a[v+5]=u,a[v+6]=d,a[v+7]=p,r[A]=s(Math.round(x),0,255),r[A+1]=s(Math.round(b),0,255),r[A+2]=s(Math.round(w),0,255),r[A+3]=s(Math.round(g),0,255),o+=1},build:e=>{let t=new ArrayBuffer(36*o),r=new Uint32Array(t),i=new Uint32Array(a.buffer),n=Math.max(Math.round(.618034*o),1);for(;1!==x(n,o);)n+=1;for(let e=0,t=0;e<o;e+=1){let a=9*t,l=9*e;for(let e=0;e<9;e+=1)r[l+e]=i[a+e];t=(t+n)%o}return{...e,count:o,data:t}}}},w=e=>u(.62,.96,h(.144,.528,e)),E=1/Math.tan(12.5*Math.PI/180),R=e=>.5*(e+.22+Math.hypot(e-.22,.28)),y=R(0),F=e=>E*Math.log(R(e)/y),T=e=>-.02/Math.max(e,.08)- -.028,_=-(-.02/.028),S=e=>s((_-e)/.15,-1,1),k=e=>.012+.032*e,P=(e,t)=>{let a=0,r=!1;for(;!r;)r=(a=-t*Math.log(1-e()))>=.02&&a<=1.25&&(a<=.92||e()<Math.exp(-(a-.92)/.09));return a},U=e=>{if(void 0!==r){let e=r;return r=void 0,e}let t=Math.max(e(),1e-9),a=f*e(),o=Math.sqrt(-2*Math.log(t));return r=o*Math.sin(a),o*Math.cos(a)},C=(e,t)=>U(e)*t,B=-Math.PI/4,L=B+Math.PI/2,z=B+.22*Math.PI,I=(e,t,a,r)=>{let o=e();return o<r?{phase:z,radius:.55+C(e,.06),widthMul:.5}:o<r+a&&t>.3?{phase:L+(.5>e()?0:Math.PI),radius:t,widthMul:.7}:{phase:B+(.5>e()?0:Math.PI),radius:t,widthMul:1}},O=function(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0x1a2b3c4d,i=(e=o,()=>{let t=e=Math.trunc(e+0x6d2b79f5);return t=Math.imul(t^t>>>15,1|t),(((t^=t+Math.imul(t^t>>>7,61|t))^t>>>14)>>>0)/0x100000000});r=void 0;let n=e=>Math.round(e*t),l=e=>{let t;return t=[0,0,0],(r,o,i)=>{let n=m(p,r/255),l=m(p,o/255),f=m(p,i/255);a&&([n,l,f]=[.8225*n+.1774*l+0*f,.0332*n+.9669*l+0*f,.0171*n+.0724*l+.9108*f]);let h=a?e:1+(e-1)*.5,u=.2126*n+.7152*l+.0722*f;return n=s(u+(n-u)*h,0,1),l=s(u+(l-u)*h,0,1),f=s(u+(f-u)*h,0,1),t[0]=255*m(c,n),t[1]=255*m(c,l),t[2]=255*m(c,f),t}},d=b(l(1.06));for(let e=0;e<n(2800);e+=1){let e=i()*f,t=2*i()-1,a=Math.sqrt(1-t*t),r=7+3*i(),o=i(),[n,l,s]=[235,235,240];o<.1?[n,l,s]=A(3400+1600*i()):o<.22&&([n,l,s]=A(9e3+12e3*i())),d.add(r*a,1,e,0,0,r*t,.025+i()**3*.045,i()*f,n,l,s,70+180*i())}let M=b(l(1.06));for(let e=0;e<n(110);e+=1){let e=i()*f,t=2*i()-1,a=Math.sqrt(1-t*t),r=.3>i(),o=r?.08+i()**2*.3:(2.1320071635561044-1.3414377485140097*i())**-2,[n,l,s]=A(r?4300+700*i():5e3+1200*i());M.add(o*a,1,e,0,0,o*t*(r?.6:1),.012+.012*i(),i()*f,n,l,s,70+60*i())}for(let e=0;e<n(1500);e+=1){let e=i()*f,t=2*i()-1,a=Math.sqrt(1-t*t),r=(1.8257418583505538-1.0587768695031834*i())**-2,[o,n,l]=A(4200+1800*i());d.add(r*a,1,e,0,0,r*t*.6,.003+i()**2*.004,i()*f,o,n,l,10+14*i())}let g=b(l(1.16));for(let e=0;e<n(18e3);e+=1){let e=P(i,.42),t=e>.28&&.5>i(),{phase:a,radius:r,widthMul:o}=t?I(i,e,.3,.06):{phase:i()*f,radius:e,widthMul:1},n=1-h(.05,.55,r),l=h(.62,1.05,r),s=h(.55,1,r),d=u(t?150:u(222,180,s),255,n),p=u(t?184:u(210,198,s),228,n),c=u(t?248:u(200,236,s),188,n);g.add(r,w(r),F(r)+(t?-.02*S(r)+C(i,.04):C(i,.1)),t?a+C(i,(.18+.08*r)*o):a,t?0:T(r),C(i,1.4*k(r)),(.035+i()**2*.085)*u(1,.55,l)*(t?.85:1),i()*f,d,p,c,(8+10*i())*u(.3,1,h(.02,.3,r))*u(1,.34,l)*(t?1.25:1.2))}let v=b(l(1.12));for(let e=0;e<n(2600);e+=1){let e=.25>i(),t=C(i,e?.05:.16),a=C(i,e?.045:.085),[r,o,n]=e?[255,232,194]:[255,212,158];v.add(Math.hypot(t,a),1,Math.atan2(a,t),0,0,C(i,e?.04:.06),e?.03+.07*i():.06+.13*i(),i()*f,r,o,n,e?3+4*i():2+3*i())}for(let e=0;e<n(200);e+=1){let e=i();v.add(Math.abs(C(i,.02)),1,i()*f,0,0,C(i,.015),.06+e**2*.42,i()*f,255,u(235,215,e),u(200,162,e),1.5+(1-e)*3.5)}let x=b(l(1.14));for(let e=0;e<n(64e3);e+=1){let e,t=.16>i(),a=0,r=0,o=0,n=i()*f,l=1,s=0,d=i()**3,p=26+150*d;if(t)a=.13*Math.abs(U(i)),r=C(i,.35*Math.max(a,.03)),n=i()*f,s=3500+1900*i(),p=10+16*i();else{let e=.14>i();l=w(a=P(i,.38)),o=F(a)+C(i,.06),r=C(i,k(a)*(e?2.8:1)),s=e?3600+i()**2*2600:3800+i()**2*3600,e||(s+=900*h(.55,1.05,a)),p*=(e?.7:1)*u(.3,1,h(.06,.32,a))}let c=.006>i(),m=s;if(c){let e=i();e<.06?m=2200+500*i():e<.58&&(m=3300+900*i())}let[M,v,b]=A(m);e=c?.013+.012*i():t?.0035+i()**2*.005:(.003+.0045*Math.sqrt(d))*(.85+.3*i()),x.add(a,l,o,n,T(a),r,e,i()*f,M,v,b,c?235:p),c&&g.add(a,l,o,n,T(a),r,e*(3+1.5*i()),i()*f,M,v,b,4+4*i())}let[E,R,y]=A(5778);x.add(.55,w(.55),F(.55),z,T(.55),.002,.0045,i()*f,E,R,y,110);let _=b(l(1)),B=n(13e3),L=0,O=(e,t,a,r,o)=>{let n=.7+.3*i(),l=1-.35*h(.85,1.05,e);_.add(e,w(e),t,a,0,C(i,.4*k(e)),r,i()*f,142,190,255,o*n*l),L+=1};for(;L<B;){let e=.3+i()**1.3*.72;if(.18>i())O(e*(1+C(i,.015)),F(e)+C(i,.03),i()*f,.025+i()**1.5*.05,13+16*i());else{let{phase:t,radius:a,widthMul:r}=I(i,e,.22,.05),o=F(a)+.12*S(a)+C(i,.03),n=t+C(i,(.14+.05*a)*r);if(.4>i()&&L+3<=B){let e=.35>i();for(let t=-1;t<=1;t+=1)if(e){let e=t+1,r=e*(.011+.007*i());O(a+C(i,.004),o-r*S(a)+C(i,.006),n+C(i,.015),(.02+i()**1.5*.036)*(1-.12*e),(21+24*i())*(1-.16*e))}else{let e=t*(.008+.01*i());O(a+e,o+F(a+e)-F(a)+C(i,.008),n+C(i,.02),.02+i()**1.5*.04,21+27*i())}}else O(a*(1+C(i,.015)),o,n,.025+i()**1.5*.05,24+32*i())}}let N=b(l(1.2)),D=function(e,t,a,r){let o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:.5,[n,l,s]=A(u(12500+i()**2*17500,6600+2600*i(),o));N.add(e,w(e),t,a,0,C(i,.4*k(e)),(.004+i()**2*.008)*r,i()*f,n,l,s,(120+135*i())*u(1,.4,h(.86,1.1,e)))};for(let e=0;e<n(7e3);e+=1){let e=.24+.82*i(),{phase:t,radius:a,widthMul:r}=I(i,e,.14,.04),o=i()*i();D(a,F(a)+(.02-.1*o)*S(a)+C(i,.012+.045*o),t+C(i,(.24+.1*a)*r),1,o)}for(let e=0;e<n(300);e+=1){let e=1.02+i()**1.4*.22,[t,a,r]=A(9e3+i()**2*14e3);N.add(e,w(e),F(e)+C(i,.25),i()*f,T(e),C(i,.8*k(e)),.003+i()**2*.004,i()*f,t,a,r,25+35*i())}for(let e=0;e<n(120);e+=1){let e=.25+.75*i(),[t,a,r]=A(14e3+i()**2*16e3);N.add(e,w(e),F(e)+C(i,.4),i()*f,T(e),C(i,1.3*k(e)),.003+i()**2*.005,i()*f,t,a,r,70+90*i())}let G=b(l(1.28));for(let e=0;e<n(150);e+=1){let e=.3+.72*i(),{phase:t,radius:a,widthMul:r}=I(i,e,.18,.05),o=t+C(i,.22*r),n=F(a)+.05*S(a)+C(i,.04),l=u(1,.45,h(.86,1.06,a)),s=.2>i(),d=.007+.007*i(),p=s?5+Math.trunc(3*i()):3+Math.trunc(5*i());for(let e=0;e<p;e+=1){let t=i(),r=(e+.4*i())/p*f,h=s?Math.cos(r)*d:C(i,.012),c=s?Math.sin(r)*d/Math.max(a,.3):C(i,.035);G.add(a+h,w(a),n+(s?C(i,.002):C(i,.01)),o+c,0,C(i,.008),s?.012+i()**2*.018:.016+i()**2*.036,i()*f,255,u(74,124,t),u(122,168,t),(26+40*i())*l)}let c=1+Math.trunc(2*i());for(let e=0;e<c;e+=1)G.add(a+C(i,.006),w(a),n+C(i,.006),o+C(i,.025),0,C(i,.006),.032+i()**2*.05,i()*f,255,88,132,(5+8*i())*l);let m=4+Math.trunc(8*i());for(let e=0;e<m;e+=1)D(a+C(i,.01),n+C(i,.008),o+C(i,.03),1.25,.2*i());let M=1+Math.trunc(2*i());for(let e=0;e<M;e+=1)G.add(a+C(i,.014),w(a),n-.015*S(a)+C(i,.012),o+C(i,.04),0,C(i,.008),.014+i()**2*.03,i()*f,135,172,255,(12+12*i())*l)}for(let e=0;e<n(70);e+=1){let e=Math.max(P(i,.38),.14);G.add(e,w(e),F(e)+C(i,.3),i()*f,T(e),C(i,1.6*k(e)),.0035+.0035*i(),i()*f,120,235,205,8+10*i())}for(let e=0;e<n(26);e+=1){let e=.3+.72*i(),t=F(e),a=i()*f,r=T(e),o=C(i,.7*k(e)),n=5200+i()**2*9e3,l=5+Math.trunc(8*i()),s=.25>i();for(let h=0;h<l;h+=1){let l=s&&0===h,[u,d,p]=A(l?3450+300*i():n*(.75+.5*i()));N.add(e+C(i,.005),w(e),t+C(i,.005),a+C(i,.01),r,o+C(i,.004),(.0035+i()**2*.005)*(l?1.7:1),i()*f,u,d,p,l?170+60*i():90+110*i())}}let V=b(l(1.08));for(let e=0;e<n(90);e+=1){let e=i()*f,t=2*i()-1,a=Math.sqrt(1-t*t),r=1.05+.35*i(),o=i(),[n,l,s]=[240,238,245];o<.18?[n,l,s]=A(3200+1500*i()):o<.36&&([n,l,s]=A(1e4+15e3*i())),V.add(r*a,1,e,0,0,r*t,.003+i()**2*.004,i()*f,n,l,s,80+80*i())}let X=b(l(1.08)),K=(e,t,a,r,o,n,l)=>{let s=Math.cos(n),h=Math.sin(n);for(let n=0;n<l;n+=1){let n=C(i,r),l=C(i,o),u=e+n*s-l*h,d=t+n*h+l*s,p=.12>i();X.add(Math.hypot(u,d),1,Math.atan2(d,u),0,0,a+C(i,.9*o),p?.012+.01*i():.02+.045*i(),i()*f,p?255:205,p?130:212,p?165:236,p?16+12*i():7+9*i())}},Y=i()*f,H=Y+.4+.2*i(),q=1.3*Math.cos(Y),W=1.3*Math.sin(Y),j=1.55*Math.cos(H),$=1.55*Math.sin(H),Z=i()*f;K(q,W,-.85,.1,.055,Z,32),K(j,$,-1.05,.07,.032,Math.atan2(W-$,q-j),18);for(let e=0;e<3;e+=1){let t=.09+C(i,.01),a=C(i,.012),r=q+t*Math.cos(Z)-a*Math.sin(Z),o=W+t*Math.sin(Z)+a*Math.cos(Z);X.add(Math.hypot(r,o),1,Math.atan2(o,r),0,0,-.85+C(i,.012),0===e?.016+.008*i():.009+.006*i(),i()*f,255,120,150,0===e?26+10*i():15+8*i())}for(let e=0;e<n(26);e+=1){let e=i(),t=u(q,j,e)+C(i,.03),a=u(W,$,e)+C(i,.03);X.add(Math.hypot(t,a),1,Math.atan2(a,t),0,0,u(-.85,-1.05,e)+C(i,.03),.018+.025*i(),i()*f,205,216,238,1.6+2*i())}let J=i()*f,Q=.9+.5*i(),ee=i()*f;for(let e=0;e<n(240);e+=1){let e=ee+(i()-.5)*4.2,t=1.35+C(i,.06)+.12*Math.sin(2*e),a=t*Math.cos(e),r=t*Math.sin(e)*Math.cos(Q),o=a*Math.cos(J)-r*Math.sin(J),n=a*Math.sin(J)+r*Math.cos(J),[l,s,h]=A(4700+1100*i());d.add(Math.hypot(o,n),1,Math.atan2(n,o),0,0,t*Math.sin(e)*Math.sin(Q)+C(i,.05),.003+.003*i(),i()*f,l,s,h,14+16*i())}for(let e=0;e<n(30);e+=1){let e=ee+C(i,.045),t=1.35+C(i,.025)+.12*Math.sin(2*e),a=t*Math.cos(e),r=t*Math.sin(e)*Math.cos(Q),o=a*Math.cos(J)-r*Math.sin(J),n=a*Math.sin(J)+r*Math.cos(J),[l,s,h]=A(4600+1200*i());d.add(Math.hypot(o,n),1,Math.atan2(n,o),0,0,t*Math.sin(e)*Math.sin(Q)+C(i,.02),.003+.003*i(),i()*f,l,s,h,20+20*i())}for(let e=0;e<18;e+=1){let t=i()*f,a=(.25+.75*i())*(.5>i()?-1:1),r=Math.sqrt(1-a*a),o=6.5+2.5*i(),n=[o*r*Math.cos(t),o*r*Math.sin(t),o*a],l=i()*f,s=Math.sin(l)*(2*i()-1),h=0===e,u=h||.7>i();if(h){X.add(Math.hypot(n[0],n[1]),1,Math.atan2(n[1],n[0]),0,0,n[2],.08+.024*i(),i()*f,250,232,204,10+4*i());for(let e=0;e<8;e+=1){let t=(e+.3*i())/8*f,a=Math.cos(t)*(.13+.03*i()),r=Math.sin(t)*(.05+.015*i()),o=n[0]+a*Math.cos(l)-r*Math.sin(l),h=n[1]+a*Math.sin(l)+r*Math.cos(l);X.add(Math.hypot(o,h),1,Math.atan2(h,o),0,0,n[2]+a*s,.05+.03*i(),i()*f,226,224,238,3+3*i())}for(let e=0;e<2;e+=1){let t=i()*f,a=.09+.07*e+.02*i(),r=n[0]+a*Math.cos(t),o=n[1]+a*Math.sin(t);X.add(Math.hypot(r,o),1,Math.atan2(o,r),0,0,n[2]+a*(i()-.5),.021+.014*i(),i()*f,240,228,210,3.5+2*i())}}else{let e=1+Math.trunc(2*i());for(let t=0;t<e;t+=1){let e=t*(.018+.014*i()),a=n[0]+e*Math.cos(l),r=n[1]+e*Math.sin(l);X.add(Math.hypot(a,r),1,Math.atan2(r,a),0,0,n[2]+e*s,.022+.026*i(),i()*f,u?245:205,u?228:215,u?205:240,3+4*i())}}}let et=i()*f,ea=(.3+.6*i())*(.5>i()?-1:1),er=Math.sqrt(1-ea*ea),eo=7.5+1.5*i();for(let e=0;e<5;e+=1){let e=eo*er*Math.cos(et)+C(i,.3),t=eo*er*Math.sin(et)+C(i,.3),a=.75>i();X.add(Math.hypot(e,t),1,Math.atan2(t,e),0,0,eo*ea+C(i,.3),.018+.022*i(),i()*f,a?243:210,a?226:216,a?206:238,2.5+2*i())}return[d.build({alpha:1,falloffK:4.5,maxPointSize:3.5,novaAmp:0,patternMul:0,sizeMul:1,spikeAmp:0,target:"background",twinkleAmp:.22}),M.build({alpha:.8,falloffK:3,maxPointSize:5,novaAmp:0,patternMul:0,sizeMul:1,spikeAmp:0,target:"background",twinkleAmp:0}),X.build({alpha:1,falloffK:3,maxPointSize:26,novaAmp:0,patternMul:0,sizeMul:1,spikeAmp:0,target:"background",twinkleAmp:0}),g.build({alpha:1,falloffK:3,maxPointSize:110,novaAmp:0,patternMul:1,sizeMul:.82,spikeAmp:0,target:"glow",twinkleAmp:0}),v.build({alpha:1,falloffK:3,maxPointSize:190,novaAmp:0,patternMul:1,sizeMul:.82,spikeAmp:0,target:"glow",twinkleAmp:0}),x.build({alpha:1,falloffK:4.5,maxPointSize:16,novaAmp:0,patternMul:1,sizeMul:1,spikeAmp:.3,target:"stars",twinkleAmp:.1}),_.build({alpha:1,falloffK:3,maxPointSize:84,novaAmp:0,patternMul:1,sizeMul:.82,spikeAmp:0,target:"dust",twinkleAmp:0}),N.build({alpha:1,falloffK:4.5,maxPointSize:14,novaAmp:1,patternMul:1,sizeMul:1,spikeAmp:.3,target:"foreground",twinkleAmp:.12}),G.build({alpha:1,falloffK:3,maxPointSize:48,novaAmp:0,patternMul:1,sizeMul:.82,spikeAmp:0,target:"foreground",twinkleAmp:0}),V.build({alpha:.6,falloffK:4.5,maxPointSize:4,novaAmp:0,patternMul:0,sizeMul:1,spikeAmp:0,target:"foreground",twinkleAmp:.2})]},N="1.25",D=`
attribute vec2 aPos;
varying vec2 vUv;

void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`,G=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTonemap;
uniform float uAberration;
uniform float uGrainSeed; // negative: no grain or vignette (dust composite)

void main() {
  vec3 color;

  if (uAberration > 0.0) {
    // Residual chromatic aberration of long-exposure optics: a slight
    // radial RGB split that grows toward the frame corners, felt on the
    // nebulous glow rather than seen on the stars
    vec2 shift = (vUv - 0.5) * uAberration;

    color = vec3(
      texture2D(uTex, vUv + shift).r,
      texture2D(uTex, vUv).g,
      texture2D(uTex, vUv - shift).b);
  } else {
    color = texture2D(uTex, vUv).rgb;
  }

  // Filmic shoulder for the HDR glow: exactly linear below the knee so the
  // tuned mid-tones pass through untouched, then an exponential rolloff
  // that compresses the core's stacked brightness into a warm gradient
  // instead of letting it clip to flat white
  vec3 over = max(color - 0.6, 0.0);
  vec3 shouldered = min(color, vec3(0.6)) + 0.4 * (1.0 - exp(-over * 2.5));
  // A per-channel rolloff bleaches every overexposed texel to the same
  // white. Scaling all channels by the brightest one's rolloff keeps the
  // bulge's golden hue through the gradient, as film does, so the plateau
  // reads as glowing Population II light and only the nucleus whites out
  float peak = max(max(color.r, color.g), color.b);
  float peakShouldered =
    min(peak, 0.6) + 0.4 * (1.0 - exp(-max(peak - 0.6, 0.0) * 2.5));
  vec3 hueKept = color * (peakShouldered / max(peak, 0.0001));

  color = mix(color, mix(shouldered, hueKept, 0.6), uTonemap);

  if (uGrainSeed >= 0.0) {
    // Sensor grain rides on the glow (the shot noise of a long exposure)
    // and the lens vignette eases the corners down; both multiply, so black
    // stays black. Sprites get the same vignette in their vertex shader.
    // Sine-free hash: sin() of large arguments bands on mobile GPUs
    vec3 p3 = fract(vec3(gl_FragCoord.xy, uGrainSeed) * 0.1031);
    p3 += dot(p3, p3.zyx + 31.32);
    float noise = fract((p3.x + p3.y) * p3.z);

    color *= (1.0 - 0.28 * smoothstep(0.4, 0.9, length(vUv - 0.5))) *
      (1.0 + (noise - 0.5) * 0.07);
  }

  gl_FragColor = vec4(color, 1.0);
}
`,V=[1,.72,.5,.32],X=(()=>{let e=[];for(let t=0;t<8;t+=1){let a=t/8*Math.PI*2;e.push(1.45*Math.cos(a),1.45*Math.sin(a),-.5,1.45*Math.cos(a),1.45*Math.sin(a),.5)}return e})(),K=(e,t,a,r)=>{let o=e.createShader(a);e.shaderSource(o,r),e.compileShader(o),e.attachShader(t,o)},Y=(e,t,a,r)=>{let o=e.createProgram();return K(e,o,e.VERTEX_SHADER,t),K(e,o,e.FRAGMENT_SHADER,a),r.forEach((t,a)=>e.bindAttribLocation(o,a,t)),e.linkProgram(o),o},H=(e,t)=>{if(!e.getProgramParameter(t,e.LINK_STATUS)){let a=(e.getAttachedShaders(t)||[]).map(t=>e.getShaderInfoLog(t));throw Error([e.getProgramInfoLog(t),...a].filter(Boolean).join("\n")||"Program link failed")}return t},q=(e,t)=>{let a,{faceOn:r,speed:f}={...o,...t},s="object"==typeof navigator&&/android|iphone|ipad|mobi/i.test(navigator.userAgent),h=((e,t)=>{let a={alpha:!1,antialias:!1,depth:!1,powerPreference:t?"low-power":"high-performance",preserveDrawingBuffer:!1,stencil:!1},r=e.getContext("webgl2",a)||e.getContext("webgl",a);if(!r)throw Error("Failed to getContext for Galaxy wallpaper");return r})(e,s),u=!1;try{"drawingBufferColorSpace"in h&&(h.drawingBufferColorSpace="display-p3",u="display-p3"===h.drawingBufferColorSpace)}catch{}h.getExtension("KHR_parallel_shader_compile");let d=["aCorner","aOrbit","aMotion","aColor"],[p,c]=[!0,!1].map(e=>Y(h,`
attribute vec2 aCorner;
attribute vec4 aOrbit;
attribute vec4 aMotion;
attribute vec4 aColor;
uniform mat4 uViewProj;
uniform vec2 uViewport;
uniform float uTime;
uniform float uPatternRot;
uniform float uPointScale;
uniform float uAlpha;
uniform float uTwinkleAmp;
uniform vec2 uSizeRange; // sprite footprint limits (px): anti-alias floor, cap
uniform float uVignette;
uniform vec4 uWarp; // x: amplitude, y: cos(node), z: sin(node), w: start
${e?`uniform float uSpike;
uniform float uNova;
uniform float uSpikeGate; // sprite size (device px) where spikes begin
varying float vSpike;
varying float vNova;`:`uniform vec2 uDepthFade; // x: camera distance, y: 1 / depth range
uniform float uDustNear;`}
varying vec4 vColor;
varying vec2 vCoord;

void main() {
  float a = aOrbit.x;
  float phi = aOrbit.w + aMotion.x * uTime;
  float theta = aOrbit.z + uPatternRot;
  vec2 e = vec2(a * cos(phi), a * aOrbit.y * sin(phi));
  float sT = sin(theta);
  float cT = cos(theta);
  vec2 pos = vec2(cT * e.x - sT * e.y, sT * e.x + cT * e.y);
  // Integral-sign warp of the outer disk: height offset follows
  // sin(azimuth - node), growing towards the rim (Gaia DR2)
  float z = aMotion.y + uWarp.x * smoothstep(uWarp.w, ${N}, a) *
    (pos.y * uWarp.y - pos.x * uWarp.z) / max(a, 0.2);
  vec4 clip = uViewProj * vec4(pos, z, 1.0);
${e?`  // Supernova channel: each cycle a rolling hash window elects one star
  // of the layer to flare ~50x and decay over seconds
  float novaTick = uTime * 0.018182;
  float novaPhase = fract(novaTick);
  float novaPick = uNova * step(
    abs(fract(aMotion.w * 0.159155) - fract(floor(novaTick) * 0.618034)),
    0.00007);
  float nova = novaPick *
    smoothstep(0.0, 0.02, novaPhase) * exp(-novaPhase * 9.0);
  float sizePx = aMotion.z * (1.0 + nova * 3.0) * uPointScale /
    max(clip.w, 0.0001);`:"  float sizePx = aMotion.z * uPointScale / max(clip.w, 0.0001);"}
  float twinkle = 1.0 + uTwinkleAmp *
    sin(uTime * (1.5 + fract(aMotion.w * 0.6366) * 2.5) + aMotion.w);
  // A gaussian narrower than ~half a pixel is undersampled: its summed
  // brightness swings with the sub-pixel position, so slowly drifting stars
  // would shimmer. Smaller sprites spread over the floor footprint instead,
  // dimmed so their total light is unchanged
  float shownSize = clamp(sizePx, uSizeRange.x, uSizeRange.y);
  float coverage = min(sizePx / shownSize, 1.0);
  // Optical vignette, evaluated per sprite (it varies far slower than any
  // sprite's extent) so no fullscreen pass is needed to apply it
  float vignette = 1.0 - uVignette * 0.28 *
    smoothstep(0.4, 0.9, length(clip.xy / max(clip.w, 0.0001)) * 0.5);
  float fade = coverage * coverage * vignette;

  // Sprites are instanced quads, not points: each corner is pushed out in
  // clip space by half the sprite size. Partly off-screen sprites then clip
  // per pixel instead of vanishing once their center leaves the viewport
  // (Metal and most mobile GL drivers cull points that way), and no driver
  // point-size limit can shrink the big glow sprites
  vCoord = aCorner;
  gl_Position = clip +
    vec4(aCorner * shownSize / uViewport * clip.w, 0.0, 0.0);
${e?`  // Only sprites big enough to read as saturated stars grow spikes; the
  // gate scales with resolution so hiDPI screens spike the same stars.
  // A supernova always spikes hard at peak, so the flare reads as a
  // dazzling star with a cross flare rather than a flat white ball
  vSpike = max(uSpike * clamp((shownSize / uSpikeGate - 1.0) * 1.08, 0.0, 1.0),
    uSpike * nova * 4.0);
  vNova = min(nova * 2.0, 1.0);
  vColor = vec4(aColor.rgb,
    aColor.a * uAlpha * twinkle * fade * (1.0 + nova * 5.0));`:`  // Inclination asymmetry of extinction: dust on the near side of a tilted
  // disk blocks the light column behind it, while far-side dust is hidden
  // by the disk's own glow - the cue astronomers read to tell which edge
  // of a galaxy is closer. Near-side lanes darken more, far-side less.
  float nearness = clamp(0.5 + (uDepthFade.x - clip.w) * uDepthFade.y,
    0.0, 1.0);
  float dustBias = mix(1.0, mix(0.72, 1.28, nearness), uDustNear);

  vColor = vec4(aColor.rgb,
    aColor.a * uAlpha * twinkle * fade * dustBias);`}
}
`,`
precision mediump float;
varying vec4 vColor;
varying vec2 vCoord;
${e?"varying float vSpike;\nvarying float vNova;":""}
uniform vec3 uFalloff; // x: exponent, y: exp(-exponent), z: 1/(1-y)

void main() {
  vec2 p = vCoord;
  float r2 = dot(p, p);

  if (r2 > 1.0) discard;

  float falloff = (exp(-uFalloff.x * r2) - uFalloff.y) * uFalloff.z;
${e?`  // A supernova sharpens its profile (cubed falloff) so the flare shows a
  // compact saturated core with a steep skirt instead of a flat disc
  falloff = mix(falloff, falloff * falloff * falloff, vNova);
  // Four-point diffraction spikes along the screen axes, as telescope
  // spider vanes draw them on the saturated stars of NASA/ESA photographs
  float spikes = vSpike * (1.0 - r2) *
    (exp(-48.0 * p.x * p.x) + exp(-48.0 * p.y * p.y));`:""}
  // The R2 dither needs the integer pixel coordinate intact; GPUs that run
  // mediump at fp16 would collapse the fract, so the coordinate is read at
  // high precision wherever the hardware offers it
#ifdef GL_FRAGMENT_PRECISION_HIGH
  highp vec2 ditherCoord = gl_FragCoord.xy;
#else
  vec2 ditherCoord = gl_FragCoord.xy;
#endif
  float dither =
    fract(dot(ditherCoord, vec2(0.75487767, 0.56984029))) - 0.5;
  float weight =
    vColor.a * ${e?"(falloff + spikes)":"falloff"} * (1.0 + dither * 0.1);

  gl_FragColor = vec4(vColor.rgb * weight, weight);
}
`,d)),m=Y(h,D,G,["aPos"]);h.flush();let M=O(s?.55:1,u,Math.trunc(0x7ffffffe*Math.random())+1),g=Math.random()*Math.PI*2,v=e=>{let t=H(h,e);return{program:t,uniforms:{alpha:h.getUniformLocation(t,"uAlpha"),depthFade:h.getUniformLocation(t,"uDepthFade"),dustNear:h.getUniformLocation(t,"uDustNear"),falloff:h.getUniformLocation(t,"uFalloff"),nova:h.getUniformLocation(t,"uNova"),patternRot:h.getUniformLocation(t,"uPatternRot"),pointScale:h.getUniformLocation(t,"uPointScale"),sizeRange:h.getUniformLocation(t,"uSizeRange"),spike:h.getUniformLocation(t,"uSpike"),spikeGate:h.getUniformLocation(t,"uSpikeGate"),time:h.getUniformLocation(t,"uTime"),twinkleAmp:h.getUniformLocation(t,"uTwinkleAmp"),viewport:h.getUniformLocation(t,"uViewport"),viewProj:h.getUniformLocation(t,"uViewProj"),vignette:h.getUniformLocation(t,"uVignette"),warp:h.getUniformLocation(t,"uWarp")}}},A=v(p),x=v(c),b=[A,x],w=H(h,m),E={aberration:h.getUniformLocation(w,"uAberration"),grainSeed:h.getUniformLocation(w,"uGrainSeed"),tonemap:h.getUniformLocation(w,"uTonemap")},R=e=>{a!==e&&(h.useProgram(e),a=e)},y=Math.random()*Math.PI*2,F=Math.cos(y),T=Math.sin(y);R(w),h.uniform1i(h.getUniformLocation(w,"uTex"),0);let _="function"==typeof h.createVertexArray,S=_?void 0:h.getExtension("OES_vertex_array_object")||void 0,k=_?void 0:h.getExtension("ANGLE_instanced_arrays")||void 0;if(!_&&!k)throw Error("Instanced arrays unsupported for Galaxy wallpaper");let P=e=>{_?h.vertexAttribDivisor(e,1):null==k||k.vertexAttribDivisorANGLE(e,1)},U=e=>{_?h.drawArraysInstanced(h.TRIANGLE_STRIP,0,4,e):null==k||k.drawArraysInstancedANGLE(h.TRIANGLE_STRIP,0,4,e)},C=[],B=e=>{if(_){let t=h.createVertexArray();return h.bindVertexArray(t),e(),h.bindVertexArray(null),C.push(t),()=>h.bindVertexArray(t)}if(S){let t=S.createVertexArrayOES();return S.bindVertexArrayOES(t),e(),S.bindVertexArrayOES(null),C.push(t),()=>S.bindVertexArrayOES(t)}return e},L=M.map(e=>{let t=h.createBuffer();return h.bindBuffer(h.ARRAY_BUFFER,t),h.bufferData(h.ARRAY_BUFFER,e.data,h.STATIC_DRAW),e.data=new ArrayBuffer(0),t}),z=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,z),h.bufferData(h.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),h.STATIC_DRAW);let I=M.map((e,t)=>B(()=>{h.bindBuffer(h.ARRAY_BUFFER,z),h.enableVertexAttribArray(0),h.vertexAttribPointer(0,2,h.FLOAT,!1,0,0),h.bindBuffer(h.ARRAY_BUFFER,L[t]),h.enableVertexAttribArray(1),h.enableVertexAttribArray(2),h.enableVertexAttribArray(3),h.vertexAttribPointer(1,4,h.FLOAT,!1,36,0),h.vertexAttribPointer(2,4,h.FLOAT,!1,36,16),h.vertexAttribPointer(3,4,h.UNSIGNED_BYTE,!0,36,32),P(1),P(2),P(3)})),K=h.createBuffer();h.bindBuffer(h.ARRAY_BUFFER,K),h.bufferData(h.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),h.STATIC_DRAW);let q=B(()=>{h.bindBuffer(h.ARRAY_BUFFER,K),h.enableVertexAttribArray(0),h.disableVertexAttribArray(1),h.disableVertexAttribArray(2),h.disableVertexAttribArray(3),h.vertexAttribPointer(0,2,h.FLOAT,!1,0,0)}),W=(e,t)=>{let a=h.createTexture(),r=h.createFramebuffer();return h.bindTexture(h.TEXTURE_2D,a),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,h.LINEAR),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,h.LINEAR),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE),{framebuffer:r,height:0,internalFormat:e,texture:a,type:t,width:0}},j=(e,t,a)=>{e.width=t,e.height=a,h.bindTexture(h.TEXTURE_2D,e.texture),h.texImage2D(h.TEXTURE_2D,0,e.internalFormat,t,a,0,h.RGBA,e.type,null),h.bindFramebuffer(h.FRAMEBUFFER,e.framebuffer),h.framebufferTexture2D(h.FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,e.texture,0)},$=h.RGBA,Z=h.UNSIGNED_BYTE,J=!1;if(_)(h.getExtension("EXT_color_buffer_float")||h.getExtension("EXT_color_buffer_half_float"))&&($=h.RGBA16F,Z=h.HALF_FLOAT,J=!0);else{let e=h.getExtension("OES_texture_half_float");e&&h.getExtension("EXT_color_buffer_half_float")&&h.getExtension("OES_texture_half_float_linear")&&(Z=e.HALF_FLOAT_OES,J=!0)}let Q=W($,Z),ee=W(h.RGBA,h.UNSIGNED_BYTE);j(Q,2,2);let et=h.checkFramebufferStatus(h.FRAMEBUFFER)===h.FRAMEBUFFER_COMPLETE;!et&&J&&(J=!1,Q.internalFormat=h.RGBA,Q.type=h.UNSIGNED_BYTE,j(Q,2,2),et=h.checkFramebufferStatus(h.FRAMEBUFFER)===h.FRAMEBUFFER_COMPLETE),h.bindFramebuffer(h.FRAMEBUFFER,null),h.disable(h.DEPTH_TEST),h.disable(h.DITHER),h.enable(h.BLEND);let{height:ea,width:er}=e,eo=!0,ei=!1,en=0,el=0,ef=0,es=1e3/60,eh=0,eu=0,ed=1e3/60,ep=1e3/60,ec=0,em=0,eM=0,eg=0,ev=0,eA=2.28*(s?1.2:1),ex=r?1.35:.48+.22*!!s+(2*Math.random()-1)*.05,eb=55*Math.random(),ew={background:[],dust:[],foreground:[],glow:[],stars:[]};M.forEach((e,t)=>ew[e.target].push({binder:I[t],falloffCut:Math.exp(-e.falloffK),layer:e,minSize:1.1*Math.sqrt(2*e.falloffK),variant:e.spikeAmp>0||e.novaAmp>0?A:x}));let eE=(e,t,a,r)=>{let o=V[eu],i=Math.min(1/o,2.2),n=ea/900*t,l=ea/(2*Math.tan(50*Math.PI/360))*t,f="dust"===e||"glow"===e&&et?0:1;for(let{binder:t,falloffCut:s,layer:u,minSize:d,variant:p}of(h.blendFunc("dust"===e?h.ZERO:h.ONE,"dust"===e?h.ONE_MINUS_SRC_COLOR:h.ONE),ew[e])){let c=Math.floor(u.count*o);if(c>0){let{uniforms:o}=p;R(p.program),t(),h.uniform1f(o.pointScale,l*u.sizeMul),h.uniform3f(o.falloff,u.falloffK,s,1/(1-s)),h.uniform1f(o.alpha,u.alpha*i),h.uniform2f(o.sizeRange,d,Math.max(u.maxPointSize*n,d)),h.uniform1f(o.vignette,f),h.uniform2f(o.viewport,a,r),h.uniform1f(o.twinkleAmp,u.twinkleAmp),o.spike&&h.uniform1f(o.spike,u.spikeAmp),o.nova&&h.uniform1f(o.nova,u.novaAmp),o.dustNear&&h.uniform1f(o.dustNear,+("dust"===e)),h.uniform4f(o.warp,.055*u.patternMul,F,T,.6),h.uniform1f(o.patternRot,-.028*u.patternMul*eb),U(c)}}},eR=(e,t)=>{R(w),q(),h.blendFunc(t?h.ONE:h.ZERO,t?h.ONE:h.SRC_COLOR),h.uniform1f(E.tonemap,t&&J?1:0),h.uniform1f(E.aberration,.003*!!t),h.uniform1f(E.grainSeed,t?61.8*eb%97:-1),h.bindTexture(h.TEXTURE_2D,e.texture),h.drawArrays(h.TRIANGLES,0,3)},ey=e=>{if(ei||!eo)return;if(en=requestAnimationFrame(ey),ef){let t=e-ef;t>0&&t<90&&(es+=(t-es)*.05)}ef=e,eh+=1;let t=Math.max(1,Math.floor(1e3/es/60));if(eh<t)return;eh=0,ep=es*t;let a=el?(e-el)/1e3:1/60;if(el=e,a<=0)return;let r=Math.min(a,.1);eb+=r*f,ed+=(Math.min(1e3*a,4*ep)-ed)*.04,!((ec+=1)<90)&&(ed>1.6*ep&&eu<V.length-1?(eu+=1,ec=0):ed<1.12*ep&&eu>0&&(eu-=1,ec=0));let o=Math.min(4.5*r,1);eg+=(em-eg)*o,ev+=(eM-ev)*o;let s=eA*(1+.025*Math.sin(.11*eb)),u=((e,t,a)=>{var r,o,f,s,h;let u,d,p,c,m,M,g,v,A,x,b,{azimuth:w,distance:E,elevation:R,panX:y=0,panY:F=0}=e;r=50*Math.PI/180,o=t/Math.max(a,1),u=1/Math.tan(r/2),i.fill(0),i[0]=u/o,i[5]=u,i[10]=-1.003338898163606,i[11]=-1,i[14]=-.1001669449081803,d=Math.hypot(f=E*Math.cos(R)*Math.cos(w),s=E*Math.cos(R)*Math.sin(w),h=E*Math.sin(R))||1,p=f/d,c=s/d,m=h/d,v=Math.hypot(M=-c,g=p)||1,M/=v,A=-m*(g/=v),x=m*M,b=p*g-c*M,n.fill(0),n[0]=M,n[1]=A,n[2]=p,n[4]=g,n[5]=x,n[6]=c,n[9]=b,n[10]=m,n[12]=-(M*f+g*s),n[13]=-(A*f+x*s+b*h),n[14]=-(p*f+c*s+m*h),n[15]=1;for(let e=0;e<4;e+=1)for(let t=0;t<4;t+=1){let a=0;for(let r=0;r<4;r+=1)a+=i[4*r+t]*n[4*e+r];l[4*e+t]=a}let T=.1+F;for(let e=0;e<4;e+=1)l[4*e]+=y*l[4*e+3],l[4*e+1]+=T*l[4*e+3];return l})({azimuth:g+.006*eb+.14*eg,distance:s,elevation:Math.min(Math.max(ex-.09*ev,.15),1.5),panX:-(.055*eg),panY:.055*ev},er,ea);for(let{program:e,uniforms:t}of b)R(e),h.uniformMatrix4fv(t.viewProj,!1,u),h.uniform1f(t.time,eb),t.depthFade&&h.uniform2f(t.depthFade,s,.55),t.spikeGate&&h.uniform1f(t.spikeGate,Math.max(9*ea/900,4));let d=er,p=ea,c=0,m=0;for(let e=0;e<X.length;e+=3){let t=X[e],a=X[e+1],r=X[e+2],o=u[3]*t+u[7]*a+u[11]*r+u[15];if(o<=.05){d=0,p=0,c=er,m=ea;break}let i=((u[0]*t+u[4]*a+u[8]*r+u[12])/o*.5+.5)*er,n=((u[1]*t+u[5]*a+u[9]*r+u[13])/o*.5+.5)*ea;d=Math.min(d,i),p=Math.min(p,n),c=Math.max(c,i),m=Math.max(m,n)}let M=.08*ea+16,v=Math.max(0,Math.floor(d-M)),A=Math.max(0,Math.floor(p-M)),x=Math.min(er-v,Math.ceil(c+M)-v),w=Math.min(ea-A,Math.ceil(m+M)-A);if(et){let e=Math.min(eu>=2?.3:.45,620/ea),t=Math.max(1,Math.ceil(er*e)),a=Math.max(1,Math.ceil(ea*e));(Q.width!==t||Q.height!==a)&&(j(Q,t,a),j(ee,t,a)),h.viewport(0,0,t,a),h.clearColor(0,0,0,0),h.bindFramebuffer(h.FRAMEBUFFER,Q.framebuffer),h.clear(h.COLOR_BUFFER_BIT),eE("glow",e,t,a),h.clearColor(1,1,1,1),h.bindFramebuffer(h.FRAMEBUFFER,ee.framebuffer),h.clear(h.COLOR_BUFFER_BIT),eE("dust",e,t,a),h.bindFramebuffer(h.FRAMEBUFFER,null)}h.viewport(0,0,er,ea),h.clearColor(.0012,.0018,.005,1),h.clear(h.COLOR_BUFFER_BIT),eE("background",1,er,ea),et?(x>0&&w>0&&(h.enable(h.SCISSOR_TEST),h.scissor(v,A,x,w)),eR(Q,!0),eE("stars",1,er,ea),eR(ee,!1),h.disable(h.SCISSOR_TEST)):(eE("glow",1,er,ea),eE("stars",1,er,ea),eE("dust",1,er,ea)),eE("foreground",1,er,ea)},eF=()=>{el=0,ef=0,eh=0,en=requestAnimationFrame(ey)};return eF(),{destroy:()=>{var e;ei=!0,cancelAnimationFrame(en),h.isContextLost()||(C.forEach(e=>{_?h.deleteVertexArray(e):null==S||S.deleteVertexArrayOES(e)}),L.forEach(e=>h.deleteBuffer(e)),h.deleteBuffer(K),h.deleteBuffer(z),[Q,ee].forEach(e=>{h.deleteFramebuffer(e.framebuffer),h.deleteTexture(e.texture)}),h.deleteProgram(A.program),h.deleteProgram(x.program),h.deleteProgram(w),null==(e=h.getExtension("WEBGL_lose_context"))||e.loseContext())},resize:(t,a)=>{er=Math.max(1,Math.floor(t)),ea=Math.max(1,Math.floor(a)),e.width=er,e.height=ea},setTilt:(e,t)=>{em=Math.min(Math.max(e,-1),1),eM=Math.min(Math.max(t,-1),1)},setVisible:e=>{eo===e||ei||((eo=e)?eF():cancelAnimationFrame(en))}}}}}]);