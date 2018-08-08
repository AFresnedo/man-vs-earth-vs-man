var loopState = {
  create: function() {

    console.log('loopState: create reached!');

    //
    // create terrain
    //
    var map = game.add.tilemap('earth');
    map.addTilesetImage('ground_tiles', 'earthTile');
    var layer = map.createLayer('Tile Layer 1');

    //
    // spawn units
    //
    // TODO spawn units during flyby intro
    spawnUnits();


    // TODO move to "win" state when <=1 tank remains
  }
};
