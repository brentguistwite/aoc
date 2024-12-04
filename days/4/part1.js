import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf8');
const sampleInput = fs.readFileSync('sample-input.txt', 'utf8');
// Add your Part 1 solution here

const expectedResult = 18;
const searchLetters = ['M', 'A', 'S'];

function lookAdjacent(x, y, charMatrix, searchLetterIndex) {
    // Prevent us from doing unsafe operations
    if (x < 0|| x > charMatrix.length || y < 0 || y > charMatrix[0].length || !charMatrix[x] || !charMatrix[x][y]) {
        return null;
    }

    if (charMatrix[x][y] === searchLetters[searchLetterIndex]) {
        return 1;
    }

    return null;
}

function getXmasCount(textInput) {
    let count = 0;
    const directionMap = {
        UP: [-1, 0],
        UP_RIGHT: [-1, 1],
        RIGHT: [0, 1],
        DOWN_RIGHT: [1, 1],
        DOWN: [1, 0],
        DOWN_LEFT: [1, -1],
        LEFT: [0, -1],
        UP_LEFT: [-1, -1],
    }

    const xIndices = [];


    /**
     * 2d array of characters
     */
    const textMatrix = textInput.split('\n').map(line => line.split(''));

    // Collect all the X indices
    for (let i = 0; i < textMatrix.length; i++) {
        for (let j = 0; j < textMatrix[i].length; j++) {
            const letter = textMatrix[i][j];
            if (letter === 'X') {
                xIndices.push([i, j]);
            }
        }
    }

    // For each X index, check if there is a M, A, S in the 8 directions
    for (let i = 0; i < xIndices.length; i++) {
        const adjacentXmasCountMap = {
            UP: 0,
            UP_RIGHT: 0,
            RIGHT: 0,
            DOWN_RIGHT: 0,
            DOWN: 0,
            DOWN_LEFT: 0,
            LEFT: 0,
            UP_LEFT: 0,
        }

        const [currentX, currentY] = xIndices[i];

        // Look for each letter in adjacent areas ("M" - "A" - "S")
        for (let searchLettersIndex = 0; searchLettersIndex < searchLetters.length; searchLettersIndex++) {

            // Only continue looking in directions where we know its possible to find a match
            const directionsToLook = Object.entries(adjacentXmasCountMap).filter(([_direction, unfilteredCount]) => {
                return typeof unfilteredCount === 'number';
            });

            // No possible matches so skip
            if (!directionsToLook.length) {
                continue;
            }

            // Move 1 step outwards in each direction
            directionsToLook.forEach(([direction]) => {
                const moves = [];

                // How many steps to move in the current direction
                for (let spacesToMove = 0; spacesToMove < searchLettersIndex + 1; spacesToMove++) {
                    moves.push(directionMap[direction]);
                }

                // Calculate the new x and y coordinates to look at
                const [x, y] = moves.reduce(([x, y], [moveX, moveY]) => [x + moveX, y + moveY], [currentX, currentY]);

                // Grab new value
                adjacentXmasCountMap[direction] = lookAdjacent(x, y, textMatrix, searchLettersIndex);
            });
        }

        // Count the number of matches
        const updatedCount = Object.values(adjacentXmasCountMap).reduce((acc, curr) => {
            return typeof curr === 'number' ? acc + curr : acc;
        }, 0);

        count += updatedCount;
    }

    return count;
}

console.log(`Expected result: ${expectedResult}, actual result: ${getXmasCount(input)}`);