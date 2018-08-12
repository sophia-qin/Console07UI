 'use strict';

// Console 7
// Contains 2 games: Maglifter, Newton's First Law, Tablecloth Trick and Variable Friction Inclined Planes
//
//game variables
var floor = Math.floor;
var stage = new Stage();

var manager; 
var attrs;                  

// variables for scenes
var StartScene;
var MaglifterSketch, VariableFrictionSketch, PachinkoSketch, TCTSketch, PoolshotSketch;   
var Img, redCup, blueCup, yellowCup, redCupBright, blueCupBright, yellowCupBright, target1Img, target2Img, target3Img, target4Img, target5Img, targetBright1, targetBright2,targetBright3, targetBright4, targetBright5, targetheartImg, aluminumImg, blockImg, delrinImg;

var maglifterImg, pachinkoImg, TCTImg, poolshotImg, pickUp, dropButtonImg, CatSound;


var predictionImages = [aluminumImg, delrinImg, aluminumImg, aluminumImg, aluminumImg];

function preload() {

  Img = loadImage("/libs/images/circlePlate.png");
  redCup = loadImage("/libs/images/redCup.png");
  blueCup = loadImage("/libs/images/blueCup.png");
  yellowCup = loadImage("/libs/images/yellowCup.png");
  redCupBright = loadImage("/libs/images/redCupBright.png");
  blueCupBright = loadImage("/libs/images/blueCupBright.png");
  yellowCupBright = loadImage("/libs/images/yellowCupBright.png");
  target1Img = loadImage("/MechUIConsole07/Poolshot/Target1.png");
  target2Img = loadImage("/MechUIConsole07/Poolshot/Target2.png");
  target3Img = loadImage("/MechUIConsole07/Poolshot/Target3.png");
  target4Img = loadImage("/MechUIConsole07/Poolshot/Target4.png");
  target5Img = loadImage("/MechUIConsole07/Poolshot/Target5.png");
  targetBright1 = loadImage("/MechUIConsole07/Poolshot/targetBright1.png");
  targetBright2 = loadImage("/MechUIConsole07/Poolshot/targetBright2.png");
  targetBright3 = loadImage("/MechUIConsole07/Poolshot/targetBright3.png");
  targetBright4 = loadImage("/MechUIConsole07/Poolshot/targetBright4.png");
  targetBright5 = loadImage("/MechUIConsole07/Poolshot/targetBright5.png");
  
  aluminumImg = loadImage("/MechUIConsole07/VariableFriction/aluminumBlock.png");
  blockImg = loadImage("/MechUIConsole07/VariableFriction/block.png");
  delrinImg = loadImage("/MechUIConsole07/VariableFriction/delrinBlock.png");

  maglifterImg = loadImage("/libs/images/maglifter.png");
  pachinkoImg = loadImage("/libs/images/pachinko.png");
  TCTImg = loadImage("/libs/images/TCT.png");
  poolshotImg = loadImage("/libs/images/poolshot.png");

  pachinkoImg = loadImage("/libs/images/Pachinko.png");
  maglifterImg = loadImage("/libs/images/Maglifter.png");
  TCTImg = loadImage("/libs/images/TCT.png");
  dropButtonImg = loadImage("/libs/images/dropButton.png");
  
  CatSound = loadSound("CatSound.mp3");

}

function setup() {
  MASTER = true; // for two player mode, not necessary
  resizeCanvas(windowWidth, windowHeight);
  initMenuVariables();
  attrs = {fill:255, size:100, align:CENTER, style:BOLD, leading:50, strokeWeight:10, strokeColor:0}; //This is our text attributes variable
  
  StartScene =  new StartScene(startAction);
  MaglifterSketch = new MaglifterSketch();
  VariableFrictionSketch = new VariableFrictionSketch();
  PachinkoSketch = new PachinkoSketch();
  TCTSketch = new TCTSketch();
  PoolshotSketch = new PoolshotSketch();
  
  stage.addScene('StartScene', StartScene);
  stage.addScene('MaglifterSketch', MaglifterSketch);
  stage.addScene('VariableFrictionSketch', VariableFrictionSketch);
  stage.addScene('PachinkoSketch', PachinkoSketch);
  stage.addScene('TCTSketch', TCTSketch);
  stage.addScene('PoolshotSketch', PoolshotSketch);
  stage.transitionTo('StartScene');
  manager.changeState(STATE_PACHINKO);

}

function draw() {
  stage.draw();
}

function startAction(){
  manager.changeState(STATE_PACHINKO);
  PACHINKO.master.events.ballLoopHome();
  manager.changeState(STATE_MAGLIFTER);
  MAGLIFTER.master.events.liftPiston();
  console.log("lift ball");
  stage.transitionTo('MaglifterOpeningScene');
  console.log("Start button clicked");
}

// all these are needed to handle touch/mouse events properly
window.touchStarted = stage.touchStarted.bind(stage);
window.touchMoved = stage.touchMoved.bind(stage);
window.touchEnded = stage.touchEnded.bind(stage);
window.mousePressed = stage.mousePressed.bind(stage);
window.mouseDragged = stage.mouseDragged.bind(stage);
window.mouseReleased = stage.mouseReleased.bind(stage);
