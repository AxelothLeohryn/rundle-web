// src/app/components/Grid.tsx
"use client";

import React, { useState } from 'react';
import AnswerRow from './AnswerRow';

const predefinedPattern = [1, 5, 9, 3, 7]; // Hardcoded pattern for testing

const runePositions = {
  1: { x: 0, y: 0 },
  2: { x: 1, y: 0 },
  3: { x: 2, y: 0 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  7: { x: 0, y: 2 },
  8: { x: 1, y: 2 },
  9: { x: 2, y: 2 },
};

const Grid: React.FC = () => {
  const [attempts, setAttempts] = useState<number[][]>([[], [], [], [], [], []]);
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean[]>(new Array(6).fill(false));

  const handleRuneClick = (rune: number) => {
    if (attempts[currentAttempt].length < 5 && !attempts[currentAttempt].includes(rune)) {
      const newAttempts = [...attempts];
      newAttempts[currentAttempt] = [...newAttempts[currentAttempt], rune];
      setAttempts(newAttempts);
    }
  };

  const checkPattern = () => {
    const newIsChecked = [...isChecked];
    newIsChecked[currentAttempt] = true;
    setIsChecked(newIsChecked);
    if (currentAttempt < 5) {
      setCurrentAttempt(currentAttempt + 1);
    }
  };

  const resetGame = () => {
    setAttempts([[], [], [], [], [], []]);
    setCurrentAttempt(0);
    setIsChecked(new Array(6).fill(false));
  };

  return (
    <div className="relative">
      {attempts.map((attempt, index) => (
        <AnswerRow
          key={index}
          selectedRunes={attempt}
          predefinedPattern={predefinedPattern}
          isChecked={isChecked[index]}
        />
      ))}
      <div className="relative grid grid-cols-3 w-fit mt-4">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index + 1}
            className={`relative border p-4 text-center cursor-pointer ${attempts[currentAttempt].includes(index + 1) ? 'bg-blue-300' : 'bg-white'}`}
            onClick={() => handleRuneClick(index + 1)}
            style={{ width: '100px', height: '100px' }}
          >
            {index + 1}
          </div>
        ))}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ width: '300px', height: '300px' }}>
          {attempts[currentAttempt].length > 1 && attempts[currentAttempt].map((rune, idx) => {
            if (idx === attempts[currentAttempt].length - 1) return null;
            const from = runePositions[rune];
            const to = runePositions[attempts[currentAttempt][idx + 1]];
            return (
              <line
                key={`${from.x}-${from.y}-${to.x}-${to.y}`}
                x1={from.x * 100 + 50}
                y1={from.y * 100 + 50}
                x2={to.x * 100 + 50}
                y2={to.y * 100 + 50}
                stroke="blue"
                strokeWidth="4"
                strokeLinecap='round'
              />
            );
          })}
        </svg>
      </div>
      <div className="flex space-x-2 mt-4">
        <button onClick={checkPattern} className="p-2 bg-green-500 text-white">
          Check
        </button>
        <button onClick={resetGame} className="p-2 bg-red-500 text-white">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Grid;