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
    // objects
    this.inventory = inventory;
    this.unit = unit;
}
