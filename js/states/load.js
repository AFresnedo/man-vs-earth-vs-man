var loadState = {
  // Phaser standard function, called before create
  preload: function() {
    // load menu background
    game.load.image('menuBG', 'assets/imgs/blue-bg.png');

    // load tank img sprite
    game.load.spritesheet('tank',
        'assets/imgs/tank-spritesheet.png', 32, 32);

    // load tileset
    game.load.image('earthTile', 'assets/tiles/earth_tileset.png');
    // load tilemap
    game.load.tilemap('earth',
        'assets/maps/single-level-one.json',
        null, Phaser.Tilemap.TILED_JSON);

    // load ammo
    game.load.image('standardShell', 'assets/imgs/standard-shot.png');
    game.load.image('megaBomb', 'assets/imgs/mega-bomb.png');
    game.load.spritesheet('ultraBomb',
        'assets/imgs/ultra-bomb-spritesheet.png', 16, 16);

    // load utility items
    game.load.image('parachute', 'assets/imgs/parachute.png');
  },

  // there is nothing to display in load
  create: function() {
    console.log('pulling up menu');
    // pull up the menu
    game.state.start('menu');
  }
};
