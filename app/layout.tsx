import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import getCategories from "@/actions/get-categories";
import ClientProviders from "@/providers/client-provider";

const urban = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anarchist",
  description: "Website for Anarchist",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className={`${urban.className} antialiased`}>
        <ClientProviders categories={categories} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
