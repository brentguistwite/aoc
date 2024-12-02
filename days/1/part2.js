
import inputs from './input.js';

const list1 = [];

const list2Count = {};
let answer = 0;

inputs.sm.split('\n').forEach(line => {
    const [num1, num2] = line.split(' ').filter(Boolean);
    num2 in list2Count ? list2Count[num2]++ : list2Count[num2] = 1;
    list1.push(num1);
});

for (let i = 0; i < list1.length; i++) {
    const curVal = list1[i];
    const val = +curVal;
    const multiple = list2Count[curVal] || 0;
    answer += val * multiple;
}

console.log('answer is = ', answer);
/*
Calculate a total similarity score by adding up each number in the left list
after multiplying it by the number of times that number appears in the right list.
*/