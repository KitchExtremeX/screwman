SM.Audio=class{
 constructor(){this.enabled=true;this.ctx=null;this.beat=0;this.clock=0}
 init(){if(!this.ctx)this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.ctx.resume()}
 tone(freq=220,duration=.1,type='square',volume=.025,end=80){
  if(!this.enabled||!this.ctx)return;
  const t=this.ctx.currentTime,o=this.ctx.createOscillator(),g=this.ctx.createGain();
  o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(end,t+duration);
  g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
  o.connect(g);g.connect(this.ctx.destination);o.start(t);o.stop(t+duration);
 }
 noise(duration=.04,volume=.012){
  if(!this.enabled||!this.ctx)return;
  const ctx=this.ctx,buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate),data=buffer.getChannelData(0);
  let bits=0x4311;for(let n=0;n<data.length;n++){bits=(bits>>>1)|(((bits^(bits>>>1))&1)<<14);data[n]=(bits&1?1:-1)*(1-n/data.length)}
  const src=ctx.createBufferSource(),gain=ctx.createGain();src.buffer=buffer;gain.gain.value=volume;src.connect(gain);gain.connect(ctx.destination);src.start();
 }
 update(dt){
  this.clock-=dt;if(this.clock>0)return;this.clock+=.125;
  const step=this.beat++%64,bar=Math.floor(step/16),root=[110,130.8128,97.9989,146.8324][bar];
  // Original 120 BPM pulse melody, triangle bass, arpeggio and noise percussion.
  const lead=[12,0,19,0,24,22,19,0,17,0,19,22,19,0,15,0];
  if(step%4===0)this.tone(root,.32,'triangle',.027,root);
  if(step%2===0){const pitch=root*2**(lead[step%16]/12);this.tone(pitch,.11,'square',.009,pitch)}
  const arp=root*2**([0,7,12,7][step%4]/12)*2;this.tone(arp,.055,'triangle',.011,arp);
  if(step%8===0)this.tone(130,.1,'sine',.04,38);
  if(step%8===4)this.noise(.085,.018);else this.noise(.018,.006);
 }
};
