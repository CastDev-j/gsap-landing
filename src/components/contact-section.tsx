"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Github, Twitter, Linkedin } from "lucide-react"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const gsapModule = await import("gsap")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")

      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)

      // Animación del formulario
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )

      // Animación de los iconos sociales
      gsap.fromTo(
        socialRef.current,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )

      // Animación de los iconos sociales
      const socialIcons = socialRef.current?.querySelectorAll(".social-icon")
      if (socialIcons) {
        gsap.fromTo(
          socialIcons,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    }

    loadGsap()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
          Contacto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <form ref={formRef} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input type="text" placeholder="Nombre" className="bg-white/80" />
              </div>
              <div>
                <Input type="email" placeholder="Email" className="bg-white/80" />
              </div>
              <div>
                <Textarea placeholder="Mensaje" className="bg-white/80 min-h-32" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white"
            >
              Enviar Mensaje
            </Button>
          </form>

          <div ref={socialRef} className="flex flex-col justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-rose-500" />
                Conectemos
              </h3>

              <p className="text-foreground/70 mb-6">
                ¿Tienes alguna pregunta sobre GSAP o quieres colaborar en un proyecto? ¡No dudes en contactarme a través
                de cualquiera de estos canales!
              </p>

              <div className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5 text-orange-500 social-icon" />
                  ejemplo@email.com
                </a>

                <div className="flex items-center gap-4 mt-4">
                  <a
                    href="#"
                    className="bg-muted/50 hover:bg-muted p-3 rounded-full transition-colors social-icon"
                    aria-label="Github"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-muted/50 hover:bg-muted p-3 rounded-full transition-colors social-icon"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-muted/50 hover:bg-muted p-3 rounded-full transition-colors social-icon"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
