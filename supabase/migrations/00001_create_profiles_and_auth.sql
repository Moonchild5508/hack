/*
# Create Profiles and Authentication System

## 1. New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `username` (text, unique, not null)
  - `email` (text)
  - `full_name` (text)
  - `role` (user_role enum: 'therapist', 'child', 'admin')
  - `created_at` (timestamptz, default: now())
  - `updated_at` (timestamptz, default: now())

## 2. Security
- Enable RLS on `profiles` table
- Create `is_admin` helper function to check user role
- Add policy for admins to have full access to all profiles
- Add policy for users to read their own profile
- Add policy for users to update their own profile without changing role
- Add policy for therapists to view child profiles

## 3. Auto-sync
- Create trigger to auto-create profile when user confirms email
- First user becomes admin, subsequent users become therapist by default

## 4. Notes
- Username-based authentication (username@miaoda.com format)
- Email verification disabled
- Therapists can view child profiles for assignment purposes
*/

-- Create user role enum
CREATE TYPE user_role AS ENUM ('therapist', 'child', 'admin');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  email text,
  full_name text,
  role user_role DEFAULT 'therapist'::user_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Create helper function to check if user is therapist
CREATE OR REPLACE FUNCTION is_therapist(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role IN ('therapist'::user_role, 'admin'::user_role)
  );
$$;

-- Policies for profiles
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Therapists can view all profiles" ON profiles
  FOR SELECT TO authenticated USING (is_therapist(auth.uid()));

-- Create public profiles view
CREATE VIEW public_profiles AS
  SELECT id, username, full_name, role
  FROM profiles;

-- Auto-sync function for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
  extracted_username text;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  -- Extract username from email (remove @miaoda.com)
  extracted_username := REPLACE(NEW.email, '@miaoda.com', '');
  
  -- Insert a profile synced with fields collected at signup
  INSERT INTO profiles (id, username, email, role)
  VALUES (
    NEW.id,
    extracted_username,
    NEW.email,
    CASE WHEN user_count = 0 THEN 'admin'::user_role ELSE 'therapist'::user_role END
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for auto-sync
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Also handle immediate signups (when email verification is disabled)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();
