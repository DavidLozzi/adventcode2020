'use strict'

const fs = require('fs')
let data = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

const tiles = new Map()
let greenCounter = 0 // BLM decided to use green as black, and red as white

data.forEach(row => {
  const directions = row.match(/(se)|(ne)|(sw)|(nw)|(e)|(w)/g)

  let x = 0
  let y = 0
  directions.forEach(dir => {
    switch(dir) {
      case 'e':
        x += 2
        break
      case 'w':
        x -= 2
        break
      case 'se':
        x += 1
        y -= 1
        break
      case 'sw':
        x -= 1
        y -= 1
        break
      case 'ne':
        x += 1
        y += 1
        break
      case 'nw':
        x -= 1
        y += 1
        break
      default:
        break
    }
  })
  const theTile = `x${x}y${y}`;
  if(tiles.get(theTile)) {
    tiles.set(theTile, 'red')
    greenCounter -= 1
  } else {
    tiles.set(theTile, 'green')
    greenCounter += 1
  }
})

console.log('There are', greenCounter, 'green tiles')