import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import { PasswordGate } from "@/components/PasswordGate";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Noice Ecosystem | Founder Resource Hub",
  description: "A curated repository of resources to help founders win",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 font-sans">
        <AuthProvider>
          <PasswordGate>
            <Navigation />
            <main className="min-h-[calc(100vh-4rem)]">
              {children}
            </main>
          </PasswordGate>
        </AuthProvider>
      </body>
    </html>
  );
}
