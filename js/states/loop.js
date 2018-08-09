var loopState = {
  create: function() {

    console.log('loopState: create reached!');

    //
    // create terrain
    //
    var map = game.add.tilemap('earth');
    map.addTilesetImage('ground_tiles', 'earthTile');
    layer = map.createLayer('Tile Layer 1');
    map.setCollisionBetween(0, (20 * 24));

    //
    // spawn units
    //
    units = game.add.group();
    units.enableBody = true;
    units.physicsBodyType = Phaser.Physics.ARCADE;
    units.createMultiple(playerCount.value, 'tank');
    units.setAll('outOfBoundsKill', true);
    units.setAll('checkWorldBounds', true);
    // TODO spawn units during flyby intro
    spawnUnits();


    // TODO move to "win" state when <=1 tank remains
  },

  update: function() {
    units.forEach(function(unit) {
      game.physics.arcade.collide(unit, layer);
    });
  }

};
