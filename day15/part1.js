var nums = [5,2,8,16,18,0,1,0]
var spokenNums = [...nums]

for(let i = nums.length - 1; i <= 2020; i += 1) {
  var theNum = spokenNums[i]
  var earlierNums = spokenNums.slice(0,-1)
  if(earlierNums.some(s => s === theNum)) {
    var lastIndex = earlierNums.lastIndexOf(theNum)
    spokenNums.push(i - lastIndex)
  } else {
    spokenNums.push(0)
  }
}

console.log(spokenNums[2019])