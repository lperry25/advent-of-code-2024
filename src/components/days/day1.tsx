import { Day } from '../Day';

export function Day1() {
    const splitLists = (input: string) => {
        let leftColumn: number[] = [];
        let rightColumn: number[] = [];

        // Split the data by lines and parse each line
        input
            .trim()
            .split('\n')
            .forEach((line) => {
                const [left, right] = line.trim().split(/\s+/).map(Number);
                leftColumn.push(left);
                rightColumn.push(right);
            });

        console.log('Left Column:', leftColumn.sort());
        console.log('Right Column:', rightColumn.sort());
        return [leftColumn.sort(), rightColumn.sort()];
    };

    const solve1 = (input: string) => {
        const [left, right] = splitLists(input);
        const differenceSum = left.reduce(
            (sum, leftNum, i) => sum + Math.abs(right[i] - leftNum),
            0,
        );
        return differenceSum;
    };

    const solve2 = (input: string) => {
        const [left, right] = splitLists(input);
        const result = left.reduce(
            (sum, leftNum, i) =>
                sum + leftNum * right.filter((num) => num === leftNum).length,
            0,
        );
        return result;
    };
    return <Day solve1={solve1} solve2={solve2} />;
}
