import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next JS 15 Blog",
  description: "Next Js Blog project with postgresql, drizle, zustand, shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {/* {children} */}

        <ThemeProvider
        attribute="class"
        defaultTheme="light"  // system 
        enableSystem = {false}
        disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  );
}
