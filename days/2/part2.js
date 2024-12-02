import inputs from './inputs.js';
// Add your Part 2 solution here


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
    let badLevelCount = 0;
    const arr = [...report];
    let index = 0;

    while (index < arr.length - 1) {
        const first = arr[index];
        const second = arr[index + 1];

        if (first === second || first < second || Math.abs(first - second) > 3) {
            badLevelCount++;
            arr.splice(index, 1);
            index = 0;

            if (badLevelCount > 1) {
                isAllDecreasing = false;
                break;
            }
        } else {
            index++;
        }
    }

    return isAllDecreasing;
}

function isAllIncreasing(report) {
    let isAllIncreasing = true;
    let badLevelCount = 0;
    const arr = [...report];
    let index = 0;

    while (index < arr.length - 1) {
        const first = arr[index];
        const second = arr[index + 1];

        if (first === second || first > second || Math.abs(second - first) > 3) {
            badLevelCount++;
            arr.splice(index, 1);
            index = 0;

            if (badLevelCount > 1) {
                isAllIncreasing = false;
                break;
            }
        } else {
            index++;
        }
    }

    return isAllIncreasing;
}

function getSafeCount(data) {
    const reports = data.split('\n').map((line) => line.split(' ').map(Number));
    let safeCount = 0;

    for (let i = 0; i < reports.length; i++) {
        const report = reports[i];
        if(isAllDecreasing(report)) {
            safeCount++;
        } else if(isAllIncreasing(report)) {
            safeCount++;
        }
        else {
            console.log('report is not safe', report)
        }
    }
    return safeCount;
}

