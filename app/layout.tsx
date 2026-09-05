import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sell My Inventory USA | SellMyInventory",
  description:
    "Sell your overstock, closeout, liquidation, and excess merchandise to SellMyInventory.",
  metadataBase: new URL("https://sellmyinventoryusa.com"),
  openGraph: {
    title: "Sell My Inventory USA | SellMyInventory",
    description: "We buy excess, closeout, liquidation, and bulk merchandise.",
    url: "https://sellmyinventoryusa.com",
    siteName: "SellMyInventoryUSA"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}