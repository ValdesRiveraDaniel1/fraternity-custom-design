'use client'


import React from 'react'
import { ShoppingCart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">FraternityCustomDesign</h1>
          <nav className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Guardar Diseño
            </button>
            <button className="p-2">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}