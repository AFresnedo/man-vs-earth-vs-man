// on a timer, drops all tanks from ceiling
function spawnUnits() {
  console.log('dropping tanks');
  // TODO what does this do?
  var unit = enemies.getFirstExists(false);
  unit.body.gravity.y = 300;
  // spawn tank somewhere 40 pixels below top of game
  unit.reset(game.rnd.integerInRange(50, GAME_WIDTH - 50), 40);
}
