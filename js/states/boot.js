// define the state name
var bootState = {
  // create is a standard Phaser function, automatically called
  create: function() {
    // begin physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // add text input plugin
    game.add.plugin(PhaserInput.Plugin);

    // after boot is complete, move onto next state
    game.state.start('load');
  }
}
