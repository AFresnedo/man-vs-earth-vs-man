// ammo and unit are the objs overlapping
function directHit(ammo, unit) {
  if (unit === shooter.unit) {
    console.log('suicide avoided');
  }
  else {
    console.log('direct hit detected');
    shooter.score += 1;
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

function massDestruction(ammo, tile) {
  var x = tile.x;
  var y = tile.y;
  console.log('origin of massDestruc is', tile);
  for (var i = 0; i < 4; i++) {
    map.removeTile(x + i, y); // to the right
    map.removeTile(x, y + i); // above
    map.removeTile(x + i, y + i); // diagonal rightup
    map.removeTile(x - i, y); // to the left
    map.removeTile(x, y - i); // below
    map.removeTile(x - i, y - i); // diagonal leftup
    map.removeTile(x + i, y - i); // diagonal rightdown
    map.removeTile(x - i, y + i); // diagonal leftdown
    map.removeTile(x, y);
  }
  // explode ammo
  ammo.kill();
}

function releaseChute(chute, tank) {
  // remove parachute from display
  chute.kill();
  // make tank vulnerable to fall damage
  tank.chute = false;
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
