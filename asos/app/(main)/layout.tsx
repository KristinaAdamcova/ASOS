import NavBar from "@/components/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-white min-h-screen">
        <NavBar />
        {children}
      </div>
  );
}
