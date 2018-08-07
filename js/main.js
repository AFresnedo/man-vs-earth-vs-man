console.log('reached main');
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameScreen', {
  init: init,
  preload: preload,
  create: create,
  update: update
});

function init() {
  console.log('init reached');
}

function preload() {
  console.log('preload reached');
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.load.image('background', '
}
