export function Footer() {
  return (
    <footer className="py-6 bg-white border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} GSAP Ejercicios - Creado con GSAP 3.13.0 y Next.js
        </p>
      </div>
    </footer>
  )
}
