import "./globals.css";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Container } from "@/components/container";
import { siteSettings } from "@/lib/constants";
import { font } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { getSession } from "@/utils/auth";

export const metadata: Metadata = {
  title: siteSettings.siteName,
  description: "Public voting system in bangladesh.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar userData={session} />
          <Container>
            <main>{children}</main>
          </Container>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
