export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="-mt-8 min-h-full min-w-full bg-black pt-8">{children}</div>
  );
}
