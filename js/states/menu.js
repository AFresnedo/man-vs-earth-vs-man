var menuState = {

  // a "context" scoped variable to be set in create: and used in start:
  playerCountInput: null,
  levelSelectInput: null,
  background: null,

  create: function() {
    console.log('reached menuState create');
    // set background color to yellow
    game.stage.backgroundColor = '#ffff00';

    // welcome title
    var greetingMsg = 'Welcome to man-vs-earth-vs-man!';
    game.add.text(125, 20, greetingMsg,
        {font: 'bold 25pt Arial'});

    // player count
    var askPlayers = 'Type In Players (2-8)';
    game.add.text(35, GAME_HEIGHT / 2, askPlayers,
        {font: '15pt Arial'});
    this.playerCountInput = game.add.inputField(35, (GAME_HEIGHT / 2) + 30);

    // map selection
    var askLevel = 'Type In Map (1-4)';
    game.add.text(550, GAME_HEIGHT / 2, askLevel,
        {font: '15pt Arial'});
    this.levelSelectInput = game.add.inputField(550, (GAME_HEIGHT / 2) + 30);


    // instructions
    var instructions = 'Press "c" To Cont.';
    game.add.text(GAME_WIDTH / 3, GAME_HEIGHT - 50, instructions);


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
