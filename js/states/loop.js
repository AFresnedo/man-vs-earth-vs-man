var loopState = {
  create: function() {

    console.log('loopState: create reached!');

    //
    // create terrain
    //
    var map = game.add.tilemap('earth');
    map.addTilesetImage('ground_tiles', 'earthTile');
    var layer = map.createLayer('Tile Layer 1');
    map.setCollisionByExclusion([], true, layer);

    //
    // spawn units
    //
    // TODO spawn units during flyby intro
    spawnUnits();


    // TODO move to "win" state when <=1 tank remains
  },

  update: function() {

    // make sure each unit has collision detection
    players.forEach(unit) {
    }

  }

};
