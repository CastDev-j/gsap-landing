"use client"

import { useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Importamos GSAP dinámicamente para evitar errores de SSR
    const loadGsap = async () => {
      const gsapModule = await import("gsap")
      const scrollToModule = await import("gsap/ScrollToPlugin")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")

      const gsap = gsapModule.default
      const ScrollToPlugin = scrollToModule.default
      const ScrollTrigger = scrollTriggerModule.default

      // Registramos los plugins
      gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

      // Configuramos el smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault()

          const targetId = this.getAttribute("href")
          if (targetId && targetId !== "#") {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: targetId,
                offsetY: 80,
              },
              ease: "power3.inOut",
            })
          }
        })
      })

      // Inicializamos ScrollTrigger para todas las secciones
      const sections = document.querySelectorAll("section")
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            })
          },
          once: true,
        })
      })
    }

    loadGsap()

    return () => {
      // Limpieza al desmontar
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div ref={mainRef} className="relative">
      <Navigation />
      <main className="overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
