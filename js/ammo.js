/* This script contains all the different ammo used by the game. Information
 * about cost, power range, weight, and other weapon-specific values are stored
 * in the objects for each weapon type. Since the game uses phaser's weapon
 * manager for combat mechanics this script must be designed to encapsulate
 * phaser's weapon manager from the rest of the game (excluding
 * collision/overlap).
 */

function Tracer() {}

function ChainShot() {}

function Nuke() {}

// TODO check default value syntax
function StandardShot(weight = 100, explSize = 32, power = 100, cost = 0) {
  this.weight = weight;
  this.explSize = explSize;
  this.power = power;
  this.cost = cost;
}

// bullet and unit are the objs overlapping
// type is the type of ammo used
function directHit(shell, unit) {
  if (unit === shooter.unit) {
    console.log('suicide avoided');
  }
  else {
    console.log('direct hit detected');
    shooter.score += 1;
    // destroy attack object
    shell.kill();
    // destroy target
    var owner = getPlayer(unit);
    unit.kill(); // remove sprite from game
    owner.dead = true; // mark player as dead
    console.log('playersLeft is', playersLeft);
  }
}
