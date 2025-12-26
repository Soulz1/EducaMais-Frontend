import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StyledComponentsRegistry } from "./lib/registry";
import { StyledThemeProvider } from "./components/theme-provider";
import { LayoutWrapper, MainContent } from "./components/layout-wrapper";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EducaMais",
  description: "Plataforma EducaMais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} // Adicionei para evitar erro da extensão
      >
        <StyledComponentsRegistry>
          <StyledThemeProvider>
            <LayoutWrapper>
              <Header />
              <MainContent>
                {/* --- CONTEINER LIMITADOR (1200px) --- */}
                <div
                  style={{
                    width: "80%",           // Ocupa 90% em telas menores
                    maxWidth: "1200px",     // Trava em 1200px em telas grandes
                    margin: "0 auto",       // Centraliza na tela
                    padding: "2rem 0",      // Um respiro vertical
                    minHeight: "80vh"       // Garante altura mínima
                  }}
                >
                  {children}
                </div>
                {/* ------------------------------------ */}
              </MainContent>
              <Footer />
            </LayoutWrapper>
          </StyledThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}