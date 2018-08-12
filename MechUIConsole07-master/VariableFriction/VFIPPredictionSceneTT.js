"use strict";

var cubeSize = 200;
var bigCubeSize = 250;
var numCubes = 2;
var selectedCube = -1;

var boxSize = 300;
var numBoxes = 2;

function VFIPPredictionSceneTT() {
  /////////// Basic Setup ////////
  Scene.call(this);
  this.title = new Label(windowWidth/2, borderBufferDist, "Predict the Order of Blocks", attrs);
  this.border = new BackgroundBorder();
  this.border.z = -1;
  
  /////////// Object Variables ////////
  this.cubes = [0, 0]; // holds cube objects in an indexed array
  this.cubeXPos = [windowWidth*.3 - cubeSize/2, windowWidth*.7 - cubeSize/2];
  this.cubeYPos = windowHeight*.3 - cubeSize/2;
  
  this.boxState = [-1, -1]; // will hold information on selected boxes: -1 if empty, else holds cube number
  this.boxes = [0, 0]; // holds box objects in an indexed array
  this.boxXPos = [windowWidth*.3 - boxSize/2, windowWidth*.7 - boxSize/2];
  this.boxYPos = windowHeight*.7 - boxSize/2;
  
  /////////// Object Declarations //////
  this.firstPlaceLabel = new Label(windowWidth*.3,  windowHeight*.5, "1st Place", attrs);
  this.secondPlaceLabel = new Label(windowWidth*.7,  windowHeight*.5, "2nd Place", attrs);
  
  // x,y,w,h,img,action,shadow
  this.firstBlueBox = new ImageButton(this.boxXPos[0], this.boxYPos, boxSize, boxSize, Img, this.boxButtonAction.bind(this, 0), null);
  this.secondRedBox = new ImageButton(this.boxXPos[1], this.boxYPos, boxSize, boxSize, Img, this.boxButtonAction.bind(this, 1), null);

  this.aluminumButton = new ImageButton(this.cubeXPos[0], this.cubeYPos, cubeSize, cubeSize, aluminumImg, this.cubeButtonAction.bind(this, 0), null);
  this.delrinButton = new ImageButton(this.cubeXPos[1], this.cubeYPos, cubeSize, cubeSize, delrinImg, this.cubeButtonAction.bind(this, 1), null);  
  
  this.cubes = [this.aluminumButton, this.delrinButton];
  this.boxes = [this.firstBlueBox, this.secondRedBox];
  
  this.nextButton = new ToggleImageButton (windowWidth*.85, windowHeight*.85, 100, 50, blockImg, delrinImg, this.nextButtonAction.bind(this), null, null);

  ////////// Object Additions //////////
  this.addActor(this.border);
  this.addActor(this.title);
  this.addActor(this.firstBlueBox);
  this.addActor(this.secondRedBox);
  this.addActor(this.firstPlaceLabel);
  this.addActor(this.secondPlaceLabel);
  this.addActor(this.aluminumButton);
  this.addActor(this.delrinButton);
  this.addActor(this.nextButton);
  
  this.nextButton.disable();
  this.nextButton.on = true;
  console.log("created PredictSceneTT");
}

_inherits(VFIPPredictionSceneTT, Scene);

VFIPPredictionSceneTT.prototype.cubeButtonAction = function(cubeNumber) {
  console.log("Tapped Cube " + cubeNumber);
  selectedCube = cubeNumber;
  //shrink all cubes
  for(var x = 0; x < numCubes; x++) {
    this.cubes[x].width = cubeSize;
    this.cubes[x].height = cubeSize;
    this.cubes[selectedCube].draw();
    
  //return cube to original location and enlarges selected cube
    if (selectedCube == this.boxState[x]) {
      this.cubes[selectedCube].animate(this.cubes[selectedCube].animMoveTo(this.cubeXPos[selectedCube], this.cubeYPos));
      this.boxState[x] = -1; // Box is now empty
      console.log(this.boxState[0], this.boxState[1]);
    }
  }

  //grows cube
  this.cubes[selectedCube].width = bigCubeSize;
  this.cubes[selectedCube].height = bigCubeSize;
  this.cubes[selectedCube].draw();
  
  //disable next button if two cubes are not in boxes
  if(this.boxState[0] == -1 || this.boxState[1] == -1) {
    this.nextButton.disable();
    this.nextButton.on = true;
  }
  console.log("Cube Grows");
}

VFIPPredictionSceneTT.prototype.boxButtonAction = function(boxNumber) {
  console.log("Tapped Box" + boxNumber);
  //if no cube selected do nothing
  if(selectedCube == -1) {}
  else {
    
  //if box already filled, move previous cube out
    if(this.boxState[boxNumber] != -1) { 
      this.cubes[this.boxState[boxNumber]].animate(this.cubes[this.boxState[boxNumber]].animMoveTo(this.cubeXPos[this.boxState[boxNumber]], this.cubeYPos));
    }
    
  //if cube is moving from one box to another, set previous box to empty
    if(this.cubes[selectedCube].y != this.cubeYPos) { 
      for(var x = 0; x < numBoxes; x++) {
        if(this.boxState[x] == selectedCube)
          this.boxState[x] = -1;
      }
    }
    
  //move selected cube and update boxState
    this.cubes[selectedCube].animate(this.cubes[selectedCube].animMoveTo(this.boxXPos[boxNumber], this.boxYPos));
    this.boxState[boxNumber] = selectedCube;
  }
  
  //enable next button if two cubes are in boxes
  if(this.boxState[0] != -1 && this.boxState[1] != -1) {
    this.nextButton.enable();
    this.nextButton.on = false;
  }
  
  //disable next button if two cubes are not in boxes
  if(this.boxState[0] == -1 || this.boxState[1] == -1) {
    this.nextButton.disable();
    this.nextButton.on = true;
  }
  console.log(this.boxState[0], this.boxState[1]);
}

VFIPPredictionSceneTT.prototype.nextButtonAction = function() {
  console.log("next stage transition");
}