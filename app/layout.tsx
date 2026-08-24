import type { Metadata } from "next";
import { JetBrains_Mono, Lora, Open_Sans } from "next/font/google";
import "./globals.css";

// Titles — Lora, used everywhere via the `font-display` class.
const display = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Content — Open Sans, used everywhere via the `font-body` class.
const body = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Social Buzz — Digital Marketing, Design & Web Agency",
  description:
    "Digital marketing, graphic design, web development, performance marketing and event management — one desk, five disciplines.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
            <body className={`${display.variable} ${body.variable} ${mono.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
