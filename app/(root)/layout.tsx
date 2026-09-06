import Footer from "@/components/Footer";
import Header from "@/components/shared/header";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-7xl p-5 px-10 w-full mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
