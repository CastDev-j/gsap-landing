"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationContainerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const loadGsap = async () => {
      const gsapModule = await import("gsap")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")

      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)

      // Animación de entrada para cada tarjeta
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      // Configurar las animaciones de demostración
      setupDemoAnimations(gsap)
    }

    loadGsap()
  }, [])

  const setupDemoAnimations = (gsap: any) => {
    // Demo 1: Animación básica
    const setupDemo1 = (container: HTMLDivElement | null, button: HTMLButtonElement | null) => {
      if (!container || !button) return

      const box = container.querySelector(".demo-box")
      if (!box) return

      const tl = gsap.timeline({ paused: true })
      tl.to(box, { rotation: 360, x: 100, duration: 1, ease: "power1.inOut" }).to(box, {
        x: 0,
        duration: 1,
        ease: "power1.inOut",
      })

      button.addEventListener("click", () => {
        tl.restart()
      })
    }

    // Demo 2: Secuencia
    const setupDemo2 = (container: HTMLDivElement | null, button: HTMLButtonElement | null) => {
      if (!container || !button) return

      const boxes = container.querySelectorAll(".demo-box")
      if (boxes.length === 0) return

      const tl = gsap.timeline({ paused: true })
      boxes.forEach((box, index) => {
        tl.to(
          box,
          {
            y: -30,
            duration: 0.4,
            ease: "power1.inOut",
          },
          index * 0.1,
        ).to(
          box,
          {
            y: 0,
            duration: 0.4,
            ease: "bounce.out",
          },
          index * 0.1 + 0.4,
        )
      })

      button.addEventListener("click", () => {
        tl.restart()
      })
    }

    // Demo 3: Transformación
    const setupDemo3 = (container: HTMLDivElement | null, button: HTMLButtonElement | null) => {
      if (!container || !button) return

      const box = container.querySelector(".demo-box")
      if (!box) return

      const tl = gsap.timeline({ paused: true })
      tl.to(box, {
        scale: 1.5,
        borderRadius: "50%",
        backgroundColor: "#f97316",
        duration: 1,
        ease: "power2.inOut",
      }).to(box, {
        scale: 1,
        borderRadius: "4px",
        backgroundColor: "#f43f5e",
        duration: 1,
        ease: "power2.inOut",
      })

      button.addEventListener("click", () => {
        tl.restart()
      })
    }

    // Configurar cada demo
    animationContainerRefs.current.forEach((container, index) => {
      if (!container) return
      const button = container.querySelector("button")

      switch (index) {
        case 0:
          setupDemo1(container, button as HTMLButtonElement)
          break
        case 1:
          setupDemo2(container, button as HTMLButtonElement)
          break
        case 2:
          setupDemo3(container, button as HTMLButtonElement)
          break
      }
    })
  }

  const projects = [
    {
      title: "Animación Básica",
      description: "Rotación y movimiento simple con GSAP.",
      demo: (
        <div className="h-32 relative">
          <div className="demo-box w-16 h-16 bg-rose-500 rounded"></div>
        </div>
      ),
    },
    {
      title: "Secuencia de Animación",
      description: "Animación secuencial de múltiples elementos.",
      demo: (
        <div className="h-32 relative flex items-center justify-center gap-4">
          <div className="demo-box w-8 h-24 bg-orange-500 rounded"></div>
          <div className="demo-box w-8 h-24 bg-orange-500 rounded"></div>
          <div className="demo-box w-8 h-24 bg-orange-500 rounded"></div>
          <div className="demo-box w-8 h-24 bg-orange-500 rounded"></div>
          <div className="demo-box w-8 h-24 bg-orange-500 rounded"></div>
        </div>
      ),
    },
    {
      title: "Transformación",
      description: "Cambio de forma, tamaño y color con GSAP.",
      demo: (
        <div className="h-32 relative flex items-center justify-center">
          <div className="demo-box w-16 h-16 bg-rose-500 rounded"></div>
        </div>
      ),
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-br from-rose-100 to-orange-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
          Ejemplos de Animaciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} ref={(el) => (cardRefs.current[index] = el)} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-foreground/70 mb-4">{project.description}</p>

                <div
                  ref={(el) => (animationContainerRefs.current[index] = el)}
                  className="bg-muted/50 rounded-lg p-4 mb-4"
                >
                  {project.demo}
                  <Button variant="outline" size="sm" className="mt-4 w-full flex items-center justify-center gap-2">
                    <Play className="h-4 w-4" /> Reproducir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
