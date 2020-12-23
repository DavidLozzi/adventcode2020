'use strict'

const cups = [3,8,9,5,4,7,6,1,2]

console.log(cups)
let loopCount = 0

const moveCups = (cupNumber) => {
  console.log(cupNumber)
  if(loopCount < 100) {
    const rightThree = cups.splice(cups.indexOf(cupNumber) + 1, 3)
    if(rightThree.length < 3) {
      rightThree.push(...cups.splice(0,3 - rightThree.length))
    }
    let destination = cupNumber - 1
    
    let foundIt = false
    while(!foundIt) {
      if(destination <= 0) {
        destination = Math.max(...cups)
        foundIt = true
      }
      const testNumber = cups.indexOf(destination)
      if(testNumber > -1) {
        foundIt = true
      } else {
        destination -= 1
      }
    }
    cups.splice(cups.indexOf(destination) + 1, 0, ...rightThree)
    console.log(cups.join(''))
    loopCount += 1

    let newCupNumber = cups[cups.indexOf(cupNumber) + 1]
    if(!newCupNumber) newCupNumber = cups[0]
    moveCups(newCupNumber)
  }
}

moveCups(cups[0])

const [secondHalf, firstHalf] = cups.join('').split('1')
console.log('Final values', `${firstHalf}${secondHalf}`)
