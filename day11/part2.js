const fs = require('fs');

const seats = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

const TAKEN_SEAT = '#'
const OPEN_SEAT = 'L'
const FLOOR = '.'

// assume the row, col will be a valid seat, not floor
const getLineOfSightSeats = (seatArray, row, col) => {
  const takenSeats = []
  let leftDiagonal = col
  let rightDiagonal = col
  let hasLeftDiag = false
  let hasStraight = false
  let hasRightDiag = false
  for(let topRows = row - 1; topRows >= 0; topRows -= 1) {
    const topRow = seatArray[topRows]
    leftDiagonal -= 1
    rightDiagonal += 1
    if(!hasLeftDiag && topRow[leftDiagonal] !== FLOOR) {
      takenSeats.push(topRow[leftDiagonal])
      hasLeftDiag = true
    }
    if(!hasStraight && topRow[col] !== FLOOR) {
      takenSeats.push(topRow[col])
      hasStraight = true
    }
    if(!hasRightDiag && topRow[rightDiagonal] !== FLOOR) {
      takenSeats.push(topRow[rightDiagonal])
      hasRightDiag = true
    }
    if(hasLeftDiag && hasStraight && hasRightDiag) break
  }

  leftDiagonal = col
  rightDiagonal = col
  hasLeftDiag = false
  hasStraight = false
  hasRightDiag = false
  for(let bottomRows = row + 1; bottomRows < seatArray.length; bottomRows += 1) {
    const bottomRow = seatArray[bottomRows]
    leftDiagonal -= 1
    rightDiagonal += 1
    if(!hasLeftDiag && bottomRow[leftDiagonal] !== FLOOR) {
      takenSeats.push(bottomRow[leftDiagonal])
      hasLeftDiag = true
    }
    if(!hasStraight && bottomRow[col] !== FLOOR) {
      takenSeats.push(bottomRow[col])
      hasStraight = true
    }
    if(!hasRightDiag && bottomRow[rightDiagonal] !== FLOOR) {
      takenSeats.push(bottomRow[rightDiagonal])
      hasRightDiag = true
    }
    if(hasLeftDiag && hasStraight && hasRightDiag) break
  }
  
  let hasRight = false
  let hasLeft = false
  let rightCounter = col
  let leftCounter = col
  while(!hasRight || !hasLeft) {
    const myRow = seatArray[row]
    rightCounter += 1
    leftCounter -= 1
    if(leftCounter < 0) hasLeft = true
    if(rightCounter >= myRow.length) hasRight = true
    if(!hasLeft && myRow[leftCounter] !== FLOOR) {
      takenSeats.push(myRow[leftCounter])
      hasLeft = true
    }
    if(!hasRight && myRow[rightCounter] !== FLOOR) {
      takenSeats.push(myRow[rightCounter])
      hasRight = true
    }
    if(hasLeft && hasRight) break
  }
  return takenSeats.filter(s => s === TAKEN_SEAT).length
}

let seatsChanged = false
let loopCounter = 0
let previousSeats = [...seats]
do {
  console.log('loop', loopCounter)
  console.log(previousSeats)
  const newSeats = []
  seatsChanged = false
  for(let row = 0; row < previousSeats.length; row += 1) {
    newSeats.push('')
    for(let col = 0; col < previousSeats[row].length; col += 1) {
      const theSeat = previousSeats[row][col]
      let newSeat = theSeat
      if(theSeat !== FLOOR) {
        const visibleSeats = getLineOfSightSeats(previousSeats, row, col)
        if(theSeat === OPEN_SEAT) {
          if(visibleSeats === 0) {
            newSeat = TAKEN_SEAT
          }
        }
        if(theSeat === TAKEN_SEAT) {
          if(visibleSeats >= 5) {
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