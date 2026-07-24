import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ChatWidgetLoader from "@/components/chat/ChatWidgetLoader";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Reading register. Source Serif 4 carries the body on every page someone stays on.
// 400 body, 600 for genuine inline emphasis, italic for pull quotes. See rwf-type-system.md.
const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://runwithfoxes.com"),
  title: "Run with Foxes \\ Paul Dervan",
  description:
    "Run with Foxes builds marketing agents that do the daily marketing work for your business. By Paul Dervan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${sans.variable} ${serif.variable} antialiased`}>
        <div className="page-wrapper">
          {children}
        </div>
        <ChatWidgetLoader />
        <Analytics />
      </body>
    </html>
  );
}
