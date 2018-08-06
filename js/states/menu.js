var menuState = {

  create: function() {

    // TODO replace this with actual welcome screen/msg
    var greeetingMsg = "welcome!";

    // instructions
    var instructions = "coming soon!";

    // TODO make sure this var doesn't break "function scope"
    var contKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    // addOnce is a Phaser Signal, addOnce makes it a single-time trigger
    // first parameter is callback, second parameter is "in what context"
    contKey.onDown.addOnce(this.start, this);
  // note the },
  // remember that menuState is an object
  },

  //
  start: function() {
    game.state.start('loop');
  }
}
