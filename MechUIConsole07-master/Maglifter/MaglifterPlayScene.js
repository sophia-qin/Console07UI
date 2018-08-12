'use strict';

//replace Poolshot everywhere with the name of the game you are using this for

function MaglifterPlayScene() {
  Scene.call(this);

  attrs = {size:50, leading:50};

  this.redButton = new TextButton(windowWidth/2 - 275, windowHeight/3 - 50, 550, 150, RED, 'Red', attrs, this.RedButtonAction.bind(this));
  this.blueButton = new TextButton(windowWidth/2 - 275, windowHeight/3 + 150, 550, 150, BLUE, 'Blue', attrs, this.BlueButtonAction.bind(this));

  this.titleLabel = new Label(windowWidth/2, windowHeight/5, "Maglifter", attrs);

  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.addActor(this.border);

  this.addActor(this.titleLabel);
  this.addActor(this.redButton);
  this.addActor(this.blueButton);
  
  manager.setEventHandler(MAGLIFTER.tablet.events.finishedAction, this.finishedAction.bind(this));
}

_inherits(MaglifterPlayScene, Scene);

//Click each button 7 times before you can move on
//Gray button that isn't supposed to be clicked

MaglifterPlayScene.prototype.RedButtonAction = function() {
  console.log("red");
  MAGLIFTER.master.events.Left();
}

MaglifterPlayScene.prototype.BlueButtonAction = function() {
  console.log("blue");
  MAGLIFTER.master.events.Right();
  
  
 }
 
MaglifterPlayScene.prototype.finishedAction = function() {
  console.log("finishedAction");
  stage.transitionTo('PachinkoOpeningScene');
  manager.changeState(STATE_PACHINKO);
 }

 
 //stage.transitionTo('VariableFrictionOpeningScene');


/////////////////////////////////////////////////What needs to be done////////////////////////////////////////
//We want to have a function that counts when each side are in opposite states  (7 counts?)
//Check state when ball gets to the top of the ball switcher