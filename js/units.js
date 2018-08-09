// on a timer, drops all tanks from ceiling
function spawnUnits() {
  console.log('dropping tanks');
  console.log('playerCount, in units, is', playerCount.value);
  for (var i = 0; i < playerCount.value; i++) {
    console.log('dropping tank', i);
    // create new unit
    var unit = game.add.sprite(game.rnd.integerInRange(32, GAME_WIDTH - 32), 0,
        'tank');
    // store unit under players
    players[i] = unit;
    console.log('players[i] is', players[i]);
    // setup physics on unit
    game.physics.arcade.enable(unit);
    unit.body.gravity.y = 50;
  }
}
