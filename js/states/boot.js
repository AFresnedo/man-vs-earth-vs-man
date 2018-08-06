// define the state name
var bootState = {
  // create is a standard Phaser function, automatically called
  create: function() {
    // begin physics engine
    // TODO anything else?
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // after boot is complete, move onto next state
    game.state.start('load');
  }
}
