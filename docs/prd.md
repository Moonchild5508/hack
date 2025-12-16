# Therapy Activity Authoring Platform Requirements Document

## 1. Website Overview

### 1.1 Website Name
Therapy Activity Authoring Studio\n
### 1.2 Website Description
A web-based platform designed for therapists working with children with ADHD and Autism in India. The platform enables therapists to create, customize, and share therapeutic activities, AAC boards, and visual schedules with culturally relevant Indian content and multilingual support.

## 2. Core Features
\n### 2.1 Authoring Studio (Activity Builder)
\n#### 2.1.1 Activity Creation
- Drag-and-drop interface for creating new activities
- Template options:\n  - Matching activities
  - Sorting activities\n  - Choice selection
  - Visual schedules
  - AAC boards
- Draggable elements:
  - Images
  - Text
  - Audio files
  - Interactive buttons

#### 2.1.2 Indian-Context Content Library
- Pre-loaded symbol library including:
  - Indian food items (roti, dosa, rice, etc.)
  - Indian transportation (auto-rickshaw, bus, train)
  - Indian festivals (Diwali, Eid, Pongal)
  - Indian home routines (tiffin box, prayer time, school bus)
- One-click symbol addition functionality
- Symbol-based interface to support focus needs of ADHD and Autism users

#### 2.1.3 Multilingual Label System
- Support for three language layers per item:
  - English
  - Hindi
  - One regional language (Tamil/Telugu/Marathi/etc.)
- Language toggle controls (ON/OFF per language)
- Single or bilingual display mode
- Example format: Symbol with English 'Apple', Hindi 'सेब', Tamil 'ஆப்பிள்'\n
### 2.2 AAC & Visual Tools

#### 2.2.1 AAC Board Builder
- Grid layout options: 2×2, 3×3, 4×4
- Each cell contains:
  - Symbol/image
  - Text label
  - Audio output (TTS or recorded)
- Interactive functionality: click symbol to play audio
- Based on LAMP Words for Life AAC methodology

#### 2.2.2 Visual Schedule Creator\n- Step-by-step routine builder
- Sequential activity flow (e.g., Wake up → Brush → Uniform → School)
- Mobile-optimized viewing interface
- Tap-to-advance functionality for parents

### 2.3 Export & Sharing

#### 2.3.1 Export Formats
- PDF (printable format)
- PNG images
- Web link (low-bandwidth optimized)
\n#### 2.3.2 Parent Assignment System
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
The platform must deliver these7 core capabilities:
1. Drag-and-drop activity builder\n2. Indian symbol library
3. Multilingual labels
4. AAC boards
5. Visual schedules
6. PDF + link export
7. Parent-friendly viewer

## 4. Design Style\n
### 4.1 Color Scheme
- Primary colors: Soft blue (#4A90E2) and warm orange (#F5A623) for accessibility and visual comfort
- Background: Clean white (#FFFFFF) with light gray (#F7F7F7) sections
- Accent colors: Green (#7ED321) for success states, gentle red (#D0021B) for alerts

### 4.2 Visual Details
- Large, rounded buttons (12px border-radius) for easy tapping
- High contrast text (WCAG AA compliant)\n- Symbol-first design with minimal text
- Grid-based layouts for predictability
- Drag handles with clear visual affordance

### 4.3 Layout Approach
- Card-based interface for activity templates
- Grid system for AAC boards and symbol libraries
- Linear flow for visual schedules
- Sticky toolbar for frequently used tools
- Mobile-first responsive design