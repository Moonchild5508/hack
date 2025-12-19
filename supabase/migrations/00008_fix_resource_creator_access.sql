/*
# Fix Resource Creator Access

This migration adds a policy to allow creators to view their own resources,
even if they are unpublished. This fixes the "resource not found" error
that occurs immediately after uploading a new resource.

## Changes:
- Add policy: "Creators can view own resources"
  - Allows authenticated users to SELECT their own resources
  - Works regardless of is_published status
  - Ensures creators can see their uploads immediately

## Security:
- Only affects creator's own resources (auth.uid() = creator_id)
- Does not affect public visibility of unpublished resources
- Maintains existing security model
*/

-- Add policy to allow creators to view their own resources
CREATE POLICY "Creators can view own resources"
ON resources
FOR SELECT
TO authenticated
USING (auth.uid() = creator_id);