const card = 15628416
let cardloopSize = 0
let answer = 1
while(answer !== card) {
  answer = answer * 7
  answer = answer % 20201227
  cardloopSize += 1
}

console.log(cardloopSize, 'card loopsize')


const door = 11161639
let doorloopSize = 0
answer = 1
while(answer !== door) {
  answer = answer * 7
  answer = answer % 20201227
  doorloopSize += 1
}

console.log(doorloopSize, 'door loopsize')

let encryption = 1
for(let i = 0; i < cardloopSize; i ++){
  encryption = encryption * door
  encryption = encryption % 20201227
}

console.log(encryption, 'encryption')