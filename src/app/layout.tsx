import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationModal } from "@/components/navigation-modal";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

// Lista de ejercicios
export const exercises = [
  {
    id: "",
    title: "Inicio",
  },
  {
    id: "exercise-1",
    title: "Ejercicio 1",
  },
  {
    id: "exercise-2",
    title: "Ejercicio 2",
  },
  {
    id: "exercise-3",
    title: "Ejercicio 3",
  },
  {
    id: "exercise-4",
    title: "Ejercicio 4",
  },
  {
    id: "exercise-5",
    title: "Ejercicio 5",
  },
  {
    id: "exercise-6",
    title: "Ejercicio 6",
  },
  {
    id: "exercise-7",
    title: "Ejercicio 7",
  },
  {
    id: "exercise-8",
    title: "Ejercicio 8",
  },
];

export const metadata: Metadata = {
  title: "GSAP Ejercicios",
  description: "Colección de ejercicios para aprender GSAP con React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen bg-background">
            <NavigationModal exercises={exercises} />
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
