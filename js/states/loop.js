var loopState = {
  create: function() {

    //
    // user input
    //
    arrowKeys = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR,
        Phaser.Keyboard.ENTER]);

    console.log('loopState: create reached!');

    //
    // create terrain
    //
    var map = game.add.tilemap('earth');
    map.addTilesetImage('ground_tiles', 'earthTile');
    layer = map.createLayer('Tile Layer 1');
    map.setCollisionBetween(0, TILES_WIDE * TILES_HIGH);

    //
    // spawn units
    //
    units = game.add.group();
    units.enableBody = true;
    units.physicsBodyType = Phaser.Physics.ARCADE;
    units.createMultiple(playerCount.value, 'tank');
    units.setAll('outOfBoundsKill', true);
    units.setAll('checkWorldBounds', true);
    // TODO spawn units during flyby intro (hence function, for callback)
    spawnUnits();

    // TODO start game "paused", makes coding player turns in update easier
    gameTurn = 0;
    console.log('turn:', gameTurn);


    // TODO move to "win" state when <=1 tank remains
  },

  update: function() {
    // check ground and tank collisions
    units.forEach(function(unit) {
      game.physics.arcade.collide(unit, layer);
    });

    // TODO update next turn
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      gameTurn++;
      console.log('turn updated to', gameTurn);
    }
  }

};
