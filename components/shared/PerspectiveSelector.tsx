import React from 'react'
import { Button } from '@/components/ui/button'

interface Perspective {
  id: string;
  label: string;
}

interface PerspectiveSelectorProps {
  activePerspective: string;
  setActivePerspective: (perspective: string) => void;
  perspectives: Perspective[];
}

const PerspectiveSelector: React.FC<PerspectiveSelectorProps> = ({ activePerspective, setActivePerspective, perspectives }) => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold mb-0">Perspective</h2>
      <h5 className="text-sm text-gray-500 mt-0">Select a perspective to generate the image</h5>
      <div className="flex flex-col space-y-2">
        {perspectives.map((p) => (
          <Button
            key={p.id}
            variant={p.label === activePerspective ? 'default' : 'secondary'}
            onClick={() => setActivePerspective(p.label)}
          >
            {p.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default PerspectiveSelector