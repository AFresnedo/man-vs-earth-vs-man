var menuState = {

  // a "context" scoped variable to be set in create: and used in start:
  playerCountInput: null,
  levelSelectInput: null,

  create: function() {
    console.log('reached menuState create');
    // display sky background, TODO repalce with menu bg
    background = game.add.sprite(0, 0, 'menuBG');
    background.scale.setTo(GAME_WIDTH, GAME_HEIGHT);

    // TODO display a nice message and show menu
    var greetingMsg = 'welcome to the prototype menu!';
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 2, greetingMsg);

    // instructions
    var instructions = 'press "c" when done';
    game.add.text(GAME_WIDTH / 2 - 50, GAME_HEIGHT / 3, instructions);

    // player count
    var askPlayers = 'how many players? 2-8 (default is 2)';
    game.add.text(50, 50, askPlayers);
    this.playerCountInput = game.add.inputField(50, 75);

    // player count
    var askLevel = 'which map? 1-4 (default is 1)';
    game.add.text(50, 100, askLevel);
    this.levelSelectInput = game.add.inputField(50, 125);

    var contKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    // addOnce is a Phaser Signal, addOnce makes it a single-time trigger
    // first parameter is callback, second parameter is "in what context"
    contKey.onDown.addOnce(this.start, this);
  },

  // start is a non-standard method, in this case it begins loop
  start: function() {
    console.log('reached start');
    // get player count after input given
    if ((this.playerCountInput.value >= 2) &&
        (this.playerCountInput.value <= 8)) {
      console.log('player input given');
      playerCount = this.playerCountInput.value;
    }
    else {
      playerCount = 2;
    }
    // get level selection
    if ((this.levelSelectInput.value >= 1) &&
        (this.levelSelectInput.value <= 4)) {
      console.log('level select input given');
      levelSelect = this.levelSelectInput.value - 1;
    }
    else {
      levelSelect = 0;
    }
    // create player objects
    // TODO preserve player objects throughout levels but not restarts
    for (var i = 0; i < playerCount; i++) {
      // TODO get player names
      // TODO create inventory object
      // name, score, inventory, unit (null in this state)
      var player = new Player(i, 0, new Inventory(200), null);
      players[i] = player;
    }
    // TODO break game when playerCount is not 2-8
    console.log('player count is', playerCount);
    console.log('players left is', playersLeft());
    game.state.start('loop');
  }
};
