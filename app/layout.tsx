import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Kacha Creatives | Digital Marketing & Creative Solutions",
    template: "%s | Kacha Creatives",
  },
  description:
    "Kacha Creatives is a dynamic digital marketing firm in Addis Ababa delivering creative digital content, branding, social media management, media production and strategic creative solutions.",
  keywords: [
    "digital marketing",
    "creative agency",
    "Addis Ababa",
    "Ethiopia",
    "branding",
    "video production",
    "social media",
    "graphic design",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://kachacreatives.com",
    siteName: "Kacha Creatives",
    title: "Kacha Creatives | Digital Marketing & Creative Solutions",
    description:
      "Dynamic digital marketing firm in Addis Ababa delivering creative digital content, branding, and media production.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kacha Creatives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kacha Creatives | Digital Marketing & Creative Solutions",
    description: "Dynamic digital marketing firm in Addis Ababa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-dark text-brand-light antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              color: "#F5F5F0",
              border: "1px solid #2A2A2A",
            },
            success: {
              iconTheme: { primary: "#F5A623", secondary: "#0A0A0A" },
            },
          }}
        />
      </body>
    </html>
  );
}
