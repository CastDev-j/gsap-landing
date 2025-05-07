"use client"

import { useEffect, useRef } from "react"

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const loadGsap = async () => {
      const gsapModule = await import("gsap")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")

      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)

      // Animación de las barras de progreso
      progressRefs.current.forEach((progressBar, index) => {
        if (!progressBar) return

        const skill = skills[index]
        const valueRef = valueRefs.current[index]

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: progressBar,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })

        tl.fromTo(
          progressBar,
          { width: "0%" },
          {
            width: `${skill.level}%`,
            duration: 1.5,
            ease: "power3.out",
          },
        )

        if (valueRef) {
          tl.fromTo(
            valueRef,
            { textContent: "0" },
            {
              textContent: skill.level,
              duration: 1.5,
              ease: "power3.out",
              roundProps: "textContent",
            },
            0,
          )
        }
      })
    }

    loadGsap()
  }, [])

  const skills = [
    { name: "Animaciones Básicas", level: 90 },
    { name: "Secuencias Complejas", level: 75 },
    { name: "ScrollTrigger", level: 80 },
    { name: "Interactividad", level: 85 },
    { name: "Optimización", level: 70 },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-orange-50 to-rose-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
          Habilidades con GSAP
        </h2>

        <div className="max-w-3xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span ref={(el) => (valueRefs.current[index] = el)} className="font-medium">
                  0
                </span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  ref={(el) => (progressRefs.current[index] = el)}
                  className="h-full bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
