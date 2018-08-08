// on a timer, drops all tanks from ceiling
function spawnUnits() {
  console.log('dropping tanks');
  for (var i = 0; i < 3; i++) {
    console.log('dropping tank', i);
    // create new unit
    var unit = game.add.sprite(32, GAME_HEIGHT - 32, 'tank');
    // assign player to unit
    unit.player = i;
    // store unit under players
    players[i] = unit;
    // setup physics on unit
    game.physics.arcade.enable(unit);
    unit.body.gravity.y = 50;
  }
}
