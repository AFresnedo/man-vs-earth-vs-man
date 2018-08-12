var endState = {
  create: function() {
    // display sky background, TODO repalce with menu bg
    background = game.add.sprite(0, 0, 'menuBG');
    background.scale.setTo(GAME_WIDTH, GAME_HEIGHT);

    // display victory message
    var greetingMsg = 'congratulations!';
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2, greetingMsg);

    // display score
    var scoreRecieved = 'score: ' + winner().score;
    game.add.text(0, 0, scoreRecieved);

    // instructions
    var instructions = 'press "g" to restart!';
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 3, instructions);
    var restartKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
    // addOnce is a Phaser Signal, addOnce makes it a single-time trigger
    // first parameter is callback, second parameter is 'in what context'
    restartKey.onDown.addOnce(this.restart, this);
  },

  // restart the game from beginning
  restart: function() {
    console.log('restarting');
    game.state.start('boot');
  }
};
