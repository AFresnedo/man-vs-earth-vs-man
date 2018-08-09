/* This script contains game-wide constants and variables shared between
 * states.
 */
// constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const TILES_WIDE = 24;
const TILES_HIGH = 20;
// game logic
var gameTurn = 0;
var turnTime = 0;
// assets
var layer;
var map;
// player info
var playerCount = 2;
var players = [];
// game objects
var units;
// input
var leftKey;
var rightKey;
var upKey;
var downKey;
var enterKey;
var spaceKey;


// TODO credit art
//"[asset name]" by [author name] licensed [license(s)]: [asset url]
// https://opengameart.org/content/sky-background
// https://opengameart.org/content/ice-plains-background
