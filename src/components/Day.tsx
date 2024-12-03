import { useState } from 'react';

export function Day({
  solve1,
  solve2,
}: {
  solve1: (input: string) => number | string;
  solve2: (input: string) => number | string;
}) {
  const [input, setInput] = useState('');
  const [answer1, setAnswer1] = useState<string | number>('No answer');
  const [answer2, setAnswer2] = useState<string | number>('No answer');
  return (
    <div className="grid gap-8 text-center">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-slate-800 h-[400px]"
      />
      <button onClick={() => setAnswer1(solve1(input))}>Solve Part 1!</button>
      {answer1}
      <button onClick={() => setAnswer2(solve2(input))}>Solve Part 2!</button>
      {answer2}
    </div>
  );
}
