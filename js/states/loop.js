var loopState = {
  preload: function() {
    // // load background layer
    // game.load.image('bg', '../assets/bg.jpg');
    // load tileset
    game.load.image('earthTile', '../assets/earth_tileset.png');
    // // load background layer
    // game.load.image('bg', '../assets/bg.jpg');
    // load tilemap
    game.load.tilemap('earth',
        '../assets/second pass/single-level-one.json',
        null, Phaser.Tilemap.TILED_JSON);
  },
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
    units.createMultiple(playerCount, 'unit');
    units.setAll('outOfBoundsKill', true);
    units.setAll('checkWorldBounds', true);
    // TODO call spawnUnits
    // display all units
    var unitOne = game.add.sprite(0, 0, 'tank');


    // TODO move to "win" state when <=1 tank remains
  }
};
