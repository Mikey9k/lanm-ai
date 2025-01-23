// TypeScript
import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import style1 from '../../public/styles/style1.png';
import style2 from '../../public/styles/style2.png';
import style3 from '../../public/styles/style3.png';

const styles = [
  { name: 'sketch', img: style1 },
  { name: 'blueprint', img: style2 },
  { name: 'minblack', img: style3 },
];

interface StyleSelectorProps {
  activeStyle: number;
  setActiveStyle: (index: number) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ activeStyle, setActiveStyle }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Style</h3>
      <div className="flex space-x-2">
        {styles.map(({ name, img }, index) => (
          <Button
            key={index}
            variant={index === activeStyle ? 'default' : 'secondary'}
            onClick={() => setActiveStyle(index)}
            className={`p-0 w-32 h-32 flex items-center justify-center rounded-lg ${
              index === activeStyle ? 'border-4 border-blue-500' : ''
            }`}
          >
            <Image src={img} alt={name} width={128} height={128} className="rounded" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;