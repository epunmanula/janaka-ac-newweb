import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121212",
};

export const metadata: Metadata = {
  title: "Janaka Auto AC — Car A/C Specialists | Gampaha, Sri Lanka",
  description: "Premier automotive air conditioning specialists in Gampaha, Sri Lanka. Precision diagnostics, A/C gas re-gassing, compressor repair, and climate control overhauls.",
  keywords: [
    "Janaka Auto AC",
    "Car AC Repair Gampaha",
    "Auto Air Conditioning Sri Lanka",
    "Auto AC Gas Refill Miriswatta",
    "Car AC Compressor Repair",
    "Automotive Climate Control Gampaha",
  ],
  authors: [{ name: "Janaka Auto AC" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#121212] text-[#F5F4EF] scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Sinhala:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#121212] text-[#F5F4EF] selection:bg-[#F5F4EF] selection:text-[#121212] antialiased">
        {children}
      </body>
    </html>
  );
}
