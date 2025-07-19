import { auth } from "@/lib/auth";
import { homePath } from "@/paths";
import 'normalize.css';
import "../globals.scss";
import { Inter } from "next/font/google"
import { redirect } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ['500', '600'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  if (session) redirect(homePath());

  return (
    <html lang="en">
      <body className={inter.variable}>
        <main>{children}</main>
      </body>
    </html>
  );
}