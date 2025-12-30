import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
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
    <html lang="en" className={`${calibre.variable} ${sfMono.variable}`}>
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
