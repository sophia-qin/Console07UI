'use strict';

//replace Poolshot everywhere with the name of the game you are using this for

function PoolshotChooseDifficultyScene() {
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

_inherits(PoolshotChooseDifficultyScene, Scene);


PoolshotChooseDifficultyScene.prototype.EasyButtonAction = function() {
  /*
   manager.change(WHEEL.master.values.speed, Math.round(Math.random() * 50 + 450));
  WOFScene.scoreTarget = 2000;
  WOFScene.resetScene();
  stage.transitionTo('WOFScene');
  */
  //stage.transitionTo('PoolshotPlayAgainScene');
    manager.change(POOLSHOT.master.values.count, 5);
  stage.transitionTo('PoolshotPlayScene');
}

PoolshotChooseDifficultyScene.prototype.MediumButtonAction = function() {
    manager.change(POOLSHOT.master.values.count, 4);
  stage.transitionTo('PoolshotPlayScene');
}


PoolshotChooseDifficultyScene.prototype.HardButtonAction = function() {
  stage.transitionTo('PoolshotPlayScene');
  manager.change(POOLSHOT.master.values.count, 3);

}
