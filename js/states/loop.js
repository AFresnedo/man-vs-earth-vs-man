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
    // setup turret movement animation
    var currentUnit = players[gameTurn];
    currentUnit.animations.play('moveTurret');
    currentUnit.animations.paused = true;
    // check ground and tank collisions
    units.forEach(function(unit) {
      game.physics.arcade.collide(unit, layer);
    });

    // TODO update next turn to use real game logic
    if (enterKey.isDown && (game.time.now > turnTime)) {
      turnTime = game.time.now + 500;
      gameTurn = (gameTurn + 1) % playerCount.value;
      console.log('turn updated to', gameTurn);
    }

    else if (rightKey.isDown && (game.time.now > turretTime)) {
      turretTime = game.time.now + 250;
      currentUnit.animations.next();
    }
    else if (leftKey.isDown && (game.time.now > turretTime)) {
      turretTime = game.time.now + 250;
      currentUnit.animations.previous();
    }
    else if (spaceKey.isDown) {
      console.log('firing!');
    }
  }

};
