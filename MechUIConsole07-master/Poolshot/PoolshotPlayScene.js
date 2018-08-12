"use strict";

var targetBright1, targetBright2, targetBright3, targetBright4, targetBright5;

function PoolshotPlayScene()
{
  Scene.call(this);

  this.fireButton = new TextButton(windowWidth/1.25 - buttonWidth/2, windowHeight/1.17 - borderBufferDist/1.2, windowWidth/6.5, buttonWidth/(1.5*1.3), RED, 'Fire', attrs, this.fireButtonAction.bind(this));
  this.fireButton.z = 5;
  this.cueButton = new TextButton(windowWidth/1.25 - buttonWidth/2, windowHeight/1.17 - borderBufferDist/.2, windowWidth/6.5, buttonWidth/(1.5*1.3), YELLOW, 'Cue', attrs, this.CueButtonAction.bind(this));
  
  
  this.targetBright1 = new ImageLabel(windowWidth/4.7, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, targetBright1);
  this.target1 = new ImageLabel(windowWidth/4.7, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target1Img);
  this.targetBright2 = new ImageLabel(windowWidth/3, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target2Img);
  this.target2 = new ImageLabel(windowWidth/3, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target2Img);
  this.targetBright3 = new ImageLabel(windowWidth/2 - windowWidth/26, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target3Img);
  this.target3 = new ImageLabel(windowWidth/2 - windowWidth/26, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target3Img);
  this.targetBright4 = new ImageLabel(windowWidth/1.7, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target4Img);
  this.target4 = new ImageLabel(windowWidth/1.7, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target4Img);
  this.targetBright5 = new ImageLabel(windowWidth/1.4, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target5Img);
  this.target5 = new ImageLabel(windowWidth/1.4, windowHeight/100 + borderBufferDist/3, windowWidth/13, windowWidth/13, target5Img);
  
  this.hearts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.heartsSym = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //this.scoreLabel = new Label(windowWidth/6, windowHeight/7, "Goals Remaining:  ", attrs);
  
  var heartPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  heartPositions[0] = borderBufferDist/2;
  for (var i = 1; i < 12; i++)
  {
    heartPositions[i] = heartPositions[i - 1] + homeButtonSize + gap;
  }
  /*
  for(var i = 0; i < 12; i++) 
  {
    this.hearts[i] = new ImageLabel(heartPositions[i], borderBufferDist/3, (homeButtonSize/2), (homeButtonSize/2), heartImg);
    this.hearts[i].draggable = false;
    this.addActor(this.hearts[i]);
    this.heartsSym[i] = null;
    this.heartsSym[i] = this.addActor(this.hearts[i]);
  }
  */
  this.target1.draggable = false
  this.target2.draggable = false;
  this.target3.draggable = false;
  this.target4.draggable = false;
  this.target5.draggable = false;
  
  this.degreeLabel = new Label(windowWidth/2, windowHeight - borderBufferDist/1.5, "Degree: ", attrs );
  this.wheel = new SemiWheel(windowWidth/2 - windowWidth/2.8, 150, windowWidth/1.4, windowWidth/1.4, this.wheelAction.bind(this), 100, 1, 240, 300);
  
  this.border = new BackgroundBorder();
  this.border.z = -1;
  
  this.totalScore = 0;
  
  this.addActor(this.border);
  this.addActor(this.targetBright1);
  this.addActor(this.targetBright2);
  this.addActor(this.targetBright3);
  this.addActor(this.targetBright4);
  this.addActor(this.targetBright5);
  this.addActor(this.target1);
  this.addActor(this.target2);
  this.addActor(this.target3);
  this.addActor(this.target4);
  this.addActor(this.target5);
  this.addActor(this.fireButton);
  this.addActor(this.cueButton); 
  this.addActor(this.wheel);
  this.addActor(this.degreeLabel);
 // this.addActor(this.scoreLabel);
  
  console.log("created poolshot play scene");
  
  manager.setEventHandler(POOLSHOT.tablet.events.finishedAction, this.finishedAction.bind(this));
  /*manager.setEventHandler(POOLSHOT.tablet.events.targetBright1Scored, this.target1ScoredAction.bind(this));
  manager.setEventHandler(POOLSHOT.tablet.events.targetBright2Scored, this.target2ScoredAction.bind(this));
  manager.setEventHandler(POOLSHOT.tablet.events.targetBright3Scored, this.target3ScoredAction.bind(this));
  manager.setEventHandler(POOLSHOT.tablet.events.targetBright4Scored, this.target4ScoredAction.bind(this));
  manager.setEventHandler(POOLSHOT.tablet.events.targetBright5Scored, this.target5ScoredAction.bind(this)); */
  //manager.setEventHandler(POOLSHOT.tablet.events.ballScored, this.ballScoredAction.bind(this));
  manager.setEventHandler(POOLSHOT.tablet.events.loseGame, this.loseGameAction.bind(this));

  
}
_inherits(PoolshotPlayScene, Scene);

/*PoolshotPlayScene.prototype.target1ScoredAction = function() {
    this.target1.hide();
    this.target1.draw();
    console.log("testing target1");
    //this.show(this.targetBright1);
    //this.target1.img = targetBright1;
  }
PoolshotPlayScene.prototype.target2ScoredAction = function() {
    this.target2.hide();
    this.target2.draw();
    console.log("testing target2");
    //this.show(this.targetBright2);
    //this.target2.img = targetBright2;
  } 
PoolshotPlayScene.prototype.target3ScoredAction = function() {
    this.target3.hide();
    this.target3.draw();
    console.log("testing target3");
    //this.show(this.targetBright3);
    //this.target3.img = targetBright3;
  } 
  PoolshotPlayScene.prototype.target4ScoredAction = function() {
    this.target4.hide();
    this.target4.draw();
    console.log("testing target4");
    //this.show(this.targetBright4);
    //this.target2.img = targetBright4;
  } 
  PoolshotPlayScene.prototype.target5ScoredAction = function() {
    this.target5.hide();
    this.target5.draw();
    console.log("testing target5");
    //this.show(this.targetBright5);
    //this.target5.img = targetBright2;
  } 
*/
PoolshotPlayScene.prototype.CueButtonAction = function() {
  
  CatSound.setVolume(0.1);
  CatSound.play();
  console.log("cue button pressed");
  POOLSHOT.master.events.liftMechanism();
  stage.pause("Performing Move");
}
 
 PoolshotPlayScene.prototype.fireButtonAction = function(){
  //stage.transitionTo('PoolshotPlayAgainScene');
  console.log("fire button clicked");
 // this.removeActor(this.heartsSym[4]);
  POOLSHOT.master.events.shootBall();
  stage.pause("Performing Move");
  //air piston HIGH, fires balls at target, get amount of points earned from sensors
  //each fire removes a life, when 5 lives(hearts) gone (event from hardware 5 fires), go to congrats scene
 }

 PoolshotPlayScene.prototype.finishedAction = function() {
  stage.resume();
 }
 
/* PoolshotPlayScene.prototype.ballScoredAction = function() {
  this.totalScore =  4 - POOLSHOT.tablet.values.totalScore.value;
  this.scoreLabel.text = "Goals Remaining " + this.totalScore;
  console.log(POOLSHOT.tablet.values.totalScore.value);
  console.log('ball scored');
  console.log('Goals Remaining' + POOLSHOT.tablet.values.totalScore.value);
 } */
 
 //transition to play again scene
  PoolshotPlayScene.prototype.wheelAction = function(val){
    console.log("val:" + val);
    this.steps = (val)*53;
    console.log("steps:" + this.steps);
    manager.change(POOLSHOT.master.values.shooterPosition, this.steps);
    ////////////////////////////////
    val = Math.abs((int)(val - 30));
    this.degreeLabel.text = "Degree: " + val;
    val = val + 30;
    val = val*106.67; //sets val from 0-6400 in order to control stepper motor
   console.log("Stepper value sent is:" + val);
 }
 
/* PachinkoSketch.prototype.winGameSceneAction = function() {
  stage.transitionTo('PachinkoPlayAgainScene');
}*/

PoolshotPlayScene.prototype.loseGameAction = function () {
   // change text of loseGame scene to sorry you lose
   stage.transitionTo('PoolshotPlayAgainScene');
   //tablet::events::loseGame();
 }
