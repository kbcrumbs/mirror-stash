// src/lib/mock-data.ts

export interface ItemProperty {
  name: string;
  values: Array<[string, number]>;
  displayMode: number;
  type?: number;
}

export interface Socket {
  group: number;
  attr?: 'S' | 'D' | 'I'; // Strength, Dexterity, Intelligence
  sColour: 'R' | 'G' | 'B' | 'W'; // Red, Green, Blue, White
}

export interface Requirement {
  name: string;
  values: Array<[string, number]>;
  displayMode: number;
  type?: number;
}

export type InfluenceType = 'shaper' | 'elder' | 'crusader' | 'redeemer' | 'hunter' | 'warlord';

export interface Mod {
  text: string;
  type?: 'crafted' | 'enchant' | 'fractured'; // Add more types as needed
  numericValue?: number | [number, number]; // For single numbers or [min, max] ranges
  valueSuffix?: string; // e.g., "%"
  valueColor?: string; // Optional: for highlighting the value based on roll quality (future use)
}

export interface Item {
  influence?: InfluenceType;
  id: string;
  name: string; // Full name, like "Kaom's Heart"
  typeLine: string; // Base type, like "Glorious Plate"
  icon: string;
  w: number; // width in cells
  h: number; // height in cells
  x: number; // position x in tab (0-indexed)
  y: number; // position y in tab (0-indexed)
  league?: string;
  ilvl?: number;
  identified?: boolean;
  corrupted?: boolean;
  stackSize?: number;
  maxStackSize?: number;
  frameType?: number; // 0: Normal, 1: Magic, 2: Rare, 3: Unique, 4: Gem, 5: Currency, 6: Divination Card
  quality?: number;
  properties?: ItemProperty[];
  explicitMods?: Mod[];
  implicitMods?: Mod[];
  utilityMods?: Mod[];
  descrText?: string;
  flavourText?: string;
  requirements?: Requirement[];
  sockets?: Socket[];
}

export interface StashTab {
  id: string;
  name: string;
  type: string; // e.g., "PremiumStash", "CurrencyStash", "MapStash"
  index: number;
  colour?: { r: number; g: number; b: number };
  items: Item[];
}

export const mockStashTabs: StashTab[] = [
  {
    id: "tab1",
    name: "💰 Currency",
    type: "CurrencyStash",
    index: 0,
    colour: { r: 255, g: 215, b: 0 }, // Gold color
    items: [
      {
        id: "curr1",
        name: "Exalted Orb",
        typeLine: "Exalted Orb",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/e197962750/CurrencyRerollRare.png",
        w: 1,
        h: 1,
        x: 0,
        y: 0,
        stackSize: 3,
        maxStackSize: 10,
        frameType: 5,
      },
      {
        id: "curr2",
        name: "Chaos Orb",
        typeLine: "Chaos Orb",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/d1595ef000/CurrencyRerollMagic.png",
        w: 1,
        h: 1,
        x: 1,
        y: 0,
        stackSize: 152,
        maxStackSize: 5000, // Example, actual might be different for currency tab
        frameType: 5,
        corrupted: true,
      },
      {
        id: "curr3",
        name: "Orb of Alchemy",
        typeLine: "Orb of Alchemy",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lVcGdyYWRlTm9ybWFsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/7593384a70/CurrencyUpgradeNormal.png",
        w: 1,
        h: 1,
        x: 0,
        y: 1,
        stackSize: 78,
        maxStackSize: 5000,
        frameType: 5,
      },
    ],
  },
  {
    id: "tab2",
    name: "⚔️ Gear",
    type: "PremiumStash",
    index: 1,
    items: [
      {
        id: "gear1",
        name: "Kaom's Heart",
        typeLine: "Glorious Plate",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9Cb2R5QXJtb3VyU3RyNlVuaXF1ZSIsInciOjIsImgiOjMsInNjYWxlIjoxfV0/c5f3a061e8/BodyArmourStr6Unique.png",
        w: 2,
        h: 3,
        x: 0,
        y: 0,
        ilvl: 86,
        identified: true,
        quality: 20,
        properties: [
          { name: "Armour", values: [["500", 0]], displayMode: 0 } // Example value
        ],
        frameType: 3, // Unique
        implicitMods: [{ text: "Has no Sockets" }],
        explicitMods: [
          { text: "to maximum Life", numericValue: 500 }, // formatMods will prepend "+"
          { text: "increased Fire Damage", numericValue: [40, 50], valueSuffix: "%" }, // formatMods will handle range and suffix
          { text: "to Strength", numericValue: 25, type: 'crafted' } // formatMods will prepend "(Crafted) +"
        ],
        flavourText: "The warrior who possesses a heart of fire shall make his foes into ash."
      },
      {
        id: "gear2",
        name: "Pain Song", // Made up rare name
        typeLine: "Imbued Wand",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvV2VhcG9ucy9PbmVIYW5kV2VhcG9ucy9XYW5kcy9XYW5kSW50MTMiLCJ3IjoxLCJoIjozLCJzY2FsZSI6MX1d/0cf257245a/WandInt13.png",
        w: 1,
        h: 3,
        x: 3,
        y: 1,
        ilvl: 75,
        identified: false,
        quality: 12,
        properties: [
          { name: "Wand", values: [["Requires Level 60, 188 Int", 0]], displayMode: 0, type: 1 }, // Example, specific to wands
          { name: "Physical Damage", values: [["30-55", 1]], displayMode: 0 }, // Augmented by quality
          { name: "Critical Strike Chance", values: [["7.50%", 0]], displayMode: 0 },
          { name: "Attacks per Second", values: [["1.50", 1]], displayMode: 0 } // Augmented by quality
        ],
        frameType: 2, // Rare
        explicitMods: [
          { text: "to maximum Mana", numericValue: 72 },
          { text: "increased Spell Damage", numericValue: 25, valueSuffix: "%" },
          { text: "Cold Damage to Spells", numericValue: [10, 20] },
          { text: "to Global Critical Strike Multiplier", numericValue: 15, valueSuffix: "%" }
        ],
      },
      {
        id: "gem1",
        name: "Vaal Arc",
        typeLine: "Arc",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvR2Vtcy9WYWFsR2Vtcy9WYWFsQXJjIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/7e6f5f5e5c/VaalArc.png",
        w: 1, 
        h: 1,
        x: 0,
        y: 4,
        frameType: 4, // Gem
        properties: [
          { name: "Level", values: [["20",1]], displayMode: 0 },
          { name: "Quality", values: [["+20%",1]], displayMode: 0, type: 6 }
        ],
      },
      {
        id: "gear3",
        name: "Linked Chainmail",
        typeLine: "Chainmail Vest",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9Cb2R5QXJtb3VyU3RyRGV4MyIsInciOjIsImgiOjMsInNjYWxlIjoxfV0/c1c1ZWM3MGIy/BodyArmourStrDex3.png", // Placeholder icon
        w: 2,
        h: 3,
        x: 2,
        y: 0, // Placed next to Kaom's Heart
        ilvl: 68,
        identified: true,
        quality: 10,
        properties: [
          { name: "Armour", values: [["150", 0]], displayMode: 0 } // Example value
        ],
        frameType: 0, // Normal
        sockets: [
          { group: 0, attr: 'S', sColour: 'R' },
          { group: 0, attr: 'D', sColour: 'G' },
          { group: 1, attr: 'I', sColour: 'B' },
          { group: 1, attr: 'I', sColour: 'B' },
        ],
      },
      {
        id: "gear4",
        name: "Socketed Greathelm",
        typeLine: "Ezomyte Burgonet",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9IZल्BtZXRzL0hlbG1ldFN0cjE0IiwidyI6MiwiaCI6Miwic2NhbGUiOjF9XQ/dNDM2M2JkNTY/HelmetStr14.png", // Placeholder icon
        w: 2,
        h: 2,
        x: 4,
        y: 0, // Placed to the right of Linked Chainmail
        identified: true,
        influence: 'shaper',
        properties: [
          { name: "Armour", values: [["220", 0]], displayMode: 0 } // Example value
        ],
        frameType: 1, // Magic
        sockets: [
          { group: 0, attr: 'S', sColour: 'R' },
          { group: 0, attr: 'D', sColour: 'G' },
          { group: 0, attr: 'I', sColour: 'B' },
          { group: 0, sColour: 'W' }, 
          { group: 1, attr: 'I', sColour: 'B' },
          { group: 1, attr: 'S', sColour: 'R' },
        ],
      },
      {
        id: "gear5",
        name: "Green Tri-Gloves",
        typeLine: "Wrapped Mitts",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9HbG92ZXMvR2xvdmVzSW50N0EiLCJ3IjoyLCJoIjoyLCJzY2FsZSI6MX1d/YjYyMTM1ZGRj/GlovesInt7A.png", // Placeholder icon
        w: 2,
        h: 2,
        x: 4,
        y: 2, // Placed below Socketed Greathelm
        identified: true,
        influence: 'elder',
        properties: [
          { name: "Evasion Rating", values: [["180", 0]], displayMode: 0 } // Example value
        ],
        frameType: 0, // Normal
        sockets: [
          { group: 0, attr: 'D', sColour: 'G' },
          { group: 0, attr: 'D', sColour: 'G' },
          { group: 0, attr: 'D', sColour: 'G' },
        ],
      },
      {
        id: "gear6",
        name: "Aegis of the Guardian", // Made up shield name
        typeLine: "Archon Kite Shield",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9TaGllbGRzL1NoaWVsZEludDExIiwidyI6MiwiaCI6Miwic2NhbGUiOjF9XQ/d0f3c9e7c1/ShieldInt11.png", // Placeholder icon
        w: 2,
        h: 2,
        x: 0,
        y: 5, // Below Vaal Arc
        ilvl: 78,
        identified: true,
        quality: 15,
        properties: [
          { name: "Chance to Block", values: [["25%", 0]], displayMode: 0 },
          { name: "Energy Shield", values: [["120", 1]], displayMode: 0 } // Value modified by quality usually blue
        ],
        frameType: 2, // Rare
        explicitMods: [
          { text: "to maximum Energy Shield", numericValue: 70 },
          { text: "to maximum Mana", numericValue: 45 },
          { text: "increased Spell Damage", numericValue: 10, valueSuffix: "%" }
        ],
        requirements: [
          { name: "Level", values: [["60",0]], displayMode: 0 },
          { name: "Int", values: [["150",0]], displayMode: 0 },
        ]
      },
      {
        id: "flask1",
        name: "Chemist's Granite Flask of Staunching",
        typeLine: "Granite Flask",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRmxhc2tzL0ZsYXNrR3Jhbml0ZSIsInciOjEsImgiOjIsInNjYWxlIjoxfV0/d8c8a0a5e0/FlaskGranite.png",
        w: 1,
        h: 2,
        x: 6, // Assuming this spot is free
        y: 0,
        ilvl: 60,
        identified: true,
        quality: 15,
        frameType: 1, // Magic
        utilityMods: [
          { text: "Armour during Flask Effect", numericValue: 1500 },
          { text: "Seconds Flask Duration", numericValue: 5.5 }
        ],
        explicitMods: [
          { text: "increased Charge Recovery", numericValue: 24, valueSuffix: "%" },
          { text: "Consumes 20 of 60 Charges" },
          { text: "Immunity to Bleeding and Corrupted Blood during Flask effect" }
        ],
        requirements: [
          { name: "Level", values: [["40",0]], displayMode: 0 }
        ],
        descrText: "Right click to drink. Can be used 3 more times."
      },
      {
        id: "map1",
        name: "Corrupted Strand Map of Haunting",
        typeLine: "Strand Map",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9BdGxhczJNYXBzL05ldy9TdHJhbmQiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/f8a8a0a5e0/Strand.png", // Generic map icon, specific one for Strand might exist
        w: 1,
        h: 1,
        x: 7, // Assuming this spot is free next to the flask
        y: 0,
        ilvl: 78,
        identified: true,
        corrupted: true,
        quality: 12,
        frameType: 2, // Rare
        properties: [
          { name: "Map Tier", values: [["11", 0]], displayMode: 0 },
          { name: "Item Quantity", values: [["+75%", 1]], displayMode: 0 },
          { name: "Item Rarity", values: [["+40%", 1]], displayMode: 0 },
          { name: "Monster Pack Size", values: [["+25%", 1]], displayMode: 0 }
        ],
        explicitMods: [
          { text: "Players are Cursed with Vulnerability" },
          { text: "extra Physical Damage as Lightning dealt by Monsters", numericValue: 90, valueSuffix: "%" },
          { text: "additional Rogue Exiles in Area", numericValue: 2 }
        ],
        descrText: "Travel to this Map by using it in a personal Map Device. Maps can only be used once."
      },
      {
        id: "jewel1",
        name: "Hypnotic Eye",
        typeLine: "Viridian Jewel",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvSmV3ZWxzL05ld0dlbmVyaWNKYXNwZXIiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1f3c9e7c1/NewGenericJasper.png", // Placeholder icon
        w: 1,
        h: 1,
        x: 6, // Positioned below the flask
        y: 2,
        ilvl: 80,
        identified: true,
        frameType: 2, // Rare
        explicitMods: [
          { text: "increased maximum Life", numericValue: 7, valueSuffix: "%" },
          { text: "increased Projectile Damage", numericValue: 12, valueSuffix: "%" },
          { text: "to Strength and Dexterity", numericValue: 10 }
        ],
        descrText: "Place into an allocated Jewel Socket on the Passive Skill Tree. Right click to remove from the Socket."
      },
      {
        id: "clusterJewel1",
        name: "Gale Song",
        typeLine: "Large Cluster Jewel",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvSmV3ZWxzL05ld0NsdXN0ZXJKZXdlbExhcmdlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/c4f3a061e8/NewClusterJewelLarge.png", // Placeholder Large Cluster Jewel icon
        w: 1,
        h: 1,
        x: 7, // Positioned next to the Viridian Jewel
        y: 2,
        ilvl: 84,
        identified: true,
        frameType: 2, // Rare
        implicitMods: [
          { text: "Adds 12 Passive Skills", type: 'enchant', numericValue: 12 },
          { text: "Added Small Passive Skills grant: Minions deal increased Damage", type: 'enchant', numericValue: 10, valueSuffix: "%" },
          { text: "Added Small Passive Skills also grant: to Strength", type: 'enchant', numericValue: 3 }
        ],
        explicitMods: [
          { text: "1 Added Passive Skill is Renewal" },
          { text: "1 Added Passive Skill is Rotten Claws" },
          { text: "increased Minion Attack Speed", numericValue: 5, valueSuffix: "%" }
        ],
        descrText: "Place into an allocated Large Jewel Socket on the Passive Skill Tree. Right click to remove from the Socket."
      }
    ],
  },
  {
    id: "tab3",
    name: "💎 Div Cards",
    type: "DivinationCardStash",
    index: 2,
    items: [
      {
        id: "div1",
        name: "The Doctor",
        typeLine: "The Doctor",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRGl2aW5hdGlvbi9JbnZlbnRvcnlJY29uL1RoZURvY3RvciIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/c5a5273673/TheDoctor.png",
        w: 1,
        h: 1,
        x: 0,
        y: 0,
        stackSize: 3,
        maxStackSize: 8,
        frameType: 6, // Divination Card
        explicitMods: [{ text: "<uniqueitem>{Headhunter}" }],
        flavourText: "They say he can count the number of hairs on your head from a hundred paces. They say he can cure any illness with a touch. They say a lot of things."
      }
    ]
  }
];
