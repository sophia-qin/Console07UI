"use strict";
var count, yellowCup, blueCup, redCup, sliderX, sliderY, sliderLength, yellowCupBright, blueCupBright, redCupBright, dropButtonImg;

function PachinkoPlayScene()
{
  sliderLength = 1000;
  sliderX = windowWidth/2-sliderLength/2;
  sliderY = windowHeight/3 -floor(sliderLength/15);
  
  Scene.call(this);
  
  this.redCupBright = new StaticImage (windowWidth *0.4, windowHeight *0.6, 300, 300, redCupBright);
  this.redCupImage = new StaticImage (windowWidth *0.4, windowHeight *0.6, 300, 300, redCup);
  this.blueCupBright = new StaticImage (windowWidth *0.7, windowHeight *0.6, 300, 300, blueCupBright);
  this.blueCupImage = new StaticImage (windowWidth *0.7, windowHeight *0.6, 300, 300, blueCup);
  this.yellowCupBright = new StaticImage (windowWidth *0.1, windowHeight *0.6, 300, 300, yellowCupBright);
  this.yellowCupImage = new StaticImage (windowWidth *0.1, windowHeight *0.6, 300, 300, yellowCup);
  this.pickUpButton = new TextButton(windowWidth * 0.35, windowHeight *0.1, 550, 150, RED, "Pick Up", attrs, this.pickUpButtonAction.bind(this));
  //this.dropButton = new TextButton(windowWidth *0.35, windowHeight * 0.4, 550, 150, BLUE, "Drop", attrs, this.dropButtonAction.bind(this));
  this.dropButton = new ImageButton(windowWidth *0.35, windowHeight * 0.4, 550, 150, dropButtonImg, this.dropButtonAction.bind(this), null);
  //this.scoreLabel = new Label(windowWidth/6, windowHeight/7, "Balls remaining: ", attrs);

 
  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.pachinkoSlider = new Slider(sliderX, sliderY, sliderLength, 0, 268, 0,this.sliderChange.bind(this));
  this.pachinkoSlider.sliderImage(Img)
  //this.dropButton = new TextButton(dropButtonX, dropButtonY, buttonWidth, buttonHeight, BLUE, "Drop", attrs, this.dropButtonAction.bind(this));
  
  this.addActor(this.border);
  this.addActor(this.pickUpButton);
  this.addActor(this.dropButton);
  this.addActor(this.pachinkoSlider);
  //this.addActor(this.scoreLabel);
  this.addActor(this.pachinkoSlider);
  this.addActor(this.redCupBright);
  this.addActor(this.yellowCupBright);
  this.addActor(this.blueCupBright);
  this.addActor(this.redCupImage);
  this.addActor(this.blueCupImage);
  this.addActor(this.yellowCupImage);
 
  console.log("created Pachinko Play Scene");
   
  manager.setEventHandler(PACHINKO.tablet.events.finishedAction, this.finishedAction.bind(this));
  manager.setEventHandler(PACHINKO.tablet.events.loseGame, this.loseGameAction.bind(this));
  manager.setEventHandler(PACHINKO.tablet.events.winGame, this.winGameAction.bind(this));
  manager.setEventHandler(PACHINKO.tablet.events.redCupScored, this.redCupScored.bind(this)); 
  manager.setEventHandler(PACHINKO.tablet.events.blueCupScored, this.blueCupScored.bind(this)); 
  manager.setEventHandler(PACHINKO.tablet.events.yellowCupScored, this.yellowCupScored.bind(this)); 
 manager.setEventHandler(PACHINKO.tablet.events.blueSensorOn, this.blueSensorOnAction.bind(this));
}
   

_inherits(PachinkoPlayScene, Scene);

PachinkoPlayScene.prototype.redCupScored = function() {
    this.redCupImage.hide();
    console.log("testing 2");
    this.show(this.redCupBright);
    this.redCupImage.img = redCupBright;
  }
PachinkoPlayScene.prototype.yellowCupScored = function() {
    this.yellowCupImage.hide();
    this.show(this.yellowCupBright);
    this.yellowCupImage.img = yellowCupBright;
  } 
  PachinkoPlayScene.prototype.blueCupScored = function() {
    this.blueCupImage.hide();
    this.show(this.blueCupBright);
    this.blueCupImage.img = blueCupBright;
  }
  
 PachinkoPlayScene.prototype.blueSensorOnAction = function() {
    this.blueCupImage.hide();
    this.show(this.blueCupBright);
    this.blueCupImage.img = blueCupBright;
    console.log("ball scored function");
  }
 
 PachinkoPlayScene.prototype.sliderChange = function(val){
  console.log("slider val =" + val);
   manager.change(PACHINKO.master.values.dropperPos, val);
 }
 
 PachinkoPlayScene.prototype.pickUpButtonAction = function() {
 
 PACHINKO.master.events.goRight();
  CatSound.setVolume(0.1);
  CatSound.play();
  PACHINKO.master.events.playPachinko();
  this.pickUpButton.hide();
  //this.pickUpButton.draw();
  this.dropButton.show();
 }
 
 PachinkoPlayScene.prototype.dropButtonAction = function(){
  console.log("drop button clicked.");
  PACHINKO.master.events.releaseBall(); //drops the pachinko ball
  this.pachinkoSlider.posVal = 0;
  this.pachinkoSlider.fixPosition();
  stage.pause("Performing Move");
  this.dropButton.hide();
  //this.dropButton.draw();
  this.pickUpButton.show();
 }

 PachinkoPlayScene.prototype.finishedAction = function() {
  stage.resume();
 }
 
 PachinkoPlayScene.prototype.loseGameAction = function () {
   // change text of loseGame scene to sorry you lose
   stage.transitionTo('PachinkoPlayAgainScene');
   //tablet::events::loseGame();
 }
 
 PachinkoPlayScene.prototype.winGameAction = function () {
   // change text of winGame scene to yay you win
   //stage.transitionTo('PachinkoPlayAgainScene');
   //tablet::events::winGame();
 }
 
 /* PachinkoPlayScene.prototype.TCTgame = function () {
  manager.changeState(STATE_TCT);
 } */
 
/* this.totalScore = PACHINKO.tablet.values.count;
  this.scoreLabel.text = "Score: " + this.count;
  console.log('ball scored'); */
  
  
 
