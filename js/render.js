SM.Render=class{constructor(canvas){this.c=canvas;this.ctx=canvas.getContext('2d');this.ctx.imageSmoothingEnabled=false}draw(g){const c=this.ctx;c.setTransform(.5,0,0,.5,0,0);c.imageSmoothingEnabled=false;const W=1120,H=630,t=g.time,cam=g.camera;const r=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x/2)*2,Math.round(y/2)*2,Math.ceil(w/2)*2,Math.ceil(h/2)*2)},line=(x,y,x2,y2,color,width=1)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke()},text=(s,x,y,size=12,color='#9eb9c2')=>{SM.PixelFont.draw(c,s,x,y,size,color)};
for(let y=0;y<H;y+=30){const colors=['#11172c','#18213b','#1d2e48','#244159','#2e5368','#356879','#427b88'];r(0,y,W,30,colors[Math.min(6,Math.floor(y/90))]);}
// Distant assembly towers: parallax and original procedural geometry.
for(let k=-1;k<12;k++){let x=k*170-(cam.x*.18)%170;let y=170+(k%3)*35;r(x,y,110,500,'#1d3048');r(x+8,y+8,94,4,'#24414a');for(let j=0;j<9;j++){r(x+15,y+24+j*38,22,18,'#2b4b64');r(x+46,y+24+j*38,35,18,'#35667a');if((j+k)%4===0)r(x+49,y+29+j*38,5,3,'#528c89')}r(x+38,y-45,6,45,'#1b424b');r(x+36,y-48,10,4,Math.sin(t*2+k)>0?'#db8155':'#573e39')}
for(let k=-1;k<8;k++){let x=k*280-(cam.x*.4)%280;line(x,90,x+150,290,'#375d71',10);line(x+150,290,x+210,90,'#375d71',10);r(x,70,280,12,'#36535a');r(x,85,280,3,'#1a343e')}
c.save();c.translate(-Math.round(cam.x/2)*2+(g.shake?Math.round(Math.sin(t*119)*g.shake/2)*2:0),-Math.round(cam.y/2)*2+(g.shake?Math.round(Math.cos(t*97)*g.shake*.2)*2:0));
// Wall panels and conduit network.
for(let x=0;x<7100;x+=370){r(x+12,350,336,440,'#1a2d43');c.strokeStyle='#3b5769';c.strokeRect(x+12,350,336,440);r(x+32,390,3,290,'#38525a');r(x+40,390,2,290,'#192e35');r(x+285,390,13,130,'#31454b');r(x+289,400,4,60,'#6cc4ba');text('HX / '+String(x/370|0).padStart(2,'0'),x+55,760,11,'#3b626b');for(let j=0;j<5;j++)r(x+58+j*35,710,20,3,'#29444c');}
for(let x=200;x<7100;x+=720){r(x,280,170,7,'#718784');r(x+22,287,126,5,'#b9e4d1');for(let j=0;j<6;j++){r(x+20-j*8,294+j*16,126+j*16,2,'#31576a')}}

// Repeating tiles, pistons and pixel-dithered reactor windows.
for(let x=Math.floor(cam.x/384)*384;x<cam.x+1180;x+=384){
 r(x+50,440,246,152,'#101426');r(x+54,444,238,144,'#576b83');r(x+58,448,230,136,'#203950');
 for(let row=0;row<8;row++)for(let col=0;col<14;col++){let px=x+62+col*16,py=452+row*16;r(px,py,12,12,(row+col)%3?'#294b63':'#355e72');if((row*3+col)%7===0)r(px+2,py+2,6,2,'#507f8b')}
 r(x+60,512,228,4,'#182138');r(x+170,448,6,136,'#101426');
 r(x+310,370,22,384,'#101426');r(x+312,370,16,380,'#576b83');r(x+316,370,4,380,'#94b3be');
 for(let y=382;y<750;y+=80){r(x+306,y,30,12,'#303b55');r(x+308,y,26,4,'#94b3be')}
 r(x+64,626,120,66,'#101426');r(x+68,630,112,58,'#303b55');for(let y=634;y<682;y+=8){r(x+74,y,100,2,'#576b83')}
 r(x+218,632,58,52,'#101426');r(x+222,636,50,44,'#576b83');r(x+230,642,34,20,'#101426');r(x+234,646,26,4,'#67e6da');for(let k=0;k<3;k++)r(x+232+k*10,668,6,4,k===Math.floor(t*2)%3?'#ffce69':'#b9572a');
}
for(const s of [...g.level.platforms,...g.level.moving]){
 if(s.x+s.w<cam.x||s.x>cam.x+W)continue;
 r(s.x,s.y,s.w,s.h,'#182138');r(s.x,s.y,s.w,4,'#e7f1cf');r(s.x,s.y+4,s.w,4,'#94b3be');r(s.x,s.y+8,s.w,6,'#576b83');r(s.x,s.y+14,s.w,4,'#101426');
 if(s.oneWay){r(s.x+4,s.y+16,s.w-8,6,'#b9572a');for(let x=s.x+8;x<s.x+s.w-8;x+=20){r(x,s.y+16,8,4,s.baseY?'#67e6da':'#ffce69')}if(s.baseY){line(s.x+s.w/2,s.baseY-s.range-30,s.x+s.w/2,s.baseY+s.range+40,'#576b83',4)}}
 else for(let x=s.x+4;x<s.x+s.w-20;x+=64){const width=Math.min(56,s.x+s.w-x-4);r(x,s.y+20,width,60,'#576b83');r(x+2,s.y+22,width-4,4,'#94b3be');r(x+4,s.y+26,width-8,46,'#303b55');r(x+8,s.y+30,width-16,4,'#576b83');r(x+8,s.y+34,width-16,30,'#3b4c65');r(x+10,s.y+36,width-20,2,'#627d8d');r(x+4,s.y+70,width-8,4,'#101426');for(const dx of [3,width-7]){r(x+dx,s.y+26,4,4,'#e7f1cf');r(x+dx,s.y+64,4,4,'#94b3be')}for(let row=0;row<4;row++){r(x+4,s.y+86+row*12,width-8,4,'#303b55');r(x+8,s.y+90+row*12,width-16,2,'#576b83')}}
}

for(const belt of g.level.conveyors){r(belt.x,belt.y-3,belt.w,8,'#17252a');for(let x=belt.x;x<belt.x+belt.w-10;x+=26)r(x+(t*40*belt.dir)%20,belt.y-3,12,4,'#c69a57')}
for(const h of g.level.hazards){const on=(t+(h.x%7))%3.5>1.6;r(h.x,h.y,h.w,10,'#835c34');for(let x=h.x;x<h.x+h.w;x+=18)r(x,h.y,8,5,'#e5ae57');if(on){if(h.type==='steam'){for(let k=0;k<9;k++){c.globalAlpha=.2;c.fillStyle='#a2dedb';c.beginPath();c.arc(h.x+(k*21)%h.w,h.y-((t*65+k*11)%75),10,0,7);c.fill();c.globalAlpha=1}}else for(let x=h.x;x<h.x+h.w;x+=13)line(x,h.y,x+5,h.y-10-Math.sin(t*40+x)*12,'#84fff1',2)}else{text('!',h.x+h.w/2,h.y-15,18,'#f6b757')}}
for(const m of g.level.machines)if(m.hp>0){r(m.x,m.y,m.w,m.h,'#576364');r(m.x+5,m.y+4,m.w-10,8,'#c79250');r(m.x+7,m.y+18,34,34,'#28383c');line(m.x+20,m.y+9,m.x+30,m.y+28,'#fdca74',2);line(m.x+30,m.y+28,m.x+14,m.y+45,'#fdca74',2);text('DRILL',m.x-1,m.y-9,9,'#edbc78')}
for(const gate of g.level.gates){let open=SM.gateOpen(g,gate);r(gate.x-7,gate.y,gate.w+14,12,'#607479');r(gate.x-7,gate.y,6,gate.h,'#50666a');r(gate.x+gate.w+1,gate.y,6,gate.h,'#50666a');if(!open){r(gate.x,gate.y+12,gate.w,gate.h-12,'#c8554533');for(let y=gate.y+20;y<gate.y+gate.h;y+=17)r(gate.x,y,gate.w,3,'#f26959');text(gate.id===2?'3 MODULES REQUIRED':'SECURITY LOCK',gate.x-53,gate.y-15,10,'#dc9b7d')}else r(gate.x-4,gate.y+6,gate.w+8,4,'#79efd0')}
for(let idx=0;idx<g.level.checkpoints.length;idx++){const q=g.level.checkpoints[idx],x=q.x+30,y=q.y+60;r(x,y-65,13,65,'#4a6570');r(x-4,y-65,21,22,idx<=g.checkpointIndex?'#74e4c8':'#4a6c73');text('SYNC',x-10,y-78,9)}
for(const m of g.level.modules)if(!g.modules.has(m.id)){let available=m.id===0?g.encounters.maintenance.done:m.id===1?true:g.encounters.foundry.done;let y=m.y+Math.sin(t*3)*4;c.save();c.translate(m.x+14,y+16);c.rotate(Math.PI/4);c.strokeStyle=available?'#8affdb':'#465b63';c.lineWidth=2;c.strokeRect(-15,-15,30,30);c.fillStyle=available?'#76e8ce':'#3e565e';c.fillRect(-8,-8,16,16);c.restore();text('0'+(m.id+1),m.x+6,y-15,10,available?'#adffe4':'#5b7179')}
for(const item of g.pickups){let color=item.type==='health'?'#91e6b4':item.type==='ammo'?'#eab770':'#79dfe9';let y=item.y+Math.sin(t*4+item.x)*3;r(item.x,y,17,17,'#182c35');c.strokeStyle=color;c.strokeRect(item.x,y,17,17);text(item.type==='health'?'+':item.type==='ammo'?'▪':'ϟ',item.x+3,y+13,14,color)}
for(const e of g.enemies)if(e.hp>0){this.enemy(e,t,r,line);if(e.state==='attack'){text('!',e.x+e.w/2-4,e.y-20,23,'#ffad60');if(e.type==='sentry'){c.setLineDash([8,8]);line(e.x+20,e.y+20,g.player.x+17,g.player.y+20,'#ff625a88',1);c.setLineDash([])}else{c.strokeStyle='#ed7956';c.strokeRect(e.x-40,e.y+e.h-7,e.w+80,7)}}if(e.hp<e.maxHp){r(e.x,e.y-10,e.w,3,'#283b42');r(e.x,e.y-10,e.w*e.hp/e.maxHp,3,'#ef9d65')}}
this.boss(g,t,r,line,text);for(const d of g.debris){if(d.warning>0){line(d.x+10,d.y,d.x+10,850,'#ff795477',1);text('▼',d.x,780,18,'#ffbd60')}else{r(d.x,d.y,d.w,d.h,'#a0a49a');r(d.x+4,d.y+4,7,20,'#5f6a68')}}
const p=g.player;if(p.inv<=0||Math.floor(t*16)%2===0)this.robot(p,t,r,line);if(p.charge>.25){c.strokeStyle=p.charge>.48?'#ffce78':'#6adecd';c.lineWidth=2;c.beginPath();c.arc(p.x+17+p.face*32,p.y+22,13+Math.sin(t*30)*3,0,Math.PI*2);c.stroke()}if(p.drilling){const x=p.x+17+p.face*37;c.strokeStyle='#b8fff0';c.lineWidth=3;for(let k=0;k<4;k++){c.beginPath();c.ellipse(x+p.face*k*7,p.y+24,4,18-k*3,Math.sin(t*40),0,7);c.stroke()}}
for(const b of g.projectiles){let color=b.enemy?'#ff8465':b.rebound?'#ffc467':'#92ffdf';r(b.x-Math.sign(b.vx)*20,b.y+b.h/2-2,24,4,b.enemy?'#fc724044':'#4df5e044');r(b.x,b.y,b.w,b.h,color);r(b.x+2,b.y+2,b.w-4,Math.max(2,b.h-4),'#f4ffe5');if(!b.enemy){line(b.x-8,b.y-4,b.x+6,b.y+b.h+3,color,2)}}
for(const s of g.particles){c.globalAlpha=SM.clamp(s.life,0,1);r(s.x,s.y,s.size,s.size,s.color)}c.globalAlpha=1;
r(6820,650,140,200,'#1b454a');r(6828,658,124,192,'#123037');r(6842,680,96,6,'#79ecd1');text('EXTRACTION',6840,720,12,'#9bffe0');text('→',6860,780,42,'#98ffdc');
c.restore();r(0,0,W,4,'#8199ad');r(0,4,W,2,'#d9e4d2');r(0,H-4,W,4,'#0d1224');
}
robot(p,t,r,line){
 const art=SM.PixelArt, x=Math.round(p.x/2)*2-8, y=Math.round(p.y/2)*2-2;
 const moving=p.grounded&&Math.abs(p.vx)>25,frame=Math.floor(t*12)%4;
 const stride=moving?[0,6,0,-6][frame]:p.grounded?0:5,base=p.y+p.h;
 for(const k of [-1,1]){const lx=p.x+14+k*10,off=stride*k;
 r(lx-7,base-22,14,18,'#101426');r(lx-5,base-22,10,12,'#94b3be');r(lx-3,base-20,6,7,'#e7f1cf');
 r(lx-9+off,base-12,18,12,'#101426');r(lx-7+off,base-11,14,7,'#f28c38');r(lx-7+off,base-11,10,2,'#ffce69');r(lx-9+off,base-4,20,4,'#359bba');r(lx-7+off,base-4,14,2,'#67e6da');}
 art.draw(this.ctx,p.h<50?art.hero.slice(0,15):art.hero,x,y+(moving&&frame%2?2:0),{flip:p.face<0});
 if(p.h<50){r(p.x+1,p.y+29,30,5,'#303b55')}
 if(p.dash>0){for(let i=0;i<3;i++)r(p.x-p.face*(20+i*12),p.y+20+i*6,16,4,i%2?'#67e6da':'#e7f1cf')}
}
enemy(e,t,r,line){
 const art=SM.PixelArt,frame=Math.floor(t*9)%4,flash=e.flash>0;
 if(e.type==='crawler'){for(let k=0;k<3;k++){let x=e.x+k*15,y=e.y+22+(frame+k)%2*2;r(x-3,y,12,9,'#101426');r(x,y,8,5,'#94b3be');r(x,y+5,10,2,'#576b83')}art.draw(this.ctx,art.crawler,e.x-3,e.y,{flip:e.face<0,flash})}
 else if(e.type==='sentry'){art.draw(this.ctx,art.sentry,e.x-3,e.y+2,{flash});if(e.state==='cooldown'){r(e.x+12,e.y+18,12,8,'#67e6da')}r(e.x+15,e.y+40,8,4+frame*2,'#67e6da')}
 else{for(let k of [-1,1]){let x=e.x+26+k*14,off=e.state==='pursue'?(frame%2?2:-2)*k:0;r(x-9,e.y+36,18,34,'#101426');r(x-6,e.y+36,12,23,'#94b3be');r(x-5,e.y+40,8,9,'#e7f1cf');r(x-10+off,e.y+58,24,12,'#576b83');r(x-8+off,e.y+58,20,4,'#94b3be')}art.draw(this.ctx,art.brute,e.x-2,e.y,{flash});if(e.state==='cooldown')r(e.x+22,e.y+20,14,8,'#e7f1cf')}
}

boss(g,t,r,line,text){let b=g.boss,x=b.x,y=b.y;for(let k=0;k<3;k++){r(x-50+k*90,350,24,200,'#526269');r(x-46+k*90,350,7,180,'#b19358')}r(x-60,y-50,270,48,'#4c6267');r(x-52,y-43,252,12,'#bf944e');for(let k=0;k<9;k++)r(x-45+k*28,y-40,11,8,'#263c43');r(x+8,y,170,218,b.flash>0?'#cddbc2':'#556366');r(x+18,y+9,150,195,'#283f46');for(let j=0;j<7;j++){r(x+22,y+18+j*26,12,18,'#94b3be');r(x+148,y+18+j*26,12,18,'#303b55');r(x+24,y+18+j*26,8,4,'#e7f1cf')}for(let j=0;j<5;j++){r(x+40+j*24,y+175,16,22,'#101426');r(x+42+j*24,y+177,12,3,'#f28c38')}r(x+25,y+20,135,25,'#637477');r(x+25,y+160,135,30,'#59696d');let cx=x+90,cy=y+100;const c=this.ctx; c.fillStyle=b.dead?'#283c42':b.state==='exposed'?'#fcbd6a':'#963f37';c.beginPath();c.arc(cx,cy,47,0,7);c.fill();c.strokeStyle='#899b94';c.lineWidth=8;c.stroke();if(!b.dead){for(let k=0;k<6;k++){let a=t*(b.phase===2?2:1)+k*Math.PI/3;line(cx+Math.cos(a)*15,cy+Math.sin(a)*15,cx+Math.cos(a)*39,cy+Math.sin(a)*39,'#ffdd96',4)}r(cx-13,cy-13,26,26,b.state==='exposed'?'#fff2c0':'#341f25')}r(x-80,y+35,57,28,'#83918b');r(x-94,y+48,27,90,'#53666a');r(x-100,y+130,44,28,'#a2a58e');r(x+183,y+30,38,140,'#74817c');r(x-12,y+205,215,20,'#8a9180');text('FORGEMIND / PRIME',x+12,y-15,12,'#d7b279');if(b.dead){for(let k=0;k<4;k++)r(x+30+k*40,y+60+Math.sin(t*5+k)*12,4,18,'#f3a24a')}if(b.active&&b.phase===2){let side=Math.floor(t/3)%2,hx=side?5800:5350;r(hx,842,260,8,t%3>1.6?'#95fff1':'#b77c46');text(t%3>1.6?'HIGH VOLTAGE':'⚠ FLOOR DISCHARGE',hx+40,825,12,'#ffbf72')}}
};

