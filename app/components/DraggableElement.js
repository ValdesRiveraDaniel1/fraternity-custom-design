'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useDesign } from '../context/DesignContext'

export default function DraggableElement({ element }) {
  const { updateElement, setSelectedElement } = useDesign()
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - element.position.x,
      y: e.clientY - element.position.y
    })
    setSelectedElement(element.id)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    updateElement(element.id, {
      position: {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      className="absolute cursor-move"
      style={{
        transform: `translate(${element.position.x}px, ${element.position.y}px) 
                   rotate(${element.rotation}deg) 
                   scale(${element.scale})`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {element.type === 'text' && (
        <p style={{ color: element.color, fontSize: element.fontSize }}>
          {element.content}
        </p>
      )}
      {element.type === 'image' && (
        <div className="relative w-32 h-32">
          <Image
            src={element.url}
            alt="Design element"
            fill
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}