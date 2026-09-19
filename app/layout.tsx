import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildTogether — Team Up. Create. Grow.",
  description:
    "Meet developers, designers, creators, marketers and ambitious people who want to build meaningful projects together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}