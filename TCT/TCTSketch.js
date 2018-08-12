"use strict";
var buttonWidth, buttonHeight, labelY, TCTOpeningScene, TCTPlayAgainScene;

function TCTSketch()
{
  Scene.call(this);
  attrs = {size:50, leading:50};
  attrs = {fill:0, size:50, align:CENTER, style:NORMAL, leading:50};
  
  var startSceneButtons = ["Play Game", "Demo"];
  var startSceneActions = [this.startScenePlayAction.bind(this), this.startSceneDemoAction.bind(this)];
  
  var playAgainSceneButtons = ["Play Again", "Next Game"];
  var playAgainSceneActions = [this.playAgainButtonAction.bind(this), this.nextButtonAction.bind(this)];
 
  TCTOpeningScene = new ButtonsScene("TCT Game", TCTImg, startSceneButtons, startSceneActions, null, null);
  TCTPlayScene = new TCTPlayScene();
  TCTPlayAgainScene = new ButtonsScene("TCT", null, playAgainSceneButtons, playAgainSceneActions, null, null);
  
//Stage.addScene adds a scene with a particular name
  stage.addScene('TCTOpeningScene', TCTOpeningScene);
  stage.addScene('TCTPlayScene', TCTPlayScene);
  stage.addScene('TCTPlayAgainScene', TCTPlayAgainScene);
  
  manager.setEventHandler(TCT.tablet.events.finishedAction, this.finishedAction.bind(this));
}

_inherits(TCTSketch, Scene);

////////////////////////////////////////////////////////////////////////////////////////////

TCTSketch.prototype.startScenePlayAction = function() {
  //play button action
  console.log("Play Button clicked");
  stage.transitionTo('TCTPlayScene');
  TCTPlayScene.dropButton.hide();
  //TCTPlayScene.dropButton.draw();
}

TCTSketch.prototype.startSceneDemoAction = function() {
  //demo button action, should transition to control scene while paused
  TCT.master.events.playTableclothTrick();
  console.log("Demo Button clicked");
  stage.pause("Performing Move");
}

TCTSketch.prototype.startSceneInstructionAction = function() {
  //instructions button action
  console.log("Instruction Button clicked"); 
}
 
TCTSketch.prototype.playAgainButtonAction = function() {
  stage.transitionTo('TCTOpeningScene');
  TCTPlayScene.dropButton.hide();
  //TCTPlayScene.dropButton.draw();
  //play again button action, should transition to GameXTitleScene
}

TCTSketch.prototype.finishedAction = function() {
  stage.resume();
 }

TCTSketch.prototype.nextButtonAction = function() {
  stage.transitionTo('PoolshotOpeningScene');
  manager.changeState(STATE_POOLSHOT);
  //next button action, should transition to the the game title scene of the next game
}
 