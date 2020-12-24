'use strict'

const fs = require('fs')
let data = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

let tiles = new Map()
let greenCounter = 0 // BLM decided to use green as black, and red as white

const getXYfromDir = (x, y, direction) => {
  let xx = x
  let yy = y
  switch(direction) {
    case 'e':
      xx += 2
      break
    case 'w':
      xx -= 2
      break
    case 'se':
      xx += 1
      yy -= 1
      break
    case 'sw':
      xx -= 1
      yy -= 1
      break
    case 'ne':
      xx += 1
      yy += 1
      break
    case 'nw':
      xx -= 1
      yy += 1
      break
    default:
      break
  }
  return { x: xx, y: yy }
}

data.forEach(row => {
  const directions = row.match(/(se)|(ne)|(sw)|(nw)|(e)|(w)/g)

  let x = 0
  let y = 0
  directions.forEach(dir => {
    const newCoords = getXYfromDir(x, y, dir)
    x = newCoords.x
    y = newCoords.y
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

const getNeighborCount = (tile) => {
  const [str, x, y] = tile.match(/x([\-0-9]*)y([\-0-9]*)/)
  let greenCount = 0
  
  neighborPositions.forEach(dir => {
    const neigh = getXYfromDir(Number(x), Number(y), dir)
    const theTile = `x${neigh.x}y${neigh.y}`;
    if(expandTiles.get(theTile)) {
      if(expandTiles.get(theTile) === 'green') greenCount += 1
    }
  })
    return greenCount
}

const neighborPositions = ['e', 'w', 'se', 'sw', 'ne', 'nw']
for(let loop = 0; loop < 100; loop += 1) {
  greenCounter = 0
  const expandTiles = new Map()
  tiles.forEach((value, key) => {
    expandTiles.set(key, value)

    const [str, x, y] = key.match(/x([\-0-9]*)y([\-0-9]*)/)

    neighborPositions.forEach(dir => {
      const neigh = getXYfromDir(Number(x), Number(y), dir)
      const theTile = `x${neigh.x}y${neigh.y}`;
      if(!tiles.get(theTile)) expandTiles.set(theTile, 'red')
    })
  })

  const nextDayTiles = new Map()
  expandTiles.forEach((value, key) => {
    const numGreenNeighbors = getNeighborCount(key)
    if(value === 'green') {
      if(numGreenNeighbors === 0 || numGreenNeighbors > 2) {
        nextDayTiles.set(key, 'red')
      } else {
        greenCounter += 1
        nextDayTiles.set(key, value)
      }
    } else if(value === 'red') {
      if(numGreenNeighbors === 2) {
        nextDayTiles.set(key, 'green')
        greenCounter += 1
      } else {
        nextDayTiles.set(key, value)
      }
    }
  })
  tiles = nextDayTiles
  console.log('Day', loop + 1, 'There are', greenCounter, 'green tiles')
}