var loopState = {
  create: function() {

    //
    // user input
    //
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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
    console.log('begin turn:', gameTurn);


    // TODO move to "win" state when <=1 tank remains
  },

  update: function() {
    // scope
    var currentUnit = players[gameTurn];
    // check ground and tank collisions
    units.forEach(function(unit) {
      game.physics.arcade.collide(unit, layer);
    });

    // TODO update next turn to use real game logic
    if (enterKey.isDown && (game.time.now > turnTime)) {
      turnTime = game.time.now + 500;
      gameTurn = (gameTurn + 1) % playerCount.value;
      console.log('turn updated to', gameTurn);
      currentUnit.animations.play('moveTurret');
      currentUnit.animations.paused = true;
    }

    if (rightKey.isDown && (game.time.now > turretTime)) {
      console.log('moving turret');
      turretTime = game.time.now + 250;
      // players[gameTurn] points to the current player's unit, atm
      // TODO update players[gameTurn] for player object
      currentUnit.animations.next();
      // console.log('moving turret from', players[gameTurn]._frame.index);
      // players[gameTurn].frame = 0;
      // // moveTurret(players[gameTurn], -1);
      // console.log('moving turret to', players[gameTurn]._frame.index);
    }
    else if (spaceKey.isDown) {
      console.log('pausing animation');
    }
  }

};
