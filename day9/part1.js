const fs = require('fs');

const nums = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map((l) => Number(l));

const preamble = 25
let index = preamble;
let doit = true

do {
  const checkList = nums.slice(index - preamble, index)
  const thisNum = nums[index]
  let invalidNumber = true
  
  checkList.forEach((c) => {
    for (let checkIndex = 0; checkIndex < checkList.length; checkIndex += 1) {
      if (c + checkList[checkIndex] === thisNum) {
        invalidNumber = false
        checkIndex = checkList.length
      }
    }
  })

  if(invalidNumber){
    doit = false
    console.warn(thisNum, ' does not follow the rule')
  } else {
    console.log(thisNum, 'is acceptable')
  }
  index += 1
} while (doit)
