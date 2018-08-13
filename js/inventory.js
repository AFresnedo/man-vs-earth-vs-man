/* The inventory script contains the inventory object. It has its own script
 * file because I suspect that it will start attracting or requiring additional
 * code as the game progresses in development. If not, merge into players.js.
 */

// inventory defaults for normal play, money parameter for handicap play
function Inventory(money = 100) {
    // inventory counts for inventory's owner
    this.money = money;
    this.parachute = true;
    this.standardShot = 10;
    this.megaBomb = 1;
    this.ultraBomb = 0;
}

function checkAmmo(ammo, player) {
  var amt;
  switch (ammoList[ammo]) {
    case 'standard':
      amt = player.inventory.standardShot;
      break;
    case 'mega':
      amt = player.inventory.megaBomb;
      break;
    case 'ultra':
      amt = player.inventory.ultraBomb;
      break;
  }
}
