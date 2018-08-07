var menuState = {

  create: function() {
    // display sky background, TODO repalce with menu bg
    background = game.add.sprite(0, 0, 'sky');

    // TODO display a nice message and show menu
    var greetingMsg = "welcome to the prototype menu!";
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2, greetingMsg);

    // instructions
    var instructions = "press 'c' to continue!";
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 3, instructions);

    var contKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    // addOnce is a Phaser Signal, addOnce makes it a single-time trigger
    // first parameter is callback, second parameter is "in what context"
    contKey.onDown.addOnce(this.start, this);
  },

  // start is a non-standard method, in this case it begins loop
  start: function() {
    game.state.start('loop');
  }
}
