/** Class for an Enemy */
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  this.y = 0;
  this.speed = 0; // Value between 0 and 1, do created Bugs with different speed

  Resources.load(this.sprite);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Class for the Player */
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.reset();

  Resources.load(this.sprite);
};

Player.prototype.update = function() {

};

/** Handles the Keybord input. Changing the Coordinate
 * the Player is at the Moment.
 * @param {string} pressedKey - The pressed Key
 */
Player.prototype.handleInput = function(pressedKey) {
  switch (pressedKey) {
    case 'left':
      if (this.x > 100) {
        this.x = this.x - 100;
      }
      break;
    case 'up':
      if (this.y > 30) {
        this.y = this.y - 90;
      } else {
        this.reset();
      }
      break;
    case 'right':
      if (this.x < 401) {
        this.x = this.x + 100;
      }
      break;
    case 'down':
      if (this.y < 390) {
        this.y = this.y + 90;
      }
      break;
    default:
      // this shoudn't happen, but better safe than sorry
      console.log("Not able to find a use for the pressed key " + pressedKey);
      break;
  }
};

/** Resets the Player Position to the Start Values */
Player.prototype.reset = function() {
  this.x = 201;
  this.y = 390;
};

/** Draws the Image to the Canvas */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [];



/** Listens for all Keypresses and send them to the Player Input Handler */
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    65: 'left',
    37: 'left',
    87: 'up',
    38: 'up',
    68: 'right',
    39: 'right',
    83: 'down',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
