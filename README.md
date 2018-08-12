# Third Party Tools

* phaser-input plugin

# About

man-vs-earth-vs-man is an artillery game based on scorched earth.

# Design

## Score

* 1 point per kill
* +1 point per direct hit

## Camera

* section view
*   in construction, looking at the slice of a building
* does not move
* same camera for all players, at this point it isn't really a camera

## Death

* tanks will be killed if they are hit by any ammo except tracers
* tanks will be killed if they fall more than ~1 second w/o parachute
    * distance or time? implementation detail

## Firing Mechanics

* set power & angle, weight is set by ammo used
    * power ranges are restricted by ammo
* gravity gives the "arc" for the weapon attack

## Economy

* you buy inventory using money
* money is given each turn and for each kill
* you start with some money and 1 of each non-special weapon/utility
    * do not start with nuke, parachute, etc

## Game Settings

* handicap: free tracers
* set how many bots

## Game World

* 2D
* terrain is part of the game world's moving pieces
    * boundries are not set by terrain
* boundries of game world are set by camera viewport, static
* random terrain generation every map
    * bonus implementation probably, might be easier to not randomize

## Game Turn

* each player gets one turn
* 1 tracer per turn, tracer does not end turn
* any attack, besides tracer, ends turn
* turn is over if 1 minute timer expires

## Players

* inventory
* a single tank, with 1 life and basically 1 hp (tracers do no dmg)
* pick tank color at spawn?
* 2-8 players+bots

### Inventory

* parachute
    * lets tank free-fall once per chute for no dmg
    * chute is expended upon use
* chain bomb
    * 3 explosions in a line
* standard shot
    * 1 explosion
* tracer
    * adjust power, weight
* nuke
    * ultimate used to basically clear an entire half
* roller
    * doesn't explode until it stops moving (rolling)
    * do not implement, waste of time
### Tank

* move turret using arrow keys
    * turret can move in a rainbow arc (180 degrees)
* fire using spacebar
* increase power using shift
* decrease power using ctrl
* each tank is a unique color

## Game Over

* one tank left
    * or 0 tanks, maybe terrain killed last 2 for ex.

### Graphics

* standard shot is just a little black ball that explodes (pixel-wide)
* nuke is biggest bomb sprite
* parachute is just a little white geometric shape with some lines connect
* tank is a box with a thick line as a turret
    * maybe a trapazoid instead of a box
    * maybe add a little 2D capsule for a track (wheels) under body
* terrain is just a colored...graph? basically
* sky/non-terrain is just some sky-blue background
* get some B-32 plane model for dropping tanks at game start

## Game Start

* a bunch of planes do a fly-over and drop tanks with parachutes
* turn order could be determined by whichever tank lands first goes first
    * whichever tank lands last goes last, etc
    * idea here is that tanks on high ground have disadvantage
        * plus it just makes sense, whoever lands first shoots first
            * more time to setup turret and fire
    * very late feature to implement, easier just to be random

## Levels

* ~ 4 levels where player object data is preserved throughout
    * this means that score, money, etc is conserved after a level
* players cannot change between levels
    * restarting the game will reset players

## Destructable Terrain

* core game feature
    * most common kill method
    * most interesting game mechanic
        * most "fun"
    * gives inventory a lot more meaning
        * parachutes, big unwieldy explosions
* probably first thing to implement after MVP

## Sounds

* wilheim scream for falling tank

# Implementation

## Terrain / Game World

* use a tile map
    * each tile is an object

## Game Mechanics

## UX

### Tank Controls

* turret movement
    * left/right arrow keys
* inventory scroll
    * up/down arrow keys
* inventory select
    * enter key
* use inventory / fire weapon
    * spacebar

## Player Objects

* player names are requested at start
    * shown for each turn in UI
* score stored here
* reference to unit (phaser sprite) stored here
* alive/dead status stored here

## Game Loop

* turn order is an array of player objects?
* properties
    * name
    * color
    * inventoryObj
    * score
## Ammo

* each unit has their own ammo obj for each ammo type

# Developer Notes

* phaser has a bounce
* phaser has a drag
* map.removeTile for destructable terrain
    * it may do nothing, so set it to alpha 0 and remove collision instead
* lock spacebar to game (prevent propogatgion or whatever)
* weirdly enough i think i should have inventory usage ingame & the shop out
* think about using arrays for maps and layers for multiple level design
* when you add inventory, buying a chute just turns "chute" back to "true"
    * similarly, refactor all chute mechanics into inventory object logic
