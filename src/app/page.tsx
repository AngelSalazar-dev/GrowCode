import Link from "next/link"
import { Rocket, ShieldCheck, Users, Code2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 lg:py-32 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
            <Rocket className="w-4 h-4" />
            <span>Nueva plataforma para desarrolladores</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
            Eleva tu código con <span className="text-indigo-600">Mentoría Técnica</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Conecta con expertos, comparte recursos de calidad y acelera tu carrera profesional en la comunidad más activa de devs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/feed" 
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Explorar Recursos
            </Link>
            <Link 
              href="/mentors" 
              className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
            >
              Buscar Mentores
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Red de Mentores</h3>
            <p className="text-gray-600">Acceso directo a Seniors con años de experiencia real en la industria.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Recursos Curados</h3>
            <p className="text-gray-600">Feed de enlaces y tutoriales compartidos por la comunidad técnica.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Code2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Crecimiento Guiado</h3>
            <p className="text-gray-600">Pasa de Junior a Senior con el acompañamiento de expertos reales.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
