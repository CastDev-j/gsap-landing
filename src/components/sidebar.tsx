"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, X } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  description: string;
}

interface SidebarProps {
  exercises: Exercise[];
  activeExercise: string;
  setActiveExercise: (id: string) => void;
}

export function Sidebar({
  exercises,
  activeExercise,
  setActiveExercise,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint de Tailwind
    };

    // Verificar al montar y en cambios de tamaño
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleExerciseClick = (id: string) => {
    setActiveExercise(id);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - Solo visible en móvil */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "fixed top-4 left-4 z-50 transition-all duration-300",
            isMobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transition-transform duration-300 ease-in-out",
          isMobile
            ? isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        )}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-rose-500">GSAP Ejercicios</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Colección de animaciones
            </p>
          </div>

          {/* Botón de cierre solo en móvil */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-2">
            {exercises.map((exercise) => (
              <Button
                key={exercise.id}
                variant={activeExercise === exercise.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left mb-1 font-normal transition-colors",
                  activeExercise === exercise.id &&
                    "bg-rose-100 text-rose-700 hover:bg-rose-200 hover:text-rose-800"
                )}
                onClick={() => handleExerciseClick(exercise.id)}
              >
                {exercise.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Overlay para móvil */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
