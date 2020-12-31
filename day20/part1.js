'use strict'

const fs = require('fs');

const reverseValue = value => {
  return value.split('').reverse().join('')
}

let tiles = []
fs.readFileSync('./input.txt', 'utf-8').trim().split('Tile').map(t => {
  if(t) {
    const lines = t.split('\n').filter(l => l.length > 0)
    const tile = lines.slice(1)
    const topEdge = tile[0]
    const bottomEdge = tile[tile.length - 1]
    const leftEdge = tile.reduce((a, b) => `${a}${b.substring(0,1)}`,'')
    const rightEdge = tile.reduce((a, b) => `${a}${b.substring(b.length - 1)}`,'')
    tiles.push({ id: Number(lines[0].trim().replace(':','')), data: tile, edges: [topEdge, bottomEdge, leftEdge, rightEdge, reverseValue(topEdge), reverseValue(bottomEdge), reverseValue(leftEdge), reverseValue(rightEdge)] })
  }
});

tiles = tiles.map(tile => {
  const matches = tiles.filter(t => t.id !== tile.id && tile.edges.some(e => t.edges.indexOf(e) > -1))
  return { ...tile, matches }
})

const total = tiles.reduce((a, b) => b.matches.length === 2 ? a * b.id : a, 1)

console.log(total)