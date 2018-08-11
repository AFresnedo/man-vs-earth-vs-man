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
  // TODO remove debug injection
  console.log('tank is', tank);
  tank.andres_tank_injection = 'im the dead one';
  // scan players for a match
  players.forEach(function(player) {
    console.log('player is', player.name);
    player.unit.andres_player_injection = player.name;
    console.log('players tank is', player.unit);
    if (player.unit === tank) {
      return player;
    }
  });
  // a tank should always be claimed by a player
  throw 'player not found in getPlayer(unit)!';
}
