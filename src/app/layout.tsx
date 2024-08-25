import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster"

import "react-loading-skeleton/dist/skeleton.css";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <Providers>
        <body className={cn('min-h-screen font-sans antialiased grainy overflow-hidden', inter.className)}>
          <ScrollArea className="h-screen w-screen">
            {children}
            <Toaster />
          </ScrollArea>
        </body>
      </Providers>
    </html>
  );
}