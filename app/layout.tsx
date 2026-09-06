import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping App",
  description: "Shopping App",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className="antialiased">{children}</body>
    </html>
  );
}
