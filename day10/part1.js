const fs = require('fs');

const adapters = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map((l) => Number(l)).sort((a,b) => a > b ? 1 : -1);
adapters.push(adapters[adapters.length-1]+3)

let currentJolt = 0
let adapterCount = 0
let oneJoltDiff = 0
let threeJoltDiff = 0

while(adapterCount < adapters.length) {
  const compatibleAdapters = adapters.filter(a => a <= currentJolt+3 && a > currentJolt)
  const nextAdapter = compatibleAdapters[0]
  if(nextAdapter - currentJolt === 1) oneJoltDiff += 1
  if(nextAdapter - currentJolt === 3) threeJoltDiff += 1
  currentJolt = nextAdapter
  adapterCount += 1
}

console.warn(oneJoltDiff * threeJoltDiff, 'WINNER WINNER')