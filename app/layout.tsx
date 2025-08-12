import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "../components/theme-provider";
import { ThemeSwitcher } from "../components/theme-switcher";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Finder",
  description: "Find your next favorite recipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <nav className="bg-white dark:bg-gray-800 p-4 shadow-md sticky top-0 z-50">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <Link href="/" className="text-xl font-bold hover:text-blue-500 transition-colors">
                    Recipe Finder
                    </Link>
                    <Link href="/favorites" className="text-lg hover:text-blue-500 transition-colors">
                    Favorites
                    </Link>
                </div>
                <ThemeSwitcher />
              </div>
            </nav>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
