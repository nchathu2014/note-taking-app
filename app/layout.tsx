import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import localFont from "next/font/local";
const BASE_URL = process.env.NEXT_BASE_URL;

// const myFont = localFont({
//   src:'./../public/fonts/monogram.otf'
// })
const ogTitle = "Note Taking App";
const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent("We save your notes forever!")}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Note Taking app, created by Next.JS",
  openGraph: {
    title: ogTitle,
    description: "This is a Note Taking App",
    images: [
      {
        url: ogImageUrl,
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
      {
        url: ogImageUrl,
        width: 1800,
        height: 1600,
        alt: "Og Image Alt",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      //className={`${myFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
