'use strict'

const startDate = new Date()
console.log(startDate)

const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const raw = data.slice(0, data.indexOf('')).sort((a, b) => a < b ? 1 : -1)
const messages = data.slice(data.indexOf('') + 1)

let convertedRules = new Set(raw)


// (^a(aa|bb)(ab|ba)b)|(^a(ba|ab)(aa|bb)b)\Z

const replaceRules = (rule) => {
  const letterRule = rule.match(/([0-9]*):\s"*([ab\s\|]+)/)
  const ruleNumber = letterRule[1]
  const letters = letterRule[2]
  convertedRules = new Set([...convertedRules].filter(r => r !== rule).map(r => {
    const regex = new RegExp(`[\\s]*${ruleNumber}\\s|[\\s]*${ruleNumber}$`, 'gs')
    if(r.match(regex)) {
      return r.replace(regex, ` ${letters} `)
    }
    return r
  }))
}

// replaces a and b
[...convertedRules].filter(r => r.match(/"/)).forEach(r => replaceRules(r))
  
// process anything that has only letters in it
const groupRules = () => {
  const ruleArray = [...convertedRules]
  ruleArray.filter(r => r.match(/[\sab\|]{10,}[^0-9]/)).map(rule => {
    // console.log(rule)
    const newRules = new Set()
    const letterRule = rule.match(/([0-9]+):([ab0-9\s]{4,})[\|]*([ab0-9\s]*)/)
    const ruleNumber = letterRule[1]
    const letterGroup1 = letterRule[2] //.replace(/\s/g,'')
    const letterGroup2 = letterRule[3] ? letterRule[3] : null
    ruleArray.filter(r => r !== rule).map(r => {
      const regex = new RegExp(`[\\s]*${ruleNumber}\\s|[\\s]*${ruleNumber}$`, 'gs')
      if(r.match(regex)) {
        newRules.add(r.replace(regex, ` ${letterGroup1} `))
        if(letterGroup2) {
          newRules.add(r.replace(regex, ` ${letterGroup2} `))
          const regexOne = new RegExp(`[\\s]*${ruleNumber}\\s|[\\s]*${ruleNumber}$`, 's') // removed global
          let firstSwap = r.replace(regexOne, ` ${letterGroup2} `).replace(regexOne, ` ${letterGroup1} `)
          newRules.add(firstSwap)
          let secondSwap = r.replace(regexOne, ` ${letterGroup1} `).replace(regexOne, ` ${letterGroup2} `)
          newRules.add(secondSwap)
        }
        const ruleStart = new RegExp(`^${ruleNumber}:`, 's')
        if([...newRules].some(ru => ru !== r && ru !== rule && ru.match(ruleStart))) {
          newRules.add(r)
        }
      } else {
        newRules.add(r)
      }
    })
    convertedRules = newRules //.filter(r => r !== rule)
  })
}

let loopCount = 0
let loopStart = new Date()
while([...convertedRules].filter(r => r.match(/^[1-9]+/)).length > 0) {
  groupRules()
  loopCount += 1
  if(loopCount % 10 === 0) {
    console.log(`${(new Date() - loopStart) / 1000}s`, loopCount, 'loops', `  ${(new Date() - startDate) / 1000}s total`)
    loopStart = new Date()
  }
}

console.log(convertedRules)

convertedRules = new Set([...convertedRules].map(r => r.replace(/[0:\s]/g,'')))
const matchingMessages = new Set(messages.filter(m => convertedRules.has(m)))

console.log(matchingMessages.size, 'matching messages')
console.log('completed in', (new Date() - startDate) / 1000 / 60, `minutes (${(new Date() - startDate)}ms)` )