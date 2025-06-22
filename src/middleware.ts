import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 检查路径是否已经包含语言代码
  const pathnameHasLocale = pathname.startsWith('/en') || pathname.startsWith('/zh');
  
  if (pathnameHasLocale) return;

  // 获取首选语言
  const locale = request.headers.get('accept-language')?.split(',')?.[0].split('-')[0] || 'en';
  const defaultLocale = ['en', 'zh'].includes(locale) ? locale : 'en';

  // 重定向到带语言代码的路径
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // 跳过所有内部路径 (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}; 