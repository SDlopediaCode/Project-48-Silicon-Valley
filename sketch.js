var backgroundImage
var pikachu, pikachuImage;
var squirtle, squirtleImage;
var eevee, eeveeImage;
var venusaur, venusaurImage;
var saurGroup, bulbasaurImage, ivysaurImage;
var platform, platformImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 
var score = 0;
var invisiblePlatform;
var gameOver, gameOverImage;
var restart, restartImage;
var jumpSound, gameOverSound;

function preload() {
  backgroundImage = loadImage("images/background.jpeg");
  platformImage = loadImage("images/platform.png");
  pikachuImage = loadImage("images/pikachu.png");
  bulbasaurImage = loadImage("images/bulbasaur.png");
  squirtleImage = loadImage("images/squirtle.png");
  venusaurImage = loadImage("images/venusaur.png");
  ivysaurImage = loadImage("images/ivysaur.png");
  eeveeImage = loadImage("images/eevee.png");
  gameOverImage = loadImage("images/gameover.png");
  restartImage = loadImage("images/restart.png");
  jumpSound = loadSound("sounds/jump.mp3");
}

function setup() {
  createCanvas(800,400);
  platform = createSprite(200, 350, 400, 400);
  platform.addImage(platformImage);
  platform.scale = 0.15;
  pikachu = createSprite(50, 230, 50, 50);
  pikachu.addImage(pikachuImage);
  pikachu.scale = 0.05;
  eevee = createSprite(210, 230, 50, 50);
  eevee.addImage(eeveeImage);
  eevee.scale = 0.0625;
  squirtle = createSprite(370, 230, 50, 50);
  squirtle.addImage(squirtleImage);
  squirtle.scale = 0.125;
  venusaur = createSprite(650, 250, 100, 100);
  venusaur.addImage(venusaurImage);
  venusaur.scale = 0.7;
  invisiblePlatform = createSprite(200, 312, 600, 100);
  invisiblePlatform.visible = false;
  saurGroup = new Group();
  gameOver = createSprite(350, 190, 50, 50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(200, 280, 20, 20);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(backgroundImage); 
  textSize(20);
  fill('black');
  text("Score: " + score, 400, 20);

  if (gameState === PLAY) {

    score = score + Math.round(getFrameRate()/60);
  
    if (keyDown("LEFT_ARROW") && pikachu.y >= 220) {
      jumpSound.play();
      pikachu.velocityY = -19;
    }
    if (keyDown("UP_ARROW") && eevee.y >= 220) {
      jumpSound.play();
      eevee.velocityY = -19;
    }
    if (keyDown("RIGHT_ARROw") && squirtle.y >= 220) {
      jumpSound.play();
      squirtle.velocityY = -19;
    } 
    
    pikachu.velocityY += 0.9;
    eevee.velocityY += 0.9;
    squirtle.velocityY += 0.9;

    pikachu.collide(invisiblePlatform); 
    eevee.collide(invisiblePlatform); 
    squirtle.collide(invisiblePlatform); 
    spawnWeapons();

    if (saurGroup.isTouching(pikachu)) {
      pikachu.visible = false;
    }

    if (saurGroup.isTouching(eevee)) {
      eevee.visible = false;
    }

    if (saurGroup.isTouching(squirtle)) {
      squirtle.visible = false;
    }

    if (pikachu.visible === false && eevee.visible === false && squirtle.visible === false) {
      gameState = END;
    }

    

    
  }

  if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    saurGroup.velocityX = 0;
    
    if (keyDown("SPACE")) {
      reset();
    }
  }

  

  drawSprites();
}

function spawnWeapons() {
  if (frameCount % 90 === 0) {
    var saurPokemon = createSprite(500, 230, 50, 50);
    saurPokemon.setCollider('circle', 0, 0, 250);
    //saurPokemon.debug = true;

    saurPokemon.velocityX = -4.5;

    var rand = Math.round(random(1, 2));
    switch(rand) {
      case 1: saurPokemon.addImage(bulbasaurImage);
      break;
      case 2: saurPokemon.addImage(ivysaurImage);
      break;
    }
    
    
    saurPokemon.scale = 0.125;
    saurPokemon.lifetime = 500;
    saurPokemon.depth = pikachu.depth;
    saurPokemon.depth = eevee.depth;
    saurPokemon.depth = squirtle.depth;
    pikachu.depth += 1;
    eevee.depth += 1;
    squirtle.depth += 1;
    saurGroup.add(saurPokemon);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  pikachu.visible = true;
  eevee.visible = true;
  squirtle.visible = true;

  pikachu.y = 230;
  squirtle.y = 230;
  eevee.y = 230;

  saurGroup.destroyEach();

  score = 0;
}