"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

interface Exercise {
  id: string;
  title: string;
}

interface SidebarProps {
  exercises: Exercise[];
}

export function NavigationModal({ exercises }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Animaciones con GSAP
  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      gsap.from(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "back.out(1.7)",
        delay: 0.1,
      });

      gsap.from(".nav-item", {
        y: 10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.2,
        ease: "power2.out",
        delay: 0.2,
      });
    }, modalRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <>
      {/* Botón del menú - Mejorado */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-40 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background border-border hover:border-foreground/20"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú de navegación"
      >
        <Menu className="h-5 w-5 text-foreground/80 hover:text-foreground" />
      </Button>

      {/* Modal de navegación */}
      <div ref={modalRef}>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Fondo */}
            <div
              ref={backdropRef}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Contenido */}
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                ref={contentRef}
                className="relative w-full max-w-xs bg-background rounded-lg shadow-xl border border-border overflow-hidden"
              >
                {/* Botón de cerrar - Mejorado */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Encabezado - Mejorado */}
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">
                    Ejercicios GSAP
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Selecciona una animación
                  </p>
                </div>

                {/* Lista de enlaces - Mejorada */}
                <nav className="p-2 space-y-1">
                  {exercises.map((exercise) => (
                    <div key={exercise.id} className="nav-item">
                      <Link
                        href={`/${exercise.id}`}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors",
                          "text-foreground/90 hover:bg-accent hover:text-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          pathname === `/${exercise.id}` &&
                            "bg-accent text-foreground font-medium"
                        )}
                      >
                        <span className="flex-1">{exercise.title}</span>
                        {pathname === `/${exercise.id}` && (
                          <span className="h-2 w-2 rounded-full bg-primary ml-2" />
                        )}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
