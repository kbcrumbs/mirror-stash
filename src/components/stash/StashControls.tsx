// src/components/stash/StashControls.tsx
"use client";

interface StashControlsProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedRarity: string;
  onRarityChange: (rarity: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  // We can add more props for filters later
}

export default function StashControls({
  searchTerm,
  onSearchTermChange,
  selectedRarity,
  onRarityChange,
  selectedCategory,
  onCategoryChange,
}: StashControlsProps) {
  return (
    <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="w-full sm:w-1/2">
          <label htmlFor="itemSearch" className="sr-only">Search items</label>
          <input 
            type="text"
            id="itemSearch"
            placeholder="Search by name or type..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        
        {/* Rarity Filter Dropdown */}
        <div className="w-full sm:w-1/4">
          <label htmlFor="rarityFilter" className="sr-only">Filter by rarity</label>
          <select 
            id="rarityFilter"
            value={selectedRarity}
            onChange={(e) => onRarityChange(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="all">All Rarities</option>
            <option value="unique">Unique</option>
            <option value="rare">Rare</option>
            <option value="magic">Magic</option>
            <option value="normal">Normal</option>
            {/* We can add other frame types like currency, gem, etc. later if needed */}
          </select>
        </div>
        
        {/* Category Filter Dropdown */}
        <div className="w-full sm:w-1/4">
          <label htmlFor="categoryFilter" className="sr-only">Filter by category</label>
          <select 
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="all">All Categories</option>
            <option value="currency">Currency</option>
            <option value="equipment">Equipment</option>
            <option value="map">Maps</option>
            <option value="gem">Gems</option>
            <option value="flask">Flasks</option>
            <option value="divcard">Divination Cards</option>
          </select>
        </div>

        {/* Placeholder for more future filters */}
        {/*
        <div className="w-full sm:w-1/4">
          <button className="w-full p-2 rounded bg-yellow-500 text-black hover:bg-yellow-600">
            Apply Filters
          </button>
        </div>
        */}
      </div>
    </div>
  );
}
