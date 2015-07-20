'use strict';

function Robot() {
  // implement your solution here!
}

Robot.prototype.orient = function(direction){
  var match = direction.match(/north|west|south|east|/i)[0];

  if (match) {
    this.bearing = direction;
  } else {
    throw new Error('Invalid Robot Bearing');
  }
};

Robot.prototype.turnRight = function() {
  var newBearing;

  switch(this.bearing){
    case 'east':
      newBearing = 'south';
      break;
    case 'west': 
      newBearing = 'north';
      break;
    case 'north':
      newBearing = 'east';
      break;
    case 'south':
      newBearing = 'west';
      break;
    default:
      throw new Error('Invalid Robot Bearing');
      break;
  }

  this.bearing = newBearing;
};

Robot.prototype.turnLeft = function() {
  var newBearing;

  switch(this.bearing){
    case 'east':
      newBearing = 'north';
      break;
    case 'west': 
      newBearing = 'south';
      break;
    case 'north':
      newBearing = 'west';
      break;
    case 'south':
      newBearing = 'east';
      break;
    default:
      throw new Error('Invalid Robot Bearing');
      break;
  }

  this.bearing = newBearing;
};

Robot.prototype.at = function(x, y) {
  this.coordinates = [x, y];
};

Robot.prototype.advance = function() {
  switch(this.bearing){
    case 'north':
      this.coordinates[1] += 1;
      break;
    case 'east':
      this.coordinates[0] += 1;
      break;
    case 'south':
      this.coordinates[1] -= 1;
      break;
    case 'west':
      this.coordinates[0] -= 1;
      break;
    default:
      break;
  }
};

Robot.prototype.instructions = function(sequence) {
  var instructions = [];
  var instruction;
  var letters = sequence.slice("");
  var letter;

  for (var i = 0; i < letters.length; i++) {
    letter = letters[i];

    switch(letter){
      case 'L':
        instruction = 'turnLeft';
        break;
      case 'R':
        instruction = 'turnRight';
        break;
      case 'A':
        instruction = 'advance';
        break;
      default:
        throw new Error('Invalid Instructions')
        break;
    }

    instructions.push(instruction);

  };

  return instructions;
};

Robot.prototype.place = function(placement) {
  this.coordinates = [placement.x, placement.y];
  this.bearing = placement.direction;
};

Robot.prototype.evaluate = function(sequence) {
  var instructions = this.instructions(sequence);
  var instruction;

  for (var i = 0; i < instructions.length; i++) {
    instruction = instructions[i];
    this[instruction]();
  };
};