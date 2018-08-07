var loopState = {
  create: function() {
    // TODO determine if players must be global
    // create players array
    var players = [];

    console.log('loop create reached!');
    // display sky/background
    var background = game.add.sprite(0, 0, 'sky');
    background.scale.x = 2.5;
    background.scale.y = 2.5;

    //
    // create terrain
    //
    // display terrain
    var terrain = game.add.sprite(0, GAME_HEIGHT / 2, 'terrain');
    terrain.scale.x = 0.5;
    terrain.scale.y = 0.5;

    //
    // spawn units
    //
    var units = game.add.group;
    units.enableBody = true;
    units.setAll('outOfBoundsKill', true);
    units.setAll('checkWorldBounds', true);
    // TODO call spawnUnits
    // display all units
    var unitOne = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'dude');


    // TODO move to "win" state when <=1 tank remains
  }
}
