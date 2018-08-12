"use strict";
var buttonWidth, buttonHeight, labelY, PoolshotOpeningScene, PoolshotPlayAgainScene, PoolshotPlayScene, PoolshotLoseScene;

function PoolshotSketch()
{
  Scene.call(this);
  attrs = {size:50, leading:50};
  //  var loseGameButton = ["Sorry. Better luck next time!"];
 
  var startSceneButtons = ["Play Game", "Demo"];
  var startSceneActions = [this.startScenePlayAction.bind(this), this.startSceneDemoAction.bind(this)];
  
  var playAgainSceneButtons = ["Play Again", "Continue"];
  var playAgainSceneActions = [this.playAgainButtonAction.bind(this), this.continueButtonAction.bind(this)];
 
  PoolshotOpeningScene = new ButtonsScene("Poolshot Game", poolshotImg, startSceneButtons, startSceneActions, null, null);
  PoolshotPlayAgainScene = new ButtonsScene("Poolshot", null, playAgainSceneButtons, playAgainSceneActions, null, null);
  PoolshotChooseDifficultyScene =  new PoolshotChooseDifficultyScene();
  PoolshotPlayScene =  new PoolshotPlayScene();
  //PoolshotLoseScene = new ButtonsScene(null, null, loseGameButton, loseGameSceneAction, null, null);

  //PoolshotScene = new PoolshotScene();
  
  //Stage.addScene adds a scene with a particular name
  stage.addScene('PoolshotOpeningScene', PoolshotOpeningScene);
  stage.addScene('PoolshotChooseDifficultyScene', PoolshotChooseDifficultyScene);
  stage.addScene('PoolshotPlayScene', PoolshotPlayScene);
  stage.addScene('PoolshotLoseScene', PoolshotLoseScene);
  stage.addScene('PoolshotPlayAgainScene', PoolshotPlayAgainScene);
  
  manager.setEventHandler(POOLSHOT.tablet.events.finishedAction, this.finishedAction.bind(this));
}

_inherits(PoolshotSketch, Scene);

////////////////////////////////////////////////////////////////////////////////////////////
PoolshotSketch.prototype.startScenePlayAction = function() {
  //play button action
  manager.changeState(STATE_POOLSHOT);
  console.log("Play Button clicked");
  stage.transitionTo('PoolshotChooseDifficultyScene');
}

PoolshotSketch.prototype.startSceneDemoAction = function() {
  //demo button action, should transition to control scene while paused
  manager.changeState(STATE_POOLSHOT);
  POOLSHOT.master.events.demo();
  console.log("Demo Button clicked");
  stage.pause("Performing Move");
}

PoolshotSketch.prototype.finishedAction = function() {
  stage.resume();
}
 
PoolshotSketch.prototype.startSceneInstructionAction = function() {
  //instructions button action
  console.log("Instruction Button clicked"); 
}

  PoolshotSketch.prototype.PoolshotAction = function(){ // transition to the Poolshot scene
  stage.transitionTo('PoolshotPlayScene');
  console.log("next button clicked")
 }
 
 PoolshotSketch.prototype.playAgainButtonAction = function() {
  stage.transitionTo('PoolshotOpeningScene');
  //play again button action, should transition to GameXTitleScene
}

PoolshotSketch.prototype.continueButtonAction = function() {
  POOLSHOT.master.events.releasePiston();
  console.log("release piston called");
  //stage.pause("Performing Move");
  stage.transitionTo('StartScene');
  //continue button action, should transition to the start scene
}

/*PoolshotSketch.prototype.loseGameSceneAction = function() {
  stage.transitionTo('PoolshotPlayAgainScene');
}*/
