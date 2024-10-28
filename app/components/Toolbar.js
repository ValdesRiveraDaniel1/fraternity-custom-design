'use client'

import React, { useState } from 'react'
import { useDesign } from '../context/DesignContext'
import { 
  Type, 
  Image as ImageIcon, 
  Palette, 
  RotateCw,
  ZoomIn,
  Trash2
} from 'lucide-react'

export default function Toolbar() {
  const { 
    addElement, 
    selectedElement, 
    updateElement, 
    removeElement,
    setSelectedColor,
    setSelectedProduct 
  } = useDesign()

  const [textInput, setTextInput] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)

  const handleAddText = () => {
    if (!textInput.trim()) return
    
    addElement({
      type: 'text',
      content: textInput,
      color: '#000000',
      fontSize: 24
    })
    setTextInput('')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        addElement({
          type: 'image',
          url: e.target?.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const products = [
    { id: 'tshirt', name: 'Camiseta' },
    { id: 'hoodie', name: 'Sudadera' }
  ]

  const colors = [
    { id: 'white', name: 'Blanco', value: '#ffffff' },
    { id: 'black', name: 'Negro', value: '#000000' },
    { id: 'gray', name: 'Gris', value: '#808080' },
    { id: 'navy', name: 'Azul marino', value: '#000080' }
  ]

  const handleColorClick = (color) => {
    if (selectedElement && selectedElement.type === 'text') {
      updateElement(selectedElement, { color: color.value })
    } else {
      setSelectedColor(color.value)
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-6">
      {/* Selector de producto */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold text-black mb-3">Producto</h3>
        <div className="flex gap-2">
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product.id)}
              className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors text-black"
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de color */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold text-black mb-3">Color</h3>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {colors.map(color => (
              <button
                key={color.id}
                onClick={() => handleColorClick(color)}
                className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-600 transition-colors shadow-sm"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
            title="Color personalizado"
          >
            <Palette className="w-5 h-5 text-black" />
          </button>
          {showColorPicker && (
            <input
              type="color"
              onChange={(e) => handleColorClick({ value: e.target.value })}
              className="w-8 h-8"
            />
          )}
        </div>
      </div>

      {/* Añadir texto */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold text-black mb-3">Añadir texto</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-black placeholder-gray-500"
            placeholder="Escribe tu texto..."
          />
          <button
            onClick={handleAddText}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Type className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Añadir imagen */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold text-black mb-3">Añadir imagen</h3>
        <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors">
          <ImageIcon className="w-5 h-5 text-black" />
          <span className="text-black">Subir imagen</span>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      {/* Controles de elemento seleccionado */}
      {selectedElement && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-black mb-3">Editar elemento</h3>
          <div className="flex gap-2">
            <button
              onClick={() => updateElement(selectedElement, {
                rotation: (element) => (element.rotation || 0) + 90
              })}
              className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="Rotar"
            >
              <RotateCw className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => updateElement(selectedElement, {
                scale: (element) => (element.scale || 1) * 1.1
              })}
              className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="Aumentar tamaño"
            >
              <ZoomIn className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => removeElement(selectedElement)}
              className="p-2 bg-white border-2 border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}