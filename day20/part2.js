'use strict'

const { match } = require('assert');
const fs = require('fs');

class Tile {
  constructor(id, data) {
    this.id = id
    this.data = data
    this.topEdge = null
    this.bottomEdge = null
    this.leftEdge = null
    this.rightEdge = null
    this.edges = []
    this.topEdgeTile = null
    this.bottomEdgeTile = null
    this.leftEdgeTile = null
    this.rightEdgeTile = null
    this.matches = []
  }
}

const reverseValue = value => {
  return value.split('').reverse().join('')
}

let tiles = []
fs.readFileSync('./input.txt', 'utf-8').trim().split('Tile').map(t => {
  if(t) {
    const lines = t.split('\n').filter(l => l.length > 0)
    const tile = lines.slice(1)
    tiles.push(new Tile(Number(lines[0].trim().replace(':','')), tile))
  }
});

const setEdges = (tile) => {
  tile.topEdge = tile.data[0]
  tile.bottomEdge = tile.data[tile.data.length - 1]
  tile.leftEdge = tile.data.reduce((a, b) => `${a}${b.substring(0,1)}`,'')
  tile.rightEdge = tile.data.reduce((a, b) => `${a}${b.substring(b.length - 1)}`,'')
  tile.edges = [tile.topEdge, tile.bottomEdge, tile.leftEdge, tile.rightEdge, reverseValue(tile.topEdge), reverseValue(tile.bottomEdge), reverseValue(tile.leftEdge), reverseValue(tile.rightEdge)]

  return tile
}

const rotateArray = (data) => {
  const newData = []
  for(let ci = 0; ci <= data[0].length - 1; ci += 1) {
    const newRow = []
    for(let ri = data.length - 1; ri >= 0 ; ri -= 1) {
      newRow.push(data[ri][ci])
    }
    newData.push(newRow.join(''))
  }
  return newData
}

tiles.forEach(tile => {
  tile = setEdges(tile)  
})

tiles.forEach(tile => {
  const edges = ['topEdge', 'rightEdge', 'bottomEdge', 'leftEdge']
  edges.forEach(edge => {
    const edgeTile = tiles.find(t => t.id !== tile.id && t.edges.indexOf(tile[edge]) > -1)
    if(edgeTile){
      tile.matches.push(edgeTile)
      tile[`${edge}Tile`] = edgeTile
    }
  })
})

const rotateTile = (tile) => {
  tile.data = rotateArray(tile.data)
  tile = setEdges(tile)
  return tile
}

const flipTile = (tile, horizontalFlip) => {
  const { data } = {...tile}

  if(horizontalFlip) {
    tile.data = data.map(d => reverseValue(d))
  } else {
    tile.data = data.reverse()
  }

  tile = setEdges(tile)

  return tile
}

const topLeftCorner = tiles.find(t => t.matches.length === 2 && t.rightEdgeTile && t.bottomEdgeTile)

let theTile = topLeftCorner
let firstTileInRow = theTile
let ids = ''
// going horizontal first, then vertical
while(true) {
  while(true) {
    ids += `${theTile.id} `
    let nextTile = tiles.find(t => t.id !== theTile.id && t.edges.indexOf(theTile.rightEdge) > -1)
    if(nextTile) {
      theTile.rightEdgeTile = nextTile
      if(theTile.rightEdge === nextTile.leftEdge) {
        // do nothing, they match, onto the next tile
      }
      if(theTile.rightEdge === reverseValue(nextTile.leftEdge)) {
        nextTile = flipTile(nextTile, false)
      }
      if(theTile.rightEdge !== reverseValue(nextTile.leftEdge) && theTile.rightEdge !== nextTile.leftEdge) {
        for(let r = 0; r < 4; r += 1) {
          nextTile = rotateTile(nextTile)
          if(theTile.rightEdge === reverseValue(nextTile.leftEdge) || theTile.rightEdge === nextTile.leftEdge) {
            if(theTile.rightEdge === reverseValue(nextTile.leftEdge)) {
              nextTile = flipTile(nextTile, false)
            }
            break
          }
        }
      }
      theTile = nextTile
    } else {
      theTile.rightEdgeTile = null
      break
    }
  }
  ids += '\n'

  let bottomTile = tiles.find(t => t.edges.indexOf(firstTileInRow.bottomEdge) > -1 && ids.indexOf(t.id) === -1)
  if(bottomTile) {
    if(firstTileInRow.bottomEdge === bottomTile.topEdge) {
      // do nothing, they' match, onto the next tile
    }
    if(firstTileInRow.bottomEdge === reverseValue(bottomTile.topEdge)) {
      bottomTile = flipTile(bottomTile, false)
    }
    if(firstTileInRow.bottomEdge !== reverseValue(bottomTile.topEdge) && firstTileInRow.bottomEdge !== bottomTile.topEdge) {
      for(let r = 0; r < 4; r += 1) {
        bottomTile = rotateTile(bottomTile)
        if(firstTileInRow.bottomEdge === reverseValue(bottomTile.topEdge) || firstTileInRow.bottomEdge === bottomTile.topEdge) {
          break
        }
      }
      if(firstTileInRow.bottomEdge === reverseValue(bottomTile.topEdge)) {
        bottomTile = flipTile(bottomTile, true)
      }
    }
    firstTileInRow.bottomEdgeTile = bottomTile
    firstTileInRow = bottomTile
    theTile = firstTileInRow 
    // rotate/flip needed?
  } else {
    break
  }
}
console.log('the image:')
console.log(ids)

theTile = topLeftCorner
let rowPad = 0
let allData = []
firstTileInRow = theTile
let rows = ''
while(true){
  // console.log(rows)
  if(rows.indexOf(firstTileInRow.id) > -1) { 
    break
  }
  rows += `${firstTileInRow.id} `
  while(true){
    const { data } = theTile
    const newData = data.slice(1, data.length - 1).map(d => d.substring(1, d.length - 1))
    for(let i = 0; i < newData.length; i += 1){
      const rowidx = i + rowPad
      allData[rowidx] = !allData[rowidx] ? newData[i] : allData[rowidx] + newData[i]
    }

    if(theTile.rightEdgeTile) {
      theTile = theTile.rightEdgeTile
    } else {
      rowPad += newData.length
      break
    }
  }
  // allData.map(a => console.log(a))

  if(firstTileInRow.bottomEdgeTile) {
    firstTileInRow = firstTileInRow.bottomEdgeTile
    theTile = firstTileInRow
  } else {
    break
  }
}


const findSeaMonster = (image) => {
  /* There be monsters:
    >                  # <
    >#    ##    ##    ###<
    >#  #  #  #  #  #    <
  */
  const seaMonsterCount = 15 // number of # in the sea dragon
  // const seaMonster = new RegExp('(.){18}#(.)+\n(.)*#(.){4}(#){2}(.){4}(#){2}(.){4}(#){3}(.)*\n(.)*#(.){2}#(.){2}#(.){2}#(.){2}#(.){2}#', 'g')
  const seaMonster = new RegExp('..................#(.)+\n(.)*#....##....##....###(.)+\n(.)*.#..#..#..#..#..#...', 'g');
  const finds = new Set()
  let attempt = seaMonster.exec(image)
  while(attempt) {
    finds.add(attempt.index)
    seaMonster.lastIndex = attempt.index + seaMonsterCount * 5
    attempt = seaMonster.exec(image)
  }

  if(finds.size > 0) {
    console.log(finds.size, 'sea monsters found!')
    console.log(image.match(/#/g).length - (seaMonsterCount * finds.size), 'roughness')
    return true
  }
  return false
}

for(let i = 0; i < 4; i += 1){
  let finalImage = allData.join('\n')
  if(findSeaMonster(finalImage)) break

  const flippedHor = allData.map(d => reverseValue(d)).join('\n')
  if(findSeaMonster(flippedHor)) break

  const flippedVer = allData.reverse().join('\n')
  if(findSeaMonster(flippedVer)) break

  const flippedBoth = allData.map(d => reverseValue(d)).reverse().join('\n')
  if(findSeaMonster(flippedBoth)) break

  allData = rotateArray(allData)
}

// console.log(allData[0].length,'x',allData.length)
