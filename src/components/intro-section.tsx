"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"
import gsap from "gsap"
import Link from "next/link"

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Animación de entrada
    const tl = gsap.timeline()

    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }).fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4",
    )
  }, [])

  return (
    <section id="intro" ref={sectionRef} className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-4 text-center">
        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 text-rose-500">
          Mis Ejercicios con GSAP
        </h1>
        <p ref={textRef} className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
          Una colección de ejercicios para aprender y practicar animaciones con GSAP y React. Navega entre las
          diferentes secciones para ver cada ejercicio.
        </p>
        <div className="flex justify-center">
          <Link href="/exercise-1" className="flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-colors">
            Ver ejercicios <ArrowDown className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
