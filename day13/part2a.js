const crt = require('./chinese_remainder')
const fs = require('fs');
const buses = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')


const busIds = buses[1].split(',')

let nextTime = Number(busIds.filter(b => b !== 'x').sort((a, b) => Number(a) < Number(b) ? 1 : -1)[0])

console.log(new Date())
let allDone = false
let counter = 0
const firstBusTime = busIds.filter(b => b !== 'x').sort((a, b) => Number(a) > Number(b) ? 1 : -1)[0]

while(!allDone) {
  let theyAllMatch = true
  if(nextTime % firstBusTime === 0 ) {
    let checkTime = nextTime
    const timeArray = []
    const busArray = []
    for(let i = 0; i < busIds.length; i += 1){
      if(busIds[i] !== 'x') {
        timeArray.push(checkTime)
        busArray.push(busIds[i])
      }
      checkTime += 1
    }
    console.log(crt(busArray, timeArray))
    if(theyAllMatch) {
      console.log('The earliest we can depart is', nextTime)
    }

    allDone = theyAllMatch
  }
  nextTime += 1

  counter += 1
  counter % 1000000000 === 0 ? console.log(counter / 1000000000, 'billion loops') : null
}
console.log(new Date())