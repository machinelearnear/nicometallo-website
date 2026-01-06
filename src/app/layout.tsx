import type { Metadata } from "next";
import localFont from "next/font/local";
import { Syne, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Keep local fonts for backward compatibility
const calibre = localFont({
  src: [
    {
      path: "../fonts/Calibre/Calibre-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Calibre/Calibre-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Calibre/Calibre-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-calibre",
  display: "swap",
});

const sfMono = localFont({
  src: [
    {
      path: "../fonts/SFMono/SFMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SFMono/SFMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sf-mono",
  display: "swap",
});

// Bold, distinctive fonts for Neo-Brutalist Editorial aesthetic
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicometallo.com"),
  title: "Nicolas Metallo",
  description:
    "Nicolas Metallo is a technologist who specializes in building exceptional digital experiences.",
  openGraph: {
    title: "Nicolas Metallo",
    description:
      "Nicolas Metallo is a technologist who specializes in building exceptional digital experiences.",
    url: "https://nicometallo.com",
    siteName: "Nicolas Metallo",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicolas Metallo",
    description:
      "Nicolas Metallo is a technologist who specializes in building exceptional digital experiences.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${calibre.variable} ${sfMono.variable} ${syne.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a className="skip-to-content" href="#content">
          Skip to Content
        </a>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
