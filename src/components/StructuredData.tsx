import Script from 'next/script';

interface StructuredDataProps {
  lang: string;
  title: string;
  description: string;
}

export default function StructuredData({ lang, title, description }: StructuredDataProps) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title,
    "description": description,
    "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sudoku-solver.vercel.app'}/${lang}`,
    "inLanguage": lang === 'zh' ? 'zh-CN' : 'en-US',
    "author": {
      "@type": "Organization",
      "name": "Sudoku Solver Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sudoku Solver"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sudoku-solver.vercel.app'}/${lang}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sudoku-solver.vercel.app'}/${lang}`,
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "applicationSubCategory": "Puzzle Game",
    "screenshot": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sudoku-solver.vercel.app'}/screenshot.jpg`,
    "featureList": [
      lang === 'zh' ? "自动生成数独题目" : "Auto-generate Sudoku puzzles",
      lang === 'zh' ? "智能求解算法" : "Intelligent solving algorithm", 
      lang === 'zh' ? "多种难度等级" : "Multiple difficulty levels",
      lang === 'zh' ? "图片识别功能" : "Image recognition feature",
      lang === 'zh' ? "多语言支持" : "Multi-language support"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "Sudoku Solver Team"
    }
  };

  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": title,
    "description": description,
    "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sudoku-solver.vercel.app'}/${lang}`,
    "genre": ["Puzzle", "Logic", "Strategy"],
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": 1
    },
    "gameItem": {
      "@type": "Thing",
      "name": "Sudoku Grid"
    },
    "playMode": "SinglePlayer",
    "accessibilityFeature": [
      "alternativeText",
      "highContrastDisplay",
      "resizeText"
    ]
  };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="web-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <Script
        id="game-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameSchema),
        }}
      />
    </>
  );
}