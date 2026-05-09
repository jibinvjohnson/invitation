import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InviteNest | Premium Digital Invitations & Wedding Cards",
  description: "Create stunning, luxury digital invitations for weddings, birthdays, and special events. Mobile-optimized, interactive, and premium designs.",
  keywords: ["digital invitations", "wedding cards", "online invitations", "luxury invites", "wedding websites", "digital stationery"],
  openGraph: {
    title: "InviteNest | Premium Digital Invitations",
    description: "Luxury digital invitations for your most special moments.",
    url: "https://invitenest.com",
    siteName: "InviteNest",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-900">{children}</body>
    </html>
  );
}
