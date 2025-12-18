/*
# Create Activities, Assignments, and Progress Tracking

## 1. New Tables
- `activities`
  - `id` (uuid, primary key)
  - `therapist_id` (uuid, references profiles)
  - `name` (text, not null)
  - `type` (activity_type enum: 'matching', 'sorting', 'choice', 'aac_board', 'visual_schedule')
  - `content` (jsonb, stores activity data)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

- `assignments`
  - `id` (uuid, primary key)
  - `activity_id` (uuid, references activities)
  - `child_id` (uuid, references profiles)
  - `therapist_id` (uuid, references profiles)
  - `assigned_at` (timestamptz)
  - `due_date` (timestamptz, nullable)
  - `status` (text: 'assigned', 'in_progress', 'completed')

- `activity_responses`
  - `id` (uuid, primary key)
  - `assignment_id` (uuid, references assignments)
  - `child_id` (uuid, references profiles)
  - `activity_id` (uuid, references activities)
  - `answers` (jsonb, stores child's answers)
  - `score` (integer, number of correct answers)
  - `total_questions` (integer)
  - `completed_at` (timestamptz)
  - `time_spent_seconds` (integer)

## 2. Security
- Therapists can create, read, update, delete their own activities
- Therapists can assign activities to children
- Children can view activities assigned to them
- Children can submit responses to their assignments
- Therapists can view responses for activities they created
- Admins have full access

## 3. Notes
- Activities store full content as JSONB for flexibility
- Assignments track which child gets which activity
- Responses track child's performance and progress
*/

-- Create activity type enum
CREATE TYPE activity_type AS ENUM ('matching', 'sorting', 'choice', 'aac_board', 'visual_schedule');

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  type activity_type NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id uuid NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  therapist_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  due_date timestamptz,
  status text DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed'))
);

-- Create activity responses table
CREATE TABLE IF NOT EXISTS activity_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_id uuid NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 0,
  completed_at timestamptz DEFAULT now(),
  time_spent_seconds integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_responses ENABLE ROW LEVEL SECURITY;

-- Activities policies
CREATE POLICY "Admins have full access to activities" ON activities
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Therapists can create activities" ON activities
  FOR INSERT TO authenticated WITH CHECK (is_therapist(auth.uid()) AND therapist_id = auth.uid());

CREATE POLICY "Therapists can view their own activities" ON activities
  FOR SELECT TO authenticated USING (therapist_id = auth.uid());

CREATE POLICY "Therapists can update their own activities" ON activities
  FOR UPDATE TO authenticated USING (therapist_id = auth.uid());

CREATE POLICY "Therapists can delete their own activities" ON activities
  FOR DELETE TO authenticated USING (therapist_id = auth.uid());

CREATE POLICY "Children can view assigned activities" ON activities
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM assignments a
      WHERE a.activity_id = activities.id AND a.child_id = auth.uid()
    )
  );

-- Assignments policies
CREATE POLICY "Admins have full access to assignments" ON assignments
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Therapists can create assignments" ON assignments
  FOR INSERT TO authenticated WITH CHECK (is_therapist(auth.uid()) AND therapist_id = auth.uid());

CREATE POLICY "Therapists can view their assignments" ON assignments
  FOR SELECT TO authenticated USING (therapist_id = auth.uid());

CREATE POLICY "Therapists can update their assignments" ON assignments
  FOR UPDATE TO authenticated USING (therapist_id = auth.uid());

CREATE POLICY "Therapists can delete their assignments" ON assignments
  FOR DELETE TO authenticated USING (therapist_id = auth.uid());

CREATE POLICY "Children can view their assignments" ON assignments
  FOR SELECT TO authenticated USING (child_id = auth.uid());

CREATE POLICY "Children can update assignment status" ON assignments
  FOR UPDATE TO authenticated USING (child_id = auth.uid())
  WITH CHECK (child_id = auth.uid());

-- Activity responses policies
CREATE POLICY "Admins have full access to responses" ON activity_responses
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Children can create their own responses" ON activity_responses
  FOR INSERT TO authenticated WITH CHECK (child_id = auth.uid());

CREATE POLICY "Children can view their own responses" ON activity_responses
  FOR SELECT TO authenticated USING (child_id = auth.uid());

CREATE POLICY "Therapists can view responses for their activities" ON activity_responses
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM activities a
      WHERE a.id = activity_responses.activity_id AND a.therapist_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_activities_therapist ON activities(therapist_id);
CREATE INDEX idx_assignments_child ON assignments(child_id);
CREATE INDEX idx_assignments_activity ON assignments(activity_id);
CREATE INDEX idx_responses_child ON activity_responses(child_id);
CREATE INDEX idx_responses_activity ON activity_responses(activity_id);
CREATE INDEX idx_responses_assignment ON activity_responses(assignment_id);
