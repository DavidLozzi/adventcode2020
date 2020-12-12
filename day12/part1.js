const fs = require('fs');
const instructions = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

const directions = ['E', 'S', 'W', 'N']
let dirIndex = 0
let x = 0
let y = 0

const moveShip = (navigate) => {
  const direction = directions[dirIndex]
  
  const coordinates = navigate.match(/([A-Z]{1})([0-9]*)/i)
  const instruction = coordinates[1]
  const unit = Number(coordinates[2])

  switch (instruction) {
    case 'F':
      const multiplier = direction === 'E' || direction === 'N' ? 1 : -1
      const isX = direction === 'E' || direction === 'W'
      const isY = direction === 'N' || direction === 'S'
      if(isX) {
        x = x + (unit * multiplier)
      }
      if (isY) {
        y = y + (unit * multiplier)
      }
      break;
    case 'N':
      y = y + unit
      break;
    case 'S':
      y = y - unit
      break;
    case 'E':
      x = x + unit
      break;
    case 'W':
      x = x - unit
      break;
    case 'R':
      const rotateRight = unit / 90
      dirIndex += rotateRight
      break;
    case 'L':
      const rotateLeft = unit / 90
      dirIndex -= rotateLeft
      break;
  }
  if(dirIndex >= directions.length) dirIndex = dirIndex - directions.length
  if(dirIndex < 0) dirIndex = directions.length - (dirIndex * -1)
  console.log(navigate, 'direction', dirIndex, directions[dirIndex], 'x', x, 'y', y)
}

instructions.forEach(nav => {
  moveShip(nav)
})

if(x < 0) x = x * -1
if(y < 0) y = y * -1

console.log(x, '+', y, 'sum is', x + y)