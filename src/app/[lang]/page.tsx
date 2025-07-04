'use client';

import { useState, useRef, useEffect } from 'react';
import { use } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import StructuredData from '@/components/StructuredData';
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
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang as keyof typeof translations];

  // 页面加载时自动生成一道数独题
  useEffect(() => {
    const generateInitialPuzzle = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ difficulty }),
        });

        const data = await response.json();
        if (data.grid) {
          setGrid(data.grid);
          setSolved(false);
        }
      } catch (error) {
        console.error('Error generating initial sudoku:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateInitialPuzzle();
  }, [difficulty]);

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

  const handleGenerateRandom = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty }),
      });

      const data = await response.json();
      if (data.grid) {
        setGrid(data.grid);
        setSolved(false);
      }
    } catch (error) {
      console.error('Error generating sudoku:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StructuredData 
        lang={lang}
        title={t.title}
        description={t.description}
      />
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-2">
          <LanguageSwitcher />
        </div>
      </header>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600">
              {t.subtitle}
            </p>
          </header>
        
          <section className="mb-8" aria-label="Game Controls">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="difficulty" className="text-sm font-medium text-gray-700">
                  {t.difficulty}
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Select difficulty level"
                >
                  <option value="easy">{t.difficulties.easy}</option>
                  <option value="medium">{t.difficulties.medium}</option>
                  <option value="hard">{t.difficulties.hard}</option>
                </select>
              </div>
              
              <nav className="flex justify-center gap-4 flex-wrap" role="toolbar" aria-label="Sudoku actions">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                  aria-label="Upload sudoku image file"
                />
                <button
                  onClick={handleGenerateRandom}
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg
                           transition duration-200 ease-in-out transform hover:scale-105
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Generate new random sudoku puzzle"
                >
                  {isLoading ? t.generating : t.generateButton}
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg
                           transition duration-200 ease-in-out transform hover:scale-105"
                  aria-label="Upload sudoku image to solve"
                >
                  {t.uploadButton}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg
                           transition duration-200 ease-in-out transform hover:scale-105
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Solve current sudoku puzzle"
                >
                  {isLoading ? t.processing : t.solveButton}
                </button>
              </nav>
            </div>
          </section>
        
          <section className="bg-white rounded-lg shadow-xl p-6 mb-8" aria-label="Sudoku Game Board">
            <h2 className="sr-only">Sudoku Grid</h2>
            <div 
              className="grid grid-cols-9 gap-1" 
              role="grid" 
              aria-label="9x9 Sudoku puzzle grid"
            >
              {grid.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                  <input
                    key={`${rowIndex}-${colIndex}`}
                    type="number"
                    min="1"
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
                    role="gridcell"
                    aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
                    aria-describedby={cell ? undefined : 'empty-cell-hint'}
                  />
                ))
              ))}
            </div>
            <div id="empty-cell-hint" className="sr-only">
              Empty cell. Enter a number from 1 to 9.
            </div>
            {solved && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-md" role="alert">
                <p className="text-green-800 font-medium text-center">
                  {lang === 'zh' ? '数独已解决！' : 'Sudoku solved successfully!'}
                </p>
              </div>
            )}
          </section>
      </div>
    </main>
    </>
  );
} 