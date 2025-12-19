# PDF Upload Guide - Resource Marketplace

## Overview
The Resource Marketplace now supports **PDF file uploads** along with other file types (images, documents). This allows therapists to share comprehensive therapy materials, worksheets, guides, and educational resources with the community.

## Supported File Types

### Primary Formats
- **PDF Documents** (.pdf) - Recommended for therapy guides, worksheets, manuals
- **JPEG Images** (.jpg, .jpeg) - For visual resources, photos
- **PNG Images** (.png) - For graphics, diagrams, illustrations
- **GIF Images** (.gif) - For animated visuals

### File Size Limit
- **Maximum file size**: 10 MB per file
- Files larger than 10MB will be rejected with an error message
- Compress large PDFs before uploading if needed

## How to Upload a PDF Resource

### Step 1: Navigate to Upload Page
1. Login to your account
2. Go to **Marketplace** (top navigation or home page card)
3. Click **"Upload Resource"** button (top right of marketplace page)
4. Or navigate directly to `/marketplace/upload`

### Step 2: Fill in Resource Information

#### Required Fields
**Title** (Required)
- Enter a descriptive title for your resource
- Example: "Social Skills Workbook for Children with Autism"
- Auto-fills from filename when you select a file

**Resource Type** (Required)
- Select the appropriate type:
  - AAC Board
  - Visual Schedule
  - Matching Activity
  - Sorting Activity
  - Custom Activity (recommended for PDF documents)

#### Optional Fields
**Description**
- Provide a detailed description of your resource
- Explain what it contains, how to use it, and who it's for
- Example: "A comprehensive 20-page workbook covering turn-taking, sharing, and conversation skills for children aged 5-10 with autism spectrum disorder."

**Category**
- Select a category that best fits your resource:
  - AAC Boards
  - Visual Schedules
  - Matching Activities
  - Sorting Activities
  - Emotion Recognition
  - Social Stories
  - Sensory Activities
  - Fine Motor Skills
  - Language Development
  - Behavior Management

**Price**
- Set to **0** for free resources (recommended for community sharing)
- Enter amount in ₹ (Indian Rupees) for paid resources
- Paid resources require payment before download

**Preview Image URL**
- Optional: Provide a URL to a cover image or preview
- Helps users identify your resource visually
- Can use image hosting services or direct URLs

**Additional Resource Data**
- Optional: Add metadata in JSON format
- Example: `{"pages": 20, "age_range": "5-10 years", "difficulty": "intermediate"}`

### Step 3: Upload Your PDF File

1. Click **"Choose File"** button in the "Upload File" section
2. Select your PDF file from your computer
3. File information will appear:
   - File name
   - File size in MB
4. The title field will auto-fill with the filename (if empty)

**File Validation**:
- ✅ File size under 10MB
- ✅ File type is PDF, JPEG, PNG, or GIF
- ❌ Files over 10MB will be rejected
- ❌ Unsupported file types will be rejected

### Step 4: Submit

1. Review all information
2. Click **"Upload Resource"** button
3. Wait for upload to complete:
   - "Uploading File..." - File is being uploaded to storage
   - "Creating Resource..." - Resource entry is being created
4. Success! You'll be redirected to the resource detail page

## After Upload

### What Happens Next
1. **File Storage**: Your PDF is securely stored in Supabase Storage
2. **Public URL**: A public URL is generated for downloads
3. **Resource Created**: Resource entry is created in the database
4. **Immediate Availability**: Your resource is immediately visible in the marketplace

### Managing Your Uploads
- Go to **"My Resources"** page (navigation bar or profile menu)
- Click **"Uploaded"** tab to see your resources
- **Edit**: Update title, description, price, etc.
- **Delete**: Remove resource and associated file
- **View Stats**: See download counts and ratings

## Downloading PDF Resources

### For Resource Creators
- You automatically have access to your own resources
- Click **"Download File"** button on resource detail page
- PDF opens in a new browser tab

### For Other Users

#### Free Resources
1. Navigate to resource detail page
2. Click **"Download Free"** button
3. Resource is added to your library
4. PDF automatically opens in new tab
5. Access anytime from **"My Resources"** → **"Downloaded"** tab

#### Paid Resources
1. Navigate to resource detail page
2. Click **"Purchase for ₹X"** button
3. Payment is processed (simulated in current version)
4. Resource is added to your library
5. PDF automatically opens in new tab
6. Access anytime from **"My Resources"** → **"Downloaded"** tab

### Re-downloading
- Once you have access, you can re-download anytime
- Go to resource detail page
- Click **"Download File"** button
- No additional charge for re-downloads

## File Information Display

### On Resource Detail Page
Resources with uploaded files show:
- **File Type Badge**: "PDF", "Image", or "File"
- **Download Button**: Direct download access for users with access
- **File Metadata**: Stored in resource data

### On Resource Cards
- Preview image (if provided)
- Title and description
- Type and category badges
- Price and rating information

## Best Practices

### Creating Quality PDF Resources

#### Content Guidelines
1. **Clear Title**: Use descriptive, searchable titles
2. **Detailed Description**: Explain contents, usage, and target audience
3. **Appropriate Category**: Choose the most relevant category
4. **Preview Image**: Add a cover image or first page preview
5. **Metadata**: Include age range, difficulty level, page count

#### PDF Preparation
1. **Optimize File Size**: Compress PDFs to stay under 10MB
2. **High Quality**: Ensure text is readable and images are clear
3. **Accessibility**: Use proper headings and structure
4. **Page Numbers**: Include page numbers for multi-page documents
5. **Copyright**: Only upload original content or content you have rights to share

#### Pricing Strategy
1. **Free for Community**: Consider making resources free to build community
2. **Fair Pricing**: If charging, price appropriately for content value
3. **Bundle Discounts**: Create resource collections
4. **Trial Versions**: Offer free samples of paid resources

### File Organization
1. **Consistent Naming**: Use clear, descriptive filenames
2. **Version Control**: Include version numbers if updating
3. **Series Naming**: Use consistent naming for resource series
4. **Date Stamps**: Include creation/update dates in metadata

## Technical Details

### Storage Architecture
- **Storage Bucket**: `resource_files`
- **Folder Structure**: `{user_id}/{timestamp}.{extension}`
- **Public Access**: Files are publicly accessible via URL
- **Security**: Upload restricted to authenticated users

### File Upload Process
1. Client-side validation (size, type)
2. File upload to Supabase Storage
3. Public URL generation
4. Resource entry creation with file URL
5. Metadata storage in `file_data` JSONB field

### Database Schema
```json
{
  "file_data": {
    "file_url": "https://storage.supabase.co/...",
    "file_name": "original_filename.pdf",
    "file_type": "application/pdf",
    "additional_metadata": "..."
  }
}
```

## Troubleshooting

### Upload Errors

**"File Too Large"**
- Solution: Compress your PDF to under 10MB
- Tools: Adobe Acrobat, online PDF compressors
- Alternative: Split into multiple resources

**"Invalid File Type"**
- Solution: Ensure file is PDF, JPEG, PNG, or GIF
- Check file extension is correct
- Re-save file in supported format

**"Upload Failed"**
- Solution: Check internet connection
- Try again after a few moments
- Clear browser cache
- Try different browser

**"Authentication Required"**
- Solution: Login to your account
- Refresh the page
- Check session hasn't expired

### Download Issues

**"Download File" button disabled**
- Cause: No file attached to resource
- Solution: Edit resource and upload a file

**PDF doesn't open**
- Solution: Check popup blocker settings
- Try right-click → "Open in new tab"
- Check browser PDF viewer settings

**"Already Downloaded" but can't access file**
- Solution: Go to "My Resources" → "Downloaded"
- Click resource to view details
- Click "Download File" button

## Examples of Good PDF Resources

### Therapy Workbooks
- **Title**: "Emotion Regulation Workbook - 25 Activities"
- **Description**: "Comprehensive workbook with 25 activities for teaching emotion regulation to children with ADHD. Includes worksheets, visual aids, and parent guides."
- **Category**: Emotion Recognition
- **Price**: Free or ₹50-100

### Visual Schedules
- **Title**: "Morning Routine Visual Schedule - Printable"
- **Description**: "Printable visual schedule for morning routines. Includes 8 steps with colorful illustrations. Print on A4 paper and laminate for durability."
- **Category**: Visual Schedules
- **Price**: Free

### Social Stories
- **Title**: "Going to the Doctor - Social Story"
- **Description**: "5-page social story preparing children for doctor visits. Simple language, clear illustrations, and step-by-step guidance."
- **Category**: Social Stories
- **Price**: Free

### Activity Guides
- **Title**: "Sensory Break Activities - Complete Guide"
- **Description**: "30-page guide with 50 sensory break activities. Includes instructions, materials needed, and adaptation suggestions for different needs."
- **Category**: Sensory Activities
- **Price**: ₹100

## Community Guidelines

### What to Upload
✅ Original therapy resources you created
✅ Resources you have permission to share
✅ Educational materials for therapy use
✅ Worksheets, guides, and activity instructions
✅ Visual aids and communication tools

### What NOT to Upload
❌ Copyrighted materials without permission
❌ Pirated books or commercial resources
❌ Personal information or private data
❌ Inappropriate or offensive content
❌ Malware or harmful files

## Support

### Need Help?
- Check this guide for common questions
- Review the Marketplace Guide (MARKETPLACE_GUIDE.md)
- Contact support through the platform
- Report issues or bugs to administrators

### Feature Requests
- Suggest new file types to support
- Request higher file size limits
- Propose new categories or features
- Share feedback on upload process

---

**Happy Uploading! Share your expertise and help build a comprehensive library of therapy resources for children with ADHD and Autism in India.** 🎉
