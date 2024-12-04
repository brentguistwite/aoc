import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf8');
const sampleInput = fs.readFileSync('sample-input.txt', 'utf8');
// Add your Part 2 solution here

const expectedResult = 9;

function lookAdjacent(x, y, charMatrix, searchLetterIndex) {
    // Prevent us from doing unsafe operations
    if (x < 0|| x > charMatrix.length || y < 0 || y > charMatrix[0].length || !charMatrix[x] || !charMatrix[x][y]) {
        return 'Z';
    }

    return charMatrix[x][y];
}

function getXmasCount(textInput) {
    let count = 0;
    const aIndices = [];
    const textMatrix = textInput.split('\n').map(line => line.split(''));

    // Collect all the X indices
    for (let i = 0; i < textMatrix.length; i++) {
        for (let j = 0; j < textMatrix[i].length; j++) {
            const letter = textMatrix[i][j];
            if (letter === 'A') {
                aIndices.push([i, j]);
            }
        }
    }

    // For each X index, check if there is a M, A, S in the 8 directions
    for (let i = 0; i < aIndices.length; i++) {
        const [currentX, currentY] = aIndices[i];
        const currentValue = textMatrix[currentX][currentY];

        // Grab adjacent letters up-left to down-right and build text string of those 3 letters
        const firstX = [
            lookAdjacent(currentX - 1, currentY - 1, textMatrix, 0),
            currentValue,
            lookAdjacent(currentX + 1, currentY + 1, textMatrix, 0),
        ].join('');

         // Grab adjacent letters down-left to up-right and build text string of those 3 letters
        const secondX = [
            lookAdjacent(currentX - 1, currentY + 1, textMatrix, 0),
            currentValue,
            lookAdjacent(currentX + 1, currentY - 1, textMatrix, 0),
        ].join('');

        // Are both strings 'MAS' or 'SAM'?
        if ((firstX === 'MAS' || firstX === 'SAM') && (secondX === 'MAS' || secondX === 'SAM')) {
            count++;
        }
    }

    return count;
}

console.log(`Expected result: ${expectedResult}, actual result: ${getXmasCount(input)}`);