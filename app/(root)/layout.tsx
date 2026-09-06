export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 max-w-7xl p-5 px-10 w-full">
        {children}
      </main>
    </div>
  );
}
