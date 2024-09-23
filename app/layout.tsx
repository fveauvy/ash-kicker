import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";
import { ConfigProvider } from "@/contexts/config-context";
import HeaderControls from "@/components/header-controls";
import { LoadingBar } from "@/components/loading-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ash Kicker",
  description:
    "Ash Kicker is a smoking cessation tracker that helps you quit smoking.",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ConfigProvider>
              <LoadingBar />
              <Toaster />
              <div className="min-h-screen bg-background text-foreground">
                <header className="container mx-auto pt-4 px-4 flex flex-col md:flex-row md:justify-between md:items-center">
                  <h1 className="text-2xl font-bold mb-2 md:mb-0">
                    Ash Kicker
                  </h1>
                  <HeaderControls />
                </header>
                <main className="container mx-auto px-4">{children}</main>
              </div>
            </ConfigProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
