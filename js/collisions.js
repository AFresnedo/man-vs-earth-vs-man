// ammo and unit are the objs overlapping
function directHit(ammo, unit) {
  if (unit === shooter.unit) {
    console.log('suicide avoided');
  }
  else {
    console.log('direct hit detected');
    // give shooter credit and reward
    shooter.score += 1;
    shooter.inventory.money += 100;
    // destroy attack object
    ammo.kill();
    // destroy target
    var target = getPlayer(unit);
    unit.kill(); // remove sprite from game
    target.dead = true; // mark player as dead
    console.log('playersLeft is', playersLeft());
  }
}

function destruction(ammo, tile) {
  console.log('tile is', tile);
  map.removeTile(tile.x, tile.y);
  // explode ammo
  ammo.kill();
}

function bigDestruction(ammo, tile) {
  var x = tile.x;
  var y = tile.y;
  console.log('origin tile is', tile);
  // remove surrounding tiles
  map.removeTile(x + 1, y); // to the right
  map.removeTile(x, y + 1); // above
  map.removeTile(x + 1, y + 1); // diagonal rightup
  map.removeTile(x - 1, y); // to the left
  map.removeTile(x, y - 1); // below
  map.removeTile(x - 1, y - 1); // diagonal leftup
  map.removeTile(x + 1, y - 1); // diagonal rightdown
  map.removeTile(x - 1, y + 1); // diagonal leftdown
  // remove origin tile last, so movement starts after it's clear
  map.removeTile(x, y);
  // explode ammo
  ammo.kill();
}

// TODO improve algorithm
function massDestruction(ammo, tile) {
  var x = tile.x;
  var y = tile.y;
  console.log('origin of massDestruc is', tile);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      map.removeTile(x + i, y + j);
      map.removeTile(x - i, y - j);
      map.removeTile(x + i, y - j);
      map.removeTile(x - i, y + j);
    }
  }
  // explode ammo
  ammo.kill();
}

// TODO called by another function that destroys ammo
function recursiveMassDestruction(tile, radius = 3) {
  // destruction size is a radius of 3
  // base case: origin tile
  var baseTile = tile;
  // call recursive in 6 directions?
}

function releaseChute(chute, tank) {
  // remove parachute from display
  chute.kill();
  // indicate that chute is no longer showing
  tank.chute = false;
  // make tank vulnerable to fall damage
  var owner = getPlayer(tank);
  owner.inventory.parachute = false;
  // provide "fall death" grace period
  tank.chuteSafety = game.time.now + 100;
}

function groundContact(tank) {
  if (tank.fallDeath) {
    console.log('no chute!');
    getPlayer(tank).dead = true;
    tank.kill();
  }
}
