/*
# Add Sample Therapy Resources

This migration adds sample therapy resources to help users explore the marketplace.
These are original educational resources for therapy with children with ADHD and Autism.

## Sample Resources Added:
1. Morning Routine Visual Schedule
2. Emotion Recognition AAC Board
3. Daily Activities Matching Game
4. Color and Shape Sorting Activity
5. Social Skills Visual Schedule
6. Feelings Communication Board
7. Classroom Behavior Chart
8. Sensory Break Activities
9. Turn-Taking Social Story
10. Transition Support Schedule

All resources are free and designed for immediate use.
*/

-- First, get a therapist user ID (we'll use the first therapist or admin)
-- If no therapist exists, these inserts will fail gracefully

-- Insert sample resources
-- Note: We'll use a placeholder creator_id that should be updated to an actual therapist user

INSERT INTO resources (
  title,
  description,
  type,
  category_id,
  price,
  creator_id,
  file_data,
  preview_image,
  is_published
) VALUES
(
  'Morning Routine Visual Schedule',
  'A comprehensive visual schedule for morning routines including wake up, brush teeth, get dressed, eat breakfast, and prepare for school. Perfect for children with ADHD who need structured routines. Includes colorful symbols and step-by-step guidance.',
  'visual_schedule',
  (SELECT id FROM resource_categories WHERE name = 'Visual Schedules' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'steps', jsonb_build_array(
      jsonb_build_object('id', '1', 'label', 'Wake Up', 'icon', '🌅', 'order', 1),
      jsonb_build_object('id', '2', 'label', 'Brush Teeth', 'icon', '🪥', 'order', 2),
      jsonb_build_object('id', '3', 'label', 'Get Dressed', 'icon', '👕', 'order', 3),
      jsonb_build_object('id', '4', 'label', 'Eat Breakfast', 'icon', '🍳', 'order', 4),
      jsonb_build_object('id', '5', 'label', 'Pack School Bag', 'icon', '🎒', 'order', 5),
      jsonb_build_object('id', '6', 'label', 'Go to School', 'icon', '🚌', 'order', 6)
    ),
    'targetAge', '5-10 years',
    'duration', '30-45 minutes',
    'instructions', 'Display this schedule in a visible location. Check off each step as completed. Use positive reinforcement for following the routine.'
  ),
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  true
),
(
  'Emotion Recognition AAC Board',
  'An AAC communication board featuring 9 common emotions with visual symbols and labels. Helps non-verbal children express their feelings. Includes happy, sad, angry, scared, excited, tired, confused, proud, and calm. Supports multilingual labels.',
  'aac_board',
  (SELECT id FROM resource_categories WHERE name = 'Emotion Recognition' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'gridSize', '3x3',
    'cells', jsonb_build_array(
      jsonb_build_object('id', '1', 'label', 'Happy', 'icon', '😊', 'audioText', 'I feel happy'),
      jsonb_build_object('id', '2', 'label', 'Sad', 'icon', '😢', 'audioText', 'I feel sad'),
      jsonb_build_object('id', '3', 'label', 'Angry', 'icon', '😠', 'audioText', 'I feel angry'),
      jsonb_build_object('id', '4', 'label', 'Scared', 'icon', '😨', 'audioText', 'I feel scared'),
      jsonb_build_object('id', '5', 'label', 'Excited', 'icon', '🤩', 'audioText', 'I feel excited'),
      jsonb_build_object('id', '6', 'label', 'Tired', 'icon', '😴', 'audioText', 'I feel tired'),
      jsonb_build_object('id', '7', 'label', 'Confused', 'icon', '😕', 'audioText', 'I feel confused'),
      jsonb_build_object('id', '8', 'label', 'Proud', 'icon', '😌', 'audioText', 'I feel proud'),
      jsonb_build_object('id', '9', 'label', 'Calm', 'icon', '😊', 'audioText', 'I feel calm')
    ),
    'usage', 'Point to the emotion you are feeling. Therapist or parent can help identify and validate emotions.',
    'ageRange', '3-12 years'
  ),
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
  true
),
(
  'Indian Food Matching Activity',
  'Match Indian food items with their names. Features 12 common Indian foods including roti, dosa, idli, rice, dal, sabzi, and more. Culturally relevant for Indian children. Helps with vocabulary building and food recognition.',
  'matching_activity',
  (SELECT id FROM resource_categories WHERE name = 'Language Development' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'pairs', jsonb_build_array(
      jsonb_build_object('id', '1', 'image', 'roti', 'label', 'Roti', 'hindi', 'रोटी'),
      jsonb_build_object('id', '2', 'image', 'dosa', 'label', 'Dosa', 'hindi', 'डोसा'),
      jsonb_build_object('id', '3', 'image', 'idli', 'label', 'Idli', 'hindi', 'इडली'),
      jsonb_build_object('id', '4', 'image', 'rice', 'label', 'Rice', 'hindi', 'चावल'),
      jsonb_build_object('id', '5', 'image', 'dal', 'label', 'Dal', 'hindi', 'दाल'),
      jsonb_build_object('id', '6', 'image', 'sabzi', 'label', 'Sabzi', 'hindi', 'सब्ज़ी')
    ),
    'difficulty', 'Easy',
    'language', 'English, Hindi',
    'instructions', 'Match each food picture with its correct name. Say the name out loud for language practice.'
  ),
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
  true
),
(
  'Color and Shape Sorting Activity',
  'Sort objects by color and shape. Includes red, blue, yellow, green circles, squares, triangles, and stars. Develops categorization skills and visual discrimination. Great for children with autism learning basic concepts.',
  'sorting_activity',
  (SELECT id FROM resource_categories WHERE name = 'Sorting Activities' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'categories', jsonb_build_array(
      jsonb_build_object('name', 'Red', 'color', '#FF0000'),
      jsonb_build_object('name', 'Blue', 'color', '#0000FF'),
      jsonb_build_object('name', 'Yellow', 'color', '#FFFF00'),
      jsonb_build_object('name', 'Green', 'color', '#00FF00')
    ),
    'items', jsonb_build_array(
      jsonb_build_object('id', '1', 'shape', 'circle', 'color', 'red'),
      jsonb_build_object('id', '2', 'shape', 'square', 'color', 'blue'),
      jsonb_build_object('id', '3', 'shape', 'triangle', 'color', 'yellow'),
      jsonb_build_object('id', '4', 'shape', 'star', 'color', 'green')
    ),
    'difficulty', 'Beginner',
    'skills', 'Color recognition, shape recognition, categorization, fine motor skills'
  ),
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800',
  true
),
(
  'School Day Visual Schedule',
  'Complete visual schedule for a school day from arrival to dismissal. Includes arrival, circle time, learning activities, snack, recess, lunch, quiet time, and dismissal. Reduces anxiety about transitions and helps children know what to expect.',
  'visual_schedule',
  (SELECT id FROM resource_categories WHERE name = 'Visual Schedules' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'steps', jsonb_build_array(
      jsonb_build_object('id', '1', 'label', 'Arrival', 'icon', '🚌', 'time', '8:00 AM', 'order', 1),
      jsonb_build_object('id', '2', 'label', 'Circle Time', 'icon', '⭕', 'time', '8:30 AM', 'order', 2),
      jsonb_build_object('id', '3', 'label', 'Learning', 'icon', '📚', 'time', '9:00 AM', 'order', 3),
      jsonb_build_object('id', '4', 'label', 'Snack', 'icon', '🍎', 'time', '10:30 AM', 'order', 4),
      jsonb_build_object('id', '5', 'label', 'Recess', 'icon', '⚽', 'time', '11:00 AM', 'order', 5),
      jsonb_build_object('id', '6', 'label', 'Lunch', 'icon', '🍱', 'time', '12:00 PM', 'order', 6),
      jsonb_build_object('id', '7', 'label', 'Quiet Time', 'icon', '📖', 'time', '1:00 PM', 'order', 7),
      jsonb_build_object('id', '8', 'label', 'Dismissal', 'icon', '👋', 'time', '2:30 PM', 'order', 8)
    ),
    'setting', 'School/Classroom',
    'ageRange', '5-12 years'
  ),
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  true
),
(
  'Basic Needs Communication Board',
  'Essential AAC board for expressing basic needs. Includes I want, I need, help, bathroom, water, food, break, and more. Critical for non-verbal children to communicate essential needs. Simple 4x4 grid layout.',
  'aac_board',
  (SELECT id FROM resource_categories WHERE name = 'AAC Boards' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'gridSize', '4x4',
    'cells', jsonb_build_array(
      jsonb_build_object('id', '1', 'label', 'I want', 'icon', '👉', 'audioText', 'I want'),
      jsonb_build_object('id', '2', 'label', 'I need', 'icon', '🙋', 'audioText', 'I need'),
      jsonb_build_object('id', '3', 'label', 'Help', 'icon', '🆘', 'audioText', 'I need help'),
      jsonb_build_object('id', '4', 'label', 'Bathroom', 'icon', '🚽', 'audioText', 'I need bathroom'),
      jsonb_build_object('id', '5', 'label', 'Water', 'icon', '💧', 'audioText', 'I want water'),
      jsonb_build_object('id', '6', 'label', 'Food', 'icon', '🍽️', 'audioText', 'I want food'),
      jsonb_build_object('id', '7', 'label', 'Break', 'icon', '⏸️', 'audioText', 'I need a break'),
      jsonb_build_object('id', '8', 'label', 'Yes', 'icon', '✅', 'audioText', 'Yes'),
      jsonb_build_object('id', '9', 'label', 'No', 'icon', '❌', 'audioText', 'No'),
      jsonb_build_object('id', '10', 'label', 'More', 'icon', '➕', 'audioText', 'More please'),
      jsonb_build_object('id', '11', 'label', 'All done', 'icon', '✔️', 'audioText', 'All done'),
      jsonb_build_object('id', '12', 'label', 'Play', 'icon', '🎮', 'audioText', 'I want to play')
    ),
    'priority', 'High - Essential communication',
    'usage', 'Always keep accessible. Teach child to point to symbols to communicate needs.'
  ),
  'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800',
  true
),
(
  'Positive Behavior Reward Chart',
  'Visual behavior chart with positive reinforcement system. Track good behaviors like listening, sharing, following directions, and staying calm. Includes reward system with stars and celebration milestones. Encourages positive behavior development.',
  'custom',
  (SELECT id FROM resource_categories WHERE name = 'Behavior Management' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'behaviors', jsonb_build_array(
      jsonb_build_object('name', 'Good Listening', 'icon', '👂', 'points', 1),
      jsonb_build_object('name', 'Sharing', 'icon', '🤝', 'points', 1),
      jsonb_build_object('name', 'Following Directions', 'icon', '✅', 'points', 1),
      jsonb_build_object('name', 'Staying Calm', 'icon', '😌', 'points', 1),
      jsonb_build_object('name', 'Helping Others', 'icon', '💝', 'points', 2)
    ),
    'rewards', jsonb_build_array(
      jsonb_build_object('points', 5, 'reward', 'Sticker'),
      jsonb_build_object('points', 10, 'reward', 'Extra playtime'),
      jsonb_build_object('points', 20, 'reward', 'Special activity')
    ),
    'instructions', 'Award points for positive behaviors. Celebrate achievements. Focus on what child does well.',
    'approach', 'Positive reinforcement only - no punishment'
  ),
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
  true
),
(
  'Sensory Break Activities Card Set',
  'Collection of 10 sensory break activities for self-regulation. Includes deep breathing, stretching, jumping jacks, wall pushes, and quiet time. Perfect for children with sensory processing needs. Helps prevent meltdowns and supports emotional regulation.',
  'custom',
  (SELECT id FROM resource_categories WHERE name = 'Sensory Activities' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'activities', jsonb_build_array(
      jsonb_build_object('name', 'Deep Breathing', 'icon', '🌬️', 'duration', '2 minutes', 'description', 'Breathe in slowly through nose, out through mouth'),
      jsonb_build_object('name', 'Stretching', 'icon', '🤸', 'duration', '3 minutes', 'description', 'Gentle stretches for arms, legs, and back'),
      jsonb_build_object('name', 'Jumping Jacks', 'icon', '🏃', 'duration', '1 minute', 'description', '10-20 jumping jacks for energy release'),
      jsonb_build_object('name', 'Wall Pushes', 'icon', '🧱', 'duration', '2 minutes', 'description', 'Push against wall with both hands for proprioceptive input'),
      jsonb_build_object('name', 'Quiet Corner', 'icon', '🧘', 'duration', '5 minutes', 'description', 'Calm down in quiet space with soft lighting'),
      jsonb_build_object('name', 'Fidget Tools', 'icon', '🎯', 'duration', '3 minutes', 'description', 'Use stress ball or fidget spinner'),
      jsonb_build_object('name', 'Music Break', 'icon', '🎵', 'duration', '3 minutes', 'description', 'Listen to calming music'),
      jsonb_build_object('name', 'Water Break', 'icon', '💧', 'duration', '2 minutes', 'description', 'Drink water slowly and mindfully'),
      jsonb_build_object('name', 'Heavy Work', 'icon', '💪', 'duration', '5 minutes', 'description', 'Carry books, push cart, or move chairs'),
      jsonb_build_object('name', 'Nature Walk', 'icon', '🌳', 'duration', '10 minutes', 'description', 'Short walk outside for fresh air')
    ),
    'usage', 'Offer breaks before child becomes overwhelmed. Let child choose preferred activity.',
    'frequency', 'Every 30-60 minutes or as needed'
  ),
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
  true
),
(
  'Turn-Taking Social Story',
  'Visual social story teaching turn-taking skills. Explains why we take turns, how to wait patiently, and what to do when it is your turn. Includes visual cues and simple language. Helps children with autism understand social expectations.',
  'custom',
  (SELECT id FROM resource_categories WHERE name = 'Social Stories' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'pages', jsonb_build_array(
      jsonb_build_object('page', 1, 'text', 'Sometimes we need to take turns', 'image', '👥'),
      jsonb_build_object('page', 2, 'text', 'Taking turns means waiting for my turn', 'image', '⏰'),
      jsonb_build_object('page', 3, 'text', 'While I wait, I can watch others', 'image', '👀'),
      jsonb_build_object('page', 4, 'text', 'When it is my turn, I can play', 'image', '🎮'),
      jsonb_build_object('page', 5, 'text', 'Then I let someone else have a turn', 'image', '🤝'),
      jsonb_build_object('page', 6, 'text', 'Taking turns makes everyone happy', 'image', '😊')
    ),
    'targetSkill', 'Turn-taking and patience',
    'readingLevel', 'Simple sentences',
    'usage', 'Read together before activities that require turn-taking. Review regularly.'
  ),
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  true
),
(
  'Transition Support Visual Timer',
  'Visual timer and transition support tool. Helps children understand time passing and prepare for transitions. Includes 5-minute, 10-minute, and 15-minute timers with visual countdown. Reduces anxiety about changes in activity.',
  'custom',
  (SELECT id FROM resource_categories WHERE name = 'Visual Schedules' LIMIT 1),
  0,
  (SELECT id FROM profiles WHERE role IN ('therapist', 'admin') ORDER BY created_at LIMIT 1),
  jsonb_build_object(
    'timers', jsonb_build_array(
      jsonb_build_object('duration', 5, 'label', '5 minutes', 'color', 'green'),
      jsonb_build_object('duration', 10, 'label', '10 minutes', 'color', 'yellow'),
      jsonb_build_object('duration', 15, 'label', '15 minutes', 'color', 'orange')
    ),
    'warnings', jsonb_build_array(
      jsonb_build_object('time', 2, 'message', '2 minutes left', 'icon', '⚠️'),
      jsonb_build_object('time', 1, 'message', '1 minute left', 'icon', '⏰'),
      jsonb_build_object('time', 0, 'message', 'Time to transition', 'icon', '🔔')
    ),
    'usage', 'Set timer before activity ends. Give verbal warnings at intervals. Use consistent language.',
    'benefits', 'Reduces transition anxiety, increases predictability, improves cooperation'
  ),
  'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800',
  true
);

-- Note: If no therapist user exists, these inserts will fail.
-- In that case, resources can be added manually through the UI after creating a therapist account.
