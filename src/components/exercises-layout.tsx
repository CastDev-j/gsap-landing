"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { ExerciseContent } from "@/components/exercise-content"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Registramos los plugins de GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
}

// Lista de ejercicios
export const exercises = [
  {
    id: "exercise1",
    title: "Ejercicio 1",
    description: "Animación básica con GSAP",
  },
  {
    id: "exercise2",
    title: "Ejercicio 2",
    description: "Uso de timeline para secuenciar animaciones",
  },
  {
    id: "exercise3",
    title: "Ejercicio 3",
    description: "Animaciones con ScrollTrigger",
  },
  {
    id: "exercise4",
    title: "Ejercicio 4",
    description: "Animaciones de texto con GSAP",
  },
  {
    id: "exercise5",
    title: "Ejercicio 5",
    description: "Animaciones de SVG con GSAP",
  },
  {
    id: "exercise6",
    title: "Ejercicio 6",
    description: "Animaciones de color con GSAP",
  },
  {
    id: "exercise7",
    title: "Ejercicio 7",
    description: "Animaciones de transformación 3D",
  },
  {
    id: "exercise8",
    title: "Ejercicio 8",
    description: "Animaciones con easing personalizado",
  },
  {
    id: "exercise9",
    title: "Ejercicio 9",
    description: "Animaciones con interacción del mouse",
  },
  {
    id: "exercise10",
    title: "Ejercicio 10",
    description: "Animaciones complejas combinadas",
  },
]

export default function ExercisesLayout() {
  const [activeExercise, setActiveExercise] = useState(exercises[0].id)

  useEffect(() => {
    // Limpieza al desmontar
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar exercises={exercises} activeExercise={activeExercise} setActiveExercise={setActiveExercise} />
      <main className="flex-1 overflow-auto">
        <ExerciseContent exercises={exercises} activeExercise={activeExercise} />
      </main>
    </div>
  )
}
