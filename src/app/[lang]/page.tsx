'use client';

import { useState, useRef } from 'react';
import { use } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import zh from '@/i18n/locales/zh';
import en from '@/i18n/locales/en';

const translations = {
  zh,
  en,
};

export default function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const [grid, setGrid] = useState<number[][]>(
    Array(9).fill(null).map(() => Array(9).fill(0))
  );
  const [solved, setSolved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang as keyof typeof translations];

  const handleCellChange = (row: number, col: number, value: string) => {
    const newValue = value === '' ? 0 : parseInt(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 9) return;
    
    const newGrid = [...grid];
    newGrid[row][col] = newValue;
    setGrid(newGrid);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/parse-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.grid) {
        setGrid(data.grid);
        setSolved(false);
      }
    } catch (error) {
      console.error('Error parsing image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <LanguageSwitcher />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {t.title}
        </h1>
        
        <div className="flex justify-center gap-4 mb-8">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg
                     transition duration-200 ease-in-out transform hover:scale-105"
          >
            {t.uploadButton}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg
                     transition duration-200 ease-in-out transform hover:scale-105
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t.processing : t.solveButton}
          </button>
        </div>
        
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
      </div>
    </main>
  );
} 