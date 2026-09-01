const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const scenarios = [
  {place:'หลังอาคารเรียน', icon:'🚭', people:['🧑','🧒'], q:'รุ่นพี่ชวนไปหลังอาคาร แล้วบอกให้ลองสูบบุหรี่ไฟฟ้า จะทำอย่างไร?', safe:['✋','ปฏิเสธ แล้วบอกครู'], unsafe:['➡️','เดินตามรุ่นพี่ไป'], why:'ของที่ไม่รู้จักไม่ควรลอง ให้ออกจากจุดนั้นและบอกผู้ใหญ่ที่ไว้ใจ', cat:'refuse', images:{question:'./assets/scenarios/01/question.webp',safe:'./assets/scenarios/01/safe.webp',risk:'./assets/scenarios/01/risk.webp'}},
  {place:'สนามเด็กเล่น', icon:'🍬', people:['🧒','👧'], q:'เพื่อนยื่นของสีสวยคล้ายลูกอม บอกว่ากินแล้วสนุกมาก จะเลือกอะไร?', safe:['🛡️','ไม่รับ และนำไปให้ครูตรวจดู'], unsafe:['😋','รับมากิน เพราะดูเหมือนขนม'], why:'ของกินที่ไม่รู้ที่มาอาจเป็นอันตราย อย่ารับหรือชิมเอง', cat:'unknown'},
  {place:'หน้าโรงเรียน', icon:'🚗', people:['🧔','🧒'], q:'คนที่ไม่รู้จักบอกว่า ผู้ปกครองให้มารับกลับบ้าน เราควรทำอย่างไร?', safe:['📞','อยู่กับครู แล้วโทรตรวจสอบผู้ปกครอง'], unsafe:['🚗','ขึ้นรถไป เพราะเขารู้ชื่อเรา'], why:'อย่าไปกับใครโดยยังไม่ได้ตรวจสอบกับผู้ปกครองหรือครู', cat:'leave'},
  {place:'สวนสาธารณะ', icon:'🐕', people:['🧑','👧'], q:'ผู้ใหญ่ที่ไม่คุ้นเคยชวนไปช่วยหาสัตว์เลี้ยงในที่ลับตาคน จะทำอย่างไร?', safe:['🗣️','ปฏิเสธ แล้วบอกผู้ใหญ่ที่อยู่ใกล้'], unsafe:['🔎','เดินตามไปช่วยหาเพียงสองคน'], why:'เด็กไม่ควรตามคนอื่นไปยังที่ลับตา ให้ปฏิเสธและขอความช่วยเหลือ', cat:'leave'},
  {place:'สนามโรงเรียน', icon:'💊', people:['👧','🧒'], q:'พบเม็ดยาไม่ทราบชนิดตกอยู่บนพื้น ควรทำอย่างไร?', safe:['👩‍🏫','ไม่จับ และรีบบอกครู'], unsafe:['👃','หยิบขึ้นมาดมหรือชิมดู'], why:'ยาไม่ทราบชนิดห้ามจับ ดม หรือชิม ให้ผู้ใหญ่เป็นผู้จัดการ', cat:'unknown'},
  {place:'ห้องกิจกรรม', icon:'🧴', people:['🧒','🧑'], q:'เพื่อนชวนดมของเหลวกลิ่นแรงในภาชนะที่ไม่มีฉลาก เราควรทำอย่างไร?', safe:['🚶','ถอยออกมา แล้วเรียกครู'], unsafe:['👃','ลองดมใกล้ ๆ เพื่อดูว่าคืออะไร'], why:'สารที่ไม่รู้จักอาจเป็นพิษ ต้องถอยห่างและแจ้งผู้ใหญ่', cat:'refuse'},
  {place:'งานกีฬา', icon:'🥤', people:['🧒','👧'], q:'มีคนยื่นแก้วเครื่องดื่มที่เปิดไว้แล้วให้เรา ควรเลือกแบบไหน?', safe:['🥤','ไม่รับ และขอแก้วใหม่จากผู้ดูแล'], unsafe:['😋','ดื่มเลย เพราะกำลังกระหาย'], why:'รับอาหารและเครื่องดื่มจากผู้ดูแลที่ไว้ใจและเห็นว่าเปิดใหม่', cat:'unknown'},
  {place:'ระหว่างกลับบ้าน', icon:'🤝', people:['🧒','🧒'], q:'เพื่อนพูดว่า “ถ้าเป็นเพื่อนกันจริง ต้องลองนี่สิ” เราควรตอบอย่างไร?', safe:['💪','พูดว่า “ไม่” แล้วออกมาหาผู้ใหญ่'], unsafe:['🤐','ยอมลอง เพราะกลัวเพื่อนไม่รัก'], why:'เพื่อนที่ดีต้องเคารพคำปฏิเสธ เรามีสิทธิ์พูดว่าไม่และเดินออกมา', cat:'refuse'},
  {place:'ในชุมชน', icon:'🤫', people:['👧','🧒'], q:'เพื่อนขอให้เก็บเป็นความลับว่าเขาแอบสูบบุหรี่ เราควรทำอย่างไร?', safe:['🗣️','บอกผู้ใหญ่ที่ไว้ใจเพื่อช่วยเพื่อน'], unsafe:['🤐','เก็บเงียบไว้ตามที่เพื่อนขอ'], why:'ความลับที่เกี่ยวกับอันตรายต้องบอกผู้ใหญ่ เพื่อให้ทุกคนปลอดภัย', cat:'tell'},
  {place:'โลกออนไลน์', icon:'📱', people:['🧒','👤'], q:'เพื่อนที่รู้จักทางออนไลน์ชวนไปพบกันตามลำพัง เราควรทำอย่างไร?', safe:['👪','ไม่ไป และนำข้อความให้ผู้ปกครองดู'], unsafe:['📍','แอบไปพบ เพราะคุยกันมานานแล้ว'], why:'อย่านัดพบคนจากออนไลน์ตามลำพัง ต้องให้ผู้ปกครองรับรู้เสมอ', cat:'tell'},
  {place:'ห้องน้ำโรงเรียน', icon:'🆘', people:['👧','🧒'], q:'เพื่อนกินของไม่ทราบชนิดแล้วเวียนหัว เราควรทำอย่างไรทันที?', safe:['🆘','เรียกครูหรือผู้ใหญ่ให้ช่วยทันที'], unsafe:['🙈','พาเพื่อนไปหลบ เพราะกลัวถูกดุ'], why:'เมื่อมีคนเจ็บป่วยจากสิ่งไม่ทราบชนิด ต้องรีบขอความช่วยเหลือทันที', cat:'tell'},
  {place:'ที่บ้าน', icon:'💊', people:['🧒','👩'], q:'เราปวดหัวและเห็นยาวางอยู่บนโต๊ะ ควรทำอย่างไร?', safe:['👪','ถามผู้ปกครองก่อนกินยา'], unsafe:['💊','หยิบกินเองตามจำนวนที่คิดว่าใช่'], why:'เด็กควรกินยาเมื่อผู้ปกครองหรือบุคลากรทางการแพทย์ให้เท่านั้น', cat:'unknown'}
];

scenarios.forEach((item,index)=>{
  const number=String(index+1).padStart(2,'0');
  const base=`./assets/scenarios/${number}`;
  item.panels={question:`${base}/question-panel.webp?v=5`,safe:`${base}/safe-panel.webp?v=5`,risk:`${base}/risk-panel.webp?v=5`};
  item.voice={question:`./assets/voice/q${number}.wav`,safe:`./assets/voice/safe${number}.wav`,risk:`./assets/voice/risk${number}.wav`};
});

const optionVoices=['./assets/voice/option-1.wav','./assets/voice/option-2.wav'];
const feedbackVoices={
  correct:['./assets/voice/correct-1.wav','./assets/voice/correct-2.wav','./assets/voice/correct-3.wav','./assets/voice/correct-4.wav'],
  wrong:['./assets/voice/wrong-1.wav','./assets/voice/wrong-2.wav']
};
const isMobileDevice=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Macintosh/i.test(navigator.userAgent));
const AUDIO_LEVELS={menuMusic:1,gameMusic:isMobileDevice?.2:.35,effect:.8,voice:1};
const GAME_TIMING={feedbackVoice:100,answer:850,bonusAnswer:1350,countdownStep:800};
const HAND_DETECT_INTERVAL_MS=isMobileDevice?66:50;

const state = {
  screen:'loading', mode:'learn', duration:60, timeLeft:60, missionCount:12, sound:true, voice:true,
  running:false, paused:false, index:0, score:0, streak:0, maxStreak:0, safeFirst:0, lives:3,
  retries:0, firstAttempt:true, deck:[], shownOptions:[], locked:false, loadingScenario:false, lastFivePlayed:false,
  stream:null, handLandmarker:null, handLoading:false, handLoadPromise:null, handSeenAt:0, pointerX:null, pointerY:null, lastDetect:0, lastFrame:-1, detectingHand:false, handDetectInterval:HAND_DETECT_INTERVAL_MS,
  hover:null, hoverStarted:0, dwellMs:650, choiceDwellMs:2000, timerId:null, answerTimer:null, advanceTimer:null,
  audio:null, audioBuses:null, audioBuffers:new Map(), effectLoads:new Map(), effectSources:new Map(), musicBuffers:new Map(), musicLoads:new Map(), musicSource:null, musicGain:null, musicName:null, voiceBuffers:new Map(), voiceLoads:new Map(), voiceSource:null, voiceAudio:null, voiceResolve:null, voiceRun:0, startRun:0, testHold:0
};
const scenarioLoads=new Map();
const scenarioImages=new Map();
const voiceBounds=new WeakMap();
let fireworkPool=[];

const params = new URLSearchParams(location.search);
if(params.get('sound') === 'off') state.sound = false;
if(params.get('voice') === 'off') state.voice = false;

let lastViewportValue='';
let viewportChangedAt=performance.now();
let orientationReadyTimer=0;
function syncViewportSize(){
  const viewport=window.visualViewport;
  const width=Math.floor(viewport?.width||document.documentElement.clientWidth||window.innerWidth);
  const height=Math.floor(viewport?.height||document.documentElement.clientHeight||window.innerHeight);
  const value=`${width}x${height}`;
  if(value!==lastViewportValue){lastViewportValue=value;viewportChangedAt=performance.now();}
  document.documentElement.style.setProperty('--app-width',`${width}px`);
  document.documentElement.style.setProperty('--app-height',`${height}px`);
  document.documentElement.dataset.viewport=value;
  return value;
}
function resyncViewport(){
  syncViewportSize();
  requestAnimationFrame(syncViewportSize);
  [80,180,350,700,1100,1600].forEach(delay=>setTimeout(syncViewportSize,delay));
}
function holdForOrientation(){
  if(!isMobileDevice)return;
  document.documentElement.classList.add('orientation-settling');
  clearTimeout(orientationReadyTimer);
  orientationReadyTimer=setTimeout(()=>{
    syncViewportSize();
    document.documentElement.classList.remove('orientation-settling');
  },1000);
}
async function settleViewport(run,timeout=2800){
  const started=performance.now();let previous='',stable=0;
  while(run===state.startRun&&performance.now()-started<timeout){
    const current=syncViewportSize();
    if(current===previous)stable++;else{previous=current;stable=0;}
    const unchangedFor=performance.now()-viewportChangedAt;
    if(stable>=8&&unchangedFor>=800&&window.innerWidth>window.innerHeight)return true;
    await new Promise(resolve=>setTimeout(resolve,80));
  }
  syncViewportSize();return run===state.startRun;
}
syncViewportSize();
window.addEventListener('resize',resyncViewport,{passive:true});
window.addEventListener('orientationchange',()=>{holdForOrientation();resyncViewport();},{passive:true});
window.addEventListener('pageshow',resyncViewport,{passive:true});
document.addEventListener('fullscreenchange',resyncViewport,{passive:true});
screen.orientation?.addEventListener?.('change',()=>{holdForOrientation();resyncViewport();});
window.visualViewport?.addEventListener('resize',syncViewportSize,{passive:true});
window.visualViewport?.addEventListener('scroll',syncViewportSize,{passive:true});

const stage = $('#stage');
const camera = $('#camera');
const menuVideo = $('#menuVideo');
const pointer = $('#handPointer');
const screens = $$('.screen');
const choices = $$('.choice');
const voicePlayer = new Audio();
voicePlayer.preload='auto';voicePlayer.volume=AUDIO_LEVELS.voice;
const voiceUnlockSrc='./assets/audio/silence.wav';
const sounds = {
  menu:new Audio('./assets/audio/menu-music.mp3'),game:new Audio('./assets/audio/game-music.mp3'),
  ui:new Audio('./assets/audio/ui-click.mp3'),hold:new Audio('./assets/audio/choice-hold.mp3'),
  correct:new Audio('./assets/audio/correct.mp3'),wrong:new Audio('./assets/audio/wrong.mp3'),question:new Audio('./assets/audio/question-change.mp3'),
  bonus1:new Audio('./assets/audio/bonus-1.mp3'),bonus2:new Audio('./assets/audio/bonus-2.mp3'),
  combo:new Audio('./assets/audio/combo.mp3'),finish:new Audio('./assets/audio/finish.mp3'),final5:new Audio('./assets/audio/final-5-seconds.mp3')
};
const effectNames=['ui','hold','correct','wrong','question','bonus1','bonus2','combo','finish','final5'];
sounds.menu.loop=true;sounds.menu.volume=AUDIO_LEVELS.menuMusic;
sounds.game.loop=true;sounds.game.volume=AUDIO_LEVELS.gameMusic;
Object.entries(sounds).forEach(([name,audio])=>{audio.preload='auto';if(!['menu','game'].includes(name))audio.volume=AUDIO_LEVELS.effect;});

function shuffle(items){
  const copy = [...items];
  for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}

function setScreen(name){
  state.screen = name;
  screens.forEach(el => el.classList.toggle('active', el.id === `${name}Screen`));
  stage.classList.toggle('menu-scene', ['menu','settings','guide','loading','result'].includes(name));
  stage.classList.toggle('play-scene', name === 'game');
  stage.classList.toggle('camera-scene', name === 'camera'||name === 'countdown');
  if(name==='menu'){menuVideo.play().catch(()=>{});playMusic('menu');}
  else{menuVideo.pause();if(!['game','countdown'].includes(name))stopMusic();}
  if(!['game','camera'].includes(name)) pointer.classList.remove('visible');
}

async function preload(){
  const bar = $('#loadingBar');
  const text = $('#loadingText');
  const assets = ['./assets/menu-bg.png','./assets/fonts/Mali-Regular.ttf','./assets/fonts/Mali-Bold.ttf',voiceUnlockSrc,'./assets/buttons/start.png','./assets/buttons/camera.png','./assets/buttons/settings.png','./assets/buttons/guide.png',sounds.ui.src,sounds.menu.src];
  document.documentElement.dataset.preloadAssetCount=String(assets.length);
  let done = 0;
  await Promise.all(assets.map(src => new Promise(resolve => {
    if(src.endsWith('.png')){const img=new Image();img.onload=img.onerror=resolve;img.src=src;}
    else fetch(src).then(resolve).catch(resolve);
  }).then(()=>{done++;bar.style.width=`${Math.round(done/assets.length*100)}%`;text.textContent=`เตรียมพร้อมแล้ว ${done}/${assets.length}`;})));
  await Promise.all([prepareEffectAudio(['ui']),prepareMusicAudio(['menu'])]);
  await new Promise(r=>setTimeout(r,120));
  setScreen('menu');
  const warmGameplay=()=>{void prepareEffectAudio();void prepareMusicAudio(['game']);void loadHandModel();void prepareSharedVoiceAudio();};
  if('requestIdleCallback'in window)requestIdleCallback(warmGameplay,{timeout:1400});else setTimeout(warmGameplay,350);
}

function ensureAudio(){
  if(!state.audio){
    state.audio = new (window.AudioContext || window.webkitAudioContext)();
    const master=state.audio.createGain(),music=state.audio.createGain(),effect=state.audio.createGain(),voice=state.audio.createGain();
    master.gain.value=1;music.gain.value=1;effect.gain.value=1;voice.gain.value=1;
    music.connect(master);effect.connect(master);voice.connect(master);master.connect(state.audio.destination);
    state.audioBuses={master,music,effect,voice};
    state.audio.onstatechange=()=>{
      document.documentElement.dataset.audioState=state.audio.state;
      if(state.audio.state==='running')$('#muteButton').classList.remove('needs-audio');
      else if(state.sound&&state.screen==='game')$('#muteButton').classList.add('needs-audio');
    };
  }
  if(state.audio.state === 'suspended') state.audio.resume().catch(()=>{});
  return state.audio;
}

function wakeAudio(){
  if(!state.sound)return Promise.resolve(false);
  const context=ensureAudio();
  sounds.menu.muted=false;sounds.game.muted=false;
  sounds.menu.volume=AUDIO_LEVELS.menuMusic;sounds.game.volume=AUDIO_LEVELS.gameMusic;
  effectNames.forEach(name=>{sounds[name].muted=false;sounds[name].volume=AUDIO_LEVELS.effect;});
  const ready=context.state==='suspended'?context.resume().catch(()=>{}):Promise.resolve();
  return Promise.resolve(ready).then(()=>{document.documentElement.dataset.audioState=context.state;return context.state==='running';});
}

function resetAudioOutput(){
  stopMusic();stopEffects();
  return wakeAudio();
}

function prepareEffectAudio(names=effectNames){
  ensureAudio();
  return Promise.all(names.map(name=>{
    if(state.audioBuffers.has(name))return Promise.resolve(state.audioBuffers.get(name));
    if(state.effectLoads.has(name))return state.effectLoads.get(name);
    const load=fetch(sounds[name].src).then(response=>response.arrayBuffer()).then(data=>state.audio.decodeAudioData(data)).then(buffer=>{state.audioBuffers.set(name,buffer);return buffer;}).catch(()=>null).finally(()=>state.effectLoads.delete(name));
    state.effectLoads.set(name,load);return load;
  }));
}

function prepareMusicAudio(names=['menu','game']){
  return Promise.all(names.map(name=>{
    if(state.musicBuffers.has(name))return Promise.resolve(state.musicBuffers.get(name));
    if(state.musicLoads.has(name))return state.musicLoads.get(name);
    const load=fetch(sounds[name].src).then(response=>response.arrayBuffer()).then(data=>ensureAudio().decodeAudioData(data)).then(buffer=>{state.musicBuffers.set(name,buffer);return buffer;}).catch(()=>null).finally(()=>state.musicLoads.delete(name));
    state.musicLoads.set(name,load);return load;
  }));
}

function stopSound(audio,reset=true){
  audio.pause();if(reset){try{audio.currentTime=0;}catch{}}
}

function playSound(audio,restart=true){
  if(!state.sound)return Promise.resolve(false);
  if(restart){try{audio.currentTime=0;}catch{}}
  return audio.play().then(()=>true).catch(()=>false);
}

function playEffect(name,restart=true){
  const audio=sounds[name];if(!audio||!state.sound)return;
  ensureAudio();
  if(restart)stopEffect(name);
  const buffer=state.audioBuffers.get(name);
  if(state.audio?.state==='running'&&buffer){
    const source=state.audio.createBufferSource(),gain=state.audio.createGain();
    source.buffer=buffer;gain.gain.value=AUDIO_LEVELS.effect;source.connect(gain).connect(state.audioBuses.effect);
    state.effectSources.set(name,source);source.onended=()=>{if(state.effectSources.get(name)===source)state.effectSources.delete(name);};source.start();
    document.documentElement.dataset.lastEffect=name;document.documentElement.dataset.lastEffectMode='webaudio';document.documentElement.dataset.lastEffectAt=String(Date.now());return;
  }
  void prepareEffectAudio();playSound(audio,restart);
  document.documentElement.dataset.lastEffect=name;document.documentElement.dataset.lastEffectMode='media';document.documentElement.dataset.lastEffectAt=String(Date.now());
}

function stopEffect(name){
  const source=state.effectSources.get(name);if(source){try{source.stop();}catch{}state.effectSources.delete(name);}
  const audio=sounds[name];if(audio)stopSound(audio);
}

function stopEffects(){
  effectNames.forEach(stopEffect);
}

function startBufferedMusic(name){
  const context=ensureAudio(),buffer=state.musicBuffers.get(name);
  if(context.state!=='running'||!buffer)return false;
  if(state.musicName===name&&state.musicSource)return true;
  stopMusic();
  const source=context.createBufferSource(),gain=context.createGain();
  source.buffer=buffer;source.loop=true;gain.gain.value=name==='menu'?AUDIO_LEVELS.menuMusic:AUDIO_LEVELS.gameMusic;
  source.connect(gain).connect(state.audioBuses.music);state.musicSource=source;state.musicGain=gain;state.musicName=name;
  document.documentElement.dataset.musicState=`${name}:webaudio`;
  source.onended=()=>{if(state.musicSource===source){state.musicSource=null;state.musicGain=null;state.musicName=null;}};
  source.start();return true;
}

function playMusic(name){
  const target=sounds[name];if(!target||!state.sound)return;
  const stillNeeded=()=>name==='menu'?state.screen==='menu':state.screen==='game'&&!state.paused;
  void wakeAudio().then(()=>{
    if(!state.sound||!stillNeeded())return;
    if(startBufferedMusic(name))return;
    void prepareMusicAudio().then(()=>{if(state.sound&&stillNeeded()&&!startBufferedMusic(name))void playSound(target,false);});
  });
}

function stopMusic(){
  if(state.musicSource){try{state.musicSource.stop();}catch{}}
  state.musicSource=null;state.musicGain=null;state.musicName=null;delete document.documentElement.dataset.musicState;stopSound(sounds.menu);stopSound(sounds.game);
}

function syncAudioForScreen(){
  if(!state.sound){stopMusic();stopEffects();return;}
  if(state.screen==='menu')playMusic('menu');
  else if(state.screen==='game'&&!state.paused)playMusic('game');
}

function tone(kind='tap'){
  if(!state.sound) return;
  if(kind==='tap'){playEffect('ui');return;}
  ensureAudio();
  const ctx=state.audio, now=ctx.currentTime, gain=ctx.createGain(), osc=ctx.createOscillator();
  const table={tap:[440,.07,.12],good:[660,.18,.2],wrong:[185,.2,.24],finish:[784,.35,.22]};
  const [freq,len,vol]=table[kind]||table.tap;
  osc.type=kind==='wrong'?'sawtooth':'sine';osc.frequency.setValueAtTime(freq,now);
  if(kind==='good')osc.frequency.exponentialRampToValueAtTime(990,now+len);
  gain.gain.setValueAtTime(vol,now);gain.gain.exponentialRampToValueAtTime(.001,now+len);
  osc.connect(gain).connect(state.audioBuses.effect);osc.start(now);osc.stop(now+len);
}

function stopVoice(){
  state.voiceRun++;
  const resolve=state.voiceResolve;state.voiceResolve=null;
  if(state.voiceSource){try{state.voiceSource.stop();}catch{}state.voiceSource=null;}
  if(state.voiceAudio){state.voiceAudio.onended=null;state.voiceAudio.onerror=null;state.voiceAudio.pause();try{state.voiceAudio.currentTime=0;}catch{}state.voiceAudio=null;}
  if(resolve)resolve(false);
  speechSynthesis?.cancel();
}

function loadVoiceBuffer(src){
  if(state.voiceBuffers.has(src))return Promise.resolve(state.voiceBuffers.get(src));
  if(state.voiceLoads.has(src))return state.voiceLoads.get(src);
  const load=fetch(src).then(response=>response.arrayBuffer()).then(data=>ensureAudio().decodeAudioData(data)).then(buffer=>{state.voiceBuffers.set(src,buffer);return buffer;}).catch(()=>null).finally(()=>state.voiceLoads.delete(src));
  state.voiceLoads.set(src,load);return load;
}

function getVoiceBounds(buffer){
  if(voiceBounds.has(buffer))return voiceBounds.get(buffer);
  const threshold=.012,step=Math.max(1,Math.floor(buffer.sampleRate/400)),length=buffer.length;
  let first=0,last=length-1,found=false;
  for(let i=0;i<length;i+=step){
    for(let channel=0;channel<buffer.numberOfChannels;channel++)if(Math.abs(buffer.getChannelData(channel)[i])>=threshold){first=i;found=true;break;}
    if(found)break;
  }
  found=false;
  for(let i=length-1;i>=0;i-=step){
    for(let channel=0;channel<buffer.numberOfChannels;channel++)if(Math.abs(buffer.getChannelData(channel)[i])>=threshold){last=i;found=true;break;}
    if(found)break;
  }
  const padding=Math.floor(buffer.sampleRate*.035);
  const bounds={start:Math.max(0,first-padding)/buffer.sampleRate,duration:Math.max(.08,Math.min(length-1,last+padding)-Math.max(0,first-padding))/buffer.sampleRate};
  voiceBounds.set(buffer,bounds);return bounds;
}

function prepareSharedVoiceAudio(){
  return Promise.all([...optionVoices,...feedbackVoices.correct,...feedbackVoices.wrong].map(loadVoiceBuffer));
}

function loadScenarioImage(src){
  if(scenarioImages.has(src))return Promise.resolve(scenarioImages.get(src));
  return new Promise(resolve=>{
    const image=new Image();scenarioImages.set(src,image);
    const done=()=>{image.onload=null;image.onerror=null;const decoded=image.decode?.();if(decoded?.then)decoded.catch(()=>{}).finally(()=>resolve(image));else resolve(image);};
    image.onload=done;image.onerror=done;image.src=src;
  });
}

function prepareScenarioAssets(item){
  if(!item)return Promise.resolve(false);
  const key=item.panels.question;
  if(scenarioLoads.has(key))return scenarioLoads.get(key);
  const task=Promise.all([...Object.values(item.panels).map(loadScenarioImage),...Object.values(item.voice).map(loadVoiceBuffer)]).then(()=>{
    document.documentElement.dataset.preparedScenario=key;return true;
  }).catch(()=>false);
  scenarioLoads.set(key,task);return task;
}

function trimScenarioWindow(){
  const keepItems=state.deck.slice(state.index,state.index+2),keepPanels=new Set(keepItems.flatMap(item=>Object.values(item.panels))),keepVoices=new Set(keepItems.flatMap(item=>Object.values(item.voice))),keepKeys=new Set(keepItems.map(item=>item.panels.question));
  for(const key of scenarioImages.keys())if(!keepPanels.has(key))scenarioImages.delete(key);
  for(const key of scenarioLoads.keys())if(!keepKeys.has(key))scenarioLoads.delete(key);
  for(const key of state.voiceBuffers.keys())if(/^\.\/assets\/voice\/(?:q|safe|risk)\d+\.wav$/.test(key)&&!keepVoices.has(key))state.voiceBuffers.delete(key);
  document.documentElement.dataset.scenarioWindow=String(keepItems.length);
}

function resetScenarioWindow(){
  scenarioLoads.clear();scenarioImages.clear();
  for(const key of state.voiceBuffers.keys())if(/^\.\/assets\/voice\/(?:q|safe|risk)\d+\.wav$/.test(key))state.voiceBuffers.delete(key);
}

function scheduleScenario(index){
  const item=state.deck[index];if(!item)return;
  const warm=()=>void prepareScenarioAssets(item);
  if('requestIdleCallback'in window)requestIdleCallback(warm,{timeout:900});else setTimeout(warm,80);
}

function primeVoiceAudio(){
  if(!state.voice)return Promise.resolve(false);
  voicePlayer.pause();voicePlayer.src=voiceUnlockSrc;voicePlayer.volume=AUDIO_LEVELS.voice;voicePlayer.muted=false;
  const attempt=voicePlayer.play();
  if(!attempt)return Promise.resolve(false);
  return attempt.then(()=>{
    if(voicePlayer.src.includes('/silence.wav')){voicePlayer.pause();voicePlayer.currentTime=0;}
    return true;
  }).catch(()=>false);
}

async function playVoiceClip(src,run){
  const buffer=await loadVoiceBuffer(src);
  if(!state.voice||run!==state.voiceRun||state.screen!=='game'||state.paused)return false;
  const context=ensureAudio();
  if(buffer&&context.state==='running')return new Promise(resolve=>{
    const source=context.createBufferSource(),gain=context.createGain();let settled=false;
    const finish=played=>{if(settled)return;settled=true;if(state.voiceSource===source){state.voiceSource=null;state.voiceResolve=null;}resolve(played);};
    const bounds=getVoiceBounds(buffer);
    source.buffer=buffer;gain.gain.value=AUDIO_LEVELS.voice;source.connect(gain).connect(state.audioBuses.voice);
    state.voiceSource=source;state.voiceResolve=finish;source.onended=()=>finish(true);
    document.documentElement.dataset.voiceState='webaudio';source.start(0,bounds.start,bounds.duration);
  });
  return new Promise(resolve=>{
    if(!state.voice||run!==state.voiceRun||state.screen!=='game'||state.paused){resolve(false);return;}
    const audio=voicePlayer;let settled=false;
    const finish=played=>{if(settled)return;settled=true;audio.onended=null;audio.onerror=null;if(state.voiceAudio===audio){state.voiceAudio=null;state.voiceResolve=null;}resolve(played);};
    audio.pause();audio.src=src;audio.preload='auto';audio.volume=AUDIO_LEVELS.voice;audio.muted=false;
    state.voiceAudio=audio;state.voiceResolve=finish;audio.onended=()=>finish(true);audio.onerror=()=>finish(false);
    let attempts=0;
    const start=()=>audio.play().then(()=>{document.documentElement.dataset.voiceState='media';}).catch(()=>{
      if(attempts++<2&&run===state.voiceRun&&state.voice&&state.screen==='game'){recoverAudio();setTimeout(start,100);return;}
      finish(false);
    });
    start();
  });
}

async function playVoiceSequence(paths,{delay=0,gap=45}={}){
  stopVoice();const run=state.voiceRun;
  if(!state.voice)return false;
  if(delay){await new Promise(resolve=>setTimeout(resolve,delay));if(run!==state.voiceRun)return false;}
  for(let index=0;index<paths.length;index++){
    const src=paths[index];
    if(run!==state.voiceRun||!state.voice)return false;
    await playVoiceClip(src,run);
    if(run!==state.voiceRun)return false;
    if(gap&&index<paths.length-1)await new Promise(resolve=>setTimeout(resolve,gap));
  }
  return run===state.voiceRun;
}

async function startCamera(){
  if(state.stream?.active) return true;
  if(!navigator.mediaDevices?.getUserMedia){$('#cameraStatus').textContent='อุปกรณ์นี้ไม่รองรับกล้องผ่านหน้านี้';return false;}
  try{
    const size=isMobileDevice?{width:{ideal:640,max:960},height:{ideal:360,max:540}}:{width:{ideal:960,max:1280},height:{ideal:540,max:720}};
    state.stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:'user',...size,frameRate:{ideal:24,max:30}}});
    camera.srcObject=state.stream;await camera.play();stage.classList.add('camera-on');
    $('#cameraStatus').textContent='เปิดกล้องแล้ว กำลังเตรียมระบบตรวจมือ';
    void loadHandModel();return true;
  }catch(err){
    $('#cameraStatus').textContent='เปิดกล้องไม่ได้ ยังเล่นด้วยการแตะหน้าจอได้';
    $('#trackingText').textContent='แตะคำตอบเพื่อเล่น';return false;
  }
}

function stopCamera(){
  state.stream?.getTracks().forEach(t=>t.stop());state.stream=null;state.detectingHand=false;camera.srcObject=null;stage.classList.remove('camera-on');
}

function loadHandModel(){
  if(state.handLandmarker)return Promise.resolve(true);
  if(state.handLoadPromise)return state.handLoadPromise;
  state.handLoading=true;
  document.documentElement.dataset.handTracking='loading';
  state.handLoadPromise=(async()=>{try{
    const {FilesetResolver,HandLandmarker}=await import('./assets/vendor/mediapipe/vision_bundle.mjs');
    const vision=await FilesetResolver.forVisionTasks('./assets/vendor/mediapipe/wasm');
    const common={baseOptions:{modelAssetPath:'./assets/vendor/mediapipe/models/hand_landmarker.task',delegate:'GPU'},runningMode:'VIDEO',numHands:2,minHandDetectionConfidence:.35,minHandPresenceConfidence:.35,minTrackingConfidence:.35};
    try{state.handLandmarker=await HandLandmarker.createFromOptions(vision,common);}
    catch{state.handLandmarker=await HandLandmarker.createFromOptions(vision,{...common,baseOptions:{...common.baseOptions,delegate:'CPU'}});}
    document.documentElement.dataset.handTracking='ready';
    $('#cameraStatus').textContent='พร้อมแล้ว ชี้ค้างบนคำตอบให้ครบ 2 วินาที';
    $('#trackingText').textContent='ชี้ค้าง 2 วินาที หรือแตะคำตอบ';
    return true;
  }catch(err){
    console.warn('Hand tracking unavailable',err);document.documentElement.dataset.handTracking='fallback';$('#cameraStatus').textContent='ตรวจมือไม่สำเร็จ ใช้การแตะหน้าจอแทนได้';return false;
  }finally{state.handLoading=false;state.handLoadPromise=null;}})();
  return state.handLoadPromise;
}

function updatePointer(x,y,now){
  pointer.style.transform=`translate3d(${x}px,${y}px,0)`;pointer.classList.add('visible');
  if(state.screen==='camera'){
    const r=$('#testTarget').getBoundingClientRect();
    const inside=x>=r.left-stage.getBoundingClientRect().left&&x<=r.right-stage.getBoundingClientRect().left&&y>=r.top-stage.getBoundingClientRect().top&&y<=r.bottom-stage.getBoundingClientRect().top;
    if(inside){if(!state.testHold)state.testHold=now;const p=Math.min(1,(now-state.testHold)/state.dwellMs);$('#testTarget i').style.clipPath=`inset(${100-p*100}% 0 0)`;if(p>=1){$('#testTarget').classList.add('success');$('#testTarget span').textContent='ตรวจจับมือสำเร็จ!';tone('good');state.testHold=now+999999;}}
    else{state.testHold=0;$('#testTarget i').style.clipPath='inset(100% 0 0)';}
    return;
  }
  if(state.screen!=='game'||state.paused||state.locked)return;
  const stageRect=stage.getBoundingClientRect();
  const hit=choices.findIndex(c=>{const r=c.getBoundingClientRect();return x>=r.left-stageRect.left&&x<=r.right-stageRect.left&&y>=r.top-stageRect.top&&y<=r.bottom-stageRect.top;});
  if(hit<0){clearHover();return;}
  if(state.hover!==hit){clearHover();state.hover=hit;state.hoverStarted=now;choices[hit].classList.add('hovered');playEffect('hold');}
  const p=Math.min(1,(now-state.hoverStarted)/state.choiceDwellMs);
  choices[hit].style.setProperty('--hold',`${p*360}deg`);
  choices[hit].style.setProperty('--hold-scale',String(1.02+p*.16));
  if(p>=1){clearHover();selectChoice(hit,'hand');}
}

function clearHover(){
  stopEffect('hold');choices.forEach(c=>{c.classList.remove('hovered');c.style.setProperty('--hold','0deg');c.style.setProperty('--hold-scale','1');});state.hover=null;state.hoverStarted=0;
}

function nearestHand(hands=[]){
  return hands.reduce((nearest,landmarks)=>{
    const wrist=landmarks[0],indexBase=landmarks[5],middleBase=landmarks[9],pinkyBase=landmarks[17];
    if(!wrist||!indexBase||!middleBase||!pinkyBase)return nearest;
    const palmLength=Math.hypot(middleBase.x-wrist.x,middleBase.y-wrist.y);
    const palmWidth=Math.hypot(pinkyBase.x-indexBase.x,pinkyBase.y-indexBase.y);
    const proximity=palmLength*palmWidth;
    return !nearest||proximity>nearest.proximity?{landmarks,proximity}:nearest;
  },null)?.landmarks;
}

async function trackingLoop(now){
  if(state.handLandmarker&&state.stream?.active&&!state.paused&&!state.detectingHand&&now-state.lastDetect>=state.handDetectInterval&&camera.readyState>=2&&camera.currentTime!==state.lastFrame){
    state.lastDetect=now;state.lastFrame=camera.currentTime;state.detectingHand=true;
    const detectStarted=performance.now();
    try{
      const result=state.handLandmarker.detectForVideo(camera,performance.now());
      const tip=nearestHand(result.landmarks)?.[8];
      if(tip){
        state.handSeenAt=now;
        const r=stage.getBoundingClientRect(),nextX=(1-tip.x)*r.width,nextY=tip.y*r.height;
        state.pointerX=state.pointerX===null?nextX:state.pointerX*.48+nextX*.52;
        state.pointerY=state.pointerY===null?nextY:state.pointerY*.48+nextY*.52;
        updatePointer(state.pointerX,state.pointerY,now);
        $('#trackingDot').classList.add('ready');
        $('#trackingText').textContent='พบมือแล้ว · ชี้ค้าง 2 วินาที';
      }else if(now-state.handSeenAt>350){pointer.classList.remove('visible');clearHover();state.pointerX=null;state.pointerY=null;$('#trackingDot').classList.remove('ready');if(now-state.handSeenAt>1200)$('#trackingText').textContent='ยกมือให้เห็นทั้งฝ่ามือ · หันฝ่ามือเข้ากล้อง';}
    }catch{}finally{
      const detectCost=performance.now()-detectStarted;
      state.handDetectInterval=detectCost>52?Math.min(110,state.handDetectInterval+8):Math.max(HAND_DETECT_INTERVAL_MS,state.handDetectInterval-2);
      document.documentElement.dataset.handDetectMs=String(Math.round(state.handDetectInterval));state.detectingHand=false;
    }
  }
  requestAnimationFrame(trackingLoop);
}

async function showScenario(){
  clearAnswerTimers();resetAnswerEffects();stopVoice();
  const feedbackEl=$('#feedback');clearTimeout(feedbackEl._timer);feedbackEl.className='feedback';feedbackEl.textContent='';
  ['hold','correct','question','bonus1','bonus2','combo'].forEach(stopEffect);
  state.locked=true;state.loadingScenario=true;state.firstAttempt=true;clearHover();
  const scenarioIndex=state.index,item=state.deck[scenarioIndex];
  await prepareScenarioAssets(item);
  state.loadingScenario=false;if(!state.running||state.index!==scenarioIndex)return;
  const board=$('#scenarioBoardImage');
  board.src=item.panels.question;board.alt=item.q;
  $('#progressValue').textContent=`${state.index+1}/${state.deck.length}`;
  $('#questionText').textContent=item.q;$('#scenarioPlace').textContent=item.place;
  const opts=shuffle([{safe:true,icon:item.safe[0],text:item.safe[1]},{safe:false,icon:item.unsafe[0],text:item.unsafe[1]}]);
  state.shownOptions=opts;
  choices.forEach((c,i)=>{
    c.classList.remove('pending','correct','wrong');c.disabled=false;c.dataset.optionNumber=String(i+1);c.dataset.safe=String(opts[i].safe);c.setAttribute('aria-label',`ตัวเลือกที่ ${i+1} ${opts[i].text}`);
    c.querySelector('.choice-text').textContent=opts[i].text;
    const image=c.querySelector('.choice-slice');image.src=opts[i].safe?item.panels.safe:item.panels.risk;image.alt=opts[i].text;
  });
  state.locked=false;
  if(state.index>0)playEffect('question');
  playVoiceSequence([item.voice.question,optionVoices[0],opts[0].safe?item.voice.safe:item.voice.risk,optionVoices[1],opts[1].safe?item.voice.safe:item.voice.risk]);
  updateHud();scheduleScenario(state.index+1);trimScenarioWindow();
}

function updateHud(){
  $('#scoreValue').textContent=state.score;$('#streakValue').textContent=state.streak;
  $('#timeValue').textContent=state.mode==='timed'?Math.max(0,Math.ceil(state.timeLeft)):'∞';
  const hearts=$('#heartValue');hearts.innerHTML=Array.from({length:3},(_,index)=>`<span class="${index<state.lives?'full':'empty'}">♥</span>`).join('');hearts.setAttribute('aria-label',`เหลือ ${state.lives} หัวใจ`);
}

function feedback(text,type,duration=1150){
  const el=$('#feedback');el.textContent=text;el.className=`feedback ${type} show`;
  clearTimeout(el._timer);el._timer=setTimeout(()=>{el.className='feedback';el.textContent='';},duration);
}

function clearAnswerTimers(){
  clearTimeout(state.answerTimer);clearTimeout(state.advanceTimer);
  state.answerTimer=null;state.advanceTimer=null;
}

function resetAnswerEffects(){
  stage.classList.remove('wrong-impact');$('#dangerFlash').classList.remove('show');
  fireworkPool.forEach(burst=>{burst.classList.remove('playing','big');burst.hidden=true;});$('#effectsLayer').classList.remove('active');
  choices.forEach(c=>{c.classList.remove('pending','correct','wrong');c.disabled=false;});
}

function ensureFireworkPool(){
  if(fireworkPool.length)return fireworkPool;
  const host=$('#fireworks'),colors=['#ffe55f','#ff6f91','#70e0ff','#9cf06c','#c787ff','#ffffff'];
  fireworkPool=Array.from({length:5},(_,burstIndex)=>{
    const burst=document.createElement('i');burst.className='firework-burst';burst.hidden=true;
    for(let n=0;n<30;n++){
      const spark=document.createElement('b');if(n%3===0)spark.className='star';spark.style.setProperty('--spark',colors[(n+burstIndex)%colors.length]);burst.appendChild(spark);
    }
    host.appendChild(burst);return burst;
  });
  return fireworkPool;
}

function launchFireworks(big=false){
  const bursts=ensureFireworkPool();$('#effectsLayer').classList.add('active');
  const colors=['#ffe55f','#ff6f91','#70e0ff','#9cf06c','#c787ff','#ffffff'];
  const positions=big?[[18,23],[51,18],[82,28],[32,58],[70,62]]:[[28,35],[50,22],[72,35]];
  positions.forEach(([x,y],burstIndex)=>{
    const burst=bursts[burstIndex];burst.hidden=false;burst.className=`firework-burst${big?' big':''}`;
    burst.style.setProperty('--x',`${x}%`);burst.style.setProperty('--y',`${y}%`);
    const sparkCount=big?30:16;
    [...burst.children].forEach((spark,n)=>{
      spark.hidden=n>=sparkCount;if(n>=sparkCount)return;
      const angle=(Math.PI*2*n/sparkCount)+(burstIndex*.19)+(big?(Math.random()-.5)*.16:0),distance=big?110+Math.random()*150:55+(n%4)*13;
      spark.style.setProperty('--dx',`${Math.cos(angle)*distance}px`);
      spark.style.setProperty('--dy',`${Math.sin(angle)*distance+(big?38:0)}px`);
      spark.style.setProperty('--spark',colors[(n+burstIndex)%colors.length]);
      spark.style.setProperty('--delay',`${burstIndex*.08+(n%3)*.012}s`);
      if(big){const size=7+Math.random()*8;spark.style.width=`${size}px`;spark.style.height=`${size+(n%2)*5}px`;}
      else{spark.style.width='11px';spark.style.height='20px';}
    });
    void burst.offsetWidth;burst.classList.add('playing');
  });
  setTimeout(()=>{$('#effectsLayer').classList.remove('active');bursts.forEach(burst=>{burst.classList.remove('playing','big');burst.hidden=true;});},big?1900:1250);
}

function selectChoice(index,source='touch'){
  if(state.screen!=='game'||state.paused||state.locked)return;
  ensureAudio();const opt=state.shownOptions[index],item=state.deck[state.index];
  state.locked=true;clearHover();choices.forEach(c=>c.disabled=true);
  const answerStarted=performance.now();let answerVoice;
  if(opt.safe){
    state.streak++;const isBonus=state.streak%3===0,gained=isBonus?200:100;
    choices[index].classList.add('correct');playEffect('correct');launchFireworks(isBonus);
    state.score+=gained;state.maxStreak=Math.max(state.maxStreak,state.streak);state.safeFirst++;
    if(isBonus){playEffect('combo');feedback('โบนัสใหญ่! x2  +200','bonus',1450);}
    else{if(state.streak%3===2)playEffect('bonus1');feedback('ปลอดภัย! +100 คะแนน','good');}
    answerVoice=playVoiceSequence([feedbackVoices.correct[Math.floor(Math.random()*feedbackVoices.correct.length)]],{delay:GAME_TIMING.feedbackVoice,gap:0});
  }else{
    choices[index].classList.add('wrong');stage.classList.add('wrong-impact');$('#dangerFlash').classList.add('show');playEffect('wrong');
    state.retries++;state.streak=0;state.lives=Math.max(0,state.lives-1);$('.hearts-item').classList.remove('heart-hit');void $('.hearts-item').offsetWidth;$('.hearts-item').classList.add('heart-hit');
    feedback('ไม่ปลอดภัย','try');answerVoice=playVoiceSequence([feedbackVoices.wrong[Math.floor(Math.random()*feedbackVoices.wrong.length)]],{delay:GAME_TIMING.feedbackVoice,gap:0});
  }
  updateHud();
  const bonusRound=opt.safe&&state.streak%3===0;
  const minimumDelay=bonusRound?GAME_TIMING.bonusAnswer:GAME_TIMING.answer,answeredIndex=state.index;
  Promise.resolve(answerVoice).then(()=>{
    if(!state.running||state.index!==answeredIndex)return;
    state.advanceTimer=setTimeout(()=>{state.index++;if(state.lives<=0||state.index>=state.deck.length)finishGame();else void showScenario();},Math.max(0,minimumDelay-(performance.now()-answerStarted)));
  });
}

async function runStartCountdown(run){
  const number=$('#countdownValue');
  for(const value of [4,3,2,1]){
    if(run!==state.startRun)return false;
    syncViewportSize();
    number.textContent=String(value);number.classList.remove('pop');void number.offsetWidth;number.classList.add('pop');
    await new Promise(resolve=>setTimeout(resolve,GAME_TIMING.countdownStep));
  }
  return run===state.startRun;
}

async function startGame(){
  const run=++state.startRun;
  const audioReady=Promise.all([resetAudioOutput(),prepareEffectAudio(),prepareMusicAudio()]);stopVoice();const voiceReady=Promise.all([primeVoiceAudio(),prepareSharedVoiceAudio()]);tone('tap');
  const previewIndex=Number(params.get('scenario'))-1;
  const fullDeck=Number.isInteger(previewIndex)&&scenarios[previewIndex]?[scenarios[previewIndex],...shuffle(scenarios.filter((_,i)=>i!==previewIndex))]:shuffle(scenarios);
  state.deck=fullDeck.slice(0,state.missionCount);
  resetScenarioWindow();const firstScenarioReady=prepareScenarioAssets(state.deck[0]);
  state.index=0;state.score=0;state.streak=0;state.maxStreak=0;state.safeFirst=0;state.retries=0;state.lives=3;state.timeLeft=state.duration;state.lastFivePlayed=false;state.loadingScenario=false;state.handSeenAt=0;state.pointerX=null;state.pointerY=null;state.handDetectInterval=HAND_DETECT_INTERVAL_MS;state.running=true;state.paused=false;
  state.locked=true;setScreen('countdown');$('#countdownStatus').textContent='กำลังเตรียมกล้องและระบบตรวจมือ';resyncViewport();
  const [cameraReady]=await Promise.all([startCamera(),settleViewport(run)]);
  const handReady=cameraReady?await Promise.race([loadHandModel(),new Promise(resolve=>setTimeout(()=>resolve(false),12000))]):false;
  $('#countdownStatus').textContent=handReady?'พร้อมแล้ว ยกมือให้เห็นทั้งฝ่ามือ':'ใช้การแตะหน้าจอเลือกคำตอบได้';
  await Promise.race([Promise.all([audioReady,voiceReady]),new Promise(resolve=>setTimeout(resolve,500))]);
  const countdownReady=runStartCountdown(run);await firstScenarioReady;if(!await countdownReady)return;
  syncViewportSize();setScreen('game');await wakeAudio();playMusic('game');await Promise.race([primeVoiceAudio(),new Promise(resolve=>setTimeout(()=>resolve(false),250))]);await showScenario();requestAnimationFrame(syncViewportSize);
  clearInterval(state.timerId);state.timerId=setInterval(()=>{if(state.running&&!state.paused&&!state.loadingScenario&&state.mode==='timed'){state.timeLeft-=.25;if(state.timeLeft<=5&&state.timeLeft>0&&!state.lastFivePlayed){state.lastFivePlayed=true;playEffect('final5');}updateHud();if(state.timeLeft<=0)finishGame();}},250);
}

function finishGame(){
  if(!state.running)return;state.running=false;state.locked=true;clearInterval(state.timerId);clearAnswerTimers();resetAnswerEffects();stopVoice();stopMusic();stopEffects();playEffect('finish');stopCamera();resetScenarioWindow();
  $('#finalScore').textContent='0';$('#safeCount').textContent=state.safeFirst;$('#maxStreak').textContent=state.maxStreak;$('#retryCount').textContent=state.retries;
  const ratio=state.safeFirst/Math.max(1,state.index||state.deck.length);$('#resultRank').textContent=ratio>=.83?'ผู้พิทักษ์ความปลอดภัย':ratio>=.58?'นักคิดก่อนเลือก':'ผู้พิทักษ์ฝึกหัด';
  const badges=[];if(state.safeFirst>=Math.ceil(state.deck.length*.67))badges.push('🛡️ คิดก่อนเลือก');if(state.maxStreak>=Math.min(4,state.deck.length))badges.push('⭐ มีสติยอดเยี่ยม');if(state.retries<=Math.ceil(state.deck.length*.25))badges.push('🗣️ ขอความช่วยเหลือ');if(!badges.length)badges.push('🌱 พร้อมเรียนรู้');
  $('#badgeList').innerHTML=badges.map(b=>`<span class="badge">${b}</span>`).join('');setScreen('result');
  const start=performance.now(),duration=1100,target=state.score;
  const tick=now=>{const p=Math.min(1,(now-start)/duration);$('#finalScore').textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);
}

function pauseGame(auto=false){
  if(!state.running||state.paused||state.locked)return;state.paused=true;stopVoice();stopMusic();stopEffects();setScreen('pause');
  if(!auto)tone('tap');
}

function resumeGame(){if(!state.running)return;void resetAudioOutput();state.paused=false;setScreen('game');playMusic('game');tone('tap');}

function goMenu(){
  state.startRun++;state.running=false;state.paused=false;clearInterval(state.timerId);clearAnswerTimers();resetAnswerEffects();stopVoice();stopMusic();stopEffects();clearHover();stopCamera();resetScenarioWindow();setScreen('menu');
}

function setMode(mode){state.mode=mode;$$('[data-mode]').forEach(b=>b.classList.toggle('selected',b.dataset.mode===mode));$('#durationRow').style.opacity=mode==='timed'?'1':'.45';tone('tap');}
function setDuration(value){state.duration=Number(value);$$('[data-duration]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.duration)===state.duration));tone('tap');}
function setMissionCount(value){state.missionCount=Math.max(1,Math.min(scenarios.length,Number(value)||12));$$('[data-missions]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.missions)===state.missionCount));tone('tap');}

async function toggleFullscreen(){
  ensureAudio();tone('tap');
  try{if(!document.fullscreenElement)await stage.requestFullscreen?.();else await document.exitFullscreen?.();screen.orientation?.lock?.('landscape').catch(()=>{});}catch{}
}

document.addEventListener('click',e=>{
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(action==='start')startGame();
  else if(action==='menu')goMenu();
  else if(action==='settings'){tone('tap');setScreen('settings');}
  else if(action==='guide'){tone('tap');setScreen('guide');}
  else if(action==='camera'){tone('tap');setScreen('camera');startCamera();}
  else if(action==='resume')resumeGame();
});

choices.forEach((c,i)=>c.addEventListener('pointerup',()=>selectChoice(i,'touch')));
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
$$('[data-duration]').forEach(b=>b.addEventListener('click',()=>setDuration(b.dataset.duration)));
$$('[data-missions]').forEach(b=>b.addEventListener('click',()=>setMissionCount(b.dataset.missions)));
$('#voiceToggle').addEventListener('change',e=>{state.voice=e.target.checked;if(!state.voice)stopVoice();});
$('#soundToggle').addEventListener('change',e=>{state.sound=e.target.checked;if(state.sound)void resetAudioOutput().then(()=>{syncAudioForScreen();tone('tap');});else syncAudioForScreen();$('#muteButton').textContent=state.sound?'🔊':'🔇';});
$('#muteButton').addEventListener('click',()=>{state.sound=!state.sound;$('#soundToggle').checked=state.sound;$('#muteButton').textContent=state.sound?'🔊':'🔇';if(state.sound)void resetAudioOutput().then(()=>{syncAudioForScreen();tone('tap');});else syncAudioForScreen();});
$('#fullscreenButton').addEventListener('click',toggleFullscreen);
$('#pauseButton').addEventListener('click',()=>pauseGame(false));
document.addEventListener('keydown',e=>{
  if(state.screen==='game'&&!state.paused&&(e.key==='1'||e.key==='2'))selectChoice(Number(e.key)-1,'keyboard');
  if((e.key===' '||e.key==='Enter')&&state.screen==='pause')resumeGame();
  if(e.key==='Escape'&&state.screen==='game')pauseGame(false);
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.screen==='game')pauseGame(true);});
window.addEventListener('pagehide',()=>{if(state.screen==='game')pauseGame(true);});
window.addEventListener('beforeunload',stopCamera);
function recoverAudio(){if(!state.sound)return;void wakeAudio().then(()=>syncAudioForScreen());}
document.addEventListener('pointerdown',recoverAudio,{passive:true});
window.addEventListener('focus',recoverAudio,{passive:true});
window.addEventListener('pageshow',recoverAudio,{passive:true});
setInterval(()=>{
  if(!state.sound||state.screen!=='game'||state.paused)return;
  if(state.audio?.state!=='running'||state.musicName!=='game'||!state.musicSource)recoverAudio();
},1200);

requestAnimationFrame(trackingLoop);
$('#soundToggle').checked=state.sound;
$('#voiceToggle').checked=state.voice;
$('#muteButton').textContent=state.sound?'🔊':'🔇';
preload();
