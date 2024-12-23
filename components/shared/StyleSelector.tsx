import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Import images directly for clarity and bundling
import style1 from '../../public/styles/style1.png';
import style2 from '../../public/styles/style2.png';
import style3 from '../../public/styles/style3.png';

const styles = [
  { name: 'style1', img: style1 },
  { name: 'style2', img: style2 },
  { name: 'style3', img: style3 },
];

interface StyleSelectorProps {
  activeStyle: string;
  setActiveStyle: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ activeStyle, setActiveStyle }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Style</h3>
      <div className="flex space-x-2">
        {styles.map(({ name, img }) => (
          <Button
            key={name}
            variant={name === activeStyle ? 'default' : 'secondary'}
            onClick={() => setActiveStyle(name)}
            className={`p-0 w-32 h-32 flex items-center justify-center rounded-lg ${name === activeStyle ? 'border-4 border-blue-500' : ''}`}
          >
            <Image src={img} alt={name} width={128} height={128} className="rounded" />
          </Button>
        ))}
      </div>
    </div>
  );
}

export default StyleSelector;