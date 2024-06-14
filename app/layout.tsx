import "./globals.scss";
import "./common.scss";
import "./shimmer.scss";
import React from "react";

export const metadata = {
  title: "Fuelart",
  description: "Next Gen Nft Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <main className="app">{children}</main>
        {/* footer here */}
      </body>
    </html>
  );
}
