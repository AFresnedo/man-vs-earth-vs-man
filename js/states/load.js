var loadState = {
  // Phaser standard function, called before create
  preload: function() {
    // TODO load assets, atm for all states
    game.load.image('sky', 'phaser_tut/assets/sky.png');
    game.load.image('ground', 'phaser_tut/assets/platform.png');
    game.load.image('star', 'phaser_tut/assets/star.png');
    game.load.spritesheet('dude', 'phaser_tut/assets/dude.png', 32, 48);
  },

  // objects you want to display behind menu go here
  create: function() {
    console.log('reached create: in loadState');
    // display background
    background = game.add.sprite(0, 0, 'sky');
    var player = game.add.sprite(0, 0, 'dude');
    // pull up the menu
    game.state.start('menu');
  }
}
