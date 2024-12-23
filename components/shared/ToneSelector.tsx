import React from 'react'
import { Button } from '@/components/ui/button'

const tones = ['Balance', 'Formal', 'Informal']

const ToneSelector = ({ activeTone, setActiveTone }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Tone</h3>
      <div className="flex space-x-2">
        {tones.map((tone, index) => (
          <Button
            key={index}
            variant={tone.toLowerCase() === activeTone ? 'default' : 'secondary'}
            onClick={() => setActiveTone(tone.toLowerCase())}
          >
            {tone}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ToneSelector