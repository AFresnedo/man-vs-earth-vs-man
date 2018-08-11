/* The inventory script contains the inventory object. It has its own script
 * file because I suspect that it will start attracting or requiring additional
 * code as the game progresses in development. If not, merge into players.js.
 */

function Inventory(money, tracers, ammoList, utilityList) {
    // primitives
    this.money = money;
    this.tracers = tracers;
    // arrays
    this.ammoList = ammoList;
    this.utilityList = utilityList;
}

