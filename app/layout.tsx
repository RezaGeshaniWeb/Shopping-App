import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopping App",
  description: "Shopping App",
};

const kalameFont = localFont({
  src: '../public/font/Kalameh-Regular.ttf'
})

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${kalameFont.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
