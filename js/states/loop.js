var loopState = {

  // input
  leftKey: null,
  rightKey: null,
  upKey: null,
  downKey: null,
  enterKey: null,
  spaceKey: null,

  // game mechanics
  turretMoveCooldown: 0,
  fireCooldown: 0,

  create: function() {
    console.log('loopState: create reached!');

    //
    // user input
    //
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


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
    // configure unit physics (gravity and others set individually in spawn)
    units.enableBody = true;
    units.physicsBodyType = Phaser.Physics.ARCADE;
    // tell game how many unit objects are required and their sprite source
    units.createMultiple(playerCount, 'tank');
    // prevent units from existing outside map
    units.setAll('outOfBoundsKill', true);
    units.setAll('checkWorldBounds', true);
    // TODO spawn units during flyby intro (hence function, for callback)
    spawnUnits();

    console.log('begin turn:', gameTurn);

    //
    // create weapons/ammo
    //
    shell = game.add.weapon(playerCount, 'shell');
    shell.bulletGravity.y = 15;
    shell.bulletSpeed = -50;

  },

  update: function() {
    // get the player whose turn it is
    currentPlayer = players[gameTurn];
    // check for win
    if (playersLeft() <= 1) {
      game.state.start('end');
    }
    // skip turn if player's tank is dead
    if (currentPlayer.dead) {
      gameTurn = (gameTurn + 1) % playerCount;
      return;
    }
    // setup turret movement animation
    currentPlayer.unit.animations.play('moveTurret');
    currentPlayer.unit.animations.paused = true;

    //
    // turret movement
    //
    if (this.rightKey.isDown && (game.time.now > this.turretMoveCooldown)) {
      // increase angle unless it's maxed out
      if (currentPlayer.angle >= 180) {
        console.log('turret already max right');
      }
      else {
        players[gameTurn].angle += 18;
      }
      console.log('updating angle to', players[gameTurn].angle);
      this.turretMoveCooldown = game.time.now + 250;
      currentPlayer.unit.animations.next();
    }
    else if (this.leftKey.isDown && (game.time.now > this.turretMoveCooldown)) {
      // reduce angle unless it's already at 0
      if (players[gameTurn].angle <= 0) {
        console.log('turret already max left');
      }
      else {
        players[gameTurn].angle -= 18;
      }
      console.log('updating angle to', players[gameTurn].angle);
      this.turretMoveCooldown = game.time.now + 250;
      this.turretMoveCooldown = game.time.now + 250;
      currentPlayer.unit.animations.previous();
    }

    //
    // turret controls (excluding movement)
    //
    if (this.spaceKey.isDown && (game.time.now > this.fireCooldown)) {
      // store shooter before gameTurn changes
      shooter = currentPlayer;
      // update cooldown
      this.fireCooldown = game.time.now + 500;
      // set angle
      // gameTurn, as the index, is used to separate each player's angle
      console.log('fire angle is', players[gameTurn].angle);
      shell.fireAngle = players[gameTurn].angle;
      // set bullet origin point
      var pos = new Phaser.Rectangle(currentPlayer.unit.x,
          currentPlayer.unit.y);
      shell.fireFrom = pos;
      console.log('fire from', pos);
      // fire!
      console.log('fuego!');
      shell.fire();
      // go to next turn
      gameTurn = (gameTurn + 1) % playerCount;
      console.log('turn updated to', gameTurn);
    }

    //
    // collisions
    //
    game.physics.arcade.overlap(shell.bullets, units, directHit);
    game.physics.arcade.collide(shell.bullets, map, directHit);
    // check units and terrain
    units.forEach(function(unit) {
      game.physics.arcade.collide(unit, layer);
    });
    // check shells and terrain
    units.forEach(function(unit) {
      game.physics.arcade.collide(unit, layer);
    });
  }
};
