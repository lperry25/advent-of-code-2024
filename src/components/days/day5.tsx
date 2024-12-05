import { Day } from '../Day';

type ManualOrders = {
    page: string;
    pagesBefore: string[];
    pagesAfter: string[];
};

export function Day5() {
    const getRulesAndManuals = (input: string) => {
        const [ruleLines, manualLines] = input
            .split('\n\n')
            .map((line) => line.split('\n'));
        const rules = ruleLines.map((rule) => rule.split('|'));
        const manuals = manualLines.map((manual) => manual.split(','));
        return [rules, manuals];
    };

    const findNumbersAfter = (checkNum: string, rules: string[][]) =>
        rules.filter((rule) => rule[0] === checkNum).map((rule) => rule[1]);
    const findNumbersBefore = (checkNum: string, rules: string[][]) =>
        rules.filter((rule) => rule[1] === checkNum).map((rule) => rule[0]);

    const getCorrectAndIncorrectOrders = (
        manuals: string[][],
        rules: string[][],
    ) => {
        return manuals.reduce(
            ({ correct, incorrect }, manual) => {
                const isCorrect = manual.every((page, i) => {
                    const pagesBefore = findNumbersBefore(page, rules);
                    // check that all values before this page exist in pages before
                    const manualPagesBefore = manual.slice(0, i);

                    const pagesBeforeAreOk = manualPagesBefore.every(
                        (manPage) => pagesBefore.includes(manPage),
                    );
                    if (!pagesBeforeAreOk) {
                        return false;
                    }
                    const pagesAfter = findNumbersAfter(page, rules);
                    // check that all values before this page exist in pages before
                    const manualPagesAfter = manual.slice(i + 1);
                    const pagesAfterAreOk = manualPagesAfter.every((manPage) =>
                        pagesAfter.includes(manPage),
                    );
                    return pagesAfterAreOk;
                });
                if (!isCorrect) {
                    return { correct, incorrect: [...incorrect, manual] };
                }
                return { correct: [...correct, manual], incorrect };
            },
            { correct: [] as string[][], incorrect: [] as string[][] },
        );
    };

    const sumMiddleNums = (correctOrders: string[][]) =>
        correctOrders.reduce(
            (sum, manual) =>
                sum + parseInt(manual[Math.floor(manual.length / 2)]),
            0,
        );

    const solve1 = (input: string) => {
        const [rules, manuals] = getRulesAndManuals(input);
        const { correct: correctOrders } = getCorrectAndIncorrectOrders(
            manuals,
            rules,
        );
        const sumMiddles = sumMiddleNums(correctOrders);
        return sumMiddles;
    };

    const solve2 = (input: string) => {
        const [rules, manuals] = getRulesAndManuals(input);
        const { incorrect: incorrectOrders } = getCorrectAndIncorrectOrders(
            manuals,
            rules,
        );
        const ordered = incorrectOrders.map((manual) => {
            const { outOfOrder, inOrder } = manual.reduce(
                ({ outOfOrder, inOrder }, page, i) => {
                    const pagesBefore = findNumbersBefore(page, rules);
                    // check that all values before this page exist in pages before
                    const manualPagesBefore = manual.slice(0, i);

                    const pagesBeforeAreOk = manualPagesBefore.every(
                        (manPage) => pagesBefore.includes(manPage),
                    );
                    const pagesAfter = findNumbersAfter(page, rules);
                    if (!pagesBeforeAreOk) {
                        return {
                            outOfOrder: [
                                ...outOfOrder,
                                { page, pagesBefore, pagesAfter },
                            ],
                            inOrder,
                        };
                    }
                    // check that all values before this page exist in pages before
                    const manualPagesAfter = manual.slice(i + 1);
                    const pagesAfterAreOk = manualPagesAfter.every((manPage) =>
                        pagesAfter.includes(manPage),
                    );
                    if (!pagesAfterAreOk) {
                        return {
                            outOfOrder: [
                                ...outOfOrder,
                                { page, pagesBefore, pagesAfter },
                            ],
                            inOrder,
                        };
                    }
                    return {
                        outOfOrder,
                        inOrder: [
                            ...inOrder,
                            { page, pagesBefore, pagesAfter },
                        ],
                    };
                },
                {
                    outOfOrder: [] as ManualOrders[],
                    inOrder: [] as ManualOrders[],
                },
            );
            const newOrder = outOfOrder.reduce(
                (
                    order: ManualOrders[],
                    { page, pagesBefore, pagesAfter }: ManualOrders,
                ) => {
                    let i = 0;
                    while (
                        i < order.length &&
                        !order[i].pagesBefore.includes(page)
                    ) {
                        i++;
                    }
                    return [
                        ...order.slice(0, i),
                        { page, pagesBefore, pagesAfter },
                        ...order.slice(i),
                    ];
                },
                inOrder,
            );
            return newOrder.map(({ page }: ManualOrders) => page);
        });
        const sumMiddles = sumMiddleNums(ordered);
        return sumMiddles;
    };
    return <Day solve1={solve1} solve2={solve2} />;
}
