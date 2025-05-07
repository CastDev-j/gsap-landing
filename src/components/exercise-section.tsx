"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface ExerciseSectionProps {
  id: string
  title: string
  description: string
}

export function ExerciseSection({ id, title, description }: ExerciseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Configuración específica para cada ejercicio
    if (id === "exercise1") {
      setupExercise1()
    } else if (id === "exercise2") {
      setupExercise2()
    } else if (id === "exercise3") {
      setupExercise3()
    }
  }, [id])

  // Ejercicio 1: Animación básica
  const setupExercise1 = () => {
    if (!buttonRef.current || !boxRef.current) return

    // Reiniciamos el estado inicial
    gsap.set(boxRef.current, { x: 0, rotation: 0, backgroundColor: "#f43f5e" })

    // Configuramos el click del botón
    buttonRef.current.addEventListener("click", () => {
      gsap.to(boxRef.current, {
        x: 200,
        rotation: 360,
        backgroundColor: "#f97316",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(boxRef.current, {
            x: 0,
            rotation: 0,
            backgroundColor: "#f43f5e",
            duration: 1,
            ease: "power2.inOut",
          })
        },
      })
    })
  }

  // Ejercicio 2: Timeline
  const setupExercise2 = () => {
    if (!buttonRef.current || !boxRef.current) return

    // Reiniciamos el estado inicial
    gsap.set(boxRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      backgroundColor: "#f43f5e",
    })

    // Configuramos el click del botón
    buttonRef.current.addEventListener("click", () => {
      const tl = gsap.timeline()

      tl.to(boxRef.current, { x: 100, duration: 0.5, ease: "power1.out" })
        .to(boxRef.current, { y: 50, duration: 0.5, ease: "power1.out" })
        .to(boxRef.current, { scale: 1.5, duration: 0.5, ease: "power1.out" })
        .to(boxRef.current, { rotation: 180, duration: 0.5, ease: "power1.out" })
        .to(boxRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power1.inOut",
        })
    })
  }

  // Ejercicio 3: ScrollTrigger
  const setupExercise3 = () => {
    if (!boxRef.current) return

    // Reiniciamos el estado inicial
    gsap.set(boxRef.current, { x: -100, opacity: 0 })

    // Configuramos ScrollTrigger
    gsap.to(boxRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    })
  }

  return (
    <section id={id} ref={sectionRef} className="py-16 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-rose-500">{title}</h2>
        <p className="text-gray-700 mb-8">{description}</p>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center h-64 relative overflow-hidden">
            {/* Área de demostración */}
            <div ref={boxRef} className="w-20 h-20 bg-rose-500 rounded-md"></div>

            {/* Solo mostramos el botón para los ejercicios que lo necesitan */}
            {id !== "exercise3" && (
              <button
                ref={buttonRef}
                className="mt-8 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
              >
                Animar
              </button>
            )}

            {id === "exercise3" && <p className="mt-8 text-gray-500 text-sm">Haz scroll para ver la animación</p>}
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-700">
              Aquí puedes añadir tu propio código y explicaciones para este ejercicio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
