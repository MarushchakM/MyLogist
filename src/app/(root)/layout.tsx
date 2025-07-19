import type { Metadata } from "next";
import { Inter } from "next/font/google"
import 'normalize.css';
import "../globals.scss";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import { Aside } from "@/components/Aside";
import style from "./layout.module.scss";
import StoreProvider from "./StoreProvider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ['500', '600'],
});

export const metadata: Metadata = {
  title: "Агрологістика",
  description: "Перевезення з агрологістикою",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  if (!session) redirect(signInPath());

  return (
    <html lang="en">
      <body className={inter.variable}>
        <SessionProvider session={session}>
          <StoreProvider>
            <div className={style.layoutContainer}>
              <Aside />
              <main className={style.main}>{children}</main>
            </div>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
