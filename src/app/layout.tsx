import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import SideBar from '@/components/SideBar'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "meta_NITrkl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="flex flex-col w-full h-full">
        <NavBar/>
        <div className="flex h-screen mt-[55px]" >
           <div className="flex w-50 h-10">
            <SideBar/>
           </div>
           <div className="flex ml-[260px]" >
            {children}
           </div>
        </div>
      </main>
        </body>
    </html>
  );
}
