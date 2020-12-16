"use strict"

const fs = require('fs');
const allLines = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const rules = allLines.slice(0, allLines.indexOf(''))
const tickets = allLines.slice(allLines.indexOf('') + 2)

const allowedValues = new Map()
const ticketLocationValues = new Map()
const finalPositions = new Map()

const loadNumbers = (name, range) => {
  const numbers = range.match(/([0-9]*)/ig)
  const locationRange = ticketLocationValues.get(name) || []
  for(let i = Number(numbers[0]); i <= Number(numbers[2]); i += 1) {
    allowedValues.set(i, i)
    locationRange.push(i)
  }
  ticketLocationValues.set(name, locationRange)
}

rules.forEach(rule => {
  const ranges = rule.match(/([a-z\s]*): ([0-9]*-[0-9]*) or ([0-9]*-[0-9]*)/i)
  loadNumbers(ranges[1], ranges[2])
  loadNumbers(ranges[1], ranges[3])
})

let validTicketsCount = 0
tickets.forEach(ticket => {
  const codes = ticket.split(',').map(code => Number(code))
  if(codes.every(code => allowedValues.get(code))) {
    validTicketsCount += 1
    codes.forEach((code, index) => {
      ticketLocationValues.forEach((value, key) => {
        if(value.includes(code)) {
          const positions = finalPositions.get(index) || []
          positions.push(key)
          finalPositions.set(index, positions)
        }
      })
    })
  }
})

const totalsPerPosition = []
finalPositions.forEach((value, key) => {
  const position = value.reduce((a, b) => {
    if(!a[b]) {
      a[b] = 0
    }
    a[b] += 1
    return a
  }, {})

  const possibleLabels = []
  Object.keys(position).forEach(posi => {
    if(position[posi] === validTicketsCount) {
      possibleLabels.push(posi)
    }

  })
  totalsPerPosition.push(possibleLabels)
})

let reducedFields = [...totalsPerPosition]
const passedFields = []
while(reducedFields.some(t => t.length > 1)) {
  const oneFieldFound = reducedFields.filter((t, i) => t.length === 1 && !passedFields.includes(t[0]))
  if(oneFieldFound.length > 1) console.error('BUSTED', oneFieldFound)
  const fieldName = oneFieldFound[0][0]
  passedFields.push(fieldName)
  reducedFields = reducedFields.map(f => f.length > 1 ? f.filter(r => r !== fieldName) : f)
}

const myTicket = [53,67,73,109,113,107,137,131,71,59,101,179,181,61,97,173,103,89,127,139]

const total = myTicket
  .filter((t, i) => reducedFields[i][0].match(/departure/))
  .reduce((a, b) => a * b)

console.log(total, 'departure value')