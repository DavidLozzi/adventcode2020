// graciously referenced from https://github.com/wwnjp/AdventOfCode2020/blob/main/14.1.js

const fs = require('fs');
const sets = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

let mask = '';
let memory = [];

const getAddress = mem => parseInt(mem.replace(/[^\d]/g, ''));

const applyMask = decimal => {
	// Convert the value to 36bit string
	const binaryValue = parseInt(decimal).toString(2).padStart(36, '0');
	
	return parseInt(mask                            // Take the mask
		.split('')                                    // Look at every bit
		.map(b => parseInt(b))                        // Run it through a parseInt(), if it's 1, or 0, return it, X will throw NaN
		.map((b, i) => isNaN(b) ? binaryValue[i] : b) // for each (b)it, if it's NaN return the bit in the slot vv[i], otherwise, b 
		.join(''), 2);                                // smash it back together, convert to number, \o/
}


sets.forEach(set => {
	let [instruction, value] = set.split(' = ');

	if (instruction === 'mask') {
		mask = value;
	}
	if (instruction.match(/mem/)) {
		memory[getAddress(instruction)] = applyMask(value);
	}
});

console.log('PART 1', memory.reduce((a, b) => a + b, 0));