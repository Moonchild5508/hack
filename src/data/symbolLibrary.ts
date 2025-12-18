import type { Symbol } from '@/types';

export const symbolLibrary: Symbol[] = [
  {
    id: 'food-roti',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    labels: {
      english: 'Roti',
      hindi: 'रोटी',
      regional: 'ரொட்டி'
    },
    category: 'food',
    tags: ['bread', 'meal', 'dinner', 'lunch']
  },
  {
    id: 'food-dosa',
    imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
    labels: {
      english: 'Dosa',
      hindi: 'डोसा',
      regional: 'தோசை'
    },
    category: 'food',
    tags: ['breakfast', 'south indian', 'crispy']
  },
  {
    id: 'food-rice',
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400',
    labels: {
      english: 'Rice',
      hindi: 'चावल',
      regional: 'அரிசி'
    },
    category: 'food',
    tags: ['meal', 'staple', 'lunch', 'dinner']
  },
  {
    id: 'food-samosa',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    labels: {
      english: 'Samosa',
      hindi: 'समोसा',
      regional: 'சமோசா'
    },
    category: 'food',
    tags: ['snack', 'fried', 'tea time']
  },
  {
    id: 'food-chai',
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400',
    labels: {
      english: 'Chai',
      hindi: 'चाय',
      regional: 'சாய்'
    },
    category: 'food',
    tags: ['tea', 'drink', 'beverage', 'morning']
  },
  {
    id: 'food-ladoo',
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
    labels: {
      english: 'Ladoo',
      hindi: 'लड्डू',
      regional: 'லட்டு'
    },
    category: 'food',
    tags: ['sweet', 'dessert', 'festival']
  },
  {
    id: 'food-thali',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    labels: {
      english: 'Thali',
      hindi: 'थाली',
      regional: 'தாலி'
    },
    category: 'food',
    tags: ['meal', 'complete', 'lunch', 'dinner']
  },
  {
    id: 'food-paratha',
    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400',
    labels: {
      english: 'Paratha',
      hindi: 'पराठा',
      regional: 'பராத்தா'
    },
    category: 'food',
    tags: ['bread', 'breakfast', 'stuffed']
  },
  {
    id: 'transport-rickshaw',
    imageUrl: 'https://images.unsplash.com/photo-1605641379126-7eb9c0e4c7b5?w=400',
    labels: {
      english: 'Auto Rickshaw',
      hindi: 'ऑटो रिक्शा',
      regional: 'ஆட்டோ'
    },
    category: 'transport',
    tags: ['vehicle', 'three wheeler', 'ride']
  },
  {
    id: 'transport-bus',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
    labels: {
      english: 'Bus',
      hindi: 'बस',
      regional: 'பேருந்து'
    },
    category: 'transport',
    tags: ['vehicle', 'public transport', 'travel']
  },
  {
    id: 'transport-train',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400',
    labels: {
      english: 'Train',
      hindi: 'रेलगाड़ी',
      regional: 'ரயில்'
    },
    category: 'transport',
    tags: ['vehicle', 'railway', 'travel', 'long distance']
  },
  {
    id: 'transport-bicycle',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400',
    labels: {
      english: 'Bicycle',
      hindi: 'साइकिल',
      regional: 'சைக்கிள்'
    },
    category: 'transport',
    tags: ['vehicle', 'cycle', 'ride', 'exercise']
  },
  {
    id: 'transport-school-bus',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
    labels: {
      english: 'School Bus',
      hindi: 'स्कूल बस',
      regional: 'பள்ளி பேருந்து'
    },
    category: 'transport',
    tags: ['vehicle', 'school', 'children', 'education']
  },
  {
    id: 'festival-diwali',
    imageUrl: 'https://images.unsplash.com/photo-1605811625530-d3a3c0d3b66e?w=400',
    labels: {
      english: 'Diwali',
      hindi: 'दिवाली',
      regional: 'தீபாவளி'
    },
    category: 'festival',
    tags: ['celebration', 'lights', 'diya', 'festival']
  },
  {
    id: 'festival-holi',
    imageUrl: 'https://images.unsplash.com/photo-1583241800698-c318e4b8e5c7?w=400',
    labels: {
      english: 'Holi',
      hindi: 'होली',
      regional: 'ஹோலி'
    },
    category: 'festival',
    tags: ['celebration', 'colors', 'festival', 'spring']
  },
  {
    id: 'festival-eid',
    imageUrl: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400',
    labels: {
      english: 'Eid',
      hindi: 'ईद',
      regional: 'ஈத்'
    },
    category: 'festival',
    tags: ['celebration', 'festival', 'moon', 'prayer']
  },
  {
    id: 'routine-tiffin',
    imageUrl: 'https://images.unsplash.com/photo-1562158147-f8c60d0b3f9f?w=400',
    labels: {
      english: 'Tiffin Box',
      hindi: 'टिफिन',
      regional: 'டிஃபின்'
    },
    category: 'routine',
    tags: ['lunch', 'school', 'food', 'container']
  },
  {
    id: 'routine-uniform',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    labels: {
      english: 'School Uniform',
      hindi: 'स्कूल यूनिफॉर्म',
      regional: 'பள்ளி சீருடை'
    },
    category: 'routine',
    tags: ['school', 'clothes', 'dress', 'education']
  },
  {
    id: 'routine-prayer',
    imageUrl: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400',
    labels: {
      english: 'Prayer',
      hindi: 'प्रार्थना',
      regional: 'பிரார்த்தனை'
    },
    category: 'routine',
    tags: ['namaste', 'worship', 'morning', 'evening']
  },
  {
    id: 'routine-wake-up',
    imageUrl: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400',
    labels: {
      english: 'Wake Up',
      hindi: 'जागना',
      regional: 'எழுந்திரு'
    },
    category: 'routine',
    tags: ['morning', 'alarm', 'start', 'day']
  },
  {
    id: 'routine-brush',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
    labels: {
      english: 'Brush Teeth',
      hindi: 'दांत साफ करना',
      regional: 'பல் துலக்கு'
    },
    category: 'routine',
    tags: ['hygiene', 'morning', 'clean', 'toothbrush']
  },
  {
    id: 'emotion-happy',
    imageUrl: 'https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=400',
    labels: {
      english: 'Happy',
      hindi: 'खुश',
      regional: 'மகிழ்ச்சி'
    },
    category: 'emotion',
    tags: ['smile', 'joy', 'feeling', 'positive']
  },
  {
    id: 'emotion-sad',
    imageUrl: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=400',
    labels: {
      english: 'Sad',
      hindi: 'उदास',
      regional: 'சோகம்'
    },
    category: 'emotion',
    tags: ['cry', 'unhappy', 'feeling', 'tears']
  },
  {
    id: 'emotion-angry',
    imageUrl: 'https://images.unsplash.com/photo-1621252179027-94459d278660?w=400',
    labels: {
      english: 'Angry',
      hindi: 'गुस्सा',
      regional: 'கோபம்'
    },
    category: 'emotion',
    tags: ['mad', 'upset', 'feeling', 'frustrated']
  },
  {
    id: 'place-home',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
    labels: {
      english: 'Home',
      hindi: 'घर',
      regional: 'வீடு'
    },
    category: 'place',
    tags: ['house', 'family', 'live', 'building']
  },
  {
    id: 'place-school',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
    labels: {
      english: 'School',
      hindi: 'स्कूल',
      regional: 'பள்ளி'
    },
    category: 'place',
    tags: ['education', 'learn', 'study', 'building']
  },
  {
    id: 'place-park',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    labels: {
      english: 'Park',
      hindi: 'पार्क',
      regional: 'பூங்கா'
    },
    category: 'place',
    tags: ['playground', 'play', 'outdoor', 'fun']
  },
  {
    id: 'place-hospital',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
    labels: {
      english: 'Hospital',
      hindi: 'अस्पताल',
      regional: 'மருத்துவமனை'
    },
    category: 'place',
    tags: ['doctor', 'medical', 'health', 'building']
  },
  {
    id: 'action-eat',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    labels: {
      english: 'Eat',
      hindi: 'खाना',
      regional: 'சாப்பிடு'
    },
    category: 'action',
    tags: ['food', 'meal', 'hungry', 'dining']
  },
  {
    id: 'action-drink',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
    labels: {
      english: 'Drink',
      hindi: 'पीना',
      regional: 'குடி'
    },
    category: 'action',
    tags: ['water', 'thirsty', 'beverage', 'glass']
  },
  {
    id: 'action-sleep',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
    labels: {
      english: 'Sleep',
      hindi: 'सोना',
      regional: 'தூங்கு'
    },
    category: 'action',
    tags: ['rest', 'bed', 'night', 'tired']
  }
];

export const getCategorizedSymbols = () => {
  const categories: Record<string, Symbol[]> = {
    food: [],
    transport: [],
    festival: [],
    routine: [],
    emotion: [],
    action: [],
    object: [],
    place: []
  };

  symbolLibrary.forEach(symbol => {
    categories[symbol.category].push(symbol);
  });

  return categories;
};

export const searchSymbols = (query: string): Symbol[] => {
  const lowerQuery = query.toLowerCase();
  return symbolLibrary.filter(symbol =>
    symbol.labels.english.toLowerCase().includes(lowerQuery) ||
    symbol.labels.hindi.includes(lowerQuery) ||
    symbol.labels.regional.includes(lowerQuery) ||
    symbol.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getSymbolById = (id: string): Symbol | undefined => {
  return symbolLibrary.find(symbol => symbol.id === id);
};
