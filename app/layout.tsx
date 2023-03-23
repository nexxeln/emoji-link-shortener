import { Karla } from "next/font/google";

import "./globals.css";

const karla = Karla({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Spores",
  description: "The Emoji Link Shortener",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={karla.className}>
      <body>{children}</body>
    </html>
  );
}
