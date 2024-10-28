'use client'

import React from 'react'
import Image from 'next/image'
import { useDesign } from '../context/DesignContext'
import DraggableElement from './DraggableElement'

export default function DesignCanvas() {
  const { selectedProduct, selectedColor, designElements } = useDesign()

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg aspect-square relative">
      <div 
        className="w-full h-full relative" 
        style={{ backgroundColor: selectedColor }}
      >
        {/* Producto base (camiseta o sudadera) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image 
            src={`/api/placeholder/400/400`} 
            alt={selectedProduct}
            width={400}
            height={400}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Elementos de diseño */}
        {designElements.map((element) => (
          <DraggableElement key={element.id} element={element} />
        ))}
      </div>
    </div>
  )
}