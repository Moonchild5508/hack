# Task: Build Therapy Activity Authoring Platform

## Plan

### Phase 1: Design System & Core Setup
- [x] 1.1 Update design system (index.css) with therapy-friendly colors (soft blue #4A90E2, warm orange #F5A623)
- [x] 1.2 Update tailwind.config.js with custom design tokens
- [x] 1.3 Create type definitions for activities, symbols, AAC boards, and visual schedules

### Phase 2: Symbol Library & Content
- [x] 2.1 Create Indian symbol library data structure
- [x] 2.2 Search and integrate Indian-context images (food, transport, festivals, routines)
- [x] 2.3 Create SymbolLibrary component with search and filter functionality

### Phase 3: Activity Builder (Core Feature)
- [x] 3.1 Create ActivityBuilder page with drag-and-drop interface
- [x] 3.2 Implement draggable symbol/element components
- [x] 3.3 Create drop zones for activity canvas
- [x] 3.4 Implement activity templates (matching, sorting, choice selection)
- [x] 3.5 Add multilingual label system (English, Hindi, Regional)
- [x] 3.6 Create language toggle controls

### Phase 4: AAC Board Builder
- [x] 4.1 Create AACBoardBuilder component
- [x] 4.2 Implement grid layout options (2×2, 3×3, 4×4)
- [x] 4.3 Add cell configuration (symbol, text, audio)
- [x] 4.4 Integrate Web Speech API for TTS functionality
- [x] 4.5 Create interactive AAC board preview

### Phase 5: Visual Schedule Creator
- [x] 5.1 Create VisualScheduleBuilder component
- [x] 5.2 Implement step-by-step routine builder
- [x] 5.3 Add sequential activity flow interface
- [x] 5.4 Create mobile-optimized viewer
- [x] 5.5 Implement tap-to-advance functionality

### Phase 6: Export & Sharing
- [x] 6.1 Install and configure jsPDF for PDF export
- [x] 6.2 Implement PDF export functionality
- [x] 6.3 Implement PNG export using html2canvas
- [x] 6.4 Create shareable link generation system
- [x] 6.5 Build parent-friendly viewer page (no-login, simple UI)
- [x] 6.6 Add WhatsApp sharing integration

### Phase 7: Home Page & Navigation
- [x] 7.1 Create home page with feature cards
- [x] 7.2 Implement navigation between different tools
- [x] 7.3 Add activity library/management page
- [x] 7.4 Create routes configuration

### Phase 8: Optimization & Polish
- [x] 8.1 Implement local storage for caching
- [x] 8.2 Optimize images for low-bandwidth
- [x] 8.3 Add loading states and skeletons
- [x] 8.4 Implement offline functionality
- [x] 8.5 Add accessibility features (WCAG AA compliance)
- [x] 8.6 Test on mobile devices
- [x] 8.7 Run linting and fix issues

## Notes
- ✅ All core features implemented
- ✅ Using browser's Web Speech API for TTS
- ✅ Symbol-first design with multilingual support
- ✅ Large, tappable buttons for accessibility
- ✅ LocalStorage for offline functionality
- ✅ PDF export and shareable links working
- ✅ Parent-friendly viewers created
