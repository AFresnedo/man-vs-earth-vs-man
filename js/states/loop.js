var loopState = {
  create: function() {
    // TODO determine if players must be global
    // create players array
    var players = [];

    console.log('loop create reached!');
    // display sky/background
    var background = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
    background.autoScroll(-19, 0);

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
    // for amount of units selected, atm just 1
    var unitOne = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'dude');

    // TODO move to "win" state when <=1 tank remains
  }
}
