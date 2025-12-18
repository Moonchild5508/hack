# Grid Size Selection and Icon Search Features

## Overview
The Therapy Activity Authoring Studio now includes enhanced features for therapists to create more flexible AAC boards and easily find symbols.

## New Features

### 1. Custom Grid Size Selection (nxn)

#### What It Does
Therapists can now create AAC boards with custom grid sizes beyond the standard 2×2, 3×3, and 4×4 options. You can create any grid size from 1×1 up to 10×10.

#### Where to Find It
- **Location**: AAC Board Builder page
- **Path**: `/aac-builder`
- **Access**: Click "Create AAC Board" from the home page

#### How to Use

**Standard Grid Sizes:**
1. Open the AAC Board Builder
2. In the "Board Settings" panel on the left
3. Click the "Grid Size" dropdown
4. Select from:
   - 2×2 (4 cells)
   - 3×3 (9 cells)
   - 4×4 (16 cells)
   - Custom Size

**Custom Grid Sizes:**
1. Select "Custom Size" from the Grid Size dropdown
2. A dialog will appear asking for:
   - Number of Rows (1-10)
   - Number of Columns (1-10)
3. Enter your desired dimensions
4. See a preview: "Preview: 5×6 grid with 30 cells"
5. Click "Apply Grid" to create the custom board

**Examples:**
- **5×3 grid**: Perfect for a weekly schedule (5 days × 3 activities)
- **6×4 grid**: Great for larger vocabulary boards (24 cells)
- **2×5 grid**: Ideal for sentence builders (2 rows of 5 words)
- **8×8 grid**: Advanced communication board (64 cells)

#### Benefits
- **Flexibility**: Create boards that match your specific therapy needs
- **Scalability**: Start small (2×2) and grow to larger boards (10×10)
- **Customization**: Design boards for different skill levels
- **Efficiency**: No wasted cells - create exactly what you need

#### Technical Details
- Maximum grid size: 10×10 (100 cells)
- Minimum grid size: 1×1 (1 cell)
- Grid dimensions are saved with the board
- Custom grids work with all export features (PDF, PNG, Share link)

---

### 2. Enhanced Icon Search

#### What It Does
Therapists can quickly search through the entire symbol library to find specific icons without browsing through categories.

#### Where to Find It
- **Location**: Symbol Picker dialog
- **Appears**: When you click on any cell in AAC Board Builder, Matching Activity Builder, or Visual Schedule Creator
- **Access**: Click "Add Symbol" or click on an empty cell

#### How to Use

**Basic Search:**
1. Click on a cell to open the Symbol Picker
2. You'll see a search box at the top with placeholder text:
   - "Search symbols by name (e.g., 'apple', 'bus', 'diwali')..."
3. Type any part of a symbol name
4. Results appear instantly as you type
5. See the count: "Found 5 symbols matching 'food'"

**Search Tips:**
- **English names**: Search in English (e.g., "apple", "train", "happy")
- **Hindi names**: Search in Hindi (e.g., "सेब", "ट्रेन")
- **Regional names**: Search in Tamil, Telugu, Marathi, etc.
- **Partial matches**: Type "bus" to find "school bus", "city bus", etc.
- **Categories**: Type "food" to see all food items
- **Festivals**: Type "diwali", "eid", "pongal", etc.

**Search Examples:**
- Search "roti" → Finds all roti-related symbols
- Search "auto" → Finds auto-rickshaw symbols
- Search "happy" → Finds happy emotion symbols
- Search "school" → Finds school-related symbols
- Search "dosa" → Finds dosa food symbols

#### Features
- **Auto-focus**: Search box is automatically focused when dialog opens
- **Real-time results**: See results as you type
- **Result count**: Shows how many symbols match your search
- **Clear feedback**: "No symbols found" if search has no matches
- **Category fallback**: Can still browse by category if preferred

#### Benefits
- **Speed**: Find symbols in seconds instead of browsing
- **Accuracy**: Search by exact name to find the right symbol
- **Multilingual**: Search in English, Hindi, or regional languages
- **Efficiency**: No need to remember which category a symbol is in
- **Discovery**: Find related symbols you didn't know existed

---

## Use Cases

### Use Case 1: Creating a Weekly Schedule Board
**Scenario**: A therapist wants to create a visual schedule for a child's weekly routine.

**Steps:**
1. Open AAC Board Builder
2. Select "Custom Size" from Grid Size
3. Enter 7 rows (days) × 4 columns (activities)
4. Click "Apply Grid"
5. For each cell, click and search:
   - Search "school" → Add school symbol
   - Search "lunch" → Add lunch symbol
   - Search "play" → Add play symbol
   - Search "sleep" → Add sleep symbol
6. Label each cell with the day and activity
7. Save and share with parents

**Result**: A 7×4 grid (28 cells) showing the entire week's schedule.

---

### Use Case 2: Finding Indian Cultural Symbols Quickly
**Scenario**: A therapist needs to create a festival-themed AAC board.

**Steps:**
1. Open AAC Board Builder
2. Select 3×3 grid
3. Click on first cell
4. Search "diwali" → Select diya symbol
5. Click on second cell
6. Search "rangoli" → Select rangoli symbol
7. Click on third cell
8. Search "fireworks" → Select fireworks symbol
9. Continue with "sweets", "gifts", etc.

**Result**: Quickly assembled a festival board without browsing multiple categories.

---

### Use Case 3: Creating a Large Vocabulary Board
**Scenario**: A therapist wants to create a comprehensive communication board for an advanced student.

**Steps:**
1. Open AAC Board Builder
2. Select "Custom Size"
3. Enter 8 rows × 8 columns (64 cells)
4. Click "Apply Grid"
5. Use search to quickly populate:
   - Search "food" → Add multiple food items
   - Search "action" → Add action verbs
   - Search "emotion" → Add feelings
   - Search "place" → Add locations
6. Organize by category in different sections of the grid
7. Export as PDF for printing

**Result**: A large 8×8 board with 64 communication symbols, organized by category.

---

## Technical Implementation

### Grid Size System

**Data Structure:**
```typescript
interface AACBoard {
  id: string;
  name: string;
  gridSize: '2x2' | '3x3' | '4x4' | 'custom';
  customRows?: number;  // Only for custom grids
  customCols?: number;  // Only for custom grids
  cells: AACCell[];
  createdAt: string;
  updatedAt: string;
}
```

**Grid Rendering:**
- Standard grids use Tailwind CSS classes: `grid-cols-2`, `grid-cols-3`, `grid-cols-4`
- Custom grids use inline styles: `gridTemplateColumns: repeat(n, minmax(0, 1fr))`
- Responsive design maintains aspect ratios on all screen sizes

**Validation:**
- Minimum: 1×1 (1 cell)
- Maximum: 10×10 (100 cells)
- Input validation prevents invalid values
- Toast notifications for errors

---

### Search System

**Search Algorithm:**
```typescript
// Searches across all language labels
function searchSymbols(query: string): Symbol[] {
  const lowerQuery = query.toLowerCase();
  return symbolLibrary.filter(symbol =>
    symbol.labels.english.toLowerCase().includes(lowerQuery) ||
    symbol.labels.hindi.includes(query) ||
    symbol.labels.regional.includes(query) ||
    symbol.category.toLowerCase().includes(lowerQuery)
  );
}
```

**Features:**
- Case-insensitive search
- Searches English, Hindi, and regional labels
- Searches category names
- Partial matching (substring search)
- Real-time filtering as user types

**Performance:**
- Instant results (no debouncing needed)
- Efficient filtering on ~100+ symbols
- No server calls required (client-side search)

---

## Best Practices

### For Therapists

**Grid Size Selection:**
1. **Start Small**: Begin with 2×2 or 3×3 for new learners
2. **Progress Gradually**: Increase grid size as child's skills improve
3. **Match Needs**: Choose grid size based on vocabulary needs
4. **Consider Motor Skills**: Larger cells (smaller grids) for children with motor challenges
5. **Think Ahead**: Plan for growth - you can always create a new larger board

**Icon Search:**
1. **Be Specific**: Search for exact names when you know them
2. **Use Categories**: Search category names to see all related symbols
3. **Try Variations**: If "bus" doesn't work, try "transport"
4. **Multilingual**: Use the language the child is most familiar with
5. **Browse When Exploring**: Use category tabs when you're not sure what you need

### For Parents

**Using Custom Boards:**
- Custom grid boards work exactly like standard boards
- All cells are clickable and speak when tapped
- Export and share features work the same way
- Print quality is maintained regardless of grid size

**Viewing on Mobile:**
- Larger grids (6×6+) may require scrolling on small phones
- Landscape orientation recommended for large grids
- Pinch to zoom works on all boards
- Cells remain tappable at all sizes

---

## Troubleshooting

### Grid Size Issues

**Problem**: "Grid size must be between 1×1 and 10×10" error
**Solution**: Enter valid numbers between 1 and 10 for both rows and columns

**Problem**: Custom grid looks too small/large
**Solution**: 
- Adjust your browser zoom (Ctrl/Cmd + or -)
- Try a different grid size
- Export as PDF and print at desired size

**Problem**: Can't see all cells on screen
**Solution**:
- Scroll down to see more cells
- Use a larger screen or landscape orientation
- Consider using a smaller grid size

### Search Issues

**Problem**: "No symbols found" when searching
**Solution**:
- Check spelling
- Try searching in a different language
- Try a more general term (e.g., "food" instead of "biryani")
- Browse categories instead

**Problem**: Too many results
**Solution**:
- Be more specific in your search
- Add more letters to narrow results
- Use category tabs to filter

**Problem**: Can't find a specific Indian symbol
**Solution**:
- Try searching in Hindi or regional language
- Search the category name (e.g., "festival", "food")
- Browse the relevant category tab
- Check if the symbol exists in the library

---

## Future Enhancements

### Planned Features
1. **Save Grid Templates**: Save favorite grid sizes as templates
2. **Grid Presets**: Pre-made grids for common use cases
3. **Asymmetric Grids**: Different cell sizes in the same grid
4. **Advanced Search**: Filter by category, language, or recently used
5. **Search History**: Remember recent searches
6. **Favorite Symbols**: Mark frequently used symbols
7. **Custom Symbol Upload**: Add your own symbols to the library

### Feedback
We welcome feedback on these features! Please share:
- What grid sizes you use most
- What symbols you search for frequently
- Any difficulties you encounter
- Suggestions for improvements

---

## Summary

### Grid Size Selection
✅ Create custom grids from 1×1 to 10×10
✅ Standard sizes: 2×2, 3×3, 4×4
✅ Visual preview before applying
✅ Saved with board for future editing
✅ Works with all export formats

### Icon Search
✅ Search by name in any language
✅ Real-time results as you type
✅ Result count displayed
✅ Auto-focus for quick access
✅ Category browsing still available

### Benefits
- **Flexibility**: Create boards that match your exact needs
- **Speed**: Find symbols in seconds
- **Efficiency**: No wasted time browsing categories
- **Scalability**: Grow boards as skills improve
- **Accessibility**: Multilingual search support

---

## Quick Reference

### Keyboard Shortcuts
- **Tab**: Navigate between grid size inputs
- **Enter**: Apply custom grid size
- **Escape**: Close dialogs
- **Type to search**: Auto-focus in symbol picker

### Grid Size Recommendations
- **Beginner (2-3 years)**: 2×2 (4 cells)
- **Early Learner (3-5 years)**: 3×3 (9 cells)
- **Intermediate (5-7 years)**: 4×4 (16 cells)
- **Advanced (7+ years)**: 5×5 to 8×8 (25-64 cells)
- **Custom Needs**: Any size 1×1 to 10×10

### Common Search Terms
- **Food**: roti, dosa, rice, dal, sabzi, fruit
- **Transport**: auto, bus, train, car, cycle
- **Emotions**: happy, sad, angry, scared, excited
- **Actions**: eat, drink, play, sleep, study
- **Places**: home, school, park, temple, hospital
- **Festivals**: diwali, holi, eid, christmas, pongal

---

## Support

For questions or issues with these features:
1. Check this documentation first
2. Review the troubleshooting section
3. Try the examples provided
4. Contact your system administrator
5. Provide specific details about the issue

**Remember**: These features are designed to make therapy more effective and efficient. Experiment with different grid sizes and search strategies to find what works best for each child!
