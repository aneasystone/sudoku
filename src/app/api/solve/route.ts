import { NextResponse } from 'next/server';

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
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

function solveSudoku(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export async function POST(request: Request) {
  try {
    const { grid } = await request.json();
    
    // 创建网格的深拷贝
    const gridCopy = JSON.parse(JSON.stringify(grid));
    
    if (solveSudoku(gridCopy)) {
      return NextResponse.json({ solution: gridCopy });
    } else {
      return NextResponse.json(
        { error: '无法解决此数独' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
} 