var loopState = {

  // available maps
  maps: ['deep-canyons-map', 'hill-map', 'hole-map', 'shallow-canyons-map'],

  // player input
  leftKey: null,
  rightKey: null,
  upKey: null,
  downKey: null,
  enterKey: null,
  spaceKey: null,

  // ammo groups
  shells: null,
  megaBombs: null,
  ultraBombs: null,
  selectedAmmo: null,

  // turret settings
  power: null,

  // input delays for user feel
  turretMoveCooldown: 0,
  fireCooldown: 0,
  selectCooldown: 0,
  powerCooldown: 0,

  // player feedback
  powerText: null,
  scoreText: null,
  ammoTypeText: null,
  playerText: null,

  preload: function() {

    // load tileset
    game.load.image('earthTile', 'assets/tiles/bland_4set.png');
    // load tilemap
    game.load.tilemap('earth',
        'assets/maps/' + this.maps[levelSelect] + '.json',
        null, Phaser.Tilemap.TILED_JSON);

  },

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
    this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);


    //
    // create terrain
    //
    map = game.add.tilemap('earth');
    map.addTilesetImage('bland_4set', 'earthTile');
    layer = map.createLayer('Ground');
    map.setCollisionBetween(0, TILES_WIDE * TILES_HIGH);

    //
    // create utility item groups
    //
    // parachutes
    parachutes = game.add.group();
    parachutes.enableBody = true;
    parachutes.physicsBodyType = Phaser.Physics.ARCADE;
    parachutes.createMultiple(playerCount, 'parachute');

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
    // create ammo groups
    //
    // standard shell
    this.shells = game.add.weapon(playerCount, 'standardShell');
    this.shells.bulletGravity.y = 80;
    this.shells.bulletSpeed = -250;
    // megaBomb
    this.megaBombs = game.add.weapon(playerCount, 'megaBomb');
    this.megaBombs.bulletGravity.y = 60;
    this.megaBombs.bulletSpeed = -200;
    // ultraBomb
    this.ultraBombs = game.add.weapon(playerCount, 'ultraBomb');
    this.ultraBombs.bulletGravity.y = 60;
    this.ultraBombs.bulletSpeed = -200;
    this.ultraBombs.bullets.forEach(function(ultraBomb) {
      ultraBomb.animations.add('ultraBomb');
    });

  },

  update: function() {
    // set game as active
    gameOn = true;
    // get the player whose turn it is
    currentPlayer = players[gameTurn];
    // check for win
    if (playersLeft() <= 1) {
      gameOn = false;
      game.state.start('end');
    }
    // skip turn if player's tank is dead
    if (currentPlayer.dead) {
      gameTurn = (gameTurn + 1) % playerCount;
      return;
    }

    //
    // display in-game-window UI for player
    //
    // remove old power setting display
    if (this.powerText !== null) {
      this.powerText.destroy();
    }
    // display power setting
    this.powerText = game.add.text(GAME_WIDTH - 250, GAME_HEIGHT - 50,
        'Power: ' + currentPlayer.power, {fill: '#ff0000'});
    // display ammo selection
    if (this.ammoTypeText !== null) {
      this.ammoTypeText.destroy();
    }
    this.ammoTypeText = game.add.text(GAME_WIDTH - 250, GAME_HEIGHT - 100,
        'Ammo: ' + ammoList[currentPlayer.ammo], {fill: '#00ffff'});
    // display current player (+1 since player 0 is confusing)
    if (this.playerText !== null) {
      this.playerText.destroy();
    }
    this.playerText = game.add.text(50, GAME_HEIGHT - 50,
        'Player: ' + (currentPlayer.name + 1), {fill: '#ffff00'});
    // display score
    if (this.scoreText !== null) {
      this.scoreText.destroy();
    }
    this.scoreText = game.add.text(50, GAME_HEIGHT - 100,
        'Score: ' + currentPlayer.score, {fill: '#00ff00'});

    //
    // animations
    //
    // setup turret movement animation
    currentPlayer.unit.animations.play('moveTurret');
    currentPlayer.unit.animations.paused = true;

    //
    // ammo selection
    //
    // TODO call ammoSwitch based on enter/shift
    if (this.enterKey.isDown && (this.selectCooldown < game.time.now)) {
      this.selectCooldown = game.time.now + 200;
      ammoSwitch('up', currentPlayer);
    }
    else if (this.shiftKey.isDown && (this.selectCooldown < game.time.now)) {
      this.selectCooldown = game.time.now + 200;
      ammoSwitch('down', currentPlayer);
    }
    if (currentPlayer.ammo === 0) {
      this.selectedAmmo = this.shells;
    }
    else if (currentPlayer.ammo === 1) {
      this.selectedAmmo = this.megaBombs;
    }
    // TODO replace with ultraBombs
    else if (currentPlayer.ammo === 2) {
      this.selectedAmmo = this.ultraBombs;
    }
    else {
      throw 'no ammo selected in game loop for this player';
    }

    //
    // power settings
    //
    // adjust player-visible-power based on up/down, from 0 to 500
    // negative(power setting) - 25 used to give users clean power numbers
    if (this.upKey.isDown && (this.powerCooldown < game.time.now)) {
      this.powerCooldown = game.time.now + 25;
      powerChange('up', currentPlayer);
    }
    else if (this.downKey.isDown && (this.powerCooldown < game.time.now)) {
      this.powerCooldown = game.time.now + 25;
      powerChange('down', currentPlayer);
    }
    this.power = -(currentPlayer.power) - 25;

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
      this.turretMoveCooldown = game.time.now + 100;
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
      this.turretMoveCooldown = game.time.now + 100;
      this.turretMoveCooldown = game.time.now + 100;
      currentPlayer.unit.animations.previous();
    }

    //
    // turret controls (excluding movement)
    //
    if (this.spaceKey.isDown && (game.time.now > this.fireCooldown)) {
      // store shooter before gameTurn changes
      shooter = currentPlayer;
      if (shooter.unit.body.velocity.y > 1) {
        console.log('tanks don\'t shoot while falling!');
      }
      else {
        // get shooter's ammo selection
        var ammo = this.selectedAmmo;
        // get shooter's power setting
        ammo.bulletSpeed = this.power;
        // update cooldown
        this.fireCooldown = game.time.now + 500;
        // set angle
        // gameTurn, as the index, is used to separate each player's angle
        console.log('fire angle is', players[gameTurn].angle);
        ammo.fireAngle = players[gameTurn].angle;
        // estimate turret position as pos
        var posX = (currentPlayer.unit.x + TANK_X_OFFSET) +
          (currentPlayer.angle / 10); // angle helps determine turret pos
        // spawn shell from turret's pos
        var pos = new Phaser.Rectangle(posX, currentPlayer.unit.y +
            TANK_Y_OFFSET);
        ammo.fireFrom = pos;
        console.log('fire from', pos);
        // fire!
        console.log('fuego!');
        ammo.fire();
        // add animation to shell, if it was an ultraBomb
        if (ammo === this.ultraBombs) {
          var bombFired = ammo.bullets.getFirstExists(true);
          console.log('ultraBomb fired:', bombFired);
          bombFired.animations.play('ultraBomb', 15, true);
          console.log('ultraBomb animation played');
        }
        // close inventory
        closeShop();
        // go to next turn
        gameTurn = (gameTurn + 1) % playerCount;
        console.log('turn updated to', gameTurn);
      }
    }

    //
    // fall detection
    //
    players.forEach(function(player) {
      if (!player.unit.chute && (player.unit.body.velocity.y > 10)) {
        if (player.unit.chuteSafety < game.time.now) {
          // TODO wilheim scream
          player.unit.fallDeath = true;
        }
        else {
          console.log('saftey chute detected');
        }
      }
    });

    //
    // collisions
    //
    // shells and units
    game.physics.arcade.overlap(this.shells.bullets, units, directHit);
    // megaBombs and units
    game.physics.arcade.overlap(this.megaBombs.bullets, units, directHit);
    // ultraBombs and units
    game.physics.arcade.overlap(this.ultraBombs.bullets, units, directHit);
    // units and terrain
    units.forEach(function(unit) {
      game.physics.arcade.collide(unit, layer, groundContact);
    });
    // shells and terrain
    this.shells.forEach(function(shell) {
      game.physics.arcade.collide(shell, layer, destruction);
    });
    // megaBombs and terrain
    this.megaBombs.forEach(function(megaBomb) {
      game.physics.arcade.collide(megaBomb, layer, bigDestruction);
    });
    // ultraBombs and terrain
    this.ultraBombs.forEach(function(ultraBomb) {
      game.physics.arcade.collide(ultraBomb, layer, massDestruction);
    });
    // parachutes and tanks
    parachutes.forEach(function(chute) {
      game.physics.arcade.collide(chute, units, releaseChute);
    });
  }
};
