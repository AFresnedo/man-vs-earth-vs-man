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
// game world
var layer;
var map;
// player info
var playerCount;
var players = [];
// game objects
var units;
var standardShot;
var shooter;
