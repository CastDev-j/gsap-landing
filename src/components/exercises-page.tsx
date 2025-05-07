"use client"

import { useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { IntroSection } from "@/components/intro-section"
import { ExerciseSection } from "@/components/exercise-section"
import { Footer } from "@/components/footer"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Registramos los plugins de GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
}

// Lista de ejercicios - puedes añadir más según vayas creando
const exercises = [
  {
    id: "exercise1",
    title: "Ejercicio 1: Animación Básica",
    description: "Animación simple de un elemento con GSAP.",
  },
  {
    id: "exercise2",
    title: "Ejercicio 2: Timeline",
    description: "Uso de timeline para secuenciar animaciones.",
  },
  {
    id: "exercise3",
    title: "Ejercicio 3: ScrollTrigger",
    description: "Animaciones activadas por scroll.",
  },
]

export default function ExercisesPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Configuramos el smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")

        if (targetId && targetId !== "#") {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: {
              y: targetId,
              offsetY: 70,
            },
            ease: "power2.inOut",
          })
        }
      })
    })

    // Animación básica para las secciones al hacer scroll
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        },
      )
    })

    return () => {
      // Limpieza al desmontar
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col bg-gray-50">
      <Navigation exercises={exercises} />
      <main className="flex-grow">
        <IntroSection />

        {/* Secciones de ejercicios */}
        {exercises.map((exercise) => (
          <ExerciseSection
            key={exercise.id}
            id={exercise.id}
            title={exercise.title}
            description={exercise.description}
          />
        ))}
      </main>
      <Footer />
    </div>
  )
}
