// src/components/stash/ItemCard.tsx
"use client";

import Image from 'next/image';
import type { Item } from '../../lib/mock-data'; // Assuming Item type is exported from mock-data

interface ItemCardProps {
  item: Item;
  onMouseEnter: (item: Item, e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

const getBorderColorForFrameType = (frameType?: number): string => {
  switch (frameType) {
    case 1: return 'border-blue-500'; // Magic
    case 2: return 'border-yellow-400'; // Rare
    case 3: return 'border-amber-600'; // Unique
    case 4: return 'border-teal-500';   // Gem
    case 5: return 'border-yellow-500'; // Currency
    case 6: return 'border-yellow-300'; // Divination Card
    case 0: // Normal
    default:
      return 'border-neutral-600'; // Default/Normal item border
  }
};

export default function ItemCard({ item, onMouseEnter, onMouseLeave }: ItemCardProps) {
  const borderColorClass = getBorderColorForFrameType(item.frameType);

  return (
    <div
      title={`${item.name}${item.stackSize ? ` (Stack: ${item.stackSize})` : ''}`}
      className={`relative bg-neutral-900 rounded flex items-center justify-center hover:bg-neutral-700 cursor-pointer border-2 ${borderColorClass} hover:ring-2 hover:ring-yellow-400 hover:ring-offset-1 hover:ring-offset-neutral-900 transition-all`}
      onMouseEnter={(e) => onMouseEnter(item, e)}
      onMouseLeave={onMouseLeave}
      style={{
        gridColumnStart: item.x + 1,
        gridRowStart: item.y + 1,
        gridColumnEnd: `span ${item.w}`,
        gridRowEnd: `span ${item.h}`,
        aspectRatio: `${item.w} / ${item.h}`,
        minHeight: '40px', // Minimum cell height
      }}
    >
      <Image
        src={item.icon}
        alt={item.name}
        width={item.w * 40} // Base size, adjust as needed
        height={item.h * 40}
        className="object-contain p-0.5"
        unoptimized // For external poecdn.com URLs without next.config.js image domain setup
      />
      {item.stackSize && (item.stackSize > 1 || item.maxStackSize === 1) && (
        <span 
          className="absolute bottom-0 right-1 text-xs font-bold text-white tabular-nums"
          style={{ textShadow: '1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black' }}
        >
          {item.stackSize}
        </span>
      )}
    </div>
  );
}
