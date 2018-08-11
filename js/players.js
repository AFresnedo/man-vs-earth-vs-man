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

function Player(name, score, inventory, unit, angle) {
    // primitives
    this.name = name;
    this.score = score;
    this.dead = false; // players are created alive
    // objects
    this.inventory = inventory;
    this.unit = unit;
    this.angle = angle;
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
