export function DaySelection({ day, setDay, selectedDay }: 
    { day: number, setDay: (day: number) => void, selectedDay: number | null }
){
    return (
        <button className={`${day === selectedDay ? 'text-red-500' : 'text-white'} mx-5`} onClick={() => setDay(day)}>
            {day}
        </button>
    )
}