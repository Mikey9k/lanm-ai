// TypeScript
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// Import images directly for clarity and bundling
import bridge from '../../public/templates/Bridge.png'
import braid from '../../public/templates/Braid.png'
import fish from '../../public/templates/Fish.png'
import newton from '../../public/templates/Cradle.png'

const bridgeImages = [
  { id: 'bridge', img: bridge },
  { id: 'braid', img: braid },
  { id: 'fish', img: fish },
  { id: 'newton', img: newton },
]

interface ImageButtonsProps {
    activeTemplate: string
    setActiveTemplate: (templateName: string) => void
}

const ImageButtons: React.FC<ImageButtonsProps> = ({ activeTemplate, setActiveTemplate }) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col space-y-2">
        {bridgeImages.map(({ id, img }) => (
          <Button
            key={id}
            variant={activeTemplate === id ? 'default' : 'secondary'}
            onClick={() => setActiveTemplate(id)}
            className={`p-0 w-32 h-32 flex items-center justify-center rounded-lg ${
              activeTemplate === id ? 'border-4 border-blue-500' : ''
            }`}
          >
            <Image src={img} alt={`Bridge ${id}`} width={128} height={128} className="rounded" />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ImageButtons