import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Layer3Pay | Unified Digital Payment & Subscription Management",
  description: "Streamline revenue collection, automate subscription processes, and deliver a modern billing experience for Layer3 customers. Accept payments, manage FTTH plans, and more.",
  keywords: ["Layer3Pay", "Digital Payments", "Subscription Management", "Broadband Billing", "FTTH Plans", "Utility Payments Nigeria", "Layer3"],
  authors: [{ name: "Layer3" }],
  openGraph: {
    title: "Layer3Pay | Unified Digital Payment & Subscription Management",
    description: "Accept, Send, and Automate Payments—Without Friction. One platform for every payment flow.",
    url: "https://layer3pay.com",
    siteName: "Layer3Pay",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Layer3Pay Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layer3Pay | Unified Digital Payment & Subscription Management",
    description: "Accept, Send, and Automate Payments—Without Friction.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
