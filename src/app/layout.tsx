import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sudoku Solver",
    default: "Sudoku Solver - Online Puzzle Generator & Solver"
  },
  description: "Free online Sudoku puzzle solver and generator. Create Sudoku puzzles with different difficulty levels, solve existing puzzles, or upload images. Supports multiple languages.",
  keywords: ["sudoku", "puzzle", "solver", "generator", "online", "free", "数独", "パズル"],
  authors: [{name: "Sudoku Solver Team"}],
  creator: "Sudoku Solver",
  publisher: "Sudoku Solver",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://sudoku-solver.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'zh': '/zh',
    },
  },
  openGraph: {
    title: "Sudoku Solver - Online Puzzle Generator & Solver",
    description: "Free online Sudoku puzzle solver and generator. Create puzzles with different difficulty levels and solve them instantly.",
    url: '/',
    siteName: 'Sudoku Solver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sudoku Solver - Online Puzzle Generator & Solver",
    description: "Free online Sudoku puzzle solver and generator. Create puzzles with different difficulty levels and solve them instantly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="root">
          {children}
        </div>
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-sm">
              © 2024 Sudoku Solver. All rights reserved.
            </p>
            <p className="text-xs mt-2 text-gray-400">
              Free online sudoku puzzle generator and solver
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
