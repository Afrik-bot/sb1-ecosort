interface RecyclingInfo {
  recyclable: boolean;
  instructions: string;
  materialType: string;
  confidence?: number;
}

const recyclingDatabase: Record<string, RecyclingInfo> = {
  // Bottles and Containers
  'bottle': {
    recyclable: true,
    materialType: 'plastic',
    instructions: 'Remove cap, rinse thoroughly, and place in recycling bin. Check bottom for recycling number.'
  },
  'plastic_bottle': {
    recyclable: true,
    materialType: 'plastic',
    instructions: 'Remove cap, rinse thoroughly, and place in recycling bin. Most plastic bottles are recyclable (types 1 & 2).'
  },
  'glass_bottle': {
    recyclable: true,
    materialType: 'glass',
    instructions: 'Rinse thoroughly. Remove caps or lids. Sort by color if required in your area.'
  },

  // Paper Products
  'paper': {
    recyclable: true,
    materialType: 'paper',
    instructions: 'Keep dry and clean. Remove any plastic windows or metal fasteners. Flatten if possible.'
  },
  'newspaper': {
    recyclable: true,
    materialType: 'paper',
    instructions: 'Keep dry and clean. Remove any plastic bags or rubber bands.'
  },
  'cardboard': {
    recyclable: true,
    materialType: 'paper',
    instructions: 'Break down boxes, remove tape and staples. Keep dry and clean. Flatten to save space.'
  },
  'box': {
    recyclable: true,
    materialType: 'paper',
    instructions: 'Break down the box, remove any tape or staples. Must be clean and dry.'
  },

  // Metal Items
  'can': {
    recyclable: true,
    materialType: 'metal',
    instructions: 'Rinse thoroughly. Both aluminum and steel cans are widely recyclable. Labels can stay on.'
  },
  'aluminum_can': {
    recyclable: true,
    materialType: 'metal',
    instructions: 'Rinse clean. Crush if possible to save space. Always recyclable.'
  },
  'tin_can': {
    recyclable: true,
    materialType: 'metal',
    instructions: 'Rinse thoroughly. Remove paper labels if possible. Flatten to save space.'
  },

  // Glass Items
  'glass': {
    recyclable: true,
    materialType: 'glass',
    instructions: 'Rinse thoroughly. Remove lids and caps. Sort by color if required in your area.'
  },
  'glass_jar': {
    recyclable: true,
    materialType: 'glass',
    instructions: 'Remove lid, rinse thoroughly. Labels can stay on. Sort by color if required.'
  },

  // Plastic Items
  'plastic_container': {
    recyclable: true,
    materialType: 'plastic',
    instructions: 'Check recycling number on bottom. Rinse clean. Remove lid if different material.'
  },
  'plastic_bag': {
    recyclable: false,
    materialType: 'plastic',
    instructions: 'Most curbside programs don\'t accept plastic bags. Return to grocery stores for specialized recycling.'
  },

  // Electronics
  'cell_phone': {
    recyclable: true,
    materialType: 'electronics',
    instructions: 'Do not place in regular recycling. Take to electronics recycling center or retailer.'
  },
  'computer': {
    recyclable: true,
    materialType: 'electronics',
    instructions: 'Requires special handling. Take to electronics recycling center or manufacturer recycling program.'
  },

  // Common Household Items
  'battery': {
    recyclable: true,
    materialType: 'hazardous',
    instructions: 'Do not place in regular recycling. Take to battery recycling location or hardware store.'
  },
  'light_bulb': {
    recyclable: true,
    materialType: 'hazardous',
    instructions: 'LED and CFL bulbs require special recycling. Take to hardware store or recycling center.'
  }
};

const fuzzyMatch = (input: string, target: string): number => {
  input = input.toLowerCase();
  target = target.toLowerCase();
  
  if (input === target) return 1;
  if (target.includes(input) || input.includes(target)) return 0.8;
  
  const words = input.split('_');
  const targetWords = target.split('_');
  
  let matches = 0;
  for (const word of words) {
    if (targetWords.some(tw => tw.includes(word) || word.includes(tw))) {
      matches++;
    }
  }
  
  return matches / Math.max(words.length, targetWords.length);
};

export function getRecyclingInstructions(item: string): RecyclingInfo {
  // Normalize the item name
  const normalizedItem = item.toLowerCase().replace(/\s+/g, '_');
  
  // Check for exact matches
  if (recyclingDatabase[normalizedItem]) {
    return {
      ...recyclingDatabase[normalizedItem],
      confidence: 1
    };
  }
  
  // Find best fuzzy match
  let bestMatch = '';
  let bestScore = 0;
  
  for (const key of Object.keys(recyclingDatabase)) {
    const score = fuzzyMatch(normalizedItem, key);
    if (score > bestScore && score > 0.6) {
      bestScore = score;
      bestMatch = key;
    }
  }
  
  if (bestMatch) {
    return {
      ...recyclingDatabase[bestMatch],
      confidence: bestScore
    };
  }
  
  // Default response for unknown items
  return {
    recyclable: false,
    materialType: 'unknown',
    instructions: 'Unable to determine recycling status. Please check your local recycling guidelines or contact your waste management provider.',
    confidence: 0
  };
}