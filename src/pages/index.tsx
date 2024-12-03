import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [input, setInput] = useState('');

  const [answer, setAnswer] = useState<string | number>('No answer')

  const solve = () => {
    const regex = /mul\(\d{1,3},\d{1,3}\)/g; // Pattern with global flag
    const matches = input.match(regex);
    const result = matches?.reduce((sum, mul) => {
      const numbers = mul.replace(/^mul\(|\)$/g, '').split(',');
      return sum + (parseInt(numbers[0],10) * parseInt(numbers[1],10));
    }, 0)
    setAnswer(result || 'Error')
  }
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <textarea value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={solve}>Solve!</button>
      {answer}
    </div>
  );
}
