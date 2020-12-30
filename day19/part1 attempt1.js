'use strict'

const { match } = require('assert');
const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const raw = data.slice(0, data.indexOf(''))
const messages = data.slice(data.indexOf('') + 1)
let validMessage = 0;

const directCommand = rule => {
  const pieces = rule.split(' ')
  const rules = []
  for(let i = 1; i < pieces.length; i+=1){
    let ruleBuilder = ''
    const rulePiece = processRule(raw[pieces[i]])
    if(typeof rulePiece === 'string') {
      ruleBuilder += rulePiece
    }
    if(typeof rulePiece === 'object') {
      const manyRules = rulePiece.map(option => option.map(o => {
          if(typeof o === 'string') return o
          if(typeof o === 'object') return o.map(p => p.join('')).join('')
      }))
      manyRules.forEach(p => {
        rules.push(`${ruleBuilder}${p.join('')}`)
      })
      ruleBuilder = ''
    }
  }
  return rules
}

const orCommand = rule => {
  const pieces = rule.match(/([0-9]*)\s([0-9]*)\s\|\s([0-9]*)\s([0-9]*)/i)
  const firstOption = []
  firstOption.push(processRule(raw[pieces[1]]))
  firstOption.push(processRule(raw[pieces[2]]))
  const secondOption = []
  secondOption.push(processRule(raw[pieces[3]]))
  secondOption.push(processRule(raw[pieces[4]]))
  return [firstOption, secondOption]
}

const matchCommand = rule => {
  return rule.match(/"([a-z]{1})"/i)[1]
}

const processRule = rule => {
  if(rule.match(/\|/ig)) {
    return orCommand(rule)
  } else if(rule.match(/"/ig)) {
    return matchCommand(rule)
  } else {
    return directCommand(rule)
  }
}

const rule = processRule(raw[0])
console.log(rule)