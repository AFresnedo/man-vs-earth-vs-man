/* This script contains all the different ammo used by the game. Information
 * about cost, power range, weight, and other weapon-specific values are stored
 * in the objects for each weapon type.
 */

class Tracer {}

// TODO use class or reg js obj?
// each unit has their own
class Standard {
  constructor(weight, explosionSize,power, cost, amount) {
    this.weight = 100;
    this.explosionSize = 32;
    this.power = 100;
    this.cost = 1;
    this.amount = 0;
  }
}

class Chain {}

class Nuke {}
