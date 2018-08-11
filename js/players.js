/*
 * This script contains the objects and functions related to players. Most
 * importantly, the player object. The player object has all the data that is
 * shared in type, but specific in value, to each player.
 *
 * Created by Andres Fresnedo
 */

function Inventory(money, tracers, ammoList, utilityList) {
    // primitives
    this.money = money;
    this.tracers = tracers;
    // arrays
    this.ammoList = ammoList;
    this.utilityList = utilityList;
}

function Player(name, score, inventory, unit) {
    // primitives
    this.name = name;
    this.score = score;
    this.dead = false; // players are created alive
    this.angle = 0; // turrets begin at 0 degree angles
    // objects
    this.inventory = inventory;
    this.unit = unit;
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
