// on a timer, drops all tanks from ceiling
function spawnUnits() {
  console.log('dropping tanks');
  for (var i = 0; i < playerCount.value; i++) {
    console.log('dropping tank', i);
    // create new unit
    var unit = units.getFirstExists(false);
    unit.reset(game.rnd.integerInRange(32, GAME_WIDTH - 32), 32);
    // store unit under players
    players[i] = unit;
    console.log('players[i] is', players[i]);
    unit.body.gravity.y = 20;
  }
}
