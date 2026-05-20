// ============================================================
// PLATFORMER WITH SPIKES + FULLSCREEN BACKGROUND
// ============================================================

// ------------------------------------------------------------
// PLATFORMS ARRAY
// ------------------------------------------------------------
let platforms = [
  { x: 0,   y: 410, w: 800, h: 40 }, 
  { x: 80,  y: 310, w: 120, h: 16 },
  { x: 280, y: 240, w: 140, h: 16 }, // spikes on this one
  { x: 500, y: 170, w: 120, h: 16 },
  { x: 160, y: 150, w: 100, h: 16 },
  { x: 360, y: 320, w: 110, h: 16 },
  { x: 620, y: 290, w: 130, h: 16 },
];

// ------------------------------------------------------------
// SPIKES (on platform index 2)
// ------------------------------------------------------------
let spikes = [
  { platformIndex: 2, count: 6 }
];

// ------------------------------------------------------------
// PLAYER
// ------------------------------------------------------------
let player = {
  x: 100,
  y: 100,
  vx: 0,
  vy: 0,
  r: 20,
  speed: 0.55,
  maxSpeed: 4.5,
  jumpForce: -12,
  friction: 0.78,
  onGround: false,
};

const GRAVITY = 0.6;
let blobT = 0;
const PLATFORM_COLOR = [255, 160, 50];

let waterImg;
let pcImg;

// ------------------------------------------------------------
// preload()
// ------------------------------------------------------------
function preload() {
  waterImg = loadImage("assets/images/water.jpg");
  pcImg = loadImage("assets/images/Black_PC.webp");
}

// ------------------------------------------------------------
// setup()
// ------------------------------------------------------------
function setup() {
  createCanvas(800, 450);
  player.y = platforms[0].y - player.r;
}



// ------------------------------------------------------------
// draw()
// ------------------------------------------------------------
function draw() {
  background(10);

  // FULLSCREEN BACKGROUND
 image(waterImg, 0, 0, 1600, 900);

  handleInput();
  applyPhysics();
  resolvePlatformCollisions();

  drawPlatforms();
  drawSpikes();
  drawPlayer();
  drawHUD();

  blobT += 0.015;
}

// ------------------------------------------------------------
// INPUT
// ------------------------------------------------------------
function handleInput() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.vx -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.vx += player.speed;
  }

  player.vx = constrain(player.vx, -player.maxSpeed, player.maxSpeed);

  if (
    !keyIsDown(LEFT_ARROW) &&
    !keyIsDown(65) &&
    !keyIsDown(RIGHT_ARROW) &&
    !keyIsDown(68)
  ) {
    player.vx *= player.friction;
  }

  if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && player.onGround) {
    player.vy = player.jumpForce;
    player.onGround = false;
  }
}

// ------------------------------------------------------------
// PHYSICS
// ------------------------------------------------------------
function applyPhysics() {
  player.vy += GRAVITY;
  player.x += player.vx;
  player.y += player.vy;

  player.x = constrain(player.x, player.r, width - player.r);

  if (player.y > height + 100) {
    player.x = 100;
    player.y = platforms[0].y - player.r;
    player.vx = 0;
    player.vy = 0;
  }

  player.onGround = false;
}

// ------------------------------------------------------------
// COLLISIONS (PLATFORMS + SPIKES)
// ------------------------------------------------------------
function resolvePlatformCollisions() {

  // --- SPIKE COLLISION ---
  for (let s of spikes) {
    let sp = platforms[s.platformIndex];
    let spikeWidth = sp.w / s.count;

    for (let j = 0; j < s.count; j++) {
      let spikeX = sp.x + j * spikeWidth;
      let spikeY = sp.y;

      if (
        player.x > spikeX &&
        player.x < spikeX + spikeWidth &&
        player.y + player.r > spikeY - 20 &&
        player.y - player.r < spikeY
      ) {
        // RESET PLAYER
        player.x = 100;
        player.y = platforms[0].y - player.r;
        player.vx = 0;
        player.vy = 0;
      }
    }
  }

  // --- PLATFORM COLLISION ---
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];

    let playerLeft   = player.x - player.r;
    let playerRight  = player.x + player.r;
    let playerBottom = player.y + player.r;

    let platLeft  = p.x;
    let platRight = p.x + p.w;
    let platTop   = p.y;

    let overlapsHorizontally = playerRight > platLeft && playerLeft < platRight;

    let landingOnTop =
      player.vy >= 0 &&
      playerBottom >= platTop &&
      playerBottom <= platTop + 20;

    if (overlapsHorizontally && landingOnTop) {
      player.y = platTop - player.r;
      player.vy = 0;
      player.onGround = true;
    }
  }
}

// ------------------------------------------------------------
// DRAW PLATFORMS
// ------------------------------------------------------------
function drawPlatforms() {
  fill(...PLATFORM_COLOR);
  noStroke();

  for (let p of platforms) {
    rect(p.x, p.y, p.w, p.h, 6);
  }
}

// ------------------------------------------------------------
// DRAW SPIKES
// ------------------------------------------------------------
function drawSpikes() {
  fill(255, 50, 50);
  noStroke();

  for (let s of spikes) {
    let p = platforms[s.platformIndex];
    let spikeWidth = p.w / s.count;

    for (let i = 0; i < s.count; i++) {
      let spikeX = p.x + i * spikeWidth;
      let spikeY = p.y;

      triangle(
        spikeX, spikeY,
        spikeX + spikeWidth / 2, spikeY - 20,
        spikeX + spikeWidth, spikeY
      );
    }
  }
}

// ------------------------------------------------------------
// DRAW PLAYER (PENGUIN)
// ------------------------------------------------------------
function drawPlayer() {
  imageMode(CENTER);
  image(pcImg, player.x, player.y, player.r * 3, player.r * 3);
}

// ------------------------------------------------------------
// HUD
// ------------------------------------------------------------
function drawHUD() {
  fill(180);
  noStroke();
  textSize(13);
  textAlign(LEFT);
  text("Move: Arrow Keys or WASD   Jump: W or Up Arrow", 16, 24);
}
