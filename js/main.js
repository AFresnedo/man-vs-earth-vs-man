console.log('reached main');
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameScreen', {
  init: init,
  preload: preload,
  create: create,
  update: update
});

function init() {
}

function preload() {
  console.log('preload');
  game.load.image('bg', '../phaser_tut/assets/sky.png')
  game.load.image('ground', '../phaser_tut/assets/platform.png');
  game.load.image('star', '../phaser_tut/assets/star.png');
  game.load.spritesheet('dude', '../phaser_tut/assets/dude.png', 32, 48);
}

function create() {
  // start physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // display background
  // TODO moving clouds
  background = game.add.sprite(0, 0, 'bg');

  // TODO create destructable earth
  //  create floating terrain group
  var platforms;
  platforms = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  // create solid ground
  var ground;
  ground = game.add.sprite(0, game.world.height - 64, 'ground');
  ground.enableBody = true;

  // scale ground sprite to screen width
  ground.scale.setTo(2, 2);

  // prevent falling through solid ground
  ground.body.immovable = true;

  // create combat ledges
  ledge = platforms.create(400, 400, 'ground');

  ledge.body.immovable = true;

  ledge = platforms.create(-150, 250, 'ground');

  ledge.body.immovable = true;

  // The player and its settings
  player = game.add.sprite(32, game.world.height - 150, 'dude');

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function update() {
}
