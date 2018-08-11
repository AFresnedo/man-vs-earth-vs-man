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
