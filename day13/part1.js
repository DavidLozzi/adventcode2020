const fs = require('fs');
const buses = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

const startTime = Number(buses[0])
const busIds = buses[1].split(',').filter(b => b !== 'x').sort((a, b) => a > b ? 1 : -1).map(id => Number(id))

console.log(startTime, busIds)
let nextTime = startTime

let busFound = false
while(!busFound) {
  const ourBus = busIds.find(bus => nextTime % bus === 0)
  if(ourBus) {
    busFound = true
    const waiting = nextTime - startTime
    console.log('we can pick up', ourBus, 'at', nextTime, 'waiting', waiting)
    console.log(ourBus * waiting, 'is the answer!')
  }
  nextTime += 1
}