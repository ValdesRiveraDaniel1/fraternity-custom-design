import { DesignProvider } from '@/app/context/DesignContext'
import DesignCanvas from '@/app/components/DesignCanvas'
import Toolbar from '@/app/components/Toolbar'
import Header from '@/app/components/Header'

export default function Home() {
  return (
    <DesignProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Título y descripción */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Diseña tu Ropa Personalizada
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Crea diseños únicos para tus camisetas y sudaderas
            </p>
          </div>

          {/* Editor principal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Área de diseño */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <DesignCanvas />
            </div>

            {/* Barra de herramientas */}
            <div className="lg:col-span-4">
              <Toolbar />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 FraternityCustomDesign. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </DesignProvider>
  );
}