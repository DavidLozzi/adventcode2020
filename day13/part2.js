const fs = require('fs');
const buses = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

const busIds = buses[1].split(',')

let nextTime = Number(busIds.filter(b => b !== 'x').sort((a, b) => Number(a) < Number(b) ? 1 : -1)[0])

console.log(new Date())
let allDone = false
let counter = 0
while(!allDone) {
  let theyAllMatch = true
  let checkTime = nextTime
  for(let i = 0; i < busIds.length; i += 1){
    if(busIds[i] !== 'x') {
      theyAllMatch = checkTime % busIds[i] === 0
    }
    checkTime += 1
    if(!theyAllMatch) break;
  }
  if(theyAllMatch) {
    console.log('The earliest we can depart is', nextTime)
  }

  allDone = theyAllMatch
  nextTime += 1

  counter += 1
  counter % 100000000000 === 0 ? console.log(counter / 100000000000, 'trillion loops', new Date()) : null
}
console.log(new Date())