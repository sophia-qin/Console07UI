"use strict";

function BlockOrderSelect(x, y, width, height)
{
  Actor.call(this, x, y);
  
  this.attrs = {fill:0, size:50, align:CENTER, style:NORMAL, leading:50};
  
  this.numberOfDisplayBlocks = numberOfBlocks;
  
  this.squareBoarders = [0, 0, 0, 0, 0];
  this.imageWidth = width;
  this.width = width;  // the width of all the displayed rectangles; will be calculated in howManyBlocks
  this.height = height;
  this.position = 0;
  this.blockPosition = 0;
  this.xPos = x;
  
  this.touchID = null;
}

// This does the bulk of the work in making Slider a subclass of Actor.
// Basically, it does Slider.prototype.prototype = Actor.prototype
_inherits(BlockOrderSelect, Actor);

BlockOrderSelect.prototype.setSelectedBlocks = function howManyBlocks(numberOfDisplayBlocks)
{
  console.log("BlockOrderSelect number of selected block " + numberOfDisplayBlocks);
  this.numberOfDisplayBlocks = numberOfDisplayBlocks;
  for (var i = 0; i <= this.numberOfDisplayBlocks; i++)
  {
    this.squareBoarders[i] = ((this.imageWidth * i));
  }

  this.blockPosition = 0;
  this.position = this.squareBoarders[0];
  this.width = this.squareBoarders[this.numberOfDisplayBlocks] + this.imageWidth;
}

BlockOrderSelect.prototype.blockPos = function blockPos()
{
  console.log("BlockPos  " + this.blockPosition);
  return this.blockPosition;
}

BlockOrderSelect.prototype.sliderImage = function sliderImage(img)
{
  this.sliderIcon = img;
}
// Required method that returns the size of the actor
BlockOrderSelect.prototype.size = function size()
{
  return [this.width, this.height];
};

// Required method that actually draws the actor
BlockOrderSelect.prototype.draw = function draw()
{
  noFill();
  strokeWeight(3);
  
  for(var j = 1; j <= this.numberOfDisplayBlocks; j++)
  {
    rect(this.squareBoarders[j], 0, this.imageWidth, this.height);
  }
  
  if ( this.blockPosition !== 0 )
  {
    fill(YELLOW);
    rect(this.squareBoarders[this.blockPosition], 0, this.imageWidth, this.height);
  }
  image(this.sliderIcon, this.position, 0, this.imageWidth, this.height);

  //fill(attrs.fill); <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< WHAT DOES THIS DO? TT
  textSize(attrs.size);
  textAlign(attrs.align);
  textStyle(attrs.style);
  textLeading(attrs.leading);

  for ( var i = 1; i <= this.numberOfDisplayBlocks; i++ )
  {
    text(i, this.squareBoarders[i] + 6, 8, this.imageWidth, this.height);
  }
};

BlockOrderSelect.prototype.boundsCheck = function boundsCheck(touch)
{
  var inbounds = (touch.x <= (this.squareBoarders[1] + (this.imageWidth * this.numberOfDisplayBlocks))
  && touch.x >= this.squareBoarders[1]
  && touch.y <= this.height
  && touch.y >= 0);

  this.xPos = touch.x;
  console.log("bounds check " + inbounds + "    x " + touch.x + "  y " + touch.y + "  border " + this.squareBoarders[1] + " width " + (this.imageWidth * this.numberOfDisplayBlocks));

  return inbounds;
};

// overrides Actor.touchStarted, does what you'd think
BlockOrderSelect.prototype.touchStarted = function touchStarted(t)
{
  console.log("touch started");
  if (this.touchID === null && this.boundsCheck(t)) {
    console.log("touch started id " + t.id);
    this.touchID = t.id;
    return true;
  }
  return false;
};

// overrides Actor.touchEnded, does what you'd think
BlockOrderSelect.prototype.touchEnded = function touchEnded(t)
{
  if (this.touchID === t.id) {
    for ( var i = 1; i <= this.numberOfDisplayBlocks; i++ )
    {
      if ( this.xPos >= this.squareBoarders[i] && this.xPos <= this.squareBoarders[i] + this.imageWidth )
      {
        this.blockPosition = i;
        console.log("touch ended block position  " + this.blockPosition);
        break;
      }
    }
    this.touchID = null;
  }
};