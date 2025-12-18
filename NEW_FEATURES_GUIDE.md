# New Features Guide

## Overview
This guide covers the new features added to the Therapy Activity Authoring Studio:
1. Separate login types for Child/Patient, Parent, and Therapist
2. Therapist ability to create child and parent accounts
3. Parent-child account linking
4. Three new matching game types (to be implemented)

## User Roles

### 1. Child/Patient
- Created by therapists
- Can play assigned activities
- Progress is tracked automatically

### 2. Parent
- Created by therapists
- Linked to one or more children
- Can view their children's progress
- Cannot create or assign activities

### 3. Therapist
- Can sign up independently
- Creates child and parent accounts
- Links parents to children
- Creates and assigns activities
- Views progress for all children

### 4. Admin
- First user to sign up
- Full system access
- Can change user roles

## Login System

### Login Type Selection
When users visit the login page, they first select their login type:
- **Child/Patient**: For children to play activities
- **Parent**: For parents to view their children's progress
- **Therapist**: For therapists to manage activities

After selecting a type, users enter their credentials.

### Account Creation

**For Therapists:**
- Self-signup at `/signup`
- Become therapists by default

**For Children and Parents:**
- Created by therapists in "Manage Users" page
- Therapist receives login credentials to share
- Password can be auto-generated

## Therapist Workflow

### Creating Child/Parent Accounts

1. **Navigate to Manage Users**
   - From Therapist Dashboard, click "Manage Users" in header
   - Or go to `/manage-users`

2. **Create New Account**
   - Click "Create Account" button
   - Select account type (Child or Parent)
   - Enter full name
   - Enter username
   - Generate or enter password
   - Click "Create Account"

3. **Share Credentials**
   - System displays username and password
   - Share these with the child/parent
   - They can use these to login

### Linking Parent to Child

1. **Open Link Dialog**
   - In Manage Users page
   - Click "Link Parent to Child" button

2. **Select Accounts**
   - Choose parent from dropdown
   - Choose child from dropdown
   - Click "Link Accounts"

3. **Result**
   - Parent can now view that child's progress
   - Parent sees child in their dashboard

## Parent Workflow

### Viewing Children's Progress

1. **Login as Parent**
   - Select "Parent" login type
   - Enter credentials provided by therapist

2. **View Dashboard**
   - Automatically redirected to Parent Dashboard
   - See all linked children

3. **Progress Information**
   - Total assignments for each child
   - Completed assignments
   - Average score
   - Last activity completed

## Database Structure

### New Tables

**parent_child_links**
- Links parent accounts to child accounts
- Tracks which therapist created the link
- Allows parents to view their children's data

### Updated Tables

**profiles**
- Now includes 'parent' role

**activities**
- Now supports new activity types:
  - memory_match
  - match_halves
  - match_picture_name

## Security

### Row Level Security (RLS)

**Parents can:**
- View their linked children's profiles
- View their children's assignments
- View their children's activity responses

**Parents cannot:**
- Create or modify activities
- Assign activities
- View other children's data
- Modify any data

## API Functions

### Parent-Child Management

```typescript
// Create parent-child link
createParentChildLink(parentId, childId, therapistId)

// Get children for a parent
getChildrenForParent(parentId)

// Get parents for a child
getParentsForChild(childId)

// Delete parent-child link
deleteParentChildLink(linkId)
```

### User Account Creation

```typescript
// Create user account (therapist only)
createUserAccount(username, password, fullName, role)
```

## Pages

### New Pages

- `/manage-users` - Therapist page to create and manage child/parent accounts
- `/parent-dashboard` - Parent page to view children's progress

### Updated Pages

- `/login` - Now includes login type selection
- `/admin` - Now includes parent role in statistics
- Header - Now includes links for parent role

## Tips for Therapists

### Creating Accounts

1. **Use Simple Usernames**
   - Easy to remember
   - No special characters
   - Example: "john_smith" or "sarah2024"

2. **Password Management**
   - Use the "Generate" button for secure passwords
   - Write down credentials before sharing
   - Consider using simple passwords for young children

3. **Linking Parents**
   - Link parents immediately after creating accounts
   - One parent can be linked to multiple children
   - One child can have multiple parents linked

### Best Practices

1. **Account Organization**
   - Create child account first
   - Then create parent account
   - Link them immediately

2. **Credential Sharing**
   - Share credentials securely
   - Consider using encrypted messaging
   - Verify parents can login successfully

3. **Progress Monitoring**
   - Encourage parents to check progress regularly
   - Parents can motivate children based on progress
   - Use progress data to adjust activity difficulty

## Troubleshooting

### Parent Can't See Child

**Problem:** Parent logged in but sees no children

**Solutions:**
1. Check if parent-child link was created
2. Verify correct parent account is logged in
3. Contact therapist to create/verify link

### Can't Create Account

**Problem:** Error when creating child/parent account

**Solutions:**
1. Check username doesn't already exist
2. Ensure password is at least 6 characters
3. Verify all fields are filled

### Wrong Dashboard After Login

**Problem:** User sees wrong dashboard after login

**Solutions:**
1. Check user role in Admin panel
2. Verify correct login type was selected
3. Contact admin to correct role if needed

## Future Enhancements

### Planned Features

1. **New Matching Game Types**
   - Memory Match: Flip cards to find matching pairs
   - Match the Halves: Match left and right halves of images
   - Match Picture to Name: Match symbols to their text labels

2. **Parent Features**
   - Messaging with therapists
   - Activity completion notifications
   - Detailed progress reports

3. **Therapist Features**
   - Bulk account creation
   - CSV import for multiple accounts
   - Custom activity templates

## Support

For issues or questions:
1. Check this guide first
2. Contact your system administrator
3. Refer to AUTHENTICATION_GUIDE.md for basic auth info
