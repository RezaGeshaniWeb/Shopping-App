import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Shopping App",
  description: "Shopping App",
};

const kalameFont = localFont({
  src: '../public/font/Kalameh-Regular.ttf'
})

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className={`${kalameFont.className} antialiased`}>{children}</body>
    </html>
  );
}
