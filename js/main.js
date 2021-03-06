console.log('reached main');
game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game-window');

// define game states, first arg being new handle
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('loop', loopState);
game.state.add('end', endState);

// begin boot state (boot is start of daisy chain)
game.state.start('boot');
