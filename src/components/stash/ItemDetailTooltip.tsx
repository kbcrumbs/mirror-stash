// src/components/stash/ItemDetailTooltip.tsx
"use client";

import React, { useRef, useState, useEffect } from 'react';
import type { Item, ItemProperty, Requirement, Socket, InfluenceType, Mod } from '../../lib/mock-data';

interface ItemDetailTooltipProps {
  item: Item | null;
  coords?: { x: number; y: number } | null;
}

// Helper to format item properties (can be expanded)
const formatProperties = (properties?: ItemProperty[]) => {
  if (!properties || properties.length === 0) return null;
  return (
    <ul className="text-sm">
      {properties.map((prop, index) => (
        <li key={index}>
          <span className="text-gray-400">{prop.name}: </span>
          {prop.values.map((val, valIndex) => (
            <span key={valIndex} className={val[1] === 1 ? 'text-blue-400' : 'text-white'}>
              {val[0]}
              {valIndex < prop.values.length - 1 && ', '}
            </span>
          ))}
          {prop.displayMode === 3 && prop.type && <span className="text-xs text-gray-400"> (Type: {prop.type})</span>}
        </li>
      ))}
    </ul>
  );
};

// Helper to format explicit modifiers (can be expanded)
const formatMods = (mods?: Mod[], defaultModClass?: string) => {
  if (!mods || mods.length === 0) return null;
  return (
    <ul className="text-sm">
      {mods.map((mod, index) => {
        let modClass = defaultModClass || 'text-blue-400';
        let typePrefix = ''; // Renamed from 'prefix' for clarity
        if (mod.type === 'crafted') {
          modClass = 'text-cyan-300';
          typePrefix = '(Crafted) ';
        } else if (mod.type === 'enchant') {
          modClass = 'text-purple-300';
          typePrefix = '(Enchant) ';
        } else if (mod.type === 'fractured') {
          modClass = 'text-yellow-300'; 
          typePrefix = '(Fractured) ';
        }

        // New logic for handling numericValue and valueSuffix
        let numericDisplayValue = '';
        if (mod.numericValue !== undefined) {
          if (Array.isArray(mod.numericValue)) { // It's a range [min, max]
            numericDisplayValue = `(${mod.numericValue[0]}-${mod.numericValue[1]})`;
          } else { // It's a single number
            // Prepend "+" if it's a positive single value and text implies a direct bonus
            if (mod.numericValue > 0 && (mod.text.startsWith('to ') || mod.text.startsWith('Adds '))) {
              numericDisplayValue = `+${mod.numericValue}`;
            } else {
              numericDisplayValue = `${mod.numericValue}`;
            }
          }
          if (mod.valueSuffix) {
            numericDisplayValue += mod.valueSuffix;
          }
        }

        if (numericDisplayValue) {
          return (
            <li key={index} className={modClass}>
              {typePrefix}
              <span className="text-white font-semibold">{numericDisplayValue}</span>
              {' '}{mod.text}
            </li>
          );
        } else {
          // No numeric value, just display text with prefix
          return (
            <li key={index} className={modClass}>
              {typePrefix}{mod.text}
            </li>
          );
        }
      })}
    </ul>
  );
};

const getSocketColorClass = (sColour: 'R' | 'G' | 'B' | 'W'): string => {
  switch (sColour) {
    case 'R': return 'bg-red-600';
    case 'G': return 'bg-green-600';
    case 'B': return 'bg-blue-600';
    case 'W': return 'bg-gray-300'; // Or bg-white with border
    default: return 'bg-gray-500';
  }
};

const getRarityColorClass = (frameType?: number): string => {
  switch (frameType) {
    case 1: return 'text-blue-400'; // Magic
    case 2: return 'text-yellow-400'; // Rare
    case 3: return 'text-amber-500'; // Unique
    case 4: return 'text-teal-400';   // Gem
    case 5: return 'text-yellow-300'; // Currency
    case 6: return 'text-orange-300'; // Divination Card
    default: return 'text-white';
  }
};

// Helper for influence color
const getInfluenceColorClass = (influence?: InfluenceType): string => {
  if (!influence) return '';
  switch (influence) {
    case 'shaper': return 'text-cyan-400';
    case 'elder': return 'text-purple-400';
    case 'crusader': return 'text-yellow-500';
    case 'redeemer': return 'text-sky-400';
    case 'hunter': return 'text-green-500';
    case 'warlord': return 'text-orange-500';
    default: return 'text-gray-400'; // Fallback
  }
};

// Helper to capitalize
// Helper for influence icon background color
const getInfluenceIconBgClass = (influence?: InfluenceType): string => {
  if (!influence) return '';
  switch (influence) {
    case 'shaper': return 'bg-cyan-500'; // Adjusted for better visibility as BG
    case 'elder': return 'bg-purple-500';
    case 'crusader': return 'bg-yellow-600';
    case 'redeemer': return 'bg-sky-500';
    case 'hunter': return 'bg-green-600';
    case 'warlord': return 'bg-orange-600';
    default: return 'bg-gray-500'; // Fallback
  }
};

const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};



export default function ItemDetailTooltip({ item, coords }: ItemDetailTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [dynamicStyle, setDynamicStyle] = useState<React.CSSProperties>({ 
    opacity: 0, 
    position: 'fixed', // Ensure position is fixed for top/left to work
    zIndex: 50, // Keep zIndex from previous class
    pointerEvents: 'none', // Prevent tooltip from capturing mouse events
  });

  useEffect(() => {
    if (item && coords && tooltipRef.current) {
      const tooltipNode = tooltipRef.current;
      const tooltipWidth = tooltipNode.offsetWidth;
      const tooltipHeight = tooltipNode.offsetHeight;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const offset = 20; // Increased offset from cursor

      let newTop = coords.y + offset;
      let newLeft = coords.x + offset;

      // Adjust if going off bottom
      if (newTop + tooltipHeight > viewportHeight - offset) { // Check against viewport edge with offset
        newTop = coords.y - tooltipHeight - offset;
      }
      // Adjust if going off top (after potential flip or if cursor is near top)
      if (newTop < offset) {
        newTop = offset;
      }

      // Adjust if going off right
      if (newLeft + tooltipWidth > viewportWidth - offset) { // Check against viewport edge with offset
        newLeft = coords.x - tooltipWidth - offset;
      }
      // Adjust if going off left (after potential flip or if cursor is near left)
      if (newLeft < offset) {
        newLeft = offset;
      }
      
      setDynamicStyle(prevStyle => ({
        ...prevStyle,
        top: `${newTop}px`,
        left: `${newLeft}px`,
        opacity: 1,
      }));
    } else {
      // No item or no coords, ensure tooltip is hidden
      setDynamicStyle(prevStyle => ({ ...prevStyle, opacity: 0 }));
    }
  }, [item, coords]);

  // The placeholder logic is removed; parent should handle initial empty state if needed.
  // This component now either shows the item tooltip or is invisible.
  // If no item is provided, we render nothing from this component's perspective.
  // The tooltip div below will be rendered but invisible if opacity is 0.
  // Content rendering is conditional on 'item' later.

  const rarityColorClass = getRarityColorClass(item?.frameType); // Optional chaining for item, ensures item is not null

  return (
    <div 
      ref={tooltipRef}
      className="bg-neutral-800 p-4 rounded-lg shadow-xl w-96 max-w-md border border-neutral-700 text-sm leading-relaxed flex flex-col gap-2 max-h-[80vh] overflow-y-auto transition-opacity duration-100 ease-in-out"
      style={dynamicStyle} // Apply dynamic style (includes position:fixed, zIndex, opacity, top, left)
    >
      {item && ( // Only render content if item exists
        <>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {item.influence && (
            <span
              title={`${capitalizeFirstLetter(item.influence)} Influence`}
              className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${getInfluenceIconBgClass(item.influence)} border border-neutral-900 flex items-center justify-center`}
            >
              <span className="text-white text-xs font-bold select-none">
                {item.influence.charAt(0).toUpperCase()}
              </span>
            </span>
          )}
          <div>
            <h3 className={`text-lg font-semibold ${rarityColorClass}`}>{item.name}</h3>
            {item.typeLine && <p className={`${rarityColorClass}`}>{item.typeLine}</p>}
            {item.influence && (
              <p className={`text-sm font-semibold ${getInfluenceColorClass(item.influence)}`}>
                {capitalizeFirstLetter(item.influence)} Influence
              </p>
            )}
          </div>
        </div>
        {item.league && <span className="text-xs text-gray-400 italic ml-2 flex-shrink-0">{item.league}</span>}
      </div>

      {/* Statuses: Unidentified / Corrupted */}
      {(item.identified === false || item.corrupted) && (
        <>
          {item.identified === false && <p className="text-red-400 font-semibold">Unidentified</p>}
          {item.corrupted && <p className="text-red-500 font-semibold">Corrupted</p>}
          <hr className="border-neutral-600 my-1" />
        </>
      )}
      
      {/* Properties */}
      {item.properties && item.properties.length > 0 && (
        <>
          {formatProperties(item.properties)}
          <hr className="border-neutral-600 my-1" />
        </>
      )}

      {/* Quality - for non-gem items */}
      {typeof item.quality === 'number' && item.quality > 0 && item.frameType !== 4 && (
        <>
          <div>
            <span className="text-blue-400">Quality: </span>
            <span className="text-blue-400">+{item.quality}%</span>
          </div>
          <hr className="border-neutral-600 my-1" />
        </>
      )}

      {/* Item Level */}
      {typeof item.ilvl === 'number' && (
        <>
          <div>
            <span className="text-gray-400">Item Level: </span>
            <span className="text-white">{item.ilvl}</span>
          </div>
          <hr className="border-neutral-600 my-1" />
        </>
      )}

      {/* Stack Size */}
      {item.stackSize && (
        <>
          <div>
            <span className="text-gray-400">Stack Size: </span>
            <span className="text-white">{item.stackSize}{item.maxStackSize ? ` / ${item.maxStackSize}` : ''}</span>
          </div>
          <hr className="border-neutral-600 my-1" />
        </>
      )}

      {/* Requirements */}
      {item.requirements && item.requirements.length > 0 && (
        <>
          {/* Original requirements rendering block starts here */}
        <div>
          <span className="text-gray-400">Requires</span>
          {item.requirements.map((req: Requirement, i: number) => (
            <span key={i} className="ml-2 text-white">{req.name} <span className="text-gray-300">{req.values[0][0]}</span></span>
          ))}
        </div>
          <hr className="border-neutral-600 my-1" />
        </>
      )}

      {/* Sockets */}
      {item.sockets && item.sockets.length > 0 && (() => {
        const groupedSockets: { [key: number]: Socket[] } = {};
        item.sockets!.forEach(socket => {
          if (!groupedSockets[socket.group]) {
            groupedSockets[socket.group] = [];
          }
          groupedSockets[socket.group].push(socket);
        });

        return (
          <>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Sockets: </span>
              <div className="flex flex-wrap items-center">
                {Object.values(groupedSockets).map((group, groupIndex) => (
                  <div key={groupIndex} className="flex items-center mr-2 last:mr-0 mb-1">
                    {group.map((socket, socketIndex) => (
                      <React.Fragment key={socketIndex}>
                        <div 
                          className={`w-4 h-4 rounded-full ${getSocketColorClass(socket.sColour)} border border-neutral-900`}
                          title={`Socket ${socket.sColour}`}
                        ></div>
                        {socketIndex < group.length - 1 && (
                          <div className="w-2 h-px bg-neutral-500 mx-0.5 self-center"></div> // Connector line, self-center for vertical alignment
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <hr className="border-neutral-600 my-1" />
          </>
        );
      })()}

      {/* Implicit Mods */}
      {item.implicitMods && item.implicitMods.length > 0 && (
        <>
          {formatMods(item.implicitMods, 'text-blue-400 italic')}
          <hr className="border-neutral-600 my-1" />
        </>
      )}

      {/* Explicit Mods */}
      {item.explicitMods && item.explicitMods.length > 0 && (
        <>
          {formatMods(item.explicitMods, 'text-blue-400')}
          <hr className="border-neutral-600 my-1" />
        </>
      )}
      
      {/* Utility Mods */}
      {item.utilityMods && item.utilityMods.length > 0 && (
        <>
          {formatMods(item.utilityMods, 'text-gray-400')}
          <hr className="border-neutral-600 my-1" />
        </>
      )}

      {/* Descriptive Text */}
      {item.descrText && (
        <>
          <p className="text-gray-400 italic">{item.descrText}</p>
          <hr className="border-neutral-600 my-1" />
        </>
      )}

      {/* Flavour Text - last item, so HR might not be needed after unless there's a final border */}
      {item.flavourText && (
        <>
          <p className="text-orange-300 italic">{item.flavourText}</p>
          {/* Optional: <hr className="border-neutral-600 my-1" /> if more sections could follow or for consistent bottom border */}
        </>
      )}
        </> 
      )} {/* End conditional rendering of item content */} 
    </div>
  );
}
