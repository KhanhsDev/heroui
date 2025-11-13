import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Wix_Madefor_Text,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const fontWix = Wix_Madefor_Text({
  subsets: ["latin"],
  variable: "--font-wix",
});
