import * as THREE from 'three';
import './style.css';

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const ITEMS = [
  {id:'daisy',      e:'🌼', name:'Daisy',          r:'COMMON',   hex:'#ffe57a', col:0xFFE57A, unlocks:'daisy'},
  {id:'lavender',   e:'💜', name:'Lavender',        r:'COMMON',   hex:'#b08ed0', col:0xB08ED0, unlocks:'lavender'},
  {id:'rose',       e:'🌹', name:'Rose',            r:'UNCOMMON', hex:'#ff6b8a', col:0xFF6B8A, unlocks:'rose'},
  {id:'lily',       e:'🌸', name:'Lily',            r:'UNCOMMON', hex:'#ffb3d9', col:0xFFB3D9, unlocks:'lily'},
  {id:'crystal',    e:'💎', name:'Forest Crystal',  r:'RARE',     hex:'#80e8ff', col:0x80E8FF, unlocks:null},
  {id:'acorn',      e:'🌰', name:'Acorn',           r:'COMMON',   hex:'#a07040', col:0xA07040, unlocks:null},
  {id:'leaf',       e:'🍃', name:'Magic Leaf',      r:'COMMON',   hex:'#60c060', col:0x60C060, unlocks:null},
  {id:'mushroom',   e:'🍄', name:'Moon Mushroom',   r:'UNCOMMON', hex:'#ff9070', col:0xFF9070, unlocks:'mushroom'},
  {id:'strawberry', e:'🍓', name:'Strawberry',      r:'UNCOMMON', hex:'#ff4060', col:0xFF4060, unlocks:'berry'},
  {id:'blueberry',  e:'🫐', name:'Blueberry',       r:'COMMON',   hex:'#6070e0', col:0x6070E0, unlocks:null},
  {id:'dewdrop',    e:'💧', name:'Dewdrop',         r:'RARE',     hex:'#90d8ff', col:0x90D8FF, unlocks:null},
  {id:'waterlily',  e:'🪷', name:'Water Lily',      r:'RARE',     hex:'#ff80b0', col:0xFF80B0, unlocks:'waterlily'},
  {id:'firefly',    e:'✨', name:'Firefly Dust',    r:'RARE',     hex:'#ffff80', col:0xFFFF80, unlocks:null},
  {id:'glowflower', e:'🌟', name:'Glow Flower',     r:'EPIC',     hex:'#ffff40', col:0xFFFF40, unlocks:'glow'},
  {id:'petal',      e:'🌺', name:'Sunset Petal',    r:'COMMON',   hex:'#ff8050', col:0xFF8050, unlocks:null},
  {id:'seed',       e:'🌱', name:'Magic Seed',      r:'COMMON',   hex:'#80d060', col:0x80D060, unlocks:null},
  {id:'star',       e:'⭐', name:'Star Dust',       r:'EPIC',     hex:'#ffee80', col:0xFFEE80, unlocks:null},
  {id:'blackberry', e:'🍇', name:'Blackberry',      r:'UNCOMMON', hex:'#6030a0', col:0x6030A0, unlocks:null},
];
const RCOLOR = {COMMON:'#70a050',UNCOMMON:'#60a0c8',RARE:'#b070e0',EPIC:'#f8c840'};
const OUTFITS = [
  {id:'default',  name:'Simple',    e:'👗', unlock:null},
  {id:'daisy',    name:'Daisy',     e:'🌼', unlock:'daisy'},
  {id:'lavender', name:'Lavender',  e:'💜', unlock:'lavender'},
  {id:'berry',    name:'Berry',     e:'🍓', unlock:'berry'},
  {id:'mushroom', name:'Mushroom',  e:'🍄', unlock:'mushroom'},
  {id:'rose',     name:'Rose',      e:'🌹', unlock:'rose'},
  {id:'glow',     name:'Glow',      e:'🌟', unlock:'glow'},
];
const OUTFIT_COLORS = {
  default:  {dress:'#a0b4c8', hat:'#788898'},
  daisy:    {dress:'#ffe060', hat:'#e8c030'},
  lavender: {dress:'#c890d8', hat:'#a060b8'},
  berry:    {dress:'#f05868', hat:'#b83848'},
  mushroom: {dress:'#f08038', hat:'#d06018'},
  rose:     {dress:'#f07888', hat:'#d85068'},
  glow:     {dress:'#f8f870', hat:'#e8d830'},
};
const SKIN_COLORS  = ['#ffdcc0','#f0b080','#c08050','#80502a','#ffe4d0','#d4a070','#ffb0a0'];
const WING_COLORS  = ['#c0f0ff','#ffb0d0','#b0ffb0','#ffe080','#d0b0ff','#ff9090','#a0e8ff'];

const SPAWN_SPOTS = [
  {id:'daisy',x:3,z:3},{id:'daisy',x:-5,z:4},{id:'daisy',x:7,z:-2},
  {id:'lavender',x:-4,z:6},{id:'lavender',x:2,z:-8},
  {id:'acorn',x:5,z:8},{id:'acorn',x:-7,z:-5},
  {id:'leaf',x:8,z:2},{id:'leaf',x:-3,z:-6},
  {id:'petal',x:4,z:-4},{id:'seed',x:-6,z:3},
  {id:'mushroom',x:-10,z:12},{id:'mushroom',x:12,z:-10},
  {id:'crystal',x:15,z:5},{id:'crystal',x:-12,z:-8},
  {id:'blueberry',x:11,z:8},{id:'blackberry',x:-9,z:14},
  {id:'strawberry',x:6,z:12},
  {id:'dewdrop',x:28,z:8},{id:'waterlily',x:32,z:12},
  {id:'firefly',x:-2,z:-15},{id:'glowflower',x:3,z:-18},{id:'star',x:-5,z:-20},
  {id:'lily',x:-14,z:10},{id:'rose',x:9,z:-7},
];

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════
const G = {
  discovered: new Set(),
  inventory:  {},
  outfit:  'default',
  skin:    '#ffdcc0',
  wing:    '#c0f0ff',
  unlocked: new Set(['default']),
  activePanel: null,
  nearItem:    null,
  cooldown:    0,
  // player
  px: 0, py: 2.2, pz: 0,
  yaw: 0, pitch: 0,
  // mouse drag
  dragging: false,
  lastMX: 0, lastMY: 0,
};

// ═══════════════════════════════════════════════════════════
// SIMPLEX NOISE (2D)
// ═══════════════════════════════════════════════════════════
const P = (function(){
  const t=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  return [...t,...t];
})();
function snoise(x,y){
  const F=0.5*(Math.sqrt(3)-1),Gn=(3-Math.sqrt(3))/6;
  const s=(x+y)*F,i=Math.floor(x+s),j=Math.floor(y+s);
  const t0=(i+j)*Gn,x0=x-(i-t0),y0=y-(j-t0);
  const i1=x0>y0?1:0,j1=x0>y0?0:1;
  const x1=x0-i1+Gn,y1=y0-j1+Gn,x2=x0-1+2*Gn,y2=y0-1+2*Gn;
  const g0=P[i+P[j]],g1=P[i+i1+P[j+j1]],g2=P[i+1+P[j+1]];
  function contrib(h,px,py){
    let t=0.5-px*px-py*py; if(t<0)return 0;
    t*=t; const v=h&3,u=v<2?px:py,w=v<2?py:px;
    return t*t*(((h&1)?-u:u)+((h&2)?-w:w));
  }
  return 70*(contrib(g0,x0,y0)+contrib(g1,x1,y1)+contrib(g2,x2,y2));
}

// ═══════════════════════════════════════════════════════════
// THREE.JS – loaded inline via CDN, init after load
// ═══════════════════════════════════════════════════════════
let scene, camera, renderer, clock;
let collectMeshes = [];   // {group, id, def, collected}
let pollenBuf, fireflyBuf, fireflyInfo = [];


function initScene(){
  clock  = new THREE.Clock();

  // --- Renderer ---
  const canvas = document.getElementById('gameCanvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
  renderer.toneMapping       = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  // --- Scene ---
  scene = new THREE.Scene();
  scene.fog        = new THREE.FogExp2(0x0a140a, 0.020);
  scene.background = new THREE.Color(0x0a140a);

  // --- Camera ---
  camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.05, 180);
  camera.position.set(G.px, G.py, G.pz);

  buildLights();
  buildGround();
  buildFlowers();
  buildMushrooms();
  buildTrees();
  buildGrass();
  buildCrystals();
  buildPond();
  buildPollen();
  buildFireflies();
  buildCollectibles();

  buildJournalUI();
  buildFairyUI();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  setupInput();
  renderer.setAnimationLoop(gameLoop);
}

// ═══════════════════════════════════════════════════════════
// INPUT  (mouse drag to look – no pointer lock needed)
// ═══════════════════════════════════════════════════════════
const keys = {};
function setupInput(){
  document.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (e.code === 'KeyE') tryCollect();
  });
  document.addEventListener('keyup',  e => { keys[e.code] = false; });

  const cv = document.getElementById('gameCanvas');
  cv.addEventListener('mousedown', e => {
    if (G.activePanel) return;
    G.dragging = true; G.lastMX = e.clientX; G.lastMY = e.clientY;
  });
  window.addEventListener('mouseup',   () => { G.dragging = false; });
  window.addEventListener('mousemove', e => {
    if (!G.dragging || G.activePanel) return;
    const dx = e.clientX - G.lastMX;
    const dy = e.clientY - G.lastMY;
    G.lastMX = e.clientX; G.lastMY = e.clientY;
    G.yaw   -= dx * 0.003;
    G.pitch  = Math.max(-1.1, Math.min(1.1, G.pitch - dy * 0.003));
  });
  // Touch support
  cv.addEventListener('touchstart', e => {
    if (G.activePanel) return;
    const t = e.touches[0];
    G.dragging = true; G.lastMX = t.clientX; G.lastMY = t.clientY;
  }, {passive:true});
  window.addEventListener('touchend', () => { G.dragging = false; });
  window.addEventListener('touchmove', e => {
    if (!G.dragging || G.activePanel) return;
    const t = e.touches[0];
    const dx = t.clientX - G.lastMX, dy = t.clientY - G.lastMY;
    G.lastMX = t.clientX; G.lastMY = t.clientY;
    G.yaw   -= dx * 0.004;
    G.pitch  = Math.max(-1.1, Math.min(1.1, G.pitch - dy * 0.004));
  }, {passive:true});

  // Hide hint after first drag
  cv.addEventListener('mousedown', () => {
    document.getElementById('lookHint').style.opacity = '0';
  }, {once:true});
}

// ═══════════════════════════════════════════════════════════
// WORLD BUILDING
// ═══════════════════════════════════════════════════════════
function buildLights(){
  scene.add(new THREE.AmbientLight(0x304820, 2.2));
  scene.add(new THREE.HemisphereLight(0x204828, 0x101810, 0.8));
  const d = new THREE.DirectionalLight(0x99aabb, 1.1);
  d.position.set(20, 35, 15); d.castShadow = true;
  d.shadow.mapSize.set(1024,1024);
  d.shadow.camera.near=0.5; d.shadow.camera.far=120;
  d.shadow.camera.left=-55; d.shadow.camera.right=55;
  d.shadow.camera.top=55;   d.shadow.camera.bottom=-55;
  scene.add(d);
  const f = new THREE.DirectionalLight(0x604828, 0.3);
  f.position.set(-15,8,-20); scene.add(f);
}

function buildGround(){
  const geo = new THREE.PlaneGeometry(200,200,64,64);
  const pos = geo.attributes.position;
  const colors = [];
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i), z=pos.getZ(i);
    const n = snoise(x*0.04, z*0.04);
    pos.setY(i, n * 0.4);
    const g = 0.16 + n*0.05;
    colors.push(0.05+n*0.02, g, 0.03+n*0.01);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors),3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({vertexColors:true}));
  mesh.rotation.x = -Math.PI/2;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function mkMesh(geo, color, cast=true){
  const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color}));
  if(cast) m.castShadow = true;
  return m;
}

function buildFlowers(){
  const FC = [0xFFE57A,0xFF6B8A,0xFFB3D9,0xB08ED0,0xFF9050,0xFFFFAA,0xFF80B0,0xFF4060];
  for(let i=0;i<55;i++){
    const a=Math.random()*Math.PI*2, r=3+Math.random()*52;
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    const h=1.8+Math.random()*3.5;
    const col = FC[Math.floor(Math.random()*FC.length)];
    const stem = mkMesh(new THREE.CylinderGeometry(.04,.07,h,6), 0x3a8028);
    stem.position.set(x,h/2,z); scene.add(stem);
    const np = 5+Math.floor(Math.random()*4);
    for(let p=0;p<np;p++){
      const pa=(p/np)*Math.PI*2;
      const pm = mkMesh(new THREE.SphereGeometry(.27+Math.random()*.15,6,4), col);
      pm.position.set(x+Math.cos(pa)*.44, h, z+Math.sin(pa)*.44);
      pm.scale.y = .3; scene.add(pm);
    }
    const ctr = mkMesh(new THREE.SphereGeometry(.23,7,5), 0xFFFF70);
    ctr.position.set(x,h+.05,z); scene.add(ctr);
  }
}

function buildMushrooms(){
  const MC=[0xFF6040,0xE05030,0xFF9040,0xD04020];
  for(let i=0;i<22;i++){
    const a=Math.random()*Math.PI*2, r=6+Math.random()*50;
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    const h=1.2+Math.random()*2.5;
    const stem = mkMesh(new THREE.CylinderGeometry(.17,.27,h,8), 0xDDBB99);
    stem.position.set(x,h/2,z); scene.add(stem);
    const cap = mkMesh(new THREE.SphereGeometry(.68+Math.random()*.5,8,6,0,Math.PI*2,0,Math.PI/2), MC[Math.floor(Math.random()*MC.length)]);
    cap.position.set(x,h+.15,z); scene.add(cap);
    for(let s=0;s<3+Math.floor(Math.random()*3);s++){
      const sa=Math.random()*Math.PI*2, sr=.18+Math.random()*.36;
      const sp = mkMesh(new THREE.SphereGeometry(.062,4,4), 0xFFFFFF);
      sp.position.set(x+Math.cos(sa)*sr, h+.42+Math.random()*.22, z+Math.sin(sa)*sr);
      scene.add(sp);
    }
  }
}

function buildTrees(){
  for(let i=0;i<18;i++){
    const a=Math.random()*Math.PI*2, r=18+Math.random()*65;
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    const h=9+Math.random()*14;
    const trunk = mkMesh(new THREE.CylinderGeometry(.5,1.1,h,8), 0x5a3618);
    trunk.position.set(x,h/2,z); scene.add(trunk);
    for(let l=0;l<3+Math.floor(Math.random()*2);l++){
      const cr=Math.max(.5,2.5+Math.random()*2.5-l*.5);
      const cn = mkMesh(new THREE.SphereGeometry(cr,8,6),
        new THREE.Color(.08+Math.random()*.06,.28+Math.random()*.1,.06+Math.random()*.04));
      cn.position.set(x+(Math.random()-.5)*1.5, h+l*2.2, z+(Math.random()-.5)*1.5);
      cn.receiveShadow=true; scene.add(cn);
    }
  }
}

function buildGrass(){
  const verts=[], cols=[];
  for(let i=0;i<7000;i++){
    const x=(Math.random()-.5)*110, z=(Math.random()-.5)*110;
    const h=.25+Math.random()*.7;
    for(let b=0;b<3;b++){
      const ba=b*(Math.PI/3)+Math.random()*.3;
      const bx=Math.cos(ba)*.052, bz=Math.sin(ba)*.052;
      verts.push(x-bx,0,z-bz, x+bx,0,z+bz, x,h,z);
      const gv=.22+Math.random()*.25;
      cols.push(gv*.3,gv*.6,gv*.15, gv*.3,gv*.6,gv*.15, gv*.2,gv,.1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts),3));
  geo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(cols),3));
  scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({vertexColors:true, side:THREE.DoubleSide})));
}

function buildCrystals(){
  const CC=[0x80E8FF,0xC080FF,0x80FFE0,0xFFD080];
  for(let i=0;i<14;i++){
    const a=Math.random()*Math.PI*2, r=9+Math.random()*42;
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    for(let c=0;c<3+Math.floor(Math.random()*3);c++){
      const h=.4+Math.random()*1.8;
      const col=CC[Math.floor(Math.random()*CC.length)];
      const cr = new THREE.Mesh(
        new THREE.ConeGeometry(.08+Math.random()*.12,h,5),
        new THREE.MeshPhongMaterial({color:col,transparent:true,opacity:.72,emissive:col,emissiveIntensity:.35})
      );
      cr.position.set(x+(Math.random()-.5)*1.2, h/2, z+(Math.random()-.5)*1.2);
      cr.rotation.z=(Math.random()-.5)*.3; scene.add(cr);
    }
  }
}

function buildPond(){
  const pond = new THREE.Mesh(
    new THREE.CircleGeometry(6,32),
    new THREE.MeshPhongMaterial({color:0x1028a8, transparent:true, opacity:.72, shininess:120})
  );
  pond.rotation.x=-Math.PI/2; pond.position.set(30,.07,10); scene.add(pond);
  for(let i=0;i<8;i++){
    const a=Math.random()*Math.PI*2, r=Math.random()*4.5;
    const lp = new THREE.Mesh(new THREE.CircleGeometry(.33+Math.random()*.22,8),
      new THREE.MeshLambertMaterial({color:0x2a6820}));
    lp.rotation.x=-Math.PI/2; lp.position.set(30+Math.cos(a)*r,.09,10+Math.sin(a)*r); scene.add(lp);
  }
}

function buildPollen(){
  const N=280, p=new Float32Array(N*3), c=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    p[i*3]=(Math.random()-.5)*80; p[i*3+1]=.5+Math.random()*8; p[i*3+2]=(Math.random()-.5)*80;
    c[i*3]=.9+Math.random()*.1; c[i*3+1]=.88+Math.random()*.08; c[i*3+2]=.2+Math.random()*.22;
  }
  pollenBuf = new THREE.BufferGeometry();
  pollenBuf.setAttribute('position', new THREE.BufferAttribute(p,3));
  pollenBuf.setAttribute('color',    new THREE.BufferAttribute(c,3));
  scene.add(new THREE.Points(pollenBuf, new THREE.PointsMaterial({size:.07,vertexColors:true,transparent:true,opacity:.72})));
}

function buildFireflies(){
  const N=70, p=new Float32Array(N*3), c=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const x=(Math.random()-.5)*55, z=(Math.random()-.5)*55, y=.5+Math.random()*4;
    p[i*3]=x; p[i*3+1]=y; p[i*3+2]=z;
    c[i*3]=.8; c[i*3+1]=1; c[i*3+2]=.3;
    fireflyInfo.push({ox:x,oy:y,oz:z,ph:Math.random()*Math.PI*2,sp:.3+Math.random()*.5});
  }
  fireflyBuf = new THREE.BufferGeometry();
  fireflyBuf.setAttribute('position', new THREE.BufferAttribute(p,3));
  fireflyBuf.setAttribute('color',    new THREE.BufferAttribute(c,3));
  scene.add(new THREE.Points(fireflyBuf, new THREE.PointsMaterial({size:.14,vertexColors:true,transparent:true,opacity:.92})));
}

function buildCollectibles(){
  collectMeshes = [];
  SPAWN_SPOTS.forEach(({id,x,z}) => {
    const def = ITEMS.find(d=>d.id===id); if(!def) return;
    const g = new THREE.Group();
    g.position.set(x, 1.1, z);
    // orb
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(.18,8,6),
      new THREE.MeshPhongMaterial({color:def.col, emissive:def.col, emissiveIntensity:.7, transparent:true, opacity:.93})
    );
    g.add(orb);
    // ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(.28,.042,6,16),
      new THREE.MeshBasicMaterial({color:def.col, transparent:true, opacity:.42})
    );
    ring.rotation.x = Math.PI/2; g.add(ring);
    // glow light
    const pt = new THREE.PointLight(def.col, .6, 3.2);
    g.add(pt);
    scene.add(g);
    collectMeshes.push({group:g, id, def, collected:false});
  });
}

// ═══════════════════════════════════════════════════════════
// GAME LOOP
// ═══════════════════════════════════════════════════════════
function gameLoop(){
  const dt = Math.min(clock.getDelta(), .05);
  if(!G.activePanel){
    updatePlayer(dt);
    updateCollectibles(dt);
  }
  updateParticles();
  renderer.render(scene, camera);
}

const AREAS = [
  {name:'FLOWER MEADOW',  x:0,  z:0,   r:22},
  {name:'MUSHROOM HOLLOW',x:-18,z:18,  r:16},
  {name:'DEWDROP POND',   x:30, z:10,  r:13},
  {name:'FIREFLY GROVE',  x:0,  z:-20, r:13},
];

function updatePlayer(dt){
  if(G.cooldown>0) G.cooldown-=dt;
  const fw = new THREE.Vector3(-Math.sin(G.yaw),0,-Math.cos(G.yaw));
  const rt = new THREE.Vector3( Math.cos(G.yaw),0,-Math.sin(G.yaw));
  let mx=0,mz=0;
  if(keys['KeyW']||keys['ArrowUp'])   { mx+=fw.x; mz+=fw.z; }
  if(keys['KeyS']||keys['ArrowDown']) { mx-=fw.x; mz-=fw.z; }
  if(keys['KeyA']||keys['ArrowLeft']) { mx-=rt.x; mz-=rt.z; }
  if(keys['KeyD']||keys['ArrowRight']){ mx+=rt.x; mz+=rt.z; }
  const len=Math.sqrt(mx*mx+mz*mz); if(len>0){mx/=len;mz/=len;}
  G.px+=mx*4*dt; G.pz+=mz*4*dt;
  if(keys['Space'])                          G.py+=2*dt;
  else if(keys['ShiftLeft']||keys['ShiftRight']) G.py-=2*dt;
  else { const t=2.2+Math.sin(Date.now()*.002)*.09; G.py+=(t-G.py)*3*dt; }
  G.py=Math.max(.5,Math.min(14,G.py));
  camera.position.set(G.px,G.py,G.pz);
  camera.rotation.order='YXZ';
  camera.rotation.y=G.yaw; camera.rotation.x=G.pitch;
  // area
  let an='DEEP FOREST';
  AREAS.forEach(a=>{ const dx=G.px-a.x,dz=G.pz-a.z; if(Math.sqrt(dx*dx+dz*dz)<a.r) an=a.name; });
  document.getElementById('areaName').textContent=an;
}

function updateCollectibles(dt){
  const t=Date.now()*.001;
  let nearDist=999; G.nearItem=null;
  collectMeshes.forEach(cm=>{
    if(cm.collected) return;
    cm.group.position.y=1.1+Math.sin(t*1.6+cm.group.position.x)*.2;
    cm.group.rotation.y+=dt*1.1;
    const ring=cm.group.children[1];
    if(ring){ const s=.88+Math.sin(t*2.2+cm.group.position.z)*.14; ring.scale.set(s,s,s); }
    const dx=G.px-cm.group.position.x, dz=G.pz-cm.group.position.z, dy=G.py-cm.group.position.y;
    const dist=Math.sqrt(dx*dx+dy*dy+dz*dz);
    if(dist<2&&dist<nearDist){ nearDist=dist; G.nearItem=cm; }
  });
  const ip=document.getElementById('collectPrompt');
  if(G.nearItem){
    ip.classList.add('show');
    ip.textContent='[ E ]  Collect  '+G.nearItem.def.e+'  '+G.nearItem.def.name;
  } else ip.classList.remove('show');
}

function updateParticles(){
  const t=Date.now()*.001;
  if(pollenBuf){
    const p=pollenBuf.attributes.position.array;
    for(let i=0;i<p.length;i+=3){ p[i]+=Math.sin(t*.3+i)*.009; p[i+1]+=.0015; if(p[i+1]>10)p[i+1]=.3; }
    pollenBuf.attributes.position.needsUpdate=true;
  }
  if(fireflyBuf){
    const p=fireflyBuf.attributes.position.array, c=fireflyBuf.attributes.color.array;
    fireflyInfo.forEach((fd,i)=>{
      p[i*3]=fd.ox+Math.sin(t*fd.sp+fd.ph)*2.8;
      p[i*3+1]=fd.oy+Math.sin(t*fd.sp*1.3+fd.ph*2)*1.4;
      p[i*3+2]=fd.oz+Math.cos(t*fd.sp+fd.ph)*2.8;
      const br=.45+.55*Math.sin(t*2.2+fd.ph*3);
      c[i*3]=br; c[i*3+1]=br; c[i*3+2]=br*.3;
    });
    fireflyBuf.attributes.position.needsUpdate=true;
    fireflyBuf.attributes.color.needsUpdate=true;
  }
}

// ═══════════════════════════════════════════════════════════
// COLLECTION
// ═══════════════════════════════════════════════════════════
function tryCollect(){
  if(G.cooldown>0||!G.nearItem) return;
  const cm=G.nearItem; if(cm.collected) return;
  cm.collected=true; cm.group.visible=false;
  const def=cm.def;
  G.inventory[def.id]=(G.inventory[def.id]||0)+1;
  G.discovered.add(def.id);
  if(def.unlocks) G.unlocked.add(def.unlocks);
  showPopup(def); floatEmoji(def.e);
  refreshInv(); refreshJournal(); refreshFairyUI();
  G.cooldown=1.5;
}
function showPopup(def){
  document.getElementById('popEmoji').textContent=def.e;
  document.getElementById('popName').textContent=def.name;
  const r=document.getElementById('popRarity');
  r.textContent='✦ '+def.r+' ✦'; r.style.color=RCOLOR[def.r];
  const p=document.getElementById('popup'); p.classList.add('show');
  setTimeout(()=>p.classList.remove('show'),2200);
}
function floatEmoji(e){
  const el=document.createElement('div'); el.className='rise'; el.textContent=e;
  document.body.appendChild(el); setTimeout(()=>el.remove(),1200);
}
function refreshInv(){
  const items=Object.entries(G.inventory);
  for(let i=0;i<6;i++){
    const sl=document.getElementById('s'+i), qi=document.getElementById('q'+i);
    if(items[i]){
      const def=ITEMS.find(d=>d.id===items[i][0]);
      sl.childNodes[0] && sl.childNodes[0].nodeType===3 && sl.childNodes[0].remove();
      sl.insertBefore(document.createTextNode(def?def.e:''), sl.firstChild);
      sl.classList.add('filled'); qi.textContent=items[i][1]>1?items[i][1]:'';
    }
  }
}

// ═══════════════════════════════════════════════════════════
// JOURNAL UI
// ═══════════════════════════════════════════════════════════
function buildJournalUI(){
  const g=document.getElementById('jGrid');
  ITEMS.forEach(def=>{
    const el=document.createElement('div'); el.className='jEntry hidden'; el.id='je-'+def.id;
    el.innerHTML=`<span class="jEmoji">${def.e}</span><div class="jName">${def.name}</div><div class="jRarity" style="color:${RCOLOR[def.r]}">${def.r}</div>`;
    g.appendChild(el);
  });
}
function refreshJournal(){
  const d=G.discovered.size,t=ITEMS.length;
  document.getElementById('progLabel').textContent=d+' / '+t+' discovered';
  document.getElementById('progFill').style.width=(d/t*100)+'%';
  G.discovered.forEach(id=>{ const el=document.getElementById('je-'+id); if(el){el.classList.remove('hidden');el.classList.add('found');} });
}

// ═══════════════════════════════════════════════════════════
// FAIRY UI
// ═══════════════════════════════════════════════════════════
function buildFairyUI(){
  const sr=document.getElementById('skinRow');
  SKIN_COLORS.forEach(c=>{
    const sw=document.createElement('div'); sw.className='colorSwatch'+(c===G.skin?' active':''); sw.style.background=c;
    sw.onclick=()=>{ G.skin=c; sr.querySelectorAll('.colorSwatch').forEach(s=>s.classList.remove('active')); sw.classList.add('active'); drawFairy(); };
    sr.appendChild(sw);
  });
  const wr=document.getElementById('wingRow');
  WING_COLORS.forEach(c=>{
    const sw=document.createElement('div'); sw.className='colorSwatch'+(c===G.wing?' active':''); sw.style.background=c;
    sw.onclick=()=>{ G.wing=c; wr.querySelectorAll('.colorSwatch').forEach(s=>s.classList.remove('active')); sw.classList.add('active'); drawFairy(); };
    wr.appendChild(sw);
  });
  const or=document.getElementById('outfitRow');
  OUTFITS.forEach(o=>{
    const lk=o.unlock&&!G.unlocked.has(o.unlock);
    const btn=document.createElement('button'); btn.className='outfitBtn'+(G.outfit===o.id?' active':'')+(lk?' locked':''); btn.id='ob-'+o.id;
    btn.innerHTML=`${o.e} ${o.name}${lk?'<span class="lockBadge">🔒</span>':''}`;
    btn.onclick=()=>{ if(o.unlock&&!G.unlocked.has(o.unlock))return; G.outfit=o.id; document.querySelectorAll('.outfitBtn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); drawFairy(); };
    or.appendChild(btn);
  });
  drawFairy();
}
function refreshFairyUI(){
  OUTFITS.forEach(o=>{
    const btn=document.getElementById('ob-'+o.id); if(!btn)return;
    const lk=o.unlock&&!G.unlocked.has(o.unlock);
    btn.classList.toggle('locked',lk);
    btn.innerHTML=`${o.e} ${o.name}${lk?'<span class="lockBadge">🔒</span>':''}`;
  });
}
function drawFairy(){
  const cv=document.getElementById('fairyCanvas'), ctx=cv.getContext('2d');
  const W=140,H=140; ctx.clearRect(0,0,W,H);
  const cx=W/2, cy=H/2+10;
  const oc=OUTFIT_COLORS[G.outfit]||OUTFIT_COLORS.default;
  // bg glow
  const bg=ctx.createRadialGradient(cx,cy,5,cx,cy,68); bg.addColorStop(0,'rgba(30,15,50,.85)'); bg.addColorStop(1,'rgba(6,3,12,0)');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  // wings
  ctx.save(); ctx.globalAlpha=.62; ctx.fillStyle=G.wing;
  ctx.beginPath(); ctx.ellipse(cx-26,cy-17,24,16,Math.PI*.15,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx-19,cy+8,16,11,Math.PI*.3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+26,cy-17,24,16,-Math.PI*.15,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+19,cy+8,16,11,-Math.PI*.3,0,Math.PI*2); ctx.fill();
  ctx.restore();
  // dress
  ctx.fillStyle=oc.dress;
  ctx.beginPath(); ctx.moveTo(cx-12,cy-3); ctx.lineTo(cx+12,cy-3); ctx.lineTo(cx+18,cy+34); ctx.lineTo(cx-18,cy+34); ctx.closePath(); ctx.fill();
  // body
  ctx.fillStyle=G.skin; ctx.beginPath(); ctx.ellipse(cx,cy-3,10,18,0,0,Math.PI*2); ctx.fill();
  // head
  ctx.beginPath(); ctx.arc(cx,cy-28,16,0,Math.PI*2); ctx.fill();
  // eyes
  ctx.fillStyle='#1e102e';
  ctx.beginPath(); ctx.ellipse(cx-6,cy-28,2.8,3.6,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+6,cy-28,2.8,3.6,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#fff';
  ctx.beginPath(); ctx.arc(cx-5,cy-30,1,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+7,cy-30,1,0,Math.PI*2); ctx.fill();
  // cheeks
  ctx.fillStyle='rgba(255,130,100,.36)';
  ctx.beginPath(); ctx.ellipse(cx-9,cy-24,4.5,2.8,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+9,cy-24,4.5,2.8,0,0,Math.PI*2); ctx.fill();
  // mouth
  ctx.strokeStyle='#6a3828'; ctx.lineWidth=1.3;
  ctx.beginPath(); ctx.arc(cx,cy-21,3.5,.22,Math.PI-.22); ctx.stroke();
  // hat brim
  ctx.fillStyle=oc.hat; ctx.beginPath(); ctx.ellipse(cx,cy-41,14,4.5,0,0,Math.PI*2); ctx.fill();
  // hat cone
  ctx.beginPath(); ctx.moveTo(cx-8,cy-41); ctx.lineTo(cx,cy-60); ctx.lineTo(cx+8,cy-41); ctx.closePath(); ctx.fill();
  // hair
  ctx.fillStyle='#3e2c14';
  ctx.beginPath(); ctx.arc(cx,cy-37,10,Math.PI+.38,Math.PI*2-.38); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx-14,cy-30,4,10,-.28,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+14,cy-30,4,10,.28,0,Math.PI*2); ctx.fill();
  // sparkles
  ctx.fillStyle='rgba(255,255,120,.88)';
  [[cx-31,cy-12],[cx+30,cy-17],[cx-25,cy+3],[cx+27,cy+6]].forEach(([sx,sy])=>{ ctx.beginPath(); ctx.arc(sx,sy,1.3,0,Math.PI*2); ctx.fill(); });
}

// ═══════════════════════════════════════════════════════════
// PANELS
// ═══════════════════════════════════════════════════════════
function openPanel(name){
  closePanel();
  G.activePanel=name;
  document.getElementById('panel'+name.charAt(0).toUpperCase()+name.slice(1)).classList.add('open');
  if(name==='fairy') drawFairy();
}
function closePanel(){
  if(G.activePanel){
    document.getElementById('panel'+G.activePanel.charAt(0).toUpperCase()+G.activePanel.slice(1)).classList.remove('open');
    G.activePanel=null;
  }
}

// ═══════════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════════
document.getElementById('startBtn').addEventListener('click', () => {
  const t=document.getElementById('title');
  t.style.opacity='0';
  setTimeout(()=>{ t.style.display='none'; }, 1500);
});

// Close panels with Escape
document.addEventListener('keydown', e => { if(e.code==='Escape') closePanel(); });

// Boot Three.js
initScene();