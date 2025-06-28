import type { Metadata } from "next";
import zh from '@/i18n/locales/zh';
import en from '@/i18n/locales/en';

const translations = {
  zh,
  en,
};

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const title = `${t.title} - ${t.subtitle || 'Online Puzzle Generator & Solver'}`;
  const description = t.description || 'Free online Sudoku puzzle solver and generator. Create Sudoku puzzles with different difficulty levels, solve existing puzzles, or upload images.';
  
  return {
    title,
    description,
    keywords: lang === 'zh' ? 
      ['数独', '数独游戏', '数独求解器', '数独生成器', '在线数独', '免费数独', '数独难题', '逻辑游戏'] :
      ['sudoku', 'sudoku game', 'sudoku solver', 'sudoku generator', 'online sudoku', 'free sudoku', 'puzzle game', 'logic game'],
    openGraph: {
      title,
      description,
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: lang === 'zh' ? 'en_US' : 'zh_CN',
      url: `/${lang}`,
      siteName: t.title,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
  };
}

export default function LangLayout({
  children,
}: Omit<Props, 'params'>) {
  return children;
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}