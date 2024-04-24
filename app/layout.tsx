import type { Metadata } from "next";

import "./globals.css";
import { Footer, Navbar, SplashScreen } from "@/components";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
          <SpeedInsights />
          <Footer />
        </SplashScreen>
      </body>
    </html>
  );
}
