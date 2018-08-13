var endState = {
  create: function() {
    // set background color to yellow
    game.stage.backgroundColor = '#ffff00';

    // declare winner
    var victoryMsg = 'Player ' + (winner().name + 1) + ' Has Won!';
    game.add.text(250, 200, victoryMsg,
        {font: 'bold 25pt Arial'});

    // display score
    var scoreRecieved = 'Score: ' + winner().score;
    game.add.text(325, 300, scoreRecieved);

    // restart instructions
    var instructions = 'Press "g" To Restart';
    game.add.text(GAME_WIDTH / 3, GAME_HEIGHT - 50, instructions);
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
