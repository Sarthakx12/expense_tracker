import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PaisaIQ — Smart Finance Tracker",
  description: "Track and achieve your financial aspirations with PaisaIQ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light h-full">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,20..48&display=swap" rel="stylesheet" />
      </head>
      <body className={`${plusJakartaSans.variable} ${hankenGrotesk.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-background text-on-background font-body-md`}>
        {children}
      </body>
    </html>
  );
}
