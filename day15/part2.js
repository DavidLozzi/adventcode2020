var nums = [5,2,8,16,18,0,1]
var numIndexes = new Map()

console.log(new Date())
nums.forEach((n, i) => numIndexes.set(n, i))

let theNum = 0
for(let i = nums.length; i <= 30000000 - 2; i += 1) {
  if(numIndexes.has(theNum)) {
    var lastIndex = numIndexes.get(theNum)
    numIndexes.set(theNum, i)
    theNum = i - lastIndex
  } else {
    numIndexes.set(theNum, i)
    theNum = 0
  }
  if(i % 1000000 === 0) console.log(new Date(), i)
}

console.log(theNum)
console.log(new Date())