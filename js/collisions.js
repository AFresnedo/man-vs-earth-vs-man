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
  // remove origin tile
  map.removeTile(x, y);
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
  // explode ammo
  ammo.kill();
}
