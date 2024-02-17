import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import SideBar from '../components/SideBar'

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
    <html lang="en" >
      <body className={inter.className} >
      <main className="flex flex-col w-">
        <div className="flex" >
        <NavBar/>
        </div>
        <div className="flex flex-row" >
            <SideBar/>
            {children}
        </div>
      </main>
        </body>
    </html>
  );
}
