import { Day } from '../Day';

export function Day3() {
    const calculate = (mul: string) => {
        const numbers = mul.replace(/^mul\(|\)$/g, '').split(',');
        return parseInt(numbers[0], 10) * parseInt(numbers[1], 10);
    };

    const solve1 = (input: string) => {
        const regex = /mul\(\d{1,3},\d{1,3}\)/g; // Pattern with global flag
        const matches = input.match(regex);
        const result = matches?.reduce((sum, mul) => {
            return sum + calculate(mul);
        }, 0);
        return result || 'Error';
    };

    const solve2 = (input: string) => {
        const regex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g; // Pattern with global flag
        const matches = input.match(regex);
        const result = matches?.reduce(
            ([sum, enabled], directive) => {
                if (directive === 'do()') {
                    return [sum, 1];
                }
                if (directive === "don't()") {
                    return [sum, 0];
                }
                if (enabled) {
                    return [sum + calculate(directive), enabled];
                }
                return [sum, enabled];
            },
            [0, 1],
        );
        return (result && result[0]) || 'Error';
    };
    return <Day solve1={solve1} solve2={solve2} />;
}
