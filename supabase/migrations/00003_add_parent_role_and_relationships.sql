/*
# Add Parent Role and Parent-Child Relationships

## Changes
1. Update user_role enum to include 'parent'
2. Add parent_child_links table to link parents to children
3. Update RLS policies to allow parents to view their children's data
4. Add helper function to check parent-child relationship

## Tables
- `parent_child_links`
  - `id` (uuid, primary key)
  - `parent_id` (uuid, references profiles)
  - `child_id` (uuid, references profiles)
  - `created_at` (timestamptz)
  - `created_by_therapist_id` (uuid, references profiles)

## Security
- Parents can view their linked children's assignments and responses
- Therapists can create parent-child links
- RLS policies updated accordingly
*/

-- Add 'parent' to user_role enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'parent';

-- Create parent_child_links table
CREATE TABLE IF NOT EXISTS parent_child_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  child_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_by_therapist_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(parent_id, child_id)
);

-- Enable RLS
ALTER TABLE parent_child_links ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is parent of child
CREATE OR REPLACE FUNCTION is_parent_of(parent_uid uuid, child_uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM parent_child_links
    WHERE parent_id = parent_uid AND child_id = child_uid
  );
$$;

-- Helper function to get children of a parent
CREATE OR REPLACE FUNCTION get_parent_children(parent_uid uuid)
RETURNS TABLE(child_id uuid) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT child_id FROM parent_child_links WHERE parent_id = parent_uid;
$$;

-- RLS Policies for parent_child_links
CREATE POLICY "Admins have full access to parent_child_links" ON parent_child_links
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Therapists can create parent_child_links" ON parent_child_links
  FOR INSERT TO authenticated WITH CHECK (is_therapist(auth.uid()) OR is_admin(auth.uid()));

CREATE POLICY "Therapists can view their created links" ON parent_child_links
  FOR SELECT TO authenticated USING (
    is_therapist(auth.uid()) OR is_admin(auth.uid()) OR 
    parent_id = auth.uid()
  );

CREATE POLICY "Parents can view their own links" ON parent_child_links
  FOR SELECT TO authenticated USING (parent_id = auth.uid());

-- Update assignments policies to allow parents to view their children's assignments
CREATE POLICY "Parents can view their children's assignments" ON assignments
  FOR SELECT TO authenticated USING (
    child_id IN (SELECT child_id FROM parent_child_links WHERE parent_id = auth.uid())
  );

-- Update activity_responses policies to allow parents to view their children's responses
CREATE POLICY "Parents can view their children's responses" ON activity_responses
  FOR SELECT TO authenticated USING (
    child_id IN (SELECT child_id FROM parent_child_links WHERE parent_id = auth.uid())
  );

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_parent_child_links_parent ON parent_child_links(parent_id);
CREATE INDEX IF NOT EXISTS idx_parent_child_links_child ON parent_child_links(child_id);