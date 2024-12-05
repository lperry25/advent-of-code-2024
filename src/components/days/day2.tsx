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
        const safeReports = reports.filter(isSafeReport);
        const notInitiallySafe = reports.filter(
            (report) => !isSafeReport(report),
        );
        const removeFirstIssue = notInitiallySafe.filter((report) => {
            return report.some((_, i) =>
                isSafeReport(report.filter((_, index) => index !== i)),
            );
        });
        return safeReports.length + removeFirstIssue.length;
    };
    return <Day solve1={solve1} solve2={solve2} />;
}
