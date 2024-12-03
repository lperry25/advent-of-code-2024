import { useState } from "react";

export function Day3(){
    const [input, setInput] = useState('');

  const [answer1, setAnswer1] = useState<string | number>('No answer')

  const calculate = (mul: string) => {
    const numbers = mul.replace(/^mul\(|\)$/g, '').split(',');
      return (parseInt(numbers[0],10) * parseInt(numbers[1],10));
  } 

  const solve1 = () => {
    const regex = /mul\(\d{1,3},\d{1,3}\)/g; // Pattern with global flag
    const matches = input.match(regex);
    const result = matches?.reduce((sum, mul) => {
      return sum + calculate(mul)
    }, 0)
    setAnswer1(result || 'Error')
  }

  const [answer2, setAnswer2] = useState<string | number>('No answer')

  const solve2 = () => {
    const regex =/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g; // Pattern with global flag
    const matches = input.match(regex);
    const result = matches?.reduce(([sum, enabled], directive) => {
      if (directive === 'do()'){
        return [sum, 1] 
      }
      if (directive === "don't()"){
        return [sum, 0]
      }
      if (enabled){
      return [sum + calculate(directive), enabled]}
      return [sum, enabled]
    }, [0, 1])
    setAnswer2((result && result[0])|| 'Error')
  }
  return (
    <div className="grid gap-8 text-center">
      <textarea value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={solve1}>Solve Part 1!</button>
      {answer1}
      <button onClick={solve2}>Solve Part 2!</button>
      {answer2}
    </div>
  );
}