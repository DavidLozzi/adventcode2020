const fs = require('fs');
const allLines = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const rules = allLines.slice(0, allLines.indexOf(''))
const tickets = allLines.slice(allLines.indexOf('') + 2)

const allowedValues = new Map()
const invalidValues = []

const loadNumbers = (range) => {
  const numbers = range.match(/([0-9]*)/ig)
  for(let i = Number(numbers[0]); i <= Number(numbers[2]); i += 1) {
    allowedValues.set(i, i)
  }
}

rules.forEach(rule => {
  const ranges = rule.match(/([0-9]*-[0-9]*)/ig)
  loadNumbers(ranges[0])
  loadNumbers(ranges[1])
})

tickets.forEach(ticket => {
  const codes = ticket.split(',')
  codes.forEach(code => {
    if(!allowedValues.get(Number(code))) invalidValues.push(Number(code))
  })
})

console.log(invalidValues.reduce((a, b) => a + b))