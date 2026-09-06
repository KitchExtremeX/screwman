// Rebuild the original pixel logo from the same bitmap alphabet used in-game.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const env={SM:{}};vm.createContext(env);vm.runInContext(fs.readFileSync(path.join(__dirname,'js/pixel-font.js'),'utf8'),env);
const bits=[];[...'SCREWMAN'].forEach((ch,i)=>{env.SM.PixelFont.glyphs[ch].forEach((row,y)=>{for(let x=0;x<5;x++)if(row&(1<<(4-x)))bits.push({x:6+i*18+x*3,y:3+y*3,i})})});
const rect=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
let svg='<svg xmlns="http://www.w3.org/2000/svg" width="156" height="33" viewBox="0 0 156 33" shape-rendering="crispEdges">';
for(const p of bits)svg+=rect(p.x+2,p.y+4,4,5,'#080d1b');
for(const p of bits)svg+=rect(p.x-1,p.y-1,5,5,'#101426');
for(const p of bits){const ramp=p.i<5?['#e7f1cf','#c0d6d7','#94b3be','#576b83']:['#fff4c4','#ffce69','#f28c38','#b9572a'];svg+=rect(p.x,p.y,3,3,ramp[Math.min(3,Math.floor((p.y-3)/6))])}
svg+='</svg>';fs.mkdirSync(path.join(__dirname,'assets'),{recursive:true});fs.writeFileSync(path.join(__dirname,'assets/logo.svg'),svg);
