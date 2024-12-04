import { Day } from '../Day';

const xmas = ['X', 'M', 'A', 'S'];

const createArray = (input: string) =>
    input.split('\n').map((row) => row.split(''));

export function Day4() {
    const solve1 = (input: string) => {
        const grid = createArray(input);
        const maxY = grid[0].length;
        const maxX = grid.length;

        const getNeighbours = (x: number, y: number, grid: string[][]) => {
            let neighbours = [];
            for (let xa = x - 1; xa < x + 2; xa++) {
                for (let ya = y - 1; ya < y + 2; ya++) {
                    if (
                        xa >= 0 &&
                        xa < maxX &&
                        ya >= 0 &&
                        ya < maxY &&
                        !(xa === x && ya === y)
                    ) {
                        neighbours.push({ letter: grid[xa][ya], x: xa, y: ya });
                    }
                }
            }
            return neighbours;
        };

        let words: number[] = [];
        grid.map((row, x) =>
            row.map((col, y) => {
                if (col === 'X') {
                    const neighbours = getNeighbours(x, y, grid);
                    const matchingNeighbours = neighbours.filter(
                        (neighbour) => neighbour.letter === 'M',
                    );
                    const fullWords = matchingNeighbours.reduce(
                        (words, neighbour) => {
                            const directionX = neighbour.x - x;
                            const directionY = neighbour.y - y;
                            try {
                                if (
                                    grid[x + 2 * directionX][
                                        y + 2 * directionY
                                    ] === 'A' &&
                                    grid[x + 3 * directionX][
                                        y + 3 * directionY
                                    ] === 'S'
                                ) {
                                    return words + 1;
                                }
                            } catch (e) {
                                return words;
                            }
                            return words;
                        },
                        0,
                    );
                    words.push(fullWords);
                }
            }),
        );
        const wordCount = words.reduce((sum, count) => sum + count, 0);
        return wordCount;
    };

    const solve2 = (input: string) => {
        const grid = createArray(input);
        let xmases = 0;
        grid.map((row, x) =>
            row.map((col, y) => {
                if (col === 'A') {
                    try {
                        const firstMas = `${grid[x - 1][y - 1]}A${grid[x + 1][y + 1]}`;
                        const secondMas = `${grid[x - 1][y + 1]}A${grid[x + 1][y - 1]}`;
                        if (firstMas === 'MAS' || firstMas === 'SAM') {
                            if (secondMas === 'MAS' || secondMas === 'SAM') {
                                xmases++;
                            }
                        }
                    } catch (e) {
                        return;
                    }
                }
            }),
        );
        return xmases;
    };
    return <Day solve1={solve1} solve2={solve2} />;
}
