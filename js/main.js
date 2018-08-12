console.log('reached main');
game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'gameScreen');

// define game states, first arg being new handle
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('loop', loopState);
game.state.add('end', endState);

// begin boot state (boot is start of daisy chain)
game.state.start('boot');

// TODO out-of-game-window UI
// "open shop" button (show money and quantities, allow purchases)
// instructions button
// credits button
