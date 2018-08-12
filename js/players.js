/*
 * This script contains the objects and functions related to players. Most
 * importantly, the player object. The player object has all the data that is
 * shared in type, but specific in value, to each player.
 *
 * Created by Andres Fresnedo
 */

function Player(name, score, inventory, unit) {
    // primitives
    this.name = name;
    this.score = score;
    this.dead = false; // players are created alive
    this.angle = 0; // turrets begin at 0 degree angles
    // objects
    this.inventory = inventory;
    this.unit = unit;
    this.ammo = 0;
    this.power = 500;
}

// returns count of players alive in players[]
function playersLeft() {
  totalPlayers = players.length;
  for (var i = 0; i < players.length; i++) {
    if (players[i].dead === true) {
      totalPlayers--;
    }
  }
  return totalPlayers;
}

// post: returns false if no winner, else that winner's player object
function winner() {
  // check if a winner is possible
  if (playersLeft() !== 1) {
    return false;
  }
  // since there is a winner, return them
  else {
    var winner = null;
    players.forEach(function(player) {
      if (!player.dead) {
        winner = player;
      }
    });
    if (winner) {
      return winner;
    }
    else {
      throw '1 player left but no winner detected in winner()';
    }
  }
}

// pre: players[] is in scope, unit is a phaser sprite in game
// post: returns the player object that the sprite belongs to
function getPlayer(tank) {
  var owner = null;
  // scan players for a match
  players.forEach(function(player) {
    if (player.unit === tank) {
      owner = player;
    }
  });
  // if owner found, return that player object
  if (owner) {
    return owner;
  }
  // else throw exception, a tank should always be claimed by a player
  else {
    throw 'player not found in getPlayer(unit)!';
  }
}
