"use strict";

var blockX, gap, numberOfBlocks, blockPositions, blockButtonSize,
   numberOfBlocksSelected, buttonSize;
   
var tryAgainScene;
  
var timeOutLength = 3000;

var VariableFrictionOpeningScene, VariableFrictionPlayScene, VariableFrictionPlayAgainScene, VFIPPredictionScene, VFIPPredictionSceneTT;



function VariableFrictionSketch()
{
  //////////////////////////////// TT ////////////////////////////////

  //buttonSize = Math.floor(this.windowWidth/6.5);
  //blockButtonSize = Math.floor(buttonSize / 5); // 2.5
  buttonSize = 300;
  blockButtonSize = 100;
  
  gap = 10;
  numberOfBlocks = 5;
  
  blockPositions = [0, 0, 0, 0, 0];
  blockPositions[0] = homeButtonYPos + homeButtonSize + gap;
  console.log("blockPositions[0] = " + blockPositions[0]);
  for (var i = 1; i < numberOfBlocks; i++ )
  {
    blockPositions[i] = blockPositions[i - 1] + homeButtonSize + gap;
    console.log("blockPositions[" + i + "] = " + blockPositions[i]);
  }

  /////////////////////////////////////////////////////////////////////////
  
  
  Scene.call(this);

  attrs = {size:50, leading:50};

  var startSceneButtons = ["Play Game", "Demo"];
  var startSceneActions = [this.startScenePlayAction.bind(this), this.startSceneDemoAction.bind(this)];
  
  var playAgainSceneButtons = ["Play Again", "Next Game"];
  var playAgainSceneActions = [this.playAgainButtonAction.bind(this), this.nextButtonAction.bind(this)];
  //var gameButtonNames = ["One Player", "Two Player"];
  //var gameButtonActions = [this.oneButtonAction.bind(this),  this.twoButtonAction.bind(this)];
  
  VariableFrictionOpeningScene = new ButtonsScene("Variable Friction", null, startSceneButtons, startSceneActions, null, null);
  VariableFrictionPlayAgainScene = new ButtonsScene("Variable Friction", null, playAgainSceneButtons, playAgainSceneActions, null, null);
  VFIPPredictionSceneTT = new VFIPPredictionSceneTT();

  //VariableFrictionPlayScene = new ButtonsScene("Tilty Race", null, gameButtonNames, gameButtonActions, homeAction, null);
  
  stage.addScene('VariableFrictionOpeningScene', VariableFrictionOpeningScene);
  stage.addScene('VariableFrictionPlayAgainScene', VariableFrictionPlayAgainScene);
  stage.addScene('VFIPPredictionSceneTT', VFIPPredictionSceneTT);
//  stage.addScene('tiltyRacePickAGameScene', tiltyRacePickAGameScene);
  //IMPORTANT: to access and transition to this scene, you need to use stage.transitionTo('GameXTitleScene'), NOT the name of this file
}

_inherits(VariableFrictionSketch, Scene);

VariableFrictionSketch.prototype.startScenePlayAction = function() {
  //play button action
  console.log("Play Button clicked");
  stage.transitionTo('VFIPPredictionSceneTT');
}

VariableFrictionSketch.prototype.startSceneDemoAction = function() {
  //demo button action, should transition to control scene while paused
  //VARIABLEFRICTION.master.events.demo();
  console.log("Demo Button clicked");
  stage.transitionTo('VariableFrictionPlayAgainScene')
  //stage.transitionTo('VariableFrictionPlayScene');
}
/*
VariableFrictionSketch.prototype.startSceneInstructionAction = function() {
  //instructions button action
 stage.transitionTo('VFIPPredictionSceneTT);
 console.log("Instruction Button clicked"); 
}
*/
VariableFrictionSketch.prototype.oneButtonAction = function() {
  console.log("friction stuff oneButtonAction button clicked");
  //stage.transitionTo('tiltyRacePlayGame');
}

VariableFrictionSketch.prototype.twoButtonAction = function() {
  TILTYRACE.master.events.enter2Player();
  console.log("friction stuff twoButtonAction button clicked");
  //stage.transitionTo('tiltyRacePlayGameSceneTwoPlayer');
}

VariableFrictionSketch.prototype.playAgainButtonAction = function() {
  stage.transitionTo('VariableFrictionOpeningScene');
  //play again button action, should transition to GameXTitleScene
}

VariableFrictionSketch.prototype.nextButtonAction = function() {
  stage.transitionTo('PachinkoOpeningScene');
  //next button action, should transition to the the game title scene of the next game
}


 /* console.log("created VariableFrictionSketch");
  
 attrs = {fill:0, size:50, align:CENTER, style:NORMAL, leading:50};
  
  blockX = windowWidth / 5;
  
  buttonSize = floor(windowWidth/6.5);

  gap = 10;

  numberOfBlocks = 5;
  

  blockPositions = [0, 0, 0, 0, 0];

  blockPositions[0] = homeButtonYPos + homeButtonSize + gap;
  console.log("blockPositions[0] = " + blockPositions[0]);
  for (var i = 1; i < numberOfBlocks; i++ )
  {
    blockPositions[i] = blockPositions[i - 1] + homeButtonSize + gap;
    console.log("blockPositions[" + i + "] = " + blockPositions[i]);
  }
  
  var tryAgainButtons = ["Yes", "Exit"];
  var tryAgainActions = [this.tryAgainAction.bind(this), this.nextAction.bind(this)];
  
  tryAgainScene = new ButtonsScene("Play Again?", null, tryAgainButtons, tryAgainActions, homeAction, null);
  stage.addScene('tryAgainScene', tryAgainScene);
  
  //VariableFrictionSelectBlockScene = new VariableFrictionSelectBlockScene();
  selectAnyPredictionOrder = new SelectAnyPredictOrderScene();
  resultsScene = new VariableFrictionResultsScene();
  freeScene = new VariableFrictionFreeScene();
  predictionScene = new VariableFrictionPredictionScene();
  predictionPickAGame = new VariableFrictionPickAGameScene();
  
//   Stage.addScene adds a scene with a particular name
  //stage.addScene('VariableFrictionSelectBlockScene', VariableFrictionSelectBlockScene);
  stage.addScene('resultsScene', resultsScene);
  stage.addScene('selectAnyPredictionOrder', selectAnyPredictionOrder);
  stage.addScene('freeScene', freeScene);
  stage.addScene('predictionScene', predictionScene);
  stage.addScene('predictionPickAGame', predictionPickAGame);

}
_inherits(VariableFrictionSketch, Scene);

VariableFrictionSketch.prototype.tryAgainAction = function() {
  stage.transitionTo('predictionPickAGame');
}

VariableFrictionSketch.prototype.nextAction = function() {
  stage.transitionTo('dropBallScene');
  //send event change to hardware
} */

