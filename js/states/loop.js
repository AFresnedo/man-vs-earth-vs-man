var loopState = {
  create: function() {
    // TODO determine if players must be global
    // create players array
    var players = [];

    console.log('loop create reached!');

    //
    // create terrain
    //
    var map;
    var layer;
    map = game.add.tilemap('earth');
    map.addTilesetImage('ground_tiles', 'earthTile');
    layer = map.createLayer('Tile Layer 1');
    // TODO either improve assets or this call
    layer.resizeWorld();

    //
    // spawn units
    //
    var units = game.add.group();
    units.enableBody = true;
    // tODO physics or physical???
    units.physicalBodyType = Phaser.Physics.ARCADE;
    units.createMultiple(playerCount, 'unit');
    units.setAll('outOfBoundsKill', true);
    units.setAll('checkWorldBounds', true);
    // TODO call spawnUnits on a timer, without random placement
    units.forEach(function() {
      spawnUnits();
    });


    // TODO move to "win" state when <=1 tank remains
  }
};
