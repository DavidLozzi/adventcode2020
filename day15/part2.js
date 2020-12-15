var nums = [5,2,8,16,18,0,1]
var numIndexes = {}

console.log(new Date())
nums.forEach((n, i) => numIndexes[n] = i)

let theNum = 0
for(let i = nums.length; i <= 30000000 - 2; i += 1) {
  if(numIndexes[theNum] >= 0) {
    var lastIndex = numIndexes[theNum]
    numIndexes[theNum] = i
    theNum = i - lastIndex
  } else {
    numIndexes[theNum] = i
    theNum = 0
  }
  if(i % 1000000 === 0) console.log(new Date(), i)
}

console.log(theNum)
console.log(new Date())