import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Perspective {
  id: string;
  label: string;
}

interface PerspectiveSelectorProps {
  perspectives: Perspective[];
  handlePerspectiveChange: (newPerspective: string) => Promise<void>;
}

const PerspectiveSelector: React.FC<PerspectiveSelectorProps> = ({ perspectives, handlePerspectiveChange }) => {
  const [selectedPerspective, setSelectedPerspective] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <h2 className="font-semibold mb-0">Perspective</h2>
      <h5 className="text-sm text-gray-500 mt-0">Select a perspective to generate the image</h5>
      <div className="flex flex-col space-y-2">
        {perspectives.map((p) => (
          <Button
            key={p.id}
            variant={p.label === selectedPerspective ? 'default' : 'secondary'}
            onClick={() => {
              setSelectedPerspective(p.label);
              handlePerspectiveChange(p.label);
              console.log(``)
            }}
          >
            {p.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PerspectiveSelector;