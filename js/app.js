// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // Set initial potition according its row
    this.x = 0;
    this.y = (row * 83) + 72;
    
    // Set enemy speed randomly (minSpeed <= enemy speed < maxSpeed)
    minSpeed = 50;
    maxSpeed = 250;
    this.speed = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speed * dt) % 505;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Return enemy bounding box (used to check collisions)
Enemy.prototype.getBoundingBox = function() {
    return { 
        x: this.x,
        y: this.y + 50,
        width: 50,
        height: 50
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = "images/char-boy.png";
    // Set initial position
    this.x = 202;
    this.y = 404;
};

// Do nothing as no player properties has to be updated
Player.prototype.update = function() {

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x - 101 >= 0) {
                this.x = this.x - 101;
            }            
            break;
        case 'up':
            if (this.y - 83 >= 0) {
                this.y = this.y - 83;
            }
            break;
        case 'right':
            if (this.x + 101 <= 404) {
                this.x = (this.x + 101);
            }
            break;
        case 'down': 
            if (this.y + 83 <= 404) {
                this.y = this.y + 83 ;
            }
            break;
    }
};

// Return player bounding box (used to check collisions)
Player.prototype.getBoundingBox = function() {
    return { 
        x: this.x,
        y: this.y + 50,
        width: 50,
        height: 50
    };
};

// Called when the game is over (an enemy and the player colllide)
Player.prototype.die = function() {
    // GAME OVER - Return to initial position
    this.x = 202;
    this.y = 404;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies (one per row)
// Place the player object in a variable called player
var allEnemies = [new Enemy(0), new Enemy(1), new Enemy(2)];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
