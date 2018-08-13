// on a timer, drops all tanks from ceiling
function spawnUnits() {
  // figure out drop zones to prevent overlap
  var zone = 700 / playerCount;
  console.log('dropping tanks');
  var startZone = 0;
  var endZone = 32;
  for (var i = 0; i < playerCount; i++) {
    // give tanks an incremental spawn zone across X axis to prevent overlap
    startZone = (zone * i);
    endZone = (zone * (i + 1));
    console.log('startZone is', startZone);
    console.log('endZone is', endZone);
    console.log('dropping tank', i);
    // create new unit
    var unit = units.getFirstExists(false);
    var randPosX = game.rnd.integerInRange(startZone, endZone);
    unit.reset(randPosX, 32 + 16);
    // TODO refactor parachutes somewhere else
    var parachute = parachutes.getFirstExists(false);
    parachute.reset(randPosX, 32);
    parachute.body.gravity.y = STANDARD_FALL - 1;
    // adjust hitbox to resemble graphic
    unit.body.setSize(28, 16, TANK_X_OFFSET, TANK_Y_OFFSET);
    // set gravity for unit
    unit.body.gravity.y = STANDARD_FALL;
    // configure unit animations
    unit.animations.add('moveTurret', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        1, false);
    // give player reference to their unit
    players[i].unit = unit;
    console.log('players[i].name is', players[i].name);
  }
}
