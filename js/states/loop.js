var loopState = {
  preload: function() {
    // TODO load real bullet sprite
    game.load.image('bullet', './assets/second-pass/missile.png');
  },

  create: function() {
    console.log('loopState: create reached!');

    // init firingAngle
    for (var i = 0; i < playerCount.value; i++) {
      firingAngle.push(0);
    }

    //
    // user input
    //
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


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

    //
    // create weapons/ammo
    //
    standardShot = game.add.weapon(playerCount.value, 'bullet');
    // TODO test if bulletGravity exists, otherwise can't talk to .y
    standardShot.bulletGravity.y = 15;
    standardShot.bulletSpeed = -50;

    // TODO move to "win" state when <=1 tank remains
  },

  update: function() {
    // get the unit of the current turn's player
    currentUnit = players[gameTurn];
    // check for win
    if (playersLeft <= 1) {
      game.state.start('end');
    }
    // setup turret movement animation
    // skip turn if tank is dead
    if (!(currentUnit.dead === undefined || currentUnit.dead == false)) {
      gameTurn = (gameTurn + 1) % playerCount.value;
      return;
    }
    currentUnit.animations.play('moveTurret');
    currentUnit.animations.paused = true;
    // check ground and tank collisions
    units.forEach(function(unit) {
      game.physics.arcade.collide(unit, layer);
    });

    // TODO update next turn to use real game logic
    if (enterKey.isDown && (game.time.now > turnTime)) {
      turnTime = game.time.now + 500;
    }

    else if (rightKey.isDown && (game.time.now > turretTime)) {
      // increase angle unless it's maxed out
      if (firingAngle[gameTurn] >= 180) {
        console.log('turret already max right');
      }
      else {
        firingAngle[gameTurn] += 18;
      }
      console.log('updating angle to', firingAngle[gameTurn]);
      turretTime = game.time.now + 250;
      currentUnit.animations.next();
    }
    else if (leftKey.isDown && (game.time.now > turretTime)) {
      // reduce angle unless it's already at 0
      if (firingAngle[gameTurn] <= 0) {
        console.log('turret already max left');
      }
      else {
        firingAngle[gameTurn] -= 18;
      }
      console.log('updating angle to', firingAngle[gameTurn]);
      turretTime = game.time.now + 250;
      turretTime = game.time.now + 250;
      currentUnit.animations.previous();
    }
    else if (spaceKey.isDown && (game.time.now > fireTime)) {
      // store shooter before gameTurn changes
      shooter = currentUnit;
      // update cooldown
      fireTime = game.time.now + 500;
      // set angle
      // gameTurn, as the index, is used to separate each player's angle
      console.log('fire angle is', firingAngle[gameTurn]);
      standardShot.fireAngle = firingAngle[gameTurn];
      // set bullet origin point
      var pos = new Phaser.Rectangle(currentUnit.x, currentUnit.y);
      standardShot.fireFrom = pos;
      console.log('fire from', pos);
      // fire!
      console.log('fuego!');
      standardShot.fire()
      // go to next turn
      gameTurn = (gameTurn + 1) % playerCount.value;
      console.log('turn updated to', gameTurn);
    }

    ///
    /// bullet/bomb collision
    ///
    game.physics.arcade.overlap(standardShot.bullets, units, directHit);
  }
};
