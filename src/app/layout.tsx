import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://runwithfoxes.com"),
  title: "Run with Foxes \\ Paul Dervan",
  description:
    "How to thrive in marketing because of AI, not despite it. 54 short chapters. No jargon. No fluff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${sans.variable} antialiased`}>
        <div className="page-wrapper">
          {children}
        </div>
        <ChatWidgetLoader />
      </body>
    </html>
  );
}
