const fs = require('fs');
const instructions = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

let eastWest= 0
let northSouth= 0
let waypoint = {
  xValue: 10,
  yValue: 1,
  rotation: 0
}
/* 
ROTATION
  0 - x heads east, y heads north
  90 - x heads south, y heads east
  180 - x heads west, y heads south
  270 - x heads north, y heads west
*/

const moveShip = (navigate) => {
  const coordinates = navigate.match(/([A-Z]{1})([0-9]*)/i)
  const instruction = coordinates[1]
  const unit = Number(coordinates[2])

  switch (instruction) {
    case 'F':
      switch(waypoint.rotation) {
        case 0:
          eastWest += waypoint.xValue * unit
          northSouth += waypoint.yValue * unit
          break;
        case 90:
          eastWest += waypoint.yValue * unit
          northSouth += waypoint.xValue * unit * -1
          break;
        case 180:
          eastWest += waypoint.xValue * unit * -1
          northSouth += waypoint.yValue * unit * -1
          break;
        case 270:
          eastWest += waypoint.yValue * unit * -1
          northSouth += waypoint.xValue * unit
          break;
      }
      break;
    case 'N':
      switch(waypoint.rotation) {
        case 0:
          waypoint.yValue += unit
          break;
        case 90:
          waypoint.xValue -= unit
          break;
        case 180:
          waypoint.yValue -= unit
          break;
        case 270:
          waypoint.xValue += unit
          break;
      }
      break;
    case 'S':
      switch(waypoint.rotation) { // same as N but *-1
        case 0:
          waypoint.yValue -= unit
          break;
        case 90:
          waypoint.xValue += unit
          break;
        case 180:
          waypoint.yValue += unit
          break;
        case 270:
          waypoint.xValue -= unit
          break;
      }
      break;
    case 'E':
      switch(waypoint.rotation) {
        case 0:
          waypoint.xValue += unit
          break;
        case 90:
          waypoint.yValue += unit
          break;
        case 180:
          waypoint.xValue -= unit
          break;
        case 270:
          waypoint.yValue -= unit
          break;
      }
      break;
    case 'W':
      switch(waypoint.rotation) { // -1 * East
        case 0:
          waypoint.xValue -= unit
          break;
        case 90:
          waypoint.yValue -= unit
          break;
        case 180:
          waypoint.xValue += unit
          break;
        case 270:
          waypoint.yValue += unit
          break;
      }
      break;
    case 'R':
      waypoint.rotation += unit
      if(waypoint.rotation > 270) waypoint.rotation -= 360
      break;
    case 'L':
      waypoint.rotation -= unit
      if(waypoint.rotation < 0) waypoint.rotation += 360
      break;
  }
  console.log(navigate, 'direction', waypoint.xValue, 'by', waypoint.yValue, 'rotation', waypoint.rotation, 'eastWest', eastWest, 'northSouth', northSouth)
}

instructions.forEach(nav => {
  moveShip(nav)
})

if( eastWest < 0) eastWest = eastWest* -1
if( northSouth < 0) northSouth = northSouth* -1

console.log(eastWest, '+', northSouth, 'sum is',eastWest + northSouth)