var menuState = {

  // a "context" scoped variable to be set in create: and used in start:
  playerCountInput: null,

  create: function() {
    console.log('reached menuState create:');
    // display sky background, TODO repalce with menu bg
    background = game.add.sprite(0, 0, 'menuBG');

    // TODO display a nice message and show menu
    var greetingMsg = 'welcome to the prototype menu!';
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2, greetingMsg);

    // instructions
    var instructions = 'press "c" to cont. with defaults!';
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 3, instructions);

    // player count
    var askPlayers = 'how many players? bots soon(tm)';
    game.add.text(0, 0, askPlayers);
    this.playerCountInput = game.add.inputField(10, 90);

    var contKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    // addOnce is a Phaser Signal, addOnce makes it a single-time trigger
    // first parameter is callback, second parameter is "in what context"
    contKey.onDown.addOnce(this.start, this);
  },

  // start is a non-standard method, in this case it begins loop
  start: function() {
    console.log('reached start');
    // get player count after input given
    playerCount = this.playerCountInput.value;
    // create player objects
    // TODO preserve player objects throughout levels but not restarts
    for (var i = 0; i < playerCount; i++) {
      // TODO get player names
      // TODO create inventory object
      // name (TBI), score, inventory (TBI), unit (null in this state), angle
      var player = new Player(i, 0, null, null);
      players[i] = player;
    }
    // TODO break game when playerCount is not 2-8
    console.log('player count is', playerCount);
    console.log('players left is', playersLeft());
    game.state.start('loop');
  }
};
