# Therapy Activity Authoring Platform Requirements Document

## 1. Website Overview

### 1.1 Website Name\nTherapy Activity Authoring Studio

### 1.2 Website Description
A web-based platform designed for therapists working with children with ADHD and Autism in India. The platform enables therapists to create, customize, and share therapeutic activities, AAC boards, and visual schedules with culturally relevant Indian content and multilingual support.

## 2. Core Features
\n### 2.1 Authoring Studio (Activity Builder)

#### 2.1.1 Activity Creation
- Drag-and-drop interface for creating new activities
- Template options:\n  - Matching activities
  - Sorting activities
  - Choice selection
  - Visual schedules
  - AAC boards
- Draggable elements:
  - Images
  - Text
  - Audio files
  - Interactive buttons\n
#### 2.1.2 Indian-Context Content Library
- Expanded symbol library including:
  - Indian food items (roti, dosa, rice, samosa, chai, ladoo, biryani, etc.)
  - Indian transportation (auto-rickshaw, bus, train, metro, cycle-rickshaw, scooter)
  - Indian festivals (Diwali, Eid, Pongal, Holi, Navratri, Onam)\n  - Indian home routines (tiffin box, prayer time, school bus, homework, family time)
  - Daily activities (eating, drinking, playing, sleeping, bathing)
  - Emotions (happy, sad, angry, tired, excited)\n  - Common objects (book, pen, water bottle, bag, shoes)\n  - Family members (mother, father, sister, brother, grandparents)
  - Places (home, school, park, temple, hospital, market)
- One-click symbol addition functionality
- Symbol-based interface to support focus needs of ADHD and Autism users

#### 2.1.3 Multilingual Label System
- Support for three language layers per item:
  - English
  - Hindi
  - One regional language (Tamil/Telugu/Marathi/etc.)\n- Language toggle controls (ON/OFF per language)
- Single or bilingual display mode
- Example format: Symbol with English 'Apple', Hindi 'सेब', Tamil 'ஆப்பிள்'

### 2.2 AAC & Visual Tools

#### 2.2.1 AAC Board Builder
- Grid layout options: 2×2, 3×3, 4×4
- Each cell contains:
  - Symbol/image
  - Text label
  - Audio output (TTS or recorded)
- Interactive functionality: click symbol to play audio
- Based on LAMP Words for Life AAC methodology

#### 2.2.2 Sentence Builder with Text Box
- Horizontal text box displayed at the top or bottom of the AAC board
- Click any icon to add it to the text box in sequence
- Icons appear in the text box with their corresponding text labels
- Clear button to reset the text box
- Delete last icon button for corrections
- Speak button to read aloud the entire sentence using text-to-speech
- Visual feedback when icons are added (highlight or animation)
- Supports multilingual sentence construction based on selected language

#### 2.2.3 Visual Schedule Creator
- Step-by-step routine builder
- Sequential activity flow (e.g., Wake up → Brush → Uniform → School)
- Mobile-optimized viewing interface
- Tap-to-advance functionality for parents

### 2.3 Export & Sharing

#### 2.3.1 Export Formats
- PDF (printable format)
- PNG images
- Web link (low-bandwidth optimized)

#### 2.3.2 Parent Assignment System
- Generate shareable links
- WhatsApp-compatible sharing
- No-login access for parents
- Simple UI with large buttons
- Low data consumption design

### 2.4 Technical Requirements

#### 2.4.1 Low-Bandwidth Optimization
- Fast loading on 3G networks
- Content caching capability
- Offline functionality after initial load
- Minimal animations
- Optimized for basic smartphones (Anganwadi phone compatibility)

## 3. MVP Success Criteria
The platform must deliver these core capabilities:
1. Drag-and-drop activity builder
2. Expanded Indian symbol library with more icons
3. Multilingual labels
4. AAC boards with sentence builder and text-to-speech
5. Visual schedules\n6. PDF + link export\n7. Parent-friendly viewer\n
## 4. Design Style

### 4.1 Color Scheme
- Primary colors: Soft blue (#4A90E2) and warm orange (#F5A623) for accessibility and visual comfort
- Background: Clean white (#FFFFFF) with light gray (#F7F7F7) sections
- Accent colors: Green (#7ED321) for success states, gentle red (#D0021B) for alerts

### 4.2 Visual Details
- Large, rounded buttons (12px border-radius) for easy tapping
- High contrast text (WCAG AA compliant)
- Symbol-first design with minimal text
- Grid-based layouts for predictability
- Drag handles with clear visual affordance
- Text box with clear borders and sufficient padding for readability

### 4.3 Layout Approach\n- Card-based interface for activity templates
- Grid system for AAC boards and symbol libraries
- Linear flow for visual schedules
- Sticky toolbar for frequently used tools
- Prominent text box placement for sentence building
- Mobile-first responsive design