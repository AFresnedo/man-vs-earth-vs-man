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

// pre: ammo is proper index of ammoList and player exists
// post: returns false if player has 0 of that ammo, else true
function checkAmmo(ammo, player) {
  console.log('ammo check on', ammo);
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
  console.log('ammo remaining is', amt);
  if (amt) {
    return true;
  }
  else {
    return false;
  }
}

// displays a chute for the given tank
function pullChute(tank) {
  // set condition that tank has a chute showing
  tank.chute = true;
  var parachute = parachutes.getFirstExists(false);
  // spawn parachute 16 pixels above tank
  parachute.reset(tank.position.x, tank.position.y - 16);
  // set parachute speed to tank speed
  parachute.body.velocity.y = tank.body.velocity.y;
  // give parachute same gravity as tank
  parachute.body.gravity.y = tank.body.gravity.y;
}

function useAmmo(ammo, player) {
  switch (ammoList[ammo]) {
    case 'standard':
      player.inventory.standardShot--;
      break;
    case 'mega':
      player.inventory.megaBomb--;
      break;
    case 'ultra':
      player.inventory.ultraBomb--;
      break;
  }
}
