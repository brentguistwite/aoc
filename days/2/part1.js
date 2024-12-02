import inputs from './inputs.js';


/*
    6 reports with 5 levels
    1, 2, 3, 4, 5
    1, 2, 3, 4, 5
    1, 2, 3, 4, 5
    1, 2, 3, 4, 5
    1, 2, 3, 4, 5
    1, 2, 3, 4, 5
*/

function isAllDecreasing(report) {
    let isAllDecreasing = true;

    for (let i = 0; i < report.length - 1; i++) {
        const first = report[i];
        const second = report[i + 1];

        if (first === second || first < second || Math.abs(first - second) > 3) {
            isAllDecreasing = false;
            break;
        }
    }
    return isAllDecreasing;
}

function isAllIncreasing(report) {
    let isAllIncreasing = true;

    for (let i = 0; i < report.length - 1; i++) {
        const first = report[i];
        const second = report[i + 1];

        if (first === second || first > second || Math.abs(second - first) > 3) {
            isAllIncreasing = false;
            break;
        }
    }
    return isAllIncreasing;
}

function isSafe(data) {
    const reports = data.split('\n');
    let safeCount = 0;

    for (let i = 0; i < reports.length; i++) {
        const report = reports[i].split(' ').map(Number);
        if (isAllDecreasing(report) || isAllIncreasing(report)) {
            console.log('report is safe', report)
            safeCount++;
        } else {
            console.log('report is not safe', report)
        }

    }
    return safeCount;
}

console.log('answer is should be 510 - ', isSafe(inputs.lg));