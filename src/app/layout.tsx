import type { Metadata } from "next";
import { Work_Sans, DM_Mono } from "next/font/google";
import "../../styles/globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Sprintsesh — Launch a real app today",
  description:
    "Describe your idea and a team of autonomous AI agents will design and build your app from prompt to production in hours, not months.",
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
    <html lang="en" className={`${workSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
