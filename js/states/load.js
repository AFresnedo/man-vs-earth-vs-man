var loadState = {
  // Phaser standard function, called before create
  preload: function() {
    // load menu background
    game.load.image('menuBG', 'phaser_tut/assets/sky.png');

    // load sprite for loop
    game.load.spritesheet('dude', 'phaser_tut/assets/dude.png', 32, 48);

  },

  // there is nothing to display in load
  create: function() {
    // pull up the menu
    game.state.start('menu');
  }
};
