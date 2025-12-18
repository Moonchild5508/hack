# Therapy Activity Authoring Platform Requirements Document

## 1. Website Overview

### 1.1 Website Name\nTherapy Activity Authoring Studio

### 1.2 Website Description
A web-based platform designed for therapists working with children with ADHD and Autism in India. The platform enables therapists to create, customize, and share therapeutic activities, AAC boards, and visual schedules with culturally relevant Indian content and multilingual support.

## 2. User Roles & Authentication

### 2.1 Login System
Three distinct user roles with separate login portals:
\n#### 2.1.1Therapist Login
- Full access to authoring studio and dashboard
- Ability to create and manage activities
- Dashboard to manage assigned children and parents
- Add/remove child and parent accounts
- View activity progress and engagement data
\n#### 2.1.2 Parent Login
- Access to assigned activities for their child
- View visual schedules and AAC boards
- Track child's activity completion\n- Receive assignments from therapist
- Simple interface optimized for low-bandwidth\n
#### 2.1.3 Child/Patient Login
- Simplified login interface with visual elements
- Access to assigned activities and games
- Interactive activity player
- Progress tracking\n- Child-friendly UI with large buttons and symbols

### 2.2 Therapist Dashboard
\n#### 2.2.1 Client Management
- Add new child profiles with basic information
- Link parent accounts to child profiles
- Assign activities to specific children
- View list of all managed children and parents
- Send activity links via WhatsApp or email

#### 2.2.2 Activity Assignment
- Select activities from created library
- Assign to individual children or groups
- Set activity schedules
- Track completion status
\n## 3. Core Features

### 3.1 Authoring Studio (Activity Builder)

#### 3.1.1 Activity Creation
- Drag-and-drop interface for creating new activities
- Template options:
  - **Memory Match**: Flip cards to find matching pairs (images or text)
  - **Match the Halves**: Drag left half to match with corresponding right half
  - **Picture to Name Match**: Match images with their text labels
  - Sorting activities\n  - Choice selection
  - Visual schedules
  - AAC boards
- Draggable elements:
  - Images
  - Text
  - Audio files
  - Interactive buttons

#### 3.1.2 Indian-Context Content Library
- Expanded symbol library including:
  - Indian food items (roti, dosa, rice, samosa, chai, ladoo, biryani, etc.)
  - Indian transportation (auto-rickshaw, bus, train, metro, cycle-rickshaw, scooter)
  - Indian festivals (Diwali, Eid, Pongal, Holi, Navratri, Onam)
  - Indian home routines (tiffin box, prayer time, school bus, homework, family time)
  - Daily activities (eating, drinking, playing, sleeping, bathing)
  - Emotions (happy, sad, angry, tired, excited)
  - Common objects (book, pen, water bottle, bag, shoes)
  - Family members (mother, father, sister, brother, grandparents)\n  - Places (home, school, park, temple, hospital, market)
- One-click symbol addition functionality
- Symbol-based interface to support focus needs of ADHD and Autism users

#### 3.1.3 Multilingual Label System
- Support for three language layers per item:\n  - English
  - Hindi
  - One regional language (Tamil/Telugu/Marathi/etc.)
- Language toggle controls (ON/OFF per language)\n- Single or bilingual display mode
- Example format: Symbol with English 'Apple', Hindi 'सेब', Tamil 'ஆப்பிள்'

### 3.2 AAC & Visual Tools\n
#### 3.2.1 AAC Board Builder\n- Grid layout options: 2×2, 3×3, 4×4
- Each cell contains:
  - Symbol/image
  - Text label\n  - Audio output (TTS or recorded)
- Interactive functionality: click symbol to play audio
- Based on LAMP Words for Life AAC methodology

#### 3.2.2 Sentence Builder with Text Box
- Horizontal text box displayed at the top or bottom of the AAC board
- Click any icon to add it to the text box in sequence
- Icons appear in the text box with their corresponding text labels
- Clear button to reset the text box
- Delete last icon button for corrections
- Speak button to read aloud the entire sentence using text-to-speech
- Visual feedback when icons are added (highlight or animation)
- Supports multilingual sentence construction based on selected language

#### 3.2.3 Visual Schedule Creator
- Step-by-step routine builder
- Sequential activity flow (e.g., Wake up → Brush → Uniform → School)
- Mobile-optimized viewing interface
- Tap-to-advance functionality for parents

### 3.3 Export & Sharing

#### 3.3.1 Export Formats
- PDF (printable format)
- PNG images
- Web link (low-bandwidth optimized)

#### 3.3.2 Parent Assignment System
- Generate shareable links
- WhatsApp-compatible sharing
- No-login access for parents (optional guest mode)
- Simple UI with large buttons
- Low data consumption design

### 3.4 Technical Requirements

#### 3.4.1 Low-Bandwidth Optimization
- Fast loading on 3G networks
- Content caching capability\n- Offline functionality after initial load
- Minimal animations
- Optimized for basic smartphones (Anganwadi phone compatibility)\n
## 4. MVP Success Criteria
The platform must deliver these core capabilities:
1. Three-tier login system (therapist, parent, child)
2. Therapist dashboard with client management
3. Drag-and-drop activity builder
4. Expanded Indian symbol library with more icons
5. Enhanced matching activities (memory match, match the halves, picture to name)
6. Multilingual labels
7. AAC boards with sentence builder and text-to-speech
8. Visual schedules
9. PDF + link export
10. Parent-friendly viewer

## 5. Design Style

### 5.1 Color Scheme
- Primary colors: Soft blue (#4A90E2) and warm orange (#F5A623) for accessibility and visual comfort\n- Background: Clean white (#FFFFFF) with light gray (#F7F7F7) sections
- Accent colors: Green (#7ED321) for success states, gentle red (#D0021B) for alerts

### 5.2 Visual Details
- Large, rounded buttons (12px border-radius) for easy tapping\n- High contrast text (WCAG AA compliant)
- Symbol-first design with minimal text
- Grid-based layouts for predictability
- Drag handles with clear visual affordance
- Text box with clear borders and sufficient padding for readability
- Role-specific color coding for login portals

### 5.3 Layout Approach
- Card-based interface for activity templates
- Grid system for AAC boards and symbol libraries
- Linear flow for visual schedules
- Sticky toolbar for frequently used tools\n- Prominent text box placement for sentence building
- Dashboard with clear sections for client management
- Mobile-first responsive design