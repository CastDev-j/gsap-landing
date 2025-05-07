"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const gsapModule = await import("gsap")
      const gsap = gsapModule.default

      const tl = gsap.timeline()

      tl.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )

      // Animación del fondo
      gsap.to(sectionRef.current, {
        backgroundPosition: "100% 100%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }

    loadGsap()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gradient-to-br from-rose-50 to-orange-50 bg-size-200 bg-pos-0"
    >
      <div className="container mx-auto px-4 text-center">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent"
        >
          Animaciones con GSAP
        </h1>
        <p ref={textRef} className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10">
          Explora el poder de las animaciones web con GreenSock Animation Platform. Descubre cómo crear experiencias
          interactivas y atractivas.
        </p>
        <div ref={buttonRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white"
          >
            Explorar Ejemplos
          </Button>
          <a
            href="#features"
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            Ver más <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
