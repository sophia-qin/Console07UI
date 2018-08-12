"use strict";
var buttonWidth, buttonHeight, labelY, MaglifterOpeningScene;

function MaglifterSketch()
{
  Scene.call(this);
  attrs = {size:50, leading:50};
  attrs = {fill:0, size:50, align:CENTER, style:NORMAL, leading:50};
  labelY = windowHeight/1.3;
  
  buttonWidth = windowWidth/6.5;
  buttonHeight = buttonWidth/2;
  console.log("created MaglifterSketch");

 var openNames = ["Play Game"]; // creating new buttons 
 var openActions = [this.maglifterAction.bind(this)]; // change action
 
 MaglifterOpeningScene = new ButtonsScene("Maglifter", maglifterImg, openNames, openActions, null, null);
 //Change image to maglifter and load onto sketch
 MaglifterPlayScene = new MaglifterPlayScene;
 
  
//Stage.addScene adds a scene with a particular name
  stage.addScene('MaglifterOpeningScene', MaglifterOpeningScene);
  stage.addScene('MaglifterPlayScene', MaglifterPlayScene);
}

_inherits(MaglifterSketch, Scene);

////////////////////////////////////////////////////////////////////////////////////////////

  MaglifterSketch.prototype.maglifterAction = function(){ // transition to the Maglifter scene
  stage.transitionTo('MaglifterPlayScene');
  console.log("next button clicked")
}