# Bug Fix: "Resource Not Found" After Upload

## Problem Description

After uploading a new resource to the marketplace, users were immediately redirected to the resource detail page but encountered a **"Resource Not Found"** error. This happened even though the resource was successfully created in the database.

## Root Cause

The issue was caused by **Row Level Security (RLS) policies** on the `resources` table. The existing policies were:

1. ✅ **"Anyone can view published resources"** - Allows public to view resources where `is_published = true`
2. ✅ **"Authenticated users can create resources"** - Allows authenticated users to create resources
3. ✅ **"Users can update own resources"** - Allows creators to update their own resources
4. ✅ **"Users can delete own resources"** - Allows creators to delete their own resources

### The Missing Policy

There was **no policy** allowing creators to view their own unpublished resources. When a new resource is created:

1. Resource is inserted into database ✅
2. User is redirected to `/marketplace/resource/{id}` ✅
3. `getResourceById()` tries to fetch the resource ❌
4. RLS blocks the query because:
   - Resource is unpublished (`is_published = false` by default)
   - Only published resources are visible to public
   - **No policy allows creator to see their own unpublished resources**
5. Query returns `null` → "Resource Not Found" error ❌

## Solution

Added a new RLS policy to allow creators to view their own resources regardless of publication status:

```sql
CREATE POLICY "Creators can view own resources"
ON resources
FOR SELECT
TO authenticated
USING (auth.uid() = creator_id);
```

### How It Works

This policy allows authenticated users to SELECT (view) resources where they are the creator (`auth.uid() = creator_id`). This works in combination with the existing public policy:

- **Public users**: Can view published resources only
- **Creators**: Can view their own resources (published or unpublished)
- **Other authenticated users**: Can view published resources only

### Policy Evaluation Order

PostgreSQL RLS policies are **permissive by default**, meaning if ANY policy allows access, the query succeeds. So for a creator viewing their own unpublished resource:

1. Check "Anyone can view published resources" → ❌ Fails (not published)
2. Check "Creators can view own resources" → ✅ Passes (is creator)
3. **Result**: Access granted ✅

## Impact

### Before Fix
- ❌ Creators couldn't view their resources immediately after upload
- ❌ "Resource Not Found" error on redirect
- ❌ Had to navigate away and back to see the resource
- ❌ Confusing user experience

### After Fix
- ✅ Creators can view their resources immediately after upload
- ✅ Smooth redirect to resource detail page
- ✅ No errors or confusion
- ✅ Creators can view unpublished drafts
- ✅ Public still can't see unpublished resources

## Testing

### Test Case 1: Upload New Resource
1. Login as a therapist
2. Go to Marketplace → Upload Resource
3. Fill in form and upload a PDF
4. Click "Upload Resource"
5. **Expected**: Redirected to resource detail page successfully
6. **Expected**: Resource details displayed correctly
7. **Expected**: "Download File" button works

### Test Case 2: View Own Unpublished Resource
1. Login as creator
2. Navigate to "My Resources" → "Uploaded" tab
3. Click on an unpublished resource
4. **Expected**: Resource details displayed
5. **Expected**: Can edit/delete resource

### Test Case 3: Public Can't See Unpublished
1. Logout or use different account
2. Try to access unpublished resource URL directly
3. **Expected**: "Resource Not Found" (correct behavior)
4. **Expected**: Resource not visible in marketplace listings

### Test Case 4: Published Resources Visible to All
1. Creator publishes a resource (sets `is_published = true`)
2. Logout or use different account
3. View marketplace listings
4. **Expected**: Published resource appears in listings
5. **Expected**: Can view resource detail page
6. **Expected**: Can download (if free) or purchase (if paid)

## Database Changes

### Migration Applied
- **File**: `supabase/migrations/00008_fix_resource_creator_access.sql`
- **Policy Added**: "Creators can view own resources"
- **Table**: `resources`
- **Operation**: SELECT
- **Scope**: authenticated users
- **Condition**: `auth.uid() = creator_id`

### Current RLS Policies on Resources Table

| Policy Name | Command | Roles | Condition |
|------------|---------|-------|-----------|
| Anyone can view published resources | SELECT | public | `is_published = true` |
| Creators can view own resources | SELECT | authenticated | `auth.uid() = creator_id` |
| Authenticated users can create resources | INSERT | authenticated | `auth.uid() = creator_id` |
| Users can update own resources | UPDATE | authenticated | `auth.uid() = creator_id` |
| Users can delete own resources | DELETE | authenticated | `auth.uid() = creator_id` |

## Security Considerations

### What This Changes
- ✅ Creators can now view their own unpublished resources
- ✅ Creators can work on drafts before publishing
- ✅ Creators can preview their resources before making them public

### What This Doesn't Change
- ✅ Public still can't see unpublished resources
- ✅ Other users still can't see unpublished resources
- ✅ Only the creator has access to unpublished resources
- ✅ Published resources remain publicly visible

### Security Model
This follows the **principle of least privilege**:
- Users can only see what they should see
- Creators have full control over their own resources
- Public has read-only access to published content
- Unpublished content remains private to creator

## Related Files

### Database
- `supabase/migrations/00008_fix_resource_creator_access.sql` - Migration file

### Frontend (No changes needed)
- `src/pages/marketplace/UploadResourcePage.tsx` - Upload form
- `src/pages/marketplace/ResourceDetailPage.tsx` - Detail page
- `src/db/api.ts` - Database queries

The frontend code didn't need any changes because it was already correctly implemented. The issue was purely at the database security layer.

## Lessons Learned

### RLS Policy Design
When designing RLS policies, always consider:
1. **Creator access**: Creators should be able to view/edit their own content
2. **Public access**: What should be visible to everyone
3. **Draft/unpublished content**: How to handle content that's not ready for public
4. **Immediate access**: Users should see their changes immediately

### Common RLS Pattern for User-Generated Content
```sql
-- Public can view published content
CREATE POLICY "view_published" ON table_name
FOR SELECT TO public
USING (is_published = true);

-- Creators can view their own content (published or not)
CREATE POLICY "view_own" ON table_name
FOR SELECT TO authenticated
USING (auth.uid() = creator_id);

-- Creators can manage their own content
CREATE POLICY "manage_own" ON table_name
FOR ALL TO authenticated
USING (auth.uid() = creator_id);
```

## Status

✅ **FIXED** - Resource creators can now view their resources immediately after upload

## Verification

Run these SQL queries to verify the fix:

```sql
-- Check all policies on resources table
SELECT policyname, cmd, roles, qual
FROM pg_policies
WHERE tablename = 'resources'
ORDER BY cmd, policyname;

-- Test query (as creator)
SELECT id, title, is_published, creator_id
FROM resources
WHERE creator_id = auth.uid()
LIMIT 5;
```

---

**Bug Fixed**: 2025-12-18  
**Migration**: `00008_fix_resource_creator_access`  
**Impact**: All resource creators  
**Severity**: High (blocked core functionality)  
**Resolution**: Added RLS policy for creator access
