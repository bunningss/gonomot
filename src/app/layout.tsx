import "./globals.css";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Container } from "@/components/container";
import { siteSettings } from "@/lib/constants";
import { font } from "@/lib/fonts";

export const metadata: Metadata = {
  title: siteSettings.siteName,
  description: "Public voting system in bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = {
    error: true,
    payload: null,
  };

  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar userData={userData} />
          <Container>
            <main>{children}</main>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
