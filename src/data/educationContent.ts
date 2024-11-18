import type { Article, GuideSection, RecyclingTip } from '../types/EducationTypes';

export const RECYCLING_BASICS: Article = {
  id: 'basics',
  title: 'Recycling Basics',
  description: 'Master the fundamentals of recycling and make a positive environmental impact',
  isPremium: false,
  sections: [
    {
      title: 'Why Recycling Matters',
      content: `Recycling is crucial for environmental conservation, reducing landfill waste, and conserving natural resources. When we recycle:
        • We reduce greenhouse gas emissions
        • Save energy in manufacturing
        • Conserve raw materials
        • Prevent pollution by reducing the need for new resource extraction`
    },
    {
      title: 'The Three Rs Hierarchy',
      content: `1. Reduce: Minimize waste by choosing products with less packaging
2. Reuse: Find new purposes for items before recycling
3. Recycle: Transform used materials into new products`,
      isPremium: false
    },
    {
      title: 'Common Recycling Symbols',
      content: 'Understanding recycling symbols is key to proper sorting:',
      images: ['/education/recycling-symbols.svg'],
      isPremium: true
    }
  ]
};

export const PLASTIC_TYPES: Article = {
  id: 'plastics',
  title: 'Plastic Types Guide',
  description: 'Learn to identify and properly recycle different types of plastic',
  isPremium: true,
  sections: [
    {
      title: 'Plastic Resin Codes',
      content: `#1 PET (Polyethylene Terephthalate)
• Common uses: Beverage bottles, food containers
• Recyclability: Highly recyclable
• Special instructions: Rinse, remove caps

#2 HDPE (High-Density Polyethylene)
• Common uses: Milk jugs, shampoo bottles
• Recyclability: Widely accepted
• Special instructions: Rinse, labels okay

#3-#7 (Various Plastics)
• Recyclability varies by location
• Check local guidelines`,
      isPremium: true
    }
  ]
};

export const COMPOSTING_GUIDE: Article = {
  id: 'composting',
  title: 'Composting 101',
  description: 'Start your composting journey and reduce organic waste',
  isPremium: true,
  sections: [
    {
      title: 'Getting Started',
      content: `Essential components for successful composting:
• Green materials (nitrogen-rich)
• Brown materials (carbon-rich)
• Water
• Air circulation`,
      isPremium: false
    },
    {
      title: 'What to Compost',
      content: `Compostable Materials:
✓ Fruit and vegetable scraps
✓ Coffee grounds and filters
✓ Yard trimmings
✓ Plain paper products

Never Compost:
✗ Meat or dairy
✗ Oils or fats
✗ Diseased plants
✗ Inorganic materials`,
      isPremium: true
    }
  ]
};

export const QUICK_TIPS: RecyclingTip[] = [
  {
    id: 1,
    title: 'Clean Before Recycling',
    description: 'Rinse containers to prevent contamination',
    category: 'General'
  },
  {
    id: 2,
    title: 'Check Local Guidelines',
    description: 'Recycling rules vary by location',
    category: 'General'
  },
  {
    id: 3,
    title: 'Avoid Wishcycling',
    description: 'When in doubt, check or throw it out',
    category: 'Advanced',
    isPremium: true
  }
];