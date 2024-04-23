import type { Metadata } from "next";

import "./globals.css";
import { Footer, Navbar, SplashScreen } from "@/components";

export const metadata: Metadata = {
  title: "Pure Millé",
  description: "a pure millet company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <SplashScreen>
          <Navbar />
          {children}
          <Footer />
        </SplashScreen>
      </body>
    </html>
  );
}
