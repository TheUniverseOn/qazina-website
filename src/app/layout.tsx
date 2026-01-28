import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Qazina - Business Loans & Insurance Marketplace",
  description: "Compare business loan offers and insurance quotes in one place. Apply once, get offers from multiple lenders and insurers, choose the best deal.",
  keywords: ["business loans", "insurance", "Ethiopia", "microfinance", "MFI", "business insurance", "loan comparison"],
  authors: [{ name: "Qazina" }],
  openGraph: {
    title: "Qazina - Business Loans & Insurance Marketplace",
    description: "Compare business loan offers and insurance quotes in one place. Apply once, get offers from partners, choose the best deal.",
    url: "https://qazina.com",
    siteName: "Qazina",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qazina - Business Loans & Insurance Marketplace",
    description: "Compare business loan offers and insurance quotes in one place.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://qazina.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-primary antialiased h-full`}>
        {children}
      </body>
    </html>
  );
}
