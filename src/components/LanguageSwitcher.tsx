'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const currentLang = pathname.startsWith('/en') ? 'en' : 'zh';
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg
                transition duration-200 ease-in-out transform hover:scale-105"
    >
      {pathname.startsWith('/en') ? '中文' : 'English'}
    </button>
  );
} 