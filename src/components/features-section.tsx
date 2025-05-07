"use client"

import { useEffect, useRef } from "react"
import { Layers, Zap, Clock, MousePointer } from "lucide-react"

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const loadGsap = async () => {
      const gsapModule = await import("gsap")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")

      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)

      // Animación de entrada para cada feature
      featureRefs.current.forEach((feature, index) => {
        gsap.fromTo(
          feature,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2,
          },
        )
      })

      // Animación del ícono
      featureRefs.current.forEach((feature) => {
        const icon = feature?.querySelector(".feature-icon")
        if (icon) {
          gsap.to(icon, {
            rotateY: 360,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: feature,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          })
        }
      })
    }

    loadGsap()
  }, [])

  const features = [
    {
      icon: <Layers className="h-10 w-10" />,
      title: "Animaciones Complejas",
      description: "Crea secuencias de animación complejas con facilidad y precisión milimétrica.",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Rendimiento Optimizado",
      description: "Disfruta de animaciones fluidas y de alto rendimiento en cualquier dispositivo.",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Control de Tiempo",
      description: "Controla cada aspecto de la línea de tiempo con precisión profesional.",
    },
    {
      icon: <MousePointer className="h-10 w-10" />,
      title: "Interactividad",
      description: "Crea experiencias interactivas que responden a las acciones del usuario.",
    },
  ]

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-gradient-to-br from-orange-50 to-rose-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
          Características de GSAP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="feature-icon mb-4 text-orange-500">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
