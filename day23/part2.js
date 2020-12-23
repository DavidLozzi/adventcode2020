'use strict'

class Cup {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

const data = [3,8,9,5,4,7,6,1,2]

const initialCups = data.map(d => new Cup(d))
let currentCup = initialCups[0]
const lastCup = initialCups[initialCups.length - 1]

console.log(new Date())

const cups = new Map()
initialCups.forEach((c, i) => {
  c.next = initialCups[i+1]
  cups.set(c.value, c)
})

let addCup = lastCup
for(let i = initialCups.length + 1; i <= 1000000; i += 1) {
  const aCup = new Cup(i)
  cups.set(i, aCup)
  addCup.next = aCup
  addCup = aCup
}
addCup.next = currentCup

for(let i = 0; i < 10000000; i+= 1) {
  i % 1000000 === 0 ? console.log(i) : null
  const nextOne = currentCup.next
  const nextTwo = nextOne.next
  const nextThree = nextTwo.next

  let destinationNumber = currentCup.value
  let foundDestination = false
  while(!foundDestination) {
    destinationNumber -= 1
    if(destinationNumber < 1) destinationNumber = cups.size
    if(
      nextOne.value === destinationNumber || 
      nextTwo.value === destinationNumber || 
      nextThree.value === destinationNumber) continue
    foundDestination = true
  }
  const destinationCup = cups.get(destinationNumber)

  const prevDestinatioNext = destinationCup.next
  const prevThirdCupNext = nextThree.next
  destinationCup.next = nextOne
  nextThree.next = prevDestinatioNext
  currentCup.next = prevThirdCupNext

  currentCup = currentCup.next
}

const cupOne = cups.get(1)
const firstCup = cupOne.next
const secondCup = firstCup.next
console.log('Final values', firstCup.value, secondCup.value, '=', firstCup.value * secondCup.value)

console.log(new Date())