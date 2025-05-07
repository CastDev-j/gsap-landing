"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ExerciseContent() {
  const boxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Reiniciar la animación cuando cambia el ejercicio activo
    if (boxRef.current) {
      gsap.set(boxRef.current, { clearProps: "all" });
    }

    // Configurar la animación para el ejercicio activo
    setupAnimation();

    // Limpieza
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("click", handleAnimationClick);
      }
    };
  }, []);

  const handleAnimationClick = () => {
    if (!boxRef.current) return;

    // Animación básica que será la misma para todos los ejercicios inicialmente
    // Puedes personalizar cada una después
    gsap.to(boxRef.current, {
      rotation: 360,
      x: 100,
      backgroundColor: "#f97316",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(boxRef.current, {
          rotation: 0,
          x: 0,
          backgroundColor: "#f43f5e",
          duration: 1,
          ease: "power2.inOut",
        });
      },
    });
  };

  const setupAnimation = () => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener("click", handleAnimationClick);
    }
  };

  return (
    <div className="p-4 md:p-8 pt-16 md:pt-8">
      <h1 className="text-2xl font-bold mb-6 animate-fade-up animate-duration-300 animate-ease-in">
        Ejemplo
      </h1>
      <p className="text-muted-foreground mb-8 animate-fade-up animate-duration-300 animate-ease-in animate-delay-100">
        Ejemplo
      </p>

      <Card className="mb-8 animate-fade-up animate-duration-300 animate-ease-in animate-delay-100">
        <CardHeader>
          <CardTitle>Demostración</CardTitle>
          <CardDescription>
            Haz clic en el botón para ver la animación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 relative overflow-hidden">
            <div
              ref={boxRef}
              className="w-20 h-20 bg-rose-500 rounded-md flex items-center justify-center text-white font-bold"
            >
              GSAP
            </div>
            <Button
              ref={buttonRef}
              className="mt-8 bg-rose-500 hover:bg-rose-600 text-white"
            >
              Animar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-up animate-duration-300 animate-ease-in animate-delay-100">
        <CardHeader>
          <CardTitle>Código de ejemplo</CardTitle>
          <CardDescription>
            Puedes modificar este código para personalizar la animación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            {`// ejemplo
gsap.to(boxRef.current, {
  rotation: 360,
  x: 100,
  backgroundColor: "#f97316",
  duration: 1,
  ease: "power2.inOut",
  onComplete: () => {
    gsap.to(boxRef.current, {
      rotation: 0,
      x: 0,
      backgroundColor: "#f43f5e",
      duration: 1,
      ease: "power2.inOut",
    })
  },
});`}
          </pre>
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Notas:</h3>
            <p className="text-sm text-muted-foreground">
              Este es un ejemplo básico de animación con GSAP. Puedes
              personalizar los parámetros como duración, easing, propiedades a
              animar, etc. para crear efectos más complejos.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Reemplaza este texto con tus propias notas y explicaciones sobre
              la animación que estás creando.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
