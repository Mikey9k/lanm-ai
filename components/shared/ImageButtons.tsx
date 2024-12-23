import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// Import images directly for clarity and bundling
import bridge from '../../public/templates/Bridge.png'
import braid from '../../public/templates/Braid.png'

const bridgeImages = [
  { id: 1, img: bridge },
  { id: 2, img: braid },
]

interface ImageButtonsProps {
    activeTemplate: number
    setActiveTemplate: (id: number) => void
}

const ImageButtons: React.FC<ImageButtonsProps> = ({ activeTemplate, setActiveTemplate }) => {
  return (
    <div className="space-y-2">
      {/* <h3 className="font-semibold">Select Bridge</h3> */}
      <div className="flex flex-col space-y-2">
        {bridgeImages.map(({ id, img }) => (
          <Button
            key={id}
            variant={activeTemplate === id ? 'default' : 'secondary'}
            onClick={() => setActiveTemplate(id)}
            className={`p-0 w-32 h-32 flex items-center justify-center rounded-lg ${activeTemplate === id ? 'border-4 border-blue-500' : ''}`}
          >
            <Image src={img} alt={`Bridge ${id}`} width={128} height={128} className="rounded" />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ImageButtons