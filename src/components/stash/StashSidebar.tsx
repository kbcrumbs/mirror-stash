// src/components/stash/StashSidebar.tsx
"use client";

import type { StashTab } from '../../lib/mock-data';

interface StashSidebarProps {
  tabs: StashTab[];
  selectedTab: StashTab | null;
  onSelectTab: (tab: StashTab) => void;
}

export default function StashSidebar({ tabs, selectedTab, onSelectTab }: StashSidebarProps) {
  if (tabs.length === 0) {
    return <p className="text-gray-400">No stash tabs found.</p>;
  }

  return (
    <ul className="space-y-1">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className={`p-2 rounded cursor-pointer transition-all duration-150 ease-in-out text-sm ${selectedTab?.id === tab.id ? 'font-semibold scale-105' : 'hover:opacity-80'}`}
          onClick={() => onSelectTab(tab)}
          style={{
            backgroundColor: selectedTab?.id === tab.id 
              ? (tab.colour ? `rgb(${tab.colour.r}, ${tab.colour.g}, ${tab.colour.b})` : 'rgb(250, 204, 21)') 
              : (tab.colour ? `rgba(${tab.colour.r}, ${tab.colour.g}, ${tab.colour.b}, 0.3)` : 'rgb(55, 65, 81)'),
            color: selectedTab?.id === tab.id ? 'black' : 'white',
            borderLeft: `4px solid ${tab.colour ? `rgb(${tab.colour.r}, ${tab.colour.g}, ${tab.colour.b})` : (selectedTab?.id === tab.id ? 'rgb(250, 204, 21)' : 'rgb(75, 85, 99)')}`,
          }}
        >
          {tab.name}
        </li>
      ))}
    </ul>
  );
}
