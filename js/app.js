/** The Sprite used for the Player */
var playerSprite = 'images/char-boy.png';

/** Number of Max Enemies on Screen */
var numberOfMaxEnemiesOnScreen = 5;

/** Used to save all Enemies in */
var allEnemies = [];

/** Class for an Enemy */
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  // Selects on of the 4 possible Rows and add subtract a little bit from it so the
  // Bug is in the Middle of the row
  this.y = (Math.floor((Math.random() * 4) + 1) * 83) - 30;
  this.speed = Math.random() + 1; // Value between 0 and 1, do created Bugs with different speed

  Resources.load(this.sprite);
};

/** Update the enemy's position, required method for game
 * @param {int} dt - a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
  this.x = this.x + (dt * this.speed * 200);

  if (this.x > 605) {
    allEnemies.splice(allEnemies.indexOf(this), 1);
    allEnemies.push(new Enemy());
  }
};

/** Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Class for the Player */
var Player = function() {
  this.sprite = playerSprite;
  this.reset();

  Resources.load(this.sprite);
};

/** Used to check if the Player has collided with an Enemy */
Player.prototype.update = function() {
  var x = Math.floor(this.x / 100);
  var y = Math.floor(this.y / 100);
  for (var i = 0; i < allEnemies.length; i++) {
    var enemyX = Math.floor(allEnemies[i].x / 100);
    var enemyY = Math.floor(allEnemies[i].y / 100);

    if (x === enemyX && y === enemyY) {
      this.reset();
      return;
    }
  }
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
      if (this.y > 58) {
        this.y = this.y - 83;
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
        this.y = this.y + 83;
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

var player = new Player();
for (var i = 0; i < numberOfMaxEnemiesOnScreen; i++) {
  allEnemies.push(new Enemy());
}

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
