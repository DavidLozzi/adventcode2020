'use strict'

const fs = require('fs');
class Food {
  constructor (ingredients, allergens) {
    ingredients.map(ing => ing.food = this)
    allergens.map(all => all.food = this)
    this.name = `${ingredients.map(ing => ing.name).join(',')}${allergens.map(all => all.name).join(',')}`
    this.ingredients = ingredients
    this.allergens = allergens
  }
}

class Ingredient {
  constructor (name) {
    this.name = name
    this.food = null
  }
}

class Allergen {
  constructor (name) {
    this.name = name
    this.food = null
  }
}

let foods = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(f => {
  const split = f.match(/([a-z\s]*)\(contains\s([a-z,\s]*)/i)
  return new Food(split[1].trim().split(' ').map(f => new Ingredient(f)), split[2].trim().split(', ').map(a => new Allergen(a)))
});

const allergenics = new Map()
const safties = new Map()
foods.forEach((food, index) => {
  let allergenCounter = 0
  const { ingredients, allergens } = food
  ingredients.forEach(ingredient => {
    const foodsContaining = foods.filter((f, i) => i !== index && f.ingredients.some(s => s.name === ingredient.name))
    console.log(ingredient.name)
    if(foodsContaining.length > 0) {
      const isAllergen = allergens.some(allergen => foodsContaining.some(c => c.allergens.some(s => s.name === allergen.name)))
      if(isAllergen) {
        if(!allergenics.get(ingredient)) {
          allergenics.set(ingredient, allergens)
        } else {
          const alls = [...allergenics.get(ingredient), ...allergens]
          allergenics.set(ingredient, alls)
        }
        allergenCounter += 1
      } else {
        if(allergenics.get(ingredient)) {
          const alls = [...allergenics.get(ingredient), ...allergens]
          allergenics.set(ingredient, alls)
        } else {
          safties.set(ingredient, true)
        }
      }
    } else {
      safties.set(ingredient, true)
    }
    // allergenics.set(index, {ingredientCount: food.ingredients.length, allergenCount: food.allergens.length, allergenCounter})
  })
})

let safeCounter = 0
safties.forEach(([value, key]) => {
  const containsSafe = foods.filter(f => f.ingredients.some(s => s === value))
  containsSafe.forEach(safe => {
    const allergensCount = containsSafe.ingredients.filter(c => allergenics.has(c)).length
    
  })
})

console.log(allergenics)
console.log(safties)
console.log(safeCounter)