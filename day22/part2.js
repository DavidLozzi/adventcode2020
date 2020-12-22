'use strict'

const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n'); //.filter(d => typeof d === Number);

const player1 = data.slice(1, data.indexOf('')).map(d => Number(d))
const player2 = data.slice(data.indexOf('') + 2).map(d => Number(d))

let gameCounter = 0
let subGameCounter = 0
let subRoundCounter = 0

const playSubGame = (play1, play2) => {
  const subDeckConfigs = new Map()
  subGameCounter += 1
  subRoundCounter = 0
  while(play1.length > 0 && play2.length > 0) {
    const subConfig = ['1:', ...play1, '2:', ...play2].join()
    if(subDeckConfigs.get(subConfig)) {
      console.log('  PLAYER 1 WINS SUBGAME BY RECURSION')
      return 1
    }
    subDeckConfigs.set(subConfig, true)
    subRoundCounter += 1
    subRoundCounter % 1000 === 0 ? console.log('  SUBGAME', subRoundCounter) : null
    const oneCard = play1.splice(0, 1)[0]
    const twoCard = play2.splice(0, 1)[0]

    if(oneCard <= play1.length && twoCard <= play2.length) {
      const play1subgame = play1.slice(0, oneCard)
      const play2subgame = play2.slice(0, twoCard)
      const whoWon = playSubGame(play1subgame, play2subgame)
      if(whoWon === 1) {
        console.log('PLAYER 1 WON ROUND', gameCounter)
        play1.push(oneCard)
        play1.push(twoCard)
      } else {
        console.log('PLAYER 2 WON ROUND', gameCounter)
        play2.push(twoCard)
        play2.push(oneCard)
      }      
    } else {
      if(oneCard > twoCard) {
        play1.push(oneCard)
        play1.push(twoCard)
      } else {
        play2.push(twoCard)
        play2.push(oneCard)
      }

    }
  }

  console.log('  SUBGAME', play1.length > 0 ? 'PLAYER 1 WON!' : 'PLAYER 2 WON!')
  return play1.length > 0 ? 1 : 2
}

const deckConfigs = new Map()
while(player1.length > 0 && player2.length > 0) {
  gameCounter += 1
  const subConfig = ['1:', ...player1, '2:', ...player2].join()
  if(deckConfigs.get(subConfig)) {
    console.log('PLAYER 1 WINS GAME BY RECURSION')
    break
  }
  deckConfigs.set(subConfig, true)

  const oneCard = player1.splice(0, 1)[0]
  const twoCard = player2.splice(0, 1)[0]

  if(oneCard <= player1.length && twoCard <= player2.length) {
    const player1subgame = player1.slice(0, oneCard)
    const player2subgame = player2.slice(0, twoCard)
    const whoWon = playSubGame(player1subgame, player2subgame)
    if(whoWon === 1) {
      console.log('PLAYER 1 WON ROUND', gameCounter)
      player1.push(oneCard)
      player1.push(twoCard)
    } else {
      console.log('PLAYER 2 WON ROUND', gameCounter)
      player2.push(twoCard)
      player2.push(oneCard)
    }
  } else {
    if(oneCard > twoCard) {
      console.log('PLAYER 1 WON ROUND', gameCounter)
      player1.push(oneCard)
      player1.push(twoCard)
    } else {
      console.log('PLAYER 2 WON ROUND', gameCounter)
      player2.push(twoCard)
      player2.push(oneCard)
    }
  }
}

console.log(player1.length > 0 ? 'PLAYER 1 WON!' : 'PLAYER 2 WON!', 'in', gameCounter, 'games', subGameCounter, 'subgames')

const winner = [...player1, ...player2]
const length = winner.length

const score = winner.reduce((a, b, index) => a + ((length - index) * b), 0)

console.log('The winning score is', score)
console.log('35902 is too high')