import inputs from './input.js';

/*
Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on.
*/

const list1 = [];
const list2 = [];
let answer = 0;

inputs.lg.split('\n').forEach(line => {
    const [num1, num2] = line.split(' ').filter(Boolean);
    list1.push(num1);
    list2.push(num2);
});

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

for (let i = 0; i < list1.length; i++) {
    const val1 = +list1[i];
    const val2 = +list2[i];

    const diff = val2 - val1;

    answer += Math.abs(diff);
}




console.log('answer should be 11, we got ', answer);
