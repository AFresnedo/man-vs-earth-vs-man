var loadState = {
  // Phaser standard function, called before create
  preload: function() {
    // load temp assets for menu
    game.load.image('menuBG', 'phaser_tut/assets/sky.png');

    // load temporary assets for loop
    game.load.image('sky', '../assets/tilesetOpenGameBackground_3.png');
    game.load.image('terrain', '../assets/Ice Plains.png');
    game.load.spritesheet('dude', 'phaser_tut/assets/dude.png', 32, 48);

    // load tilemap
    game.load.tilemap('earth', '../assets/first.json');
    // load tileset
    game.load.image('earthTile', '../assets/earth_tileset.png');
    // load background layer
    game.load.image('bg', '../assets/bg.jpg');
  },

  // there is nothing to display in load
  create: function() {
    // pull up the menu
    game.state.start('menu');
  }
}
