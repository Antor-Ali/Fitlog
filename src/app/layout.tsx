import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/components/ToastProvider";

import { FitlogProvider } from "@/context/FitlogContext";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0b0d10] text-white antialiased">

        <FitlogProvider>

          <Navbar />

          <main>{children}</main>

          <Footer />

          <ToastProvider />

        </FitlogProvider>

      </body>
    </html>
  );
}