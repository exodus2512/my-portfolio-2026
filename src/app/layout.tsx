import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Portfolio | World-Class Design",
  description: "A production-ready portfolio showcasing premium UI/UX, animations, and high-performance development.",
};

import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans dark h-full antialiased`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#090909]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
