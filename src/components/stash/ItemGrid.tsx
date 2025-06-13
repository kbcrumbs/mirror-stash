// src/components/stash/ItemGrid.tsx
"use client";

import type { Item } from '../../lib/mock-data'; // StashTab is no longer directly needed here
import ItemCard from './ItemCard';

interface ItemGridProps {
  items: Item[];
  tabType: string | undefined; // e.g., "PremiumStash", "CurrencyStash"
  onItemMouseEnter: (item: Item, e: React.MouseEvent) => void;
  onItemMouseLeave: () => void;
}

export default function ItemGrid({ items, tabType, onItemMouseEnter, onItemMouseLeave }: ItemGridProps) {
  if (!tabType) { // If no tab is selected, StashPage might pass undefined tabType
    return <p className="text-gray-400 text-center mt-10">Select a tab to view items.</p>;
  }

  if (items.length === 0) {
    return <p className="text-gray-400 text-center mt-10">No items match your search or this tab is empty.</p>;
  }

  return (
    <div 
      className="grid gap-0.5"
      style={{
        gridTemplateColumns: `repeat(${tabType === 'QuadStash' ? 24 : 12}, minmax(0, 1fr))`,
      }}
    >
      {items.map((item) => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onMouseEnter={onItemMouseEnter} 
          onMouseLeave={onItemMouseLeave} 
        />
      ))}
    </div>
  );
}
