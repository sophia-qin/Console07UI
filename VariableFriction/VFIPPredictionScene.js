"use strict";

var PRED_BLOCK_NUM = 0;  /* to specify the number of blocks to run */
var PRED_BLOCK_BASE = 0; /* 5 blocks from here */
var PRED_TIME_BASE = 0; /* 5 blocks from here */
var PRED_EVENT_START = 0;
var PRED_EVENT_RACE_OVER = 0;

var maxSelectableBlocks = 5;

function VFIPPredictionScene()
{
  Scene.call(this);
  
  this.predictionOrder = [0, 0, 0, 0, 0];
  this.results = [0,0,0,0,0]; //holds the times returned from the hardware
  this.orderLocXPos = [0,0,0,0,0];   //hold the xlocation of the prediction order
  this.orderLocYPos = [0,0,0,0,0];   //hold the ylocation of the prediction order
  this.order = [0, 0, 0, 0, 0];
  this.blockSlider = [0, 0, 0, 0, 0];
  
  var errorButtonWidth =  200;
  var errorButtonHeight = 150;
  
  //this.errorButton = new ErrButton("Please select order for all discs", {size:30, fill:0}, this.errorAction.bind(this));
  
  this.errorButtonSym = null;
  
  this.orderXPos = (windowWidth / 3) * 2;
  
  this.title = new Label(windowWidth/2, borderBufferDist, "Predict the Order of Blocks", attrs);
  //this.homeButton = new HomeButton(this.homeAction.bind(this));
  //this.runButton = new NextButton(this.runCommand.bind(this));
  
  this.blockXPos = floor(windowWidth / 3);
 
  for (var k = 0; k < 5; k++)
  {
    this.blockSlider[k] = new BlockOrderSelect(this.blockXPos - 100, borderBufferDist/2 + blockPositions[k] + k*gap, blockButtonSize, blockButtonSize);
    this.blockSlider[k].sliderImage(aluminumImg); // predictionImages[k];
    this.blockSlider[k].setSelectedBlocks(k);
    this.addActor(this.blockSlider[k]);
  }
  
  
  /*
  this.blockSlider[1] = new BlockOrderSelect(this.blockXPos - 100, borderBufferDist/2 + blockPositions[1] + 1*gap, blockButtonSize, blockButtonSize);
  this.blockSlider[1].sliderImage(blockImg);
  this.blockSlider[1].setSelectedBlocks(5);
  this.addActor(this.blockSlider[1]);
  */
  
  console.log("created SelectAnyPredictOrderScene");
  
  this.border = new BackgroundBorder();
  this.border.z = -1;
  
  this.addActor(this.border);
  this.addActor(this.title);
  //this.addActor(this.homeButton);
  //this.addActor(this.runButton);
  //this.addActor(this.errorButton);
  
}

_inherits(VFIPPredictionScene, Scene);

VFIPPredictionScene.prototype.runCommand = function() {
  // find the prediction order
  
  //this.predictionOrder[i] = this.blockSlider[k].BlockPos();
  if ( this.predictionOrder[i] === 0 )
  {
    this.errorButtonSym = this.addActor(this.errorButton);
    return;
  }
  // get the selected block index
 // manager.change(PRED_BLOCK_NUM, this.numberOfSelectedBlocks);
  for ( var j = 0; j < numberOfBlocks; j++ )
  {
   // manager.change(PRED_BLOCK_BASE + j, this.whichBlocks[j]);
  }

  //manager.sendEvent(PRED_EVENT_START);
  console.log("Sending (PRED_EVENT_START) Command to Hardware");
  
  // for testing only.  create return status to test the results screen
  
   this.results[0] = 5555;
   this.results[1] = 3455;
   this.results[2] = 1234;
   this.results[3] = 2354;
   this.results[4] = 5678;
   stage.pause();
   setTimeout(function(){
             this.eventCB();
             }.bind(this), 500);
   stage.pause();
  
};

/*VFIPPredictionScene.prototype.errorAction = function()
{
  this.removeActor(this.errorButtonSym);
  this.errorButtonSym = null;
} */

VFIPPredictionScene.prototype.eventCB = function() {
  console.log("eventCB ");
  stage.resume();
  resultsScene.setResults(numberOfBlocks, numberOfBlocks, this.results, this.predictionOrder);
   stage.transitionTo('resultsScene');
}

VFIPPredictionScene.prototype.empty = function() {
  
}

VFIPPredictionScene.prototype.blockOrderCB = function(index) {
  console.log("setting up callback for command index " + index);
  
  return function(value) {
    // code to handle the value from the hardware.
    this.results[index] = value;
    console.log("HW return value : " + this.results[index] + "   for block " + (this.whichBlocks[index]+1));
  }.bind(this);
  
}

VFIPPredictionScene.prototype.homeAction = function() {
  homeAction();
}

 VFIPPredictionScene.prototype.displaySelectedBlocks = function()  {
   console.log("SelectAnyPredictOrderScene display selected blocks");
  
   // clear all images from scene
   for ( var j = 0; j < numberOfBlocks; j++ )
   {
     if (this.blockSliderSym[j] !== null)
     {
       this.removeActor(this.blockSliderSym[j]);
       this.blockSliderSym[j] = null;
     }
     this.order[j] = 0;
    
   }
  
   this.numberOfSelectedBlocks = 0;
   this.whichBlocks = [0, 0, 0, 0, 0];
   this.predictionOrder = [0, 0, 0, 0, 0];
   var count = 0;
   for (var i = 0; i < numberOfBlocks; i++ )
   {
     if ( trueFalseArduinoSend[i] === 1 )
     {
       this.whichBlocks[this.numberOfSelectedBlocks++] = i;
       this.blockSliderSym[i] = this.addActor(this.blockSlider[i]);
       console.log("(" + count + ") order location x " + this.orderLocXPos[count] + "  y " + this.orderLocYPos[count]);
     }
   }
   for(var i = 0; i < numberOfBlocks; i++)
   {
     this.blockSlider[i].setSelectedBlocks(this.numberOfSelectedBlocks);
   }
  
}