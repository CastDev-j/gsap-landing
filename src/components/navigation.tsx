"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Exercise = {
  id: string
  title: string
  description: string
}

interface NavigationProps {
  exercises: Exercise[]
}

export function Navigation({ exercises }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-rose-500">GSAP Ejercicios</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#intro" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">
            Inicio
          </a>

          {exercises.map((exercise) => (
            <a
              key={exercise.id}
              href={`#${exercise.id}`}
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
            >
              {exercise.id}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-3">
            <a
              href="#intro"
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </a>

            {exercises.map((exercise) => (
              <a
                key={exercise.id}
                href={`#${exercise.id}`}
                className="text-gray-700 hover:text-rose-500 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {exercise.id}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
