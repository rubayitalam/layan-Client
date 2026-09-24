import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/common/AppProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Layan — Salon & Beauty Booking Marketplace",
  description: "Boutique salon and beauty marketplace for salons, barbers, and aesthetics professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-[#141414] bg-white`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
