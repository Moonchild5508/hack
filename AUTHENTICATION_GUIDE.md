# Authentication & Progress Tracking System Guide

## Overview
The Therapy Activity Authoring Studio now includes a complete authentication system with role-based access control and progress tracking capabilities.

## User Roles

### 1. Admin
- **First user to sign up automatically becomes admin**
- Full access to all features
- Can manage user roles
- Can view all activities and progress
- Access to Admin Panel

### 2. Therapist
- **Default role for subsequent signups**
- Can create matching activities
- Can assign activities to children
- Can view progress for all children
- Access to Therapist Dashboard

### 3. Child (or Parent/Child account)
- Can view assigned activities
- Can play interactive matching games
- Progress is automatically tracked
- Access to Child Dashboard

## Getting Started

### First Time Setup

1. **Sign Up as Admin**
   - Navigate to `/signup`
   - Enter username, full name, and password
   - The first user becomes admin automatically
   - You'll be logged in automatically

2. **Create Additional Users**
   - Other users can sign up at `/signup`
   - They become therapists by default
   - Admin can change roles later in Admin Panel

3. **Change User Roles (Admin Only)**
   - Go to Admin Panel (`/admin`)
   - Select role from dropdown for each user
   - Change therapists to children as needed

## Therapist Workflow

### Creating a Matching Activity

1. **Navigate to Activity Builder**
   - Click "Create Activity" button on dashboard
   - Or go to `/activity-builder`

2. **Build Your Activity**
   - Enter activity name
   - Click "Add Question" to create questions
   - For each question:
     - Select a symbol to match (left side)
     - Add 2+ answer options (right side)
     - Mark the correct answer
   - Click "Save Activity"

3. **Assign to Children**
   - From Therapist Dashboard, find your activity
   - Click "Assign" button
   - Select children to assign to
   - Click "Assign to X Children"

### Viewing Progress

**From Therapist Dashboard:**
- **Activities Tab**: View all your created activities
- **Children Tab**: See all registered children
- **Progress Tracking Tab**: View detailed progress for each child
  - Total assignments
  - Completed assignments
  - Average score
  - Last activity completed

**Detailed Child Progress:**
- Click "View Progress" on any child
- See individual activity scores
- View completion status
- Track improvement over time

## Child/Parent Workflow

### Playing Activities

1. **Login**
   - Navigate to `/login`
   - Enter username and password

2. **View Assigned Activities**
   - Automatically redirected to Child Dashboard
   - See all activities assigned by therapist
   - View status: Not Started, In Progress, or Completed

3. **Play an Activity**
   - Click "Start Activity" on any assignment
   - Interactive matching game begins
   - For each question:
     - View the symbol to match
     - Select from multiple choice options
     - Click "Submit Answer"
     - See if answer is correct
     - Click "Next Question"
   - Complete all questions
   - View final score

4. **Track Your Progress**
   - Dashboard shows:
     - Total assignments
     - In progress count
     - Completed count
   - Can replay completed activities

## Database Structure

### Tables

1. **profiles**
   - User information
   - Role assignment
   - Created automatically on signup

2. **activities**
   - Matching activities created by therapists
   - Stores questions and answer options
   - Linked to therapist who created it

3. **assignments**
   - Links activities to children
   - Tracks status (assigned, in_progress, completed)
   - Optional due dates

4. **activity_responses**
   - Stores child's answers
   - Tracks score and completion time
   - Used for progress tracking

## Key Features

### Matching Game
- Multiple choice format
- Visual feedback (green for correct, red for incorrect)
- Progress bar showing question number
- Automatic score calculation
- Time tracking

### Progress Tracking
- Real-time updates
- Per-child statistics
- Per-activity statistics
- Average scores
- Completion rates

### Security
- Row Level Security (RLS) enabled
- Therapists can only view their own activities
- Children can only view assigned activities
- Admins have full access
- Secure authentication with Supabase

## API Functions

All database operations are in `src/db/api.ts`:

- `getProfile()` - Get user profile
- `createActivity()` - Create new activity
- `getActivitiesByTherapist()` - Get therapist's activities
- `createAssignment()` - Assign activity to child
- `getAssignedActivitiesForChild()` - Get child's assignments
- `createActivityResponse()` - Save child's answers
- `getChildProgress()` - Get progress for a child
- `getAllChildrenProgress()` - Get progress for all children

## Pages

- `/login` - Login page
- `/signup` - Signup page
- `/therapist-dashboard` - Therapist main page
- `/child-dashboard` - Child main page
- `/admin` - Admin panel
- `/activity-builder` - Create matching activities
- `/assign-activity/:activityId` - Assign activity to children
- `/play-activity/:assignmentId` - Interactive matching game

## Tips

1. **For Therapists:**
   - Create activities with clear, distinct symbols
   - Use 2-4 answer options per question
   - Start with easier activities and progress to harder ones
   - Regularly check progress to identify struggling children

2. **For Children:**
   - Take your time on each question
   - Look carefully at all options before selecting
   - You can replay activities to improve your score

3. **For Admins:**
   - Set up child accounts for parents/children
   - Monitor overall system usage
   - Adjust roles as needed

## Troubleshooting

**Can't login?**
- Check username and password
- Username is case-sensitive
- Contact admin to verify account exists

**Don't see any activities? (Child)**
- Check with therapist - they need to assign activities
- Refresh the page

**Can't assign activities? (Therapist)**
- Ensure children are registered in the system
- Check that activity was saved successfully

**Need to change a role?**
- Only admins can change roles
- Go to Admin Panel
- Select new role from dropdown
