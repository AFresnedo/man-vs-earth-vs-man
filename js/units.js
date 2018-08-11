// on a timer, drops all tanks from ceiling
function spawnUnits() {
  console.log('dropping tanks');
  for (var i = 0; i < playerCount; i++) {
    console.log('dropping tank', i);
    // create new unit
    var unit = units.getFirstExists(false);
    unit.reset(game.rnd.integerInRange(32, GAME_WIDTH - 32), 32);
    // set gravity for unit
    unit.body.gravity.y = 20;
    // configure unit animations
    unit.animations.add('moveTurret', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        1, false);
    // give player reference to their unit
    players[i].unit = unit;
    console.log('players[i].name is', players[i].name);
  }
}
