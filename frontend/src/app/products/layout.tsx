/**
 * This file defines the layout component for the products page.
 * It includes the RootLayout component that wraps the page content.
 */

import { Inter } from "next/font/google";
import NavBar from "@/app/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
