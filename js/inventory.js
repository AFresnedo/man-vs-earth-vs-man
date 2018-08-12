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

function ammoSwitch(direction, player) {
  if (direction === 'up') {
    console.log('switch weapon up');
    player.ammo = (player.ammo + 1) % player.ammoList.length;
  }
  else if (direction === 'down') {
    console.log('switch weapon down');
    if (player.ammo === 0) {
      // if ammo selection is already at bottom, go to top
      player.ammo = player.ammoList.length - 1;
    }
    else {
      player.ammo--;
    }
  }
  else {
    throw 'improper direction given in ammoSwitch';
  }
}
