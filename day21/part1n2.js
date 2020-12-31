// ref https://github.com/lnguyenh/aoc-2020/blob/master/21/main.js
const fs = require('fs');

const getInput = (fileName) => {
  let fileContent = fs.readFileSync(fileName, 'utf8');
  return fileContent.split('\n');
};

const INPUT_FILE = 'input.txt';
const foodLines = getInput(INPUT_FILE);

const foods = [];
let ingredients = new Set();
const allergens = new Map();
const ingredientsPart2 = new Map();

for (const line of foodLines) {
  const match = /^([(\w+) ]+) \(contains ([(\w+), ]+)\)$/.exec(line);
  const foodIngredients = match[1].split(' ');
  const foodAllergens = match[2] ? match[2].split(', ') : [];

  // Populate an array of foods, storing for each food its list of ingredients
  foods.push({ ingredients: foodIngredients });

  // Populate a set of unique ingredients
  ingredients = new Set([...ingredients, ...foodIngredients]);

  // Populate a map containing for each allergen a list of possible ingredients
  // that can contain it
  for (const allergen of foodAllergens) {
    if (allergens.has(allergen)) {
      const ingredientIntersection = allergens
        .get(allergen)
        .filter((a) => foodIngredients.includes(a));
      allergens.set(allergen, ingredientIntersection);
    } else {
      allergens.set(allergen, foodIngredients);
    }
  }

  // Populate a map containing for each ingredient a list of possible allergens
  // it can contain
  for (const ingredient of foodIngredients) {
    if (ingredientsPart2.has(ingredient)) {
      const allergenSet = new Set([
        ...ingredientsPart2.get(ingredient),
        ...foodAllergens,
      ]);
      ingredientsPart2.set(ingredient, allergenSet);
    } else {
      ingredientsPart2.set(ingredient, new Set(foodAllergens));
    }
  }
}

const cleanIngredients = new Set(ingredients);
for (const [__, ingredientList] of allergens) {
  ingredientList.forEach((i) => cleanIngredients.delete(i));
}
let resultPart1 = 0;
for (const ingredient of cleanIngredients) {
  for (const food of foods) {
    if (food.ingredients.includes(ingredient)) resultPart1++;
  }
}
console.log('part 1: ' + resultPart1);

for (const [allergen, ingredientSet] of allergens) {
  allergens.set(
    allergen,
    new Set([...ingredientSet].filter((i) => !cleanIngredients.has(i)))
  );
}
const cleanedAllergens = [];
while (allergens.size > 0) {
  for (const [allergen, ingredientSet] of allergens) {
    if (ingredientSet.size === 1) {
      const ingredient = [...ingredientSet][0];
      cleanedAllergens.push({
        allergen,
        ingredient,
      });
      allergens.delete(allergen);
      for (const [__, iSet] of allergens) {
        iSet.delete(ingredient);
      }
      break;
    }
  }
}
cleanedAllergens.sort((a, b) => a.allergen.localeCompare(b.allergen));
const resultPart2 = cleanedAllergens.map((a) => a.ingredient).join(',');
console.log('part 2: ' + resultPart2);