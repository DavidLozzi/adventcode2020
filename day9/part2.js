const fs = require('fs');

const nums = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map((l) => Number(l));

const preamble = 25
let index = preamble;
let doit = true
let bustedNumber = 0

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
    console.warn(thisNum, 'does not follow the rule')
    bustedNumber = thisNum
  }
  index += 1
} while (doit)

let min = 0
let max = 0
let roundCnt = 0
nums.forEach((n, nindex) => {
  roundCnt += 1
  let keepAdding = true
  let sum = n
  let addIndex = nindex + 1
  min = n
  max = 0

  do {
    if(addIndex < nums.length) {
      const addThis = nums[addIndex]
      sum += addThis

      if(addThis < min) min = addThis
      if(addThis > max) max = addThis

      if(sum === bustedNumber) {
        keepAdding = false
        console.warn(min + max, 'is the encryption weakness')
      }
      if(sum > bustedNumber) {
        keepAdding = false
      }
      addIndex += 1
    } else {
      keepAdding = false
    }
  } while(keepAdding)
})

console.log('finished in' , roundCnt, 'rounds')