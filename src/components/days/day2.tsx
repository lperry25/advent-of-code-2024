import { Day } from '../Day';

export function Day2() {
    const isIncreasing = (report: number[]) =>
        report[0] < report[report.length - 1];

    const parseReports = (input: string) =>
        input
            .split('\n')
            .map((report) => report.split(' ').map((num) => parseInt(num)));

    const isSafeReport = (report: number[]) => {
        const increasing = isIncreasing(report);
        return report.every((num, i) => {
            if (i === 0) return true;
            if (increasing) {
                const diff = num - report[i - 1];
                return diff <= 3 && diff > 0;
            }
            const diff = report[i - 1] - num;
            return diff <= 3 && diff > 0;
        });
    };
    const solve1 = (input: string) => {
        const reports = parseReports(input);
        const safeReports = reports.filter(isSafeReport);
        return safeReports.length;
    };

    const solve2 = (input: string) => {
        const reports = parseReports(input);
        console.log(reports);
        const safeReports = reports.filter(isSafeReport);
        const notInitiallySafe = reports.filter(
            (report) => !isSafeReport(report),
        );
        const removingSecondNumberChangesOrder = notInitiallySafe.filter(
            (report) => (report[0] > report[1] && report[0] < report[2]) || (report[0] < report[1] && report[0] > report[2]),
        )
        const fixedSecondNumberChanges = removingSecondNumberChangesOrder.map(innerArray => {
            // Check if the second element exists before removing
            return innerArray.filter((_, index) => index !== 1);
          });
          const safeFixedSecondNumber =  fixedSecondNumberChanges.filter(isSafeReport);
          console.log({fixedSecondNumberChanges})
        const removingSecondNumberDoesNotChangeOrder = notInitiallySafe.filter(
            (report) => !((report[0] > report[1] && report[0] < report[2]) || (report[0] < report[1] && report[0] > report[2])),
        )
        console.log({removingSecondNumberChangesOrder})
        console.log(notInitiallySafe.length);
        console.log({removingSecondNumberDoesNotChangeOrder})
        const lastNumbers = removingSecondNumberDoesNotChangeOrder.filter((report) => {
            let increasing = isIncreasing(report);
            let problemDampenerActivated = false;
            let i = 1;
            let allReportsSafe = true;
            while (i < report.length) {
                const num = report[i];
                let diff;
                let safe;
                if (increasing) {
                    diff = num - report[i - 1];
                    safe = diff <= 3 && diff > 0;
                    //     console.log({safe, problemDampenerActivated, diff})
                } else {
                    diff = report[i - 1] - num;
                    safe = diff <= 3 && diff > 0;
                }
                // console.log({safe, problemDampenerActivated, diff})
                if (safe) {
                    i++;
                } else if (!safe && problemDampenerActivated) {
                    allReportsSafe = false;
                    break;
                } else {
                    problemDampenerActivated = true;
                    report = report.filter((_, index) => index !== 1);
                }
            }
            return allReportsSafe;
        });
        console.log(lastNumbers.length);
        console.log(safeFixedSecondNumber.length)
        return safeReports.length + safeFixedSecondNumber.length + lastNumbers.length;
    };
    return <Day solve1={solve1} solve2={solve2} />;
}
