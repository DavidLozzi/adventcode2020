'use strict'

const fs = require('fs')
const maths = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

let total = 0

const basicMath = (equation) => {
  let newMath = equation.replace(/[\(\)]*/g, '')
  // do addition first
  while(newMath.indexOf('+') > -1) {
    const firstMath = newMath.match(/([0-9]*\s\+\s[0-9]*)/)[1]
    newMath = newMath.replace(firstMath, eval(firstMath))
  }
  while(isNaN(newMath)) {
    const firstMath = newMath.match(/([0-9]*\s[\+\*]\s[0-9]*)/)[1]
    newMath = newMath.replace(firstMath, eval(firstMath))
  }
  return newMath
}

maths.forEach(math => {
  let reducedMath = math

  while(reducedMath.indexOf('(') > -1) {
    const parenths = reducedMath.match(/\((?![0-9\s\*\+]*\()[0-9\s\+\*]*\)/ig)
    parenths.forEach(p => {
      reducedMath = reducedMath.replace(p,basicMath(p))
    })
  }

  reducedMath = basicMath(reducedMath)
  console.log(reducedMath)
  total += Number(reducedMath)
})

console.log(total, 'total')