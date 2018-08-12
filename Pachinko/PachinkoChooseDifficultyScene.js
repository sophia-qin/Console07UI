'use strict';

//replace Pachinko everywhere with the name of the game you are using this for

function PachinkoChooseDifficultyScene() {
  Scene.call(this);

  attrs = {size:50, leading:50};

  this.easyButton = new TextButton(windowWidth/2 - 275, windowHeight/3 - 50, 550, 150, BLUE, 'Easy: 5 Balls', attrs, this.EasyButtonAction.bind(this));
  this.mediumButton = new TextButton(windowWidth/2 - 275, windowHeight/3 + 150, 550, 150, YELLOW, 'Medium: 4 Balls', attrs, this.MediumButtonAction.bind(this));
  this.hardButton = new TextButton(windowWidth/2 - 275, windowHeight/3 + 350, 550, 150, RED, 'Hard: 3 Balls', attrs, this.HardButtonAction.bind(this));

  this.titleLabel = new Label(windowWidth/2, windowHeight/5, "Choose Difficulty", attrs);

  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.addActor(this.border);

  this.addActor(this.titleLabel);
  this.addActor(this.easyButton);
  this.addActor(this.mediumButton);
  this.addActor(this.hardButton);
}
  _inherits(PachinkoChooseDifficultyScene, Scene);
  
PachinkoChooseDifficultyScene.prototype.EasyButtonAction = function() {
  manager.change(PACHINKO.master.values.count, 5);
  stage.transitionTo('PachinkoPlayScene');
  PachinkoPlayScene.dropButton.hide();
  PachinkoPlayScene.dropButton.draw();
}

PachinkoChooseDifficultyScene.prototype.MediumButtonAction = function() {
  manager.change(PACHINKO.master.values.count, 4);
  stage.transitionTo('PachinkoPlayScene');
  PachinkoPlayScene.dropButton.hide();
  PachinkoPlayScene.dropButton.draw();
}


PachinkoChooseDifficultyScene.prototype.HardButtonAction = function() {
  manager.change(PACHINKO.master.values.count, 3); //6
  stage.transitionTo('PachinkoPlayScene');
  PachinkoPlayScene.dropButton.hide();
  PachinkoPlayScene.dropButton.draw();
}
