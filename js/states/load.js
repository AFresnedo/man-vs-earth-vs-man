var loadState = {
  // Phaser standard function, called before create
  preload: function() {
    // load menu background
    game.load.image('menuBG', 'assets/imgs/blue-bg.png');

    // load sprite for loop
    game.load.spritesheet('tank',
        'assets/imgs/tank-spritesheet.png', 32, 32);

    // load tileset
    game.load.image('earthTile', 'assets/tiles/earth_tileset.png');
    // load tilemap
    game.load.tilemap('earth',
        'assets/maps/single-level-one.json',
        null, Phaser.Tilemap.TILED_JSON);
    // load standard shell
    game.load.image('shell', 'assets/imgs/missile.png');
  },

  // there is nothing to display in load
  create: function() {
    console.log('pulling up menu');
    // pull up the menu
    game.state.start('menu');
  }
};
