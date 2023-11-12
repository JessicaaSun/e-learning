import { Inter, Kantumruy_Pro } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  variable: "--font-kantumruy_pro",
});

export { kantumruy, inter };
