import { Day } from '../Day';

export function Day5() {
    const getRulesAndManuals = (input: string) => {
        const [ruleLines, manualLines] = input
            .split('\n\n')
            .map((line) => line.split('\n'));
        const rules = ruleLines.map((rule) => rule.split('|'));
        const manuals = manualLines.map((manual) => manual.split(','));
        return [rules, manuals];
    };

    const solve1 = (input: string) => {
        const [rules, manuals] = getRulesAndManuals(input);

        const findNumbersAfter = (checkNum: string) =>
            rules.filter((rule) => rule[0] === checkNum).map((rule) => rule[1]);
        const findNumbersBefore = (checkNum: string) =>
            rules.filter((rule) => rule[1] === checkNum).map((rule) => rule[0]);

        const correctOrders = manuals.filter((manual) =>
            manual.every((page, i) => {
                const pagesBefore = findNumbersBefore(page);
                // check that all values before this page exist in pages before
                const manualPagesBefore = manual.slice(0, i);

                const pagesBeforeAreOk = manualPagesBefore.every((manPage) =>
                    pagesBefore.includes(manPage),
                );
                if (!pagesBeforeAreOk) {
                    return false;
                }
                const pagesAfter = findNumbersAfter(page);
                // check that all values before this page exist in pages before
                const manualPagesAfter = manual.slice(i + 1);
                const pagesAfterAreOk = manualPagesAfter.every((manPage) =>
                    pagesAfter.includes(manPage),
                );
                return pagesAfterAreOk;
            }),
        );
        const sumMiddleNums = correctOrders.reduce(
            (sum, manual) =>
                sum + parseInt(manual[Math.floor(manual.length / 2)]),
            0,
        );
        return sumMiddleNums;
    };

    const solve2 = (input: string) => {
        return 'Not implemented';
    };
    return <Day solve1={solve1} solve2={solve2} />;
}
