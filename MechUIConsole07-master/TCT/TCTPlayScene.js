'use strict';

//replace Poolshot everywhere with the name of the game you are using this for

function TCTPlayScene() {
  Scene.call(this);

  attrs = {size:50, leading:50};

  this.pickUpButton = new TextButton(windowWidth/2 - 275, windowHeight/3 - 50, 550, 150, RED, 'Pick Up', attrs, this.PickUpButtonAction.bind(this));
  this.dropButton = new TextButton(windowWidth/2 - 275, windowHeight/3 + 150, 550, 150, BLUE, 'Drop', attrs, this.DropButtonAction.bind(this));

  this.titleLabel = new Label(windowWidth/2, windowHeight/5, "Tablecloth Trick", attrs);

  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.addActor(this.border);

  this.addActor(this.titleLabel);
  this.addActor(this.pickUpButton);
  this.addActor(this.dropButton);
  
  manager.setEventHandler(TCT.tablet.events.finishedAction, this.finishedAction.bind(this));
}


_inherits(TCTPlayScene, Scene);


TCTPlayScene.prototype.PickUpButtonAction = function() {
  TCT.master.events.pickUp();
  console.log("pick up button pressed");
  stage.pause("Performing Move");
  this.dropButton.show();
  this.pickUpButton.hide();
  //this.pickUpButton.draw();
}

TCTPlayScene.prototype.finishedAction = function() {
  stage.resume();
 }

TCTPlayScene.prototype.DropButtonAction = function() {
  console.log("drop button pressed");
  TCT.master.events.releaseCup();
  stage.transitionTo('TCTPlayAgainScene');
  stage.pause("Performing Move");
  this.pickUpButton.show();
  this.dropButton.hide();
  //this.dropButton.draw();
}
