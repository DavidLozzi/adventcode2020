const fs = require('fs');

const adapters = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map((l) => Number(l)).sort((a,b) => a > b ? 1 : -1);
adapters.push(adapters[adapters.length-1]+3)

let iterationCount = 0

let lastJolt = 0
const consecutiveJolts = {}

console.log(new Date())
adapters.forEach((jolt, index) => {
  const diffJolt = jolt - lastJolt
  if(diffJolt === 1) {
    iterationCount += 1
  } else {
    if(!consecutiveJolts[iterationCount]) {
      consecutiveJolts[iterationCount] = 1
    } else {
      consecutiveJolts[iterationCount] += 1
    }
    iterationCount = 0
  }
  lastJolt = jolt

  if(index === (adapters.length - 1)) { // also close out the last row
    if(consecutiveJolts[iterationCount] === undefined) {
      consecutiveJolts[iterationCount] = 1
    } else {
      consecutiveJolts[iterationCount] ++;
    }
}
})

const getPossibleCombos = (count) => {
  let response = [];
  let lastThreeResponses = [0, 0, 0];
  const minValue = 1;
  for(let i = 0; i <= count; i++) {
      let possible = lastThreeResponses.reduce((a, b) => a + b, 0);
      lastThreeResponses.shift();
      if(possible < minValue) {
          possible = minValue;
      }
      lastThreeResponses.push(possible);
      response[i] = possible;
  }
  return response;
}

var joltGroupCnt = Object.keys(consecutiveJolts).length
let numPossibilities = getPossibleCombos(joltGroupCnt);
let total = 1
for(let i = 0; i < joltGroupCnt; i+=1) {
  total = total * (numPossibilities[i] ** consecutiveJolts[i])
}


console.log(total)

console.log(new Date())