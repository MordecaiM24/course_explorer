import "../globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[url('/grid.svg') min-h-full min-w-full">{children}</div>
  );
}
