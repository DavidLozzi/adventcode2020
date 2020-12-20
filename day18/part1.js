'use strict'

const fs = require('fs')
const maths = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

let total = 0

const basicMath = (equation) => {
  let newMath = equation.replace(/[\(\)]*/g, '')
  while(isNaN(newMath)) {
    const firstMath = newMath.match(/([0-9]*\s[\+\*]\s[0-9]*)/)[1]
    newMath = newMath.replace(firstMath, eval(firstMath))
  }
  return newMath
}
maths.forEach(math => {
  let reducedMath = math

  // remove parenths in order
  while(reducedMath.indexOf('(') > -1) {
    const parenths = reducedMath.match(/\((?![0-9\s\*\+]*\()[0-9\s\+\*]*\)/ig)
    parenths.forEach(p => {
      reducedMath = reducedMath.replace(p,basicMath(p))
    })
  }

  // do the math, in order, left to right, NOT like normal math
  reducedMath = basicMath(reducedMath)
  console.log(reducedMath)
  total += Number(reducedMath)
})

console.log(total, 'total')