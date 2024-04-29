import { Inter } from "next/font/google";
import "./globals.css";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guess a Song Game",
  description: "A game where you guess the song based on the lyrics shown.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CssBaseline />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
