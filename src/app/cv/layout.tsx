export default function CvLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-md mx-6 md:mx-auto  my-6"> {children}</div>
  );
}
