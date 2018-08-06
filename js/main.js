var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameScreen');

// define game states, first arg being new handle
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

// begin boot state (boot is start of daisy chain)
game.state.start('boot')
