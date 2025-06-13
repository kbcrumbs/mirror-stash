// src/app/stash/page.tsx
"use client";

import { useState, useMemo } from 'react'; // Added useMemo
import { mockStashTabs, type StashTab, type Item } from '../../lib/mock-data'; // Added Item type
import StashSidebar from '../../components/stash/StashSidebar';
import ItemGrid from '../../components/stash/ItemGrid';
import ItemDetailTooltip from '../../components/stash/ItemDetailTooltip';
import StashControls from '../../components/stash/StashControls'; // Import StashControls

export default function StashPage() {
  const [selectedTab, setSelectedTab] = useState<StashTab | null>(
    mockStashTabs.length > 0 ? mockStashTabs[0] : null
  );
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all'); // Added for rarity filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // Added for category filter
  const [tooltipCoords, setTooltipCoords] = useState<{ x: number; y: number } | null>(null);

  const handleItemMouseEnter = (item: Item, e: React.MouseEvent) => {
    setHoveredItem(item);
    setTooltipCoords({ x: e.clientX, y: e.clientY });
  };

  const handleItemMouseLeave = () => {
    setHoveredItem(null);
    setTooltipCoords(null);
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  // Filter items based on searchTerm, selectedRarity, selectedCategory, and selectedTab
  const filteredItems = useMemo(() => {
    if (!selectedTab) return [];

    let itemsToFilter = selectedTab.items;

    // Apply search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      itemsToFilter = itemsToFilter.filter(item => 
        item.name.toLowerCase().includes(lowerSearchTerm) || 
        (item.typeLine && item.typeLine.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // Apply rarity filter
    if (selectedRarity !== 'all') {
      itemsToFilter = itemsToFilter.filter(item => {
        switch (selectedRarity) {
          case 'normal': return item.frameType === 0;
          case 'magic': return item.frameType === 1;
          case 'rare': return item.frameType === 2;
          case 'unique': return item.frameType === 3;
          default: return true; // Should not happen if select options are controlled
        }
      });
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      itemsToFilter = itemsToFilter.filter(item => {
        const typeLineLower = item.typeLine?.toLowerCase() || '';
        switch (selectedCategory) {
          case 'currency': return item.frameType === 5;
          case 'equipment': 
            return item.frameType !== undefined && item.frameType <= 3 && 
                   !typeLineLower.includes('flask') && 
                   !typeLineLower.includes('map');
          case 'map': 
            return item.frameType !== undefined && item.frameType <= 3 && 
                   typeLineLower.includes('map');
          case 'gem': return item.frameType === 4;
          case 'flask': 
            return item.frameType !== undefined && item.frameType <= 3 && 
                   typeLineLower.includes('flask');
          case 'divcard': return item.frameType === 6;
          default: return true;
        }
      });
    }

    return itemsToFilter;
  }, [selectedTab, searchTerm, selectedRarity, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">My Stash</h1>
      </header>

      <StashControls 
        searchTerm={searchTerm} 
        onSearchTermChange={handleSearchTermChange}
        selectedRarity={selectedRarity}
        onRarityChange={setSelectedRarity}
        selectedCategory={selectedCategory} // Added
        onCategoryChange={setSelectedCategory} // Added
      />

      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-1/4 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Stash Tabs</h2>
          <StashSidebar 
            tabs={mockStashTabs} 
            selectedTab={selectedTab} 
            onSelectTab={setSelectedTab} 
          />
        </aside>

        <main className="w-full md:w-3/4 bg-gray-800 p-4 rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-800 py-2 z-10">
            {selectedTab ? selectedTab.name : 'No Tab Selected'}
          </h2>
          <ItemGrid 
            // Pass the filtered items and selected tab type for grid calculation
            items={filteredItems} 
            tabType={selectedTab?.type} 
            onItemMouseEnter={handleItemMouseEnter} 
            onItemMouseLeave={handleItemMouseLeave} 
          />
        </main>
      </div>

      <ItemDetailTooltip item={hoveredItem} coords={tooltipCoords} />

      {/* Placeholder for Item Detail View/Modal */}
      {/* 
      <div className="fixed bottom-4 right-4 bg-gray-700 p-4 rounded-lg shadow-xl w-80">
        <h3 className="text-lg font-semibold mb-2">Item Details (Placeholder)</h3>
        <p className="text-sm">Hover over an item to see details here.</p>
      </div>
      */}
    </div>
  );
}
