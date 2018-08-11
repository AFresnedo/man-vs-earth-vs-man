var endState = {
  create: function() {
    // display sky background, TODO repalce with menu bg
    background = game.add.sprite(0, 0, 'menuBG');

    // display victory message
    var greetingMsg = 'congratulations!';
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2, greetingMsg);

    // display score
    var scoreRecieved = "score: " + currentUnit.score;
    game.add.text(0, 0, scoreRecieved);

    // instructions
    var instructions = 'press "r" to restart!';
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 3, instructions);
    var contKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    // addOnce is a Phaser Signal, addOnce makes it a single-time trigger
    // first parameter is callback, second parameter is "in what context"
    contKey.onDown.addOnce(this.restart, this);
  },

  // restart the game from beginning
  restart: function() {
    console.log('restarting');
    game.state.start('boot');
  }
}
