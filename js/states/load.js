var loadState = {
  // Phaser standard function, called before create
  preload: function() {
    // TODO load assets, atm for all states
    game.load.image('sky', 'phaser_tut/assets/sky.png');
    game.load.image('ground', 'phaser_tut/assets/platform.png');
    game.load.image('star', 'phaser_tut/assets/star.png');
    game.load.spritesheet('dude', 'phaser_tut/assets/dude.png', 32, 48);
  },

  // there is nothing to display in load
  create: function() {
    // pull up the menu
    game.state.start('menu');
  }
}
