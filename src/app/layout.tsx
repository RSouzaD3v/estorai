import type { Metadata } from "next";
import { Play } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const roboto = Play({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Crie histórias infantis | Estorai",
  description: "Use a melhor plataforma de geração de books infantis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-black h-screen`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
