"use strict";
var buttonWidth, buttonHeight, labelY, PachinkoOpeningScene, PachinkoPlayAgainScene, PachinkoPlayScene, PachinkoLoseScene, PachinkoWinScene;

/*function preload() {
  redCup = loadImage("/libs/images/redCup.png");
  blueCup = loadImage("/libs/images/blueCup.png");
  yellowCup = loadImage("/libs/images/yellowCup.png");
} */

function PachinkoSketch()
{
  Scene.call(this);
  attrs = {size:50, leading:50};
  var count;
 
  var startSceneButtons = ["Play Game", "Demo"];
  var startSceneActions = [this.startScenePlayAction.bind(this), this.startSceneDemoAction.bind(this)];
  
  var playAgainSceneButtons = ["Play Again", "Next Game"];
  var playAgainSceneActions = [this.playAgainButtonAction.bind(this), this.nextButtonAction.bind(this)];
  
  var loseGameButton = ["Sorry. Better luck next time!"];

  //var loseGameButtonActions = [this.loseGameAction.bind(this)];
  
  //var winGameButton = ["Congrats! You won!"];
 /// var winGameButtonActions = [this.winGameAction.bind(this)];

  var loseGameSceneAction = [this.loseGameSceneAction.bind(this)];
  
  var winGameButton = ["Congrats, you won!"];
  var winGameSceneAction = [this.winGameSceneAction.bind(this)];
  
 
  PachinkoOpeningScene = new ButtonsScene("Pachinko Game", pachinkoImg, startSceneButtons, startSceneActions, null, null);
  PachinkoPlayAgainScene = new ButtonsScene("Pachinko", null, playAgainSceneButtons, playAgainSceneActions, null, null);
  PachinkoChooseDifficultyScene =  new PachinkoChooseDifficultyScene();
  PachinkoPlayScene = new PachinkoPlayScene();
  PachinkoLoseScene = new ButtonsScene(null, null, loseGameButton, loseGameSceneAction, null, null);
  PachinkoWinScene = new ButtonsScene(null, null, winGameButton, winGameSceneAction, null, null);
  
  //Stage.addScene adds a scene with a particular name
  stage.addScene('PachinkoOpeningScene', PachinkoOpeningScene);
  stage.addScene('PachinkoChooseDifficultyScene', PachinkoChooseDifficultyScene);
  stage.addScene('PachinkoPlayAgainScene', PachinkoPlayAgainScene);
  stage.addScene('PachinkoPlayScene', PachinkoPlayScene);
  stage.addScene('PachinkoLoseScene', PachinkoLoseScene);
  stage.addScene('PachinkoWinScene', PachinkoWinScene);
  
  manager.setEventHandler(PACHINKO.tablet.events.finishedAction, this.finishedAction.bind(this));
  manager.setEventHandler(PACHINKO.tablet.events.moveOnAction, this.moveOnAction.bind(this));
}

_inherits(PachinkoSketch, Scene);

////////////////////////////////////////////////////////////////////////////////////////////

PachinkoSketch.prototype.startScenePlayAction = function() {
  //play button action
  console.log("Play Button clicked");
  stage.transitionTo('PachinkoChooseDifficultyScene');
  manager.changeState(STATE_PACHINKO);
  console.log("changed state to Pachinko");
}

PachinkoSketch.prototype.startSceneDemoAction = function() {
  PACHINKO.master.events.demo();
  console.log("Demo Button clicked");
  stage.pause("Performing Move");
}

 PachinkoSketch.prototype.finishedAction = function() {
  stage.resume();
 }
 
 PachinkoSketch.prototype.moveOnAction = function() {
  console.log("moveOnAction");
  stage.resume();
  stage.transitionTo('TCTOpeningScene');
  manager.changeState(STATE_TCT);
 }

PachinkoSketch.prototype.startSceneInstructionAction = function() {
  //instructions button action
  console.log("Instruction Button clicked"); 
}
 
 PachinkoSketch.prototype.playAgainButtonAction = function() {
   //manager.changeState(STATE_PACHINKO);
  stage.transitionTo('PachinkoChooseDifficultyScene');
  //play again button action, should transition to GameXTitleScene
  PachinkoPlayScene.redCupBright.hide();
  console.log("testing 2");
  PachinkoPlayScene.show(this.redCupImage);
  PachinkoPlayScene.redCupImage.img = redCupBright;
  
  PachinkoPlayScene.blueCupBright.hide();
  console.log("testing 2");
  PachinkoPlayScene.show(this.blueCupImage);
  PachinkoPlayScene.blueCupImage.img = blueCupBright;
  
  PachinkoPlayScene.yellowCupBright.hide();
  console.log("testing 2");
  PachinkoPlayScene.show(this.yellowCupImage);
  PachinkoPlayScene.yellowCupImage.img = yellowCupBright;
}

PachinkoSketch.prototype.nextButtonAction = function() {
 PACHINKO.master.events.goLeft();
 PACHINKO.master.events.ballLoopHome();
 stage.pause();
  //next button action, should transition to the the game title scene of the next game
}

PachinkoSketch.prototype.loseGameSceneAction = function () {
  stage.transitionTo('PachinkoPlayAgainScene');
}

PachinkoSketch.prototype.winGameSceneAction = function() {
  stage.transitionTo('PachinkoPlayAgainScene');
}

