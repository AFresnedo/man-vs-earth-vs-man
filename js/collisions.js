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
  // remove origin tile
  map.removeTile(x, y);
  // remove surrounding tiles
  map.removeTile(x + TILE_WIDTH, y); // to the right
  map.removeTile(x, y + TILE_HEIGHT); // above
  map.removeTile(x + TILE_WIDTH, y + TILE_HEIGHT); // diagonal rightup
  map.removeTile(x - TILE_WIDTH, y); // to the left
  map.removeTile(x, y - TILE_HEIGHT); // below
  map.removeTile(x - TILE_WIDTH, y - TILE_HEIGHT); // diagonal leftup
  map.removeTile(x + TILE_WIDTH, y - TILE_HEIGHT); // diagonal rightdown
  map.removeTile(x - TILE_WIDTH, y + TILE_HEIGHT); // diagonal leftdown
  // explode ammo
  ammo.kill();
}
