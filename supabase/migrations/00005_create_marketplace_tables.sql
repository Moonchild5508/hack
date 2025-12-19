/*
# Create Marketplace Tables

## 1. New Tables

### `resource_categories`
- `id` (uuid, primary key, default: gen_random_uuid())
- `name` (text, unique, not null)
- `description` (text)
- `icon` (text) - emoji or icon name
- `created_at` (timestamptz, default: now())

### `resources`
- `id` (uuid, primary key, default: gen_random_uuid())
- `title` (text, not null)
- `description` (text)
- `type` (text, not null) - 'aac_board', 'visual_schedule', 'matching_activity', 'sorting_activity', 'custom'
- `category_id` (uuid, references resource_categories)
- `price` (numeric, default: 0) - 0 for free, > 0 for paid
- `creator_id` (uuid, references auth.users, not null)
- `file_data` (jsonb, not null) - stores the activity configuration
- `preview_image` (text) - URL to preview image
- `downloads_count` (integer, default: 0)
- `rating_avg` (numeric, default: 0)
- `rating_count` (integer, default: 0)
- `is_published` (boolean, default: true)
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())

### `resource_downloads`
- `id` (uuid, primary key, default: gen_random_uuid())
- `resource_id` (uuid, references resources, not null)
- `user_id` (uuid, references auth.users, not null)
- `downloaded_at` (timestamptz, default: now())
- Unique constraint on (resource_id, user_id)

### `resource_ratings`
- `id` (uuid, primary key, default: gen_random_uuid())
- `resource_id` (uuid, references resources, not null)
- `user_id` (uuid, references auth.users, not null)
- `rating` (integer, not null, check: rating >= 1 AND rating <= 5)
- `review` (text)
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())
- Unique constraint on (resource_id, user_id)

### `resource_purchases`
- `id` (uuid, primary key, default: gen_random_uuid())
- `resource_id` (uuid, references resources, not null)
- `user_id` (uuid, references auth.users, not null)
- `amount` (numeric, not null)
- `purchased_at` (timestamptz, default: now())

## 2. Security

### RLS Policies
- Resources: Public can read published resources, authenticated users can create, users can update/delete own resources
- Downloads: Users can read own downloads, authenticated users can create downloads
- Ratings: Public can read ratings, authenticated users can create/update own ratings
- Purchases: Users can read own purchases, authenticated users can create purchases

### Functions
- `update_resource_rating()` - Trigger to update avg rating when rating added/updated
- `increment_downloads()` - Function to safely increment download count

## 3. Initial Data
- Insert default resource categories (AAC Boards, Visual Schedules, Activities, etc.)
*/

-- Create resource categories table
CREATE TABLE IF NOT EXISTS resource_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('aac_board', 'visual_schedule', 'matching_activity', 'sorting_activity', 'custom')),
  category_id uuid REFERENCES resource_categories(id),
  price numeric DEFAULT 0 CHECK (price >= 0),
  creator_id uuid REFERENCES auth.users(id) NOT NULL,
  file_data jsonb NOT NULL,
  preview_image text,
  downloads_count integer DEFAULT 0,
  rating_avg numeric DEFAULT 0 CHECK (rating_avg >= 0 AND rating_avg <= 5),
  rating_count integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create resource downloads table
CREATE TABLE IF NOT EXISTS resource_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  downloaded_at timestamptz DEFAULT now(),
  UNIQUE(resource_id, user_id)
);

-- Create resource ratings table
CREATE TABLE IF NOT EXISTS resource_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(resource_id, user_id)
);

-- Create resource purchases table
CREATE TABLE IF NOT EXISTS resource_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  purchased_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resources_creator ON resources(creator_id);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_published ON resources(is_published);
CREATE INDEX IF NOT EXISTS idx_resource_downloads_user ON resource_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_ratings_resource ON resource_ratings(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_purchases_user ON resource_purchases(user_id);

-- Enable RLS
ALTER TABLE resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resource_categories (public read)
CREATE POLICY "Anyone can view categories" ON resource_categories
  FOR SELECT USING (true);

-- RLS Policies for resources
CREATE POLICY "Anyone can view published resources" ON resources
  FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can create resources" ON resources
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own resources" ON resources
  FOR UPDATE TO authenticated USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete own resources" ON resources
  FOR DELETE TO authenticated USING (auth.uid() = creator_id);

-- RLS Policies for resource_downloads
CREATE POLICY "Users can view own downloads" ON resource_downloads
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create downloads" ON resource_downloads
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for resource_ratings
CREATE POLICY "Anyone can view ratings" ON resource_ratings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create ratings" ON resource_ratings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings" ON resource_ratings
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ratings" ON resource_ratings
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for resource_purchases
CREATE POLICY "Users can view own purchases" ON resource_purchases
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create purchases" ON resource_purchases
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Function to update resource rating average
CREATE OR REPLACE FUNCTION update_resource_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE resources
  SET 
    rating_avg = (SELECT AVG(rating)::numeric(3,2) FROM resource_ratings WHERE resource_id = NEW.resource_id),
    rating_count = (SELECT COUNT(*) FROM resource_ratings WHERE resource_id = NEW.resource_id)
  WHERE id = NEW.resource_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update rating when rating is added or updated
CREATE TRIGGER update_resource_rating_trigger
AFTER INSERT OR UPDATE ON resource_ratings
FOR EACH ROW
EXECUTE FUNCTION update_resource_rating();

-- Function to safely increment download count
CREATE OR REPLACE FUNCTION increment_downloads(resource_uuid uuid)
RETURNS void AS $$
BEGIN
  UPDATE resources
  SET downloads_count = downloads_count + 1
  WHERE id = resource_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default categories
INSERT INTO resource_categories (name, description, icon) VALUES
  ('AAC Boards', 'Augmentative and Alternative Communication boards for speech therapy', '💬'),
  ('Visual Schedules', 'Step-by-step visual schedules for daily routines', '📅'),
  ('Matching Activities', 'Matching games and activities for cognitive development', '🎯'),
  ('Sorting Activities', 'Sorting and categorization activities', '🔀'),
  ('Emotion Recognition', 'Activities for identifying and expressing emotions', '😊'),
  ('Social Stories', 'Visual stories for social skills development', '📖'),
  ('Sensory Activities', 'Activities for sensory integration therapy', '🎨'),
  ('Fine Motor Skills', 'Activities to develop fine motor skills', '✋'),
  ('Language Development', 'Activities for language and vocabulary building', '🗣️'),
  ('Behavior Management', 'Tools and activities for behavior support', '⭐')
ON CONFLICT (name) DO NOTHING;
