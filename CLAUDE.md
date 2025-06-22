# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture Overview

This is a Next.js 15 sudoku solver application with the following key architectural components:

### Core Algorithm Implementation
- **Sudoku Solver**: Implements backtracking algorithm in `src/app/api/solve/route.ts`
- **Sudoku Generator**: Creates puzzles with difficulty levels in `src/app/api/generate/route.ts`
- **Image Parser**: Mock OCR functionality in `src/app/api/parse-image/route.ts`

### Internationalization Architecture
- **Route-based i18n**: Uses Next.js dynamic routes with `[lang]` segments
- **Middleware**: `src/middleware.ts` handles language detection and redirection
- **Translations**: Located in `src/i18n/locales/` with `zh.ts` and `en.ts`
- **Language Switcher**: `src/components/LanguageSwitcher.tsx` manages language state

### API Routes Structure
All API endpoints are in `src/app/api/`:
- `POST /api/solve` - Solves sudoku puzzles using backtracking
- `POST /api/generate` - Generates puzzles with difficulty levels (easy: 35 removed, medium: 45 removed, hard: 55 removed)
- `POST /api/parse-image` - Mock image parsing (returns sample puzzle)

### Key Technical Details
- **Sudoku Validation**: Checks row, column, and 3x3 box constraints
- **Puzzle Generation**: Fisher-Yates shuffle for randomization, then selective number removal
- **State Management**: React useState for grid state, loading states, and UI interactions
- **Styling**: Tailwind CSS with responsive grid layout and visual feedback

### Docker Support
- Dockerfile included for containerized deployment
- Production build optimized for Next.js

## Important Notes
- The image parsing API currently returns mock data - real OCR integration is planned
- All error messages are internationalized
- Grid state is managed as 9x9 number array where 0 represents empty cells