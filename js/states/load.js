var loadState = {
  // Phaser standard function, called before create
  preload: function() {
    // TODO load assets, atm for all states
  }

  // not really creating anything, just moving to next in daisy chain
  create: function() {
    // pull up the menu
    game.state.start('menu');
  }
