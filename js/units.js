// on a timer, drops all tanks from ceiling
function spawnUnits() {
  console.log('dropping tanks');
  for (var i = 0; i < playerCount; i++) {
    console.log('dropping tank', i);
    // create new unit
    var unit = units.getFirstExists(false);
    unit.reset(game.rnd.integerInRange(32, GAME_WIDTH - 32), 32);
    // configure unit animations
    unit.animations.add('moveTurret', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        1, false);
    // unit.animations.add('turretLeft', [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        // 1, false);
    // store unit under players (TODO have players obj reference their unit)
    players[i] = unit;
    console.log('players[i] is', players[i]);
    // configure unit physics
    unit.body.gravity.y = 20;
  }
}

// function moveTurret(unit, turretChange) {
  // // TODO careful of hardcoded mod
  // turretPosition = (unit._frame.index + turretChange) % 11;
  // unit._frame.index = turretPosition;
// }
