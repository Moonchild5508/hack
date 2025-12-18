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
  },
  
  // More Actions
  {
    id: 'action-play',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
    labels: {
      english: 'Play',
      hindi: 'खेलना',
      regional: 'விளையாடு'
    },
    category: 'action',
    tags: ['fun', 'game', 'toy', 'activity']
  },
  {
    id: 'action-read',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    labels: {
      english: 'Read',
      hindi: 'पढ़ना',
      regional: 'படி'
    },
    category: 'action',
    tags: ['book', 'study', 'learn', 'story']
  },
  {
    id: 'action-write',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    labels: {
      english: 'Write',
      hindi: 'लिखना',
      regional: 'எழுது'
    },
    category: 'action',
    tags: ['pen', 'pencil', 'homework', 'draw']
  },
  {
    id: 'action-walk',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
    labels: {
      english: 'Walk',
      hindi: 'चलना',
      regional: 'நட'
    },
    category: 'action',
    tags: ['move', 'go', 'exercise', 'feet']
  },
  {
    id: 'action-run',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400',
    labels: {
      english: 'Run',
      hindi: 'दौड़ना',
      regional: 'ஓடு'
    },
    category: 'action',
    tags: ['fast', 'exercise', 'sport', 'quick']
  },
  {
    id: 'action-jump',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    labels: {
      english: 'Jump',
      hindi: 'कूदना',
      regional: 'குதி'
    },
    category: 'action',
    tags: ['hop', 'leap', 'play', 'active']
  },
  {
    id: 'action-sit',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    labels: {
      english: 'Sit',
      hindi: 'बैठना',
      regional: 'உட்கார்'
    },
    category: 'action',
    tags: ['chair', 'rest', 'down', 'seat']
  },
  {
    id: 'action-stand',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    labels: {
      english: 'Stand',
      hindi: 'खड़ा होना',
      regional: 'நில்'
    },
    category: 'action',
    tags: ['up', 'rise', 'feet', 'tall']
  },
  {
    id: 'action-dance',
    imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400',
    labels: {
      english: 'Dance',
      hindi: 'नाचना',
      regional: 'நடனம்'
    },
    category: 'action',
    tags: ['music', 'move', 'fun', 'celebrate']
  },
  {
    id: 'action-sing',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
    labels: {
      english: 'Sing',
      hindi: 'गाना',
      regional: 'பாடு'
    },
    category: 'action',
    tags: ['music', 'song', 'voice', 'melody']
  },
  {
    id: 'action-listen',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
    labels: {
      english: 'Listen',
      hindi: 'सुनना',
      regional: 'கேள்'
    },
    category: 'action',
    tags: ['hear', 'sound', 'music', 'attention']
  },
  {
    id: 'action-watch',
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400',
    labels: {
      english: 'Watch',
      hindi: 'देखना',
      regional: 'பார்'
    },
    category: 'action',
    tags: ['see', 'look', 'tv', 'observe']
  },
  {
    id: 'action-talk',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    labels: {
      english: 'Talk',
      hindi: 'बात करना',
      regional: 'பேசு'
    },
    category: 'action',
    tags: ['speak', 'say', 'communicate', 'words']
  },
  {
    id: 'action-help',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400',
    labels: {
      english: 'Help',
      hindi: 'मदद करना',
      regional: 'உதவி'
    },
    category: 'action',
    tags: ['assist', 'support', 'aid', 'care']
  },
  {
    id: 'action-wash',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
    labels: {
      english: 'Wash',
      hindi: 'धोना',
      regional: 'கழுவு'
    },
    category: 'action',
    tags: ['clean', 'water', 'hands', 'soap']
  },
  {
    id: 'action-brush',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
    labels: {
      english: 'Brush Teeth',
      hindi: 'ब्रश करना',
      regional: 'பல் துலக்கு'
    },
    category: 'action',
    tags: ['teeth', 'clean', 'morning', 'hygiene']
  },
  {
    id: 'action-bath',
    imageUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400',
    labels: {
      english: 'Bath',
      hindi: 'नहाना',
      regional: 'குளி'
    },
    category: 'action',
    tags: ['shower', 'clean', 'water', 'wash']
  },
  {
    id: 'action-dress',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400',
    labels: {
      english: 'Get Dressed',
      hindi: 'कपड़े पहनना',
      regional: 'உடை அணி'
    },
    category: 'action',
    tags: ['clothes', 'wear', 'morning', 'ready']
  },

  // Body Parts
  {
    id: 'body-head',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
    labels: {
      english: 'Head',
      hindi: 'सिर',
      regional: 'தலை'
    },
    category: 'body',
    tags: ['face', 'hair', 'top', 'brain']
  },
  {
    id: 'body-eyes',
    imageUrl: 'https://images.unsplash.com/photo-1585763964711-1e0e6d2f0c4f?w=400',
    labels: {
      english: 'Eyes',
      hindi: 'आँखें',
      regional: 'கண்கள்'
    },
    category: 'body',
    tags: ['see', 'look', 'watch', 'vision']
  },
  {
    id: 'body-ears',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    labels: {
      english: 'Ears',
      hindi: 'कान',
      regional: 'காதுகள்'
    },
    category: 'body',
    tags: ['hear', 'listen', 'sound', 'hearing']
  },
  {
    id: 'body-nose',
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400',
    labels: {
      english: 'Nose',
      hindi: 'नाक',
      regional: 'மூக்கு'
    },
    category: 'body',
    tags: ['smell', 'breathe', 'face', 'sniff']
  },
  {
    id: 'body-mouth',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400',
    labels: {
      english: 'Mouth',
      hindi: 'मुँह',
      regional: 'வாய்'
    },
    category: 'body',
    tags: ['eat', 'talk', 'lips', 'teeth']
  },
  {
    id: 'body-hands',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400',
    labels: {
      english: 'Hands',
      hindi: 'हाथ',
      regional: 'கைகள்'
    },
    category: 'body',
    tags: ['fingers', 'hold', 'touch', 'grab']
  },
  {
    id: 'body-feet',
    imageUrl: 'https://images.unsplash.com/photo-1520452112805-c6692c840af0?w=400',
    labels: {
      english: 'Feet',
      hindi: 'पैर',
      regional: 'கால்கள்'
    },
    category: 'body',
    tags: ['toes', 'walk', 'shoes', 'legs']
  },
  {
    id: 'body-stomach',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    labels: {
      english: 'Stomach',
      hindi: 'पेट',
      regional: 'வயிறு'
    },
    category: 'body',
    tags: ['belly', 'tummy', 'hungry', 'food']
  },

  // Family
  {
    id: 'family-mother',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400',
    labels: {
      english: 'Mother',
      hindi: 'माँ',
      regional: 'அம்மா'
    },
    category: 'family',
    tags: ['mom', 'mama', 'parent', 'woman']
  },
  {
    id: 'family-father',
    imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400',
    labels: {
      english: 'Father',
      hindi: 'पिता',
      regional: 'அப்பா'
    },
    category: 'family',
    tags: ['dad', 'papa', 'parent', 'man']
  },
  {
    id: 'family-brother',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    labels: {
      english: 'Brother',
      hindi: 'भाई',
      regional: 'சகோதரன்'
    },
    category: 'family',
    tags: ['sibling', 'boy', 'bhai', 'family']
  },
  {
    id: 'family-sister',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    labels: {
      english: 'Sister',
      hindi: 'बहन',
      regional: 'சகோதரி'
    },
    category: 'family',
    tags: ['sibling', 'girl', 'didi', 'family']
  },
  {
    id: 'family-grandmother',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
    labels: {
      english: 'Grandmother',
      hindi: 'दादी',
      regional: 'பாட்டி'
    },
    category: 'family',
    tags: ['nani', 'dadi', 'grandma', 'elder']
  },
  {
    id: 'family-grandfather',
    imageUrl: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400',
    labels: {
      english: 'Grandfather',
      hindi: 'दादा',
      regional: 'தாத்தா'
    },
    category: 'family',
    tags: ['nana', 'dada', 'grandpa', 'elder']
  },
  {
    id: 'family-baby',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    labels: {
      english: 'Baby',
      hindi: 'बच्चा',
      regional: 'குழந்தை'
    },
    category: 'family',
    tags: ['infant', 'small', 'young', 'child']
  },
  {
    id: 'family-friend',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
    labels: {
      english: 'Friend',
      hindi: 'दोस्त',
      regional: 'நண்பர்'
    },
    category: 'family',
    tags: ['buddy', 'pal', 'companion', 'play']
  },

  // Animals
  {
    id: 'animal-dog',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    labels: {
      english: 'Dog',
      hindi: 'कुत्ता',
      regional: 'நாய்'
    },
    category: 'animal',
    tags: ['pet', 'puppy', 'bark', 'animal']
  },
  {
    id: 'animal-cat',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    labels: {
      english: 'Cat',
      hindi: 'बिल्ली',
      regional: 'பூனை'
    },
    category: 'animal',
    tags: ['pet', 'kitten', 'meow', 'animal']
  },
  {
    id: 'animal-cow',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400',
    labels: {
      english: 'Cow',
      hindi: 'गाय',
      regional: 'மாடு'
    },
    category: 'animal',
    tags: ['milk', 'farm', 'moo', 'animal']
  },
  {
    id: 'animal-elephant',
    imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400',
    labels: {
      english: 'Elephant',
      hindi: 'हाथी',
      regional: 'யானை'
    },
    category: 'animal',
    tags: ['big', 'trunk', 'zoo', 'animal']
  },
  {
    id: 'animal-monkey',
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400',
    labels: {
      english: 'Monkey',
      hindi: 'बंदर',
      regional: 'குரங்கு'
    },
    category: 'animal',
    tags: ['banana', 'tree', 'zoo', 'animal']
  },
  {
    id: 'animal-bird',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
    labels: {
      english: 'Bird',
      hindi: 'पक्षी',
      regional: 'பறவை'
    },
    category: 'animal',
    tags: ['fly', 'wings', 'chirp', 'animal']
  },
  {
    id: 'animal-fish',
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400',
    labels: {
      english: 'Fish',
      hindi: 'मछली',
      regional: 'மீன்'
    },
    category: 'animal',
    tags: ['water', 'swim', 'sea', 'animal']
  },
  {
    id: 'animal-butterfly',
    imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400',
    labels: {
      english: 'Butterfly',
      hindi: 'तितली',
      regional: 'பட்டாம்பூச்சி'
    },
    category: 'animal',
    tags: ['fly', 'colorful', 'wings', 'insect']
  },

  // Colors
  {
    id: 'color-red',
    imageUrl: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=400',
    labels: {
      english: 'Red',
      hindi: 'लाल',
      regional: 'சிவப்பு'
    },
    category: 'color',
    tags: ['color', 'bright', 'apple', 'rose']
  },
  {
    id: 'color-blue',
    imageUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400',
    labels: {
      english: 'Blue',
      hindi: 'नीला',
      regional: 'நீலம்'
    },
    category: 'color',
    tags: ['color', 'sky', 'water', 'ocean']
  },
  {
    id: 'color-yellow',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    labels: {
      english: 'Yellow',
      hindi: 'पीला',
      regional: 'மஞ்சள்'
    },
    category: 'color',
    tags: ['color', 'sun', 'bright', 'banana']
  },
  {
    id: 'color-green',
    imageUrl: 'https://images.unsplash.com/photo-1505672678657-cc7037095e60?w=400',
    labels: {
      english: 'Green',
      hindi: 'हरा',
      regional: 'பச்சை'
    },
    category: 'color',
    tags: ['color', 'grass', 'leaf', 'nature']
  },
  {
    id: 'color-orange',
    imageUrl: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400',
    labels: {
      english: 'Orange',
      hindi: 'नारंगी',
      regional: 'ஆரஞ்சு'
    },
    category: 'color',
    tags: ['color', 'fruit', 'bright', 'sunset']
  },
  {
    id: 'color-purple',
    imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400',
    labels: {
      english: 'Purple',
      hindi: 'बैंगनी',
      regional: 'ஊதா'
    },
    category: 'color',
    tags: ['color', 'violet', 'flower', 'grape']
  },
  {
    id: 'color-pink',
    imageUrl: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400',
    labels: {
      english: 'Pink',
      hindi: 'गुलाबी',
      regional: 'இளஞ்சிவப்பு'
    },
    category: 'color',
    tags: ['color', 'rose', 'soft', 'flower']
  },
  {
    id: 'color-white',
    imageUrl: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400',
    labels: {
      english: 'White',
      hindi: 'सफ़ेद',
      regional: 'வெள்ளை'
    },
    category: 'color',
    tags: ['color', 'clean', 'pure', 'snow']
  },
  {
    id: 'color-black',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
    labels: {
      english: 'Black',
      hindi: 'काला',
      regional: 'கருப்பு'
    },
    category: 'color',
    tags: ['color', 'dark', 'night', 'shadow']
  },

  // Numbers
  {
    id: 'number-one',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    labels: {
      english: 'One',
      hindi: 'एक',
      regional: 'ஒன்று'
    },
    category: 'number',
    tags: ['1', 'count', 'first', 'single']
  },
  {
    id: 'number-two',
    imageUrl: 'https://images.unsplash.com/photo-1516981442399-a91139e20ff8?w=400',
    labels: {
      english: 'Two',
      hindi: 'दो',
      regional: 'இரண்டு'
    },
    category: 'number',
    tags: ['2', 'count', 'pair', 'double']
  },
  {
    id: 'number-three',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    labels: {
      english: 'Three',
      hindi: 'तीन',
      regional: 'மூன்று'
    },
    category: 'number',
    tags: ['3', 'count', 'triple', 'third']
  },
  {
    id: 'number-four',
    imageUrl: 'https://images.unsplash.com/photo-1516981442399-a91139e20ff8?w=400',
    labels: {
      english: 'Four',
      hindi: 'चार',
      regional: 'நான்கு'
    },
    category: 'number',
    tags: ['4', 'count', 'quad', 'fourth']
  },
  {
    id: 'number-five',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    labels: {
      english: 'Five',
      hindi: 'पाँच',
      regional: 'ஐந்து'
    },
    category: 'number',
    tags: ['5', 'count', 'hand', 'fifth']
  },

  // More Food
  {
    id: 'food-apple',
    imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400',
    labels: {
      english: 'Apple',
      hindi: 'सेब',
      regional: 'ஆப்பிள்'
    },
    category: 'food',
    tags: ['fruit', 'red', 'healthy', 'snack']
  },
  {
    id: 'food-banana',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    labels: {
      english: 'Banana',
      hindi: 'केला',
      regional: 'வாழைப்பழம்'
    },
    category: 'food',
    tags: ['fruit', 'yellow', 'healthy', 'snack']
  },
  {
    id: 'food-mango',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
    labels: {
      english: 'Mango',
      hindi: 'आम',
      regional: 'மாம்பழம்'
    },
    category: 'food',
    tags: ['fruit', 'sweet', 'summer', 'indian']
  },
  {
    id: 'food-milk',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    labels: {
      english: 'Milk',
      hindi: 'दूध',
      regional: 'பால்'
    },
    category: 'food',
    tags: ['drink', 'white', 'healthy', 'dairy']
  },
  {
    id: 'food-water',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
    labels: {
      english: 'Water',
      hindi: 'पानी',
      regional: 'தண்ணீர்'
    },
    category: 'food',
    tags: ['drink', 'thirsty', 'glass', 'healthy']
  },
  {
    id: 'food-bread',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    labels: {
      english: 'Bread',
      hindi: 'ब्रेड',
      regional: 'ரொட்டி'
    },
    category: 'food',
    tags: ['breakfast', 'toast', 'sandwich', 'food']
  },
  {
    id: 'food-egg',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    labels: {
      english: 'Egg',
      hindi: 'अंडा',
      regional: 'முட்டை'
    },
    category: 'food',
    tags: ['breakfast', 'protein', 'white', 'food']
  },

  // More Emotions
  {
    id: 'emotion-love',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
    labels: {
      english: 'Love',
      hindi: 'प्यार',
      regional: 'அன்பு'
    },
    category: 'emotion',
    tags: ['heart', 'care', 'like', 'feeling']
  },
  {
    id: 'emotion-tired',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
    labels: {
      english: 'Tired',
      hindi: 'थका हुआ',
      regional: 'சோர்வு'
    },
    category: 'emotion',
    tags: ['sleepy', 'rest', 'exhausted', 'feeling']
  },
  {
    id: 'emotion-sick',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
    labels: {
      english: 'Sick',
      hindi: 'बीमार',
      regional: 'நோய்'
    },
    category: 'emotion',
    tags: ['ill', 'unwell', 'doctor', 'feeling']
  },
  {
    id: 'emotion-pain',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    labels: {
      english: 'Pain',
      hindi: 'दर्द',
      regional: 'வலி'
    },
    category: 'emotion',
    tags: ['hurt', 'ache', 'ouch', 'feeling']
  },

  // Objects
  {
    id: 'object-ball',
    imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400',
    labels: {
      english: 'Ball',
      hindi: 'गेंद',
      regional: 'பந்து'
    },
    category: 'object',
    tags: ['toy', 'play', 'round', 'game']
  },
  {
    id: 'object-book',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    labels: {
      english: 'Book',
      hindi: 'किताब',
      regional: 'புத்தகம்'
    },
    category: 'object',
    tags: ['read', 'story', 'learn', 'pages']
  },
  {
    id: 'object-pencil',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    labels: {
      english: 'Pencil',
      hindi: 'पेंसिल',
      regional: 'பென்சில்'
    },
    category: 'object',
    tags: ['write', 'draw', 'school', 'tool']
  },
  {
    id: 'object-bag',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    labels: {
      english: 'Bag',
      hindi: 'बैग',
      regional: 'பை'
    },
    category: 'object',
    tags: ['school', 'carry', 'backpack', 'item']
  },
  {
    id: 'object-phone',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    labels: {
      english: 'Phone',
      hindi: 'फ़ोन',
      regional: 'தொலைபேசி'
    },
    category: 'object',
    tags: ['mobile', 'call', 'talk', 'device']
  },
  {
    id: 'object-tv',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    labels: {
      english: 'TV',
      hindi: 'टीवी',
      regional: 'தொலைக்காட்சி'
    },
    category: 'object',
    tags: ['television', 'watch', 'screen', 'show']
  },
  {
    id: 'object-toy',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',
    labels: {
      english: 'Toy',
      hindi: 'खिलौना',
      regional: 'பொம்மை'
    },
    category: 'object',
    tags: ['play', 'fun', 'game', 'child']
  },
  {
    id: 'object-chair',
    imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
    labels: {
      english: 'Chair',
      hindi: 'कुर्सी',
      regional: 'நாற்காலி'
    },
    category: 'object',
    tags: ['sit', 'furniture', 'seat', 'table']
  },
  {
    id: 'object-bed',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
    labels: {
      english: 'Bed',
      hindi: 'बिस्तर',
      regional: 'படுக்கை'
    },
    category: 'object',
    tags: ['sleep', 'rest', 'night', 'furniture']
  },
  {
    id: 'object-door',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    labels: {
      english: 'Door',
      hindi: 'दरवाज़ा',
      regional: 'கதவு'
    },
    category: 'object',
    tags: ['open', 'close', 'enter', 'exit']
  },
  {
    id: 'object-window',
    imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400',
    labels: {
      english: 'Window',
      hindi: 'खिड़की',
      regional: 'ஜன்னல்'
    },
    category: 'object',
    tags: ['glass', 'look', 'outside', 'light']
  },

  // Weather
  {
    id: 'weather-sun',
    imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400',
    labels: {
      english: 'Sun',
      hindi: 'सूरज',
      regional: 'சூரியன்'
    },
    category: 'weather',
    tags: ['sunny', 'bright', 'hot', 'day']
  },
  {
    id: 'weather-rain',
    imageUrl: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=400',
    labels: {
      english: 'Rain',
      hindi: 'बारिश',
      regional: 'மழை'
    },
    category: 'weather',
    tags: ['water', 'wet', 'umbrella', 'monsoon']
  },
  {
    id: 'weather-cloud',
    imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400',
    labels: {
      english: 'Cloud',
      hindi: 'बादल',
      regional: 'மேகம்'
    },
    category: 'weather',
    tags: ['sky', 'white', 'fluffy', 'weather']
  },
  {
    id: 'weather-wind',
    imageUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400',
    labels: {
      english: 'Wind',
      hindi: 'हवा',
      regional: 'காற்று'
    },
    category: 'weather',
    tags: ['air', 'breeze', 'blow', 'weather']
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
    place: [],
    body: [],
    family: [],
    animal: [],
    color: [],
    number: [],
    weather: []
  };

  symbolLibrary.forEach(symbol => {
    if (!categories[symbol.category]) {
      categories[symbol.category] = [];
    }
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
