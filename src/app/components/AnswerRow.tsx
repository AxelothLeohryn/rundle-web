// src/app/components/AnswerRow.tsx
import React from "react";

interface AnswerRowProps {
  selectedRunes: number[];
  predefinedPattern: number[];
  isChecked: boolean;
}

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

const AnswerRow: React.FC<AnswerRowProps> = ({
  selectedRunes,
  predefinedPattern,
  isChecked,
}) => {
  const getBackgroundColor = (index: number): string => {
    if (!isChecked || selectedRunes[index] === undefined) return "bg-gray-200";
    if (selectedRunes[index] === predefinedPattern[index])
      return "bg-green-500";
    if (predefinedPattern.includes(selectedRunes[index]))
      return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSvgLines = () => {
    const lines = [];
    for (let i = 0; i < selectedRunes.length - 1; i++) {
      const from = runePositions[selectedRunes[i]];
      const to = runePositions[selectedRunes[i + 1]];
      lines.push(
        <line
          key={`${from.x}-${from.y}-${to.x}-${to.y}`}
          x1={from.x * 20 + 10}
          y1={from.y * 20 + 10}
          x2={to.x * 20 + 10}
          y2={to.y * 20 + 10}
          stroke="gray"
          strokeWidth="5"
          strokeLinecap="round"
        />
      );
    }
    return lines;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mb-1">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className={`w-12 h-12 border text-center flex items-center justify-center ${getBackgroundColor(
            index
          )}`}
        >
          {selectedRunes[index] !== undefined ? selectedRunes[index] : ""}
        </div>
      ))}
      <svg className="w-14 h-14 flex items-center justify-center border">
        {getSvgLines()}
      </svg>
    </div>
  );
};

export default AnswerRow;
