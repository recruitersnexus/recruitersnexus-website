import type { Metadata } from "next";

import "./globals.css";
import Providers from "@/components/Providers";
import { Be_Vietnam_Pro, Inter, Nunito } from "next/font/google";
import toast, { Toaster } from 'react-hot-toast';
import { cn } from "../lib/utils";
import Footer from "./comps/Footer";
import FooterExcep from "./comps/FooterExcep";
import Navbar from "./comps/Navbar";
import ScrollToTopButton from "./comps/scrollTop";

const inter = Inter({ subsets: ["latin"] });
const nunito_init = Nunito({
  subsets: ["latin"],
  weight: ['300', '400', '800'],
  variable: "--font-nunito",
});
const be_init = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ['300', '400', '800'],
  variable: "--font-be",
});


export const metadata: Metadata = {
  title: "Recruiters Nexus",
  description: "A platform to conduct interviews with top HRs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body suppressHydrationWarning={true} className={cn(nunito_init.variable, be_init.variable) }>
        <Providers>
          <Navbar/>
          <ScrollToTopButton/>
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
          />

          <Footer/>
          
        </Providers>
      </body>
    </html>
  );
}

