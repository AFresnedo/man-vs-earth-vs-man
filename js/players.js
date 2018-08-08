/*
 * This script contains the objects and functions related to players. Most
 * importantly, the player object. The player object has all the data that is
 * shared in type, but specific in value, to each player.
 *
 * Created by Andres Fresnedo
 */

class Player {
  constructor(name, color, inventory, score) {
    this.name = name;
    this.color = color;
    // TODO ensure object
    this.inventory = inventory;
    this.score = score;
  }
};
