'use client';

import { useState } from 'react';

export default function Home() {
  const [grid, setGrid] = useState<number[][]>(
    Array(9).fill(null).map(() => Array(9).fill(0))
  );
  const [solved, setSolved] = useState<boolean>(false);

  const handleCellChange = (row: number, col: number, value: string) => {
    const newValue = value === '' ? 0 : parseInt(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 9) return;
    
    const newGrid = [...grid];
    newGrid[row][col] = newValue;
    setGrid(newGrid);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grid }),
      });
      
      const data = await response.json();
      if (data.solution) {
        setGrid(data.solution);
        setSolved(true);
      }
    } catch (error) {
      console.error('Error solving sudoku:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sudoku Solver
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="grid grid-cols-9 gap-1">
            {grid.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="number"
                  min="0"
                  max="9"
                  value={cell || ''}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  className={`
                    w-full aspect-square text-center text-xl font-medium
                    border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                    ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2' : ''}
                    ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2' : ''}
                    ${solved ? 'bg-green-50' : 'bg-white'}
                  `}
                />
              ))
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg
                     transition duration-200 ease-in-out transform hover:scale-105"
          >
            解决数独
          </button>
        </div>
      </div>
    </main>
  );
}
