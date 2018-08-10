var loadState = {
  // Phaser standard function, called before create
  preload: function() {
    // load menu background
    game.load.image('menuBG', 'phaser_tut/assets/sky.png');

    // load sprite for loop
    game.load.spritesheet('tank',
        './assets/second-pass/tank-spritesheet.png', 32, 32);

    // load tileset
    game.load.image('earthTile', './assets/earth_tileset.png');
    // load tilemap
    game.load.tilemap('earth',
        './assets/second-pass/single-level-one.json',
        null, Phaser.Tilemap.TILED_JSON);
  },

  // there is nothing to display in load
  create: function() {
    // pull up the menu
    game.state.start('menu');
  }
};
