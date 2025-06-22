import { NextResponse } from 'next/server';

// 随机打乱数组
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// 检查数字在指定位置是否有效
function isValidPlacement(grid: number[][], row: number, col: number, num: number): boolean {
  // 检查行
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  // 检查列
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }

  // 检查 3x3 方格
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

// 填充完整的数独网格
function fillGrid(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// 移除数字来创建谜题
function removeNumbers(grid: number[][], difficulty: 'easy' | 'medium' | 'hard' = 'medium'): number[][] {
  const puzzle = grid.map(row => [...row]);
  
  // 根据难度设置要移除的数字数量
  const removeCount = {
    easy: 35,    // 移除35个数字（46个已填充）
    medium: 45,  // 移除45个数字（36个已填充）
    hard: 55     // 移除55个数字（26个已填充）
  }[difficulty];

  const positions = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      positions.push([row, col]);
    }
  }

  const shuffledPositions = shuffle(positions);
  
  for (let i = 0; i < removeCount && i < shuffledPositions.length; i++) {
    const [row, col] = shuffledPositions[i];
    puzzle[row][col] = 0;
  }

  return puzzle;
}

// 生成随机数独
function generateSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): number[][] {
  const grid: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  
  // 填充完整的数独网格
  fillGrid(grid);
  
  // 移除数字创建谜题
  return removeNumbers(grid, difficulty);
}

export async function POST(request: Request) {
  try {
    const { difficulty = 'medium' } = await request.json().catch(() => ({}));
    
    // 验证难度参数
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return NextResponse.json(
        { error: '无效的难度级别' },
        { status: 400 }
      );
    }
    
    const puzzle = generateSudoku(difficulty as 'easy' | 'medium' | 'hard');
    
    return NextResponse.json({ 
      grid: puzzle,
      difficulty 
    });
  } catch (error) {
    console.error('Error generating sudoku:', error);
    return NextResponse.json(
      { error: '生成数独时出错' },
      { status: 500 }
    );
  }
}