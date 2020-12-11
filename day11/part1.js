const fs = require('fs');

const seats = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

const TAKEN_SEAT = '#'
const OPEN_SEAT = 'L'
const FLOOR = '.'

// assume the row, col will be a valid seat, not floor
const getAdjacentSeats = (seatArray, row, col) => {
  const adjacentSeats = []
  if(row > 0) {
    const rowAbove = seatArray[row - 1]
    adjacentSeats.push(rowAbove[col - 1]) // top left
    adjacentSeats.push(rowAbove[col]) // top middle
    adjacentSeats.push(rowAbove[col + 1]) // top right
  }

  adjacentSeats.push(seatArray[row][col - 1]) // left seat
  adjacentSeats.push(seatArray[row][col + 1]) // right seat

  if(row < seatArray.length - 1) {
    const rowBelow = seatArray[row+1]
    adjacentSeats.push(rowBelow[col - 1]) // bottom left
    adjacentSeats.push(rowBelow[col]) // bottom middle
    adjacentSeats.push(rowBelow[col + 1]) // bottom right
  }

  return { takenSeats: adjacentSeats.filter(s => s === TAKEN_SEAT).length, openSeats: adjacentSeats.filter(s => s === OPEN_SEAT).length }
}

let seatsChanged = false
let loopCounter = 0
let previousSeats = [...seats]
do {
  const newSeats = []
  seatsChanged = false
  for(let row = 0; row < previousSeats.length; row += 1) {
    newSeats.push('')
    for(let col = 0; col < previousSeats[row].length; col += 1) {
      const theSeat = previousSeats[row][col]
      let newSeat = theSeat
      if(theSeat !== FLOOR) {
        const adjacentSeats = getAdjacentSeats(previousSeats, row, col)
        if(theSeat === OPEN_SEAT) {
          if(adjacentSeats.takenSeats === 0) {
            newSeat = TAKEN_SEAT
          }
        }
        if(theSeat === TAKEN_SEAT) {
          if(adjacentSeats.takenSeats >= 4) {
            newSeat = OPEN_SEAT
          }
        }
      } else {
        newSeat = FLOOR
      }
      if(newSeat !== theSeat) seatsChanged = true
      newSeats[row] = `${newSeats[row]}${newSeat}`
    }
  }
  previousSeats = [...newSeats]
  loopCounter += 1
} while (seatsChanged)

console.log(previousSeats, 'in', loopCounter, 'loops')
const takenRegEx = new RegExp(TAKEN_SEAT,'ig')
console.warn('there are', previousSeats.join('').match(takenRegEx).length, 'occupied seats')