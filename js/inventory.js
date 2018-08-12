/* The inventory script contains the inventory object. It has its own script
 * file because I suspect that it will start attracting or requiring additional
 * code as the game progresses in development. If not, merge into players.js.
 */

// inventory defaults for normal play, money parameter for handicap play
// TODO check syntax for parameter defaults
function Inventory(money = 0) {
    // inventory counts for inventory's owner
    this.money = money;
    this.parachute = true;
    this.standardShot = 10;
    this.megaBomb = 1;
}

function ammoSwitch(direction) {
  if (direction === 'up') {
    console.log('switch weapon up');
  }
  else if (direction === 'down') {
    console.log('switch weapon down');
  }
  else {
    throw 'improper direction given in ammoSwitch';
  }
}
