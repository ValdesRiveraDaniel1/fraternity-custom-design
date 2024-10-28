'use client'

import React, { createContext, useContext, useState } from 'react'

const DesignContext = createContext()

export function DesignProvider({ children }) {
  const [designElements, setDesignElements] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('tshirt')
  const [selectedColor, setSelectedColor] = useState('white')
  const [selectedElement, setSelectedElement] = useState(null)

  const addElement = (element) => {
    setDesignElements([...designElements, {
      ...element,
      id: Date.now(),
      position: { x: 0, y: 0 },
      scale: 1,
      rotation: 0
    }])
  }

  const updateElement = (id, updates) => {
    setDesignElements(elements =>
      elements.map(el => el.id === id ? { ...el, ...updates } : el)
    )
  }

  const removeElement = (id) => {
    setDesignElements(elements => elements.filter(el => el.id !== id))
  }

  return (
    <DesignContext.Provider value={{
      designElements,
      selectedProduct,
      selectedColor,
      selectedElement,
      setSelectedProduct,
      setSelectedColor,
      setSelectedElement,
      addElement,
      updateElement,
      removeElement
    }}>
      {children}
    </DesignContext.Provider>
  )
}

export function useDesign() {
  return useContext(DesignContext)
}