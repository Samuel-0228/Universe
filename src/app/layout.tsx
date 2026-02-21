import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "AAU Networks",
  description: "The official digital infrastructure of Addis Ababa University",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
