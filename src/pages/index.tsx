import localFont from 'next/font/local';
import { useEffect, useState } from 'react';
import { DaySelection } from '@/components/DaySelection';
import { Day3 } from '@/components/days/day3';
import { Day1 } from '@/components/days/day1';
import { Day4 } from '@/components/days/day4';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export default function Home() {
    const [selectedDay, setDay] = useState<null | number>(null);

    const today = new Date().getDay() + 1;
    console.log({ today });

    useEffect(() => {
        setDay(today);
    }, [today]);

    const activeDays = Array.from({ length: today }, (_, i) => i + 1);

    const renderDay = () => {
        switch (selectedDay) {
            case 1:
                return <Day1 />;
            case 3:
                return <Day3 />;
            case 4:
                return <Day4 />;
            default:
                return <h3>Oops! This day is not solved yet sorry!</h3>;
        }
    };
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >
            <div>
                {<h2>What day would you like to solve?</h2>}
                {activeDays.map((day) => (
                    <DaySelection
                        key={day}
                        day={day}
                        setDay={setDay}
                        selectedDay={selectedDay}
                    />
                ))}
            </div>
            {!!selectedDay && renderDay()}
        </div>
    );
}
