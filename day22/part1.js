'use strict'

const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n'); //.filter(d => typeof d === Number);

const player1 = data.slice(1, data.indexOf('')).map(d => Number(d))
const player2 = data.slice(data.indexOf('') + 2).map(d => Number(d))

while(player1.length > 0 && player2.length > 0) {
  const oneCard = player1.splice(0, 1)[0]
  const twoCard = player2.splice(0, 1)[0]

  if(oneCard > twoCard) {
    player1.push(oneCard)
    player1.push(twoCard)
  } else {
    player2.push(twoCard)
    player2.push(oneCard)
  }
}

console.log(player1.length > 0 ? 'PLAYER 1 WON!' : 'PLAYER 2 WON!')

const winner = [...player1, ...player2]
const length = winner.length

const score = winner.reduce((a, b, index) => a + ((length - index) * b), 0)

console.log('The winning score is', score)