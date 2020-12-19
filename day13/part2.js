const fs = require('fs');
let notes = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const busses = notes[1].split(',').map(b => b === 'x' ? -1 : parseInt(b));

let minT = 0;
let t = minT;

const lcmPrime = i => busses.filter(b => b > 0).slice(0, i).reduce((a, b) => a * b, 1);

let inc = lcmPrime(1);
let numMatch = 1;

const test = (t) => {
	let localMatch = 0

	for (var i = 0; i < busses.length; i++) {
		if (busses[i] > 0) {
			if ((t + i) % busses[i] === 0) {
				// This is the critical section that ups the 
				// increment as we get more and more matches
				localMatch++;
				if (localMatch > numMatch) {
					numMatch++;
					inc = lcmPrime(numMatch);
				}
			}
			else {
				return false;
			}
		}
	}

	return true;
};

// Find the first place to start
while(t % inc !== 0) t++;

// Update and increment
while(!test(t)) t += inc;

console.log('PART 2', t);