/*
# Create Storage Bucket for Resource Files

This migration creates a Supabase Storage bucket for storing resource files (PDFs, documents, etc.)

## Bucket Configuration:
- Name: resource_files
- Public: true (files are publicly accessible)
- File size limit: 10MB
- Allowed MIME types: PDF, images, documents

## Security:
- Anyone can read files
- Authenticated users can upload files
- Users can update/delete their own files
*/

-- Create storage bucket for resource files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resource_files',
  'resource_files',
  true,
  10485760, -- 10MB in bytes
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to files
CREATE POLICY "Public read access for resource files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resource_files');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload resource files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resource_files');

-- Allow users to update their own files
CREATE POLICY "Users can update own resource files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'resource_files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own files
CREATE POLICY "Users can delete own resource files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resource_files' AND auth.uid()::text = (storage.foldername(name))[1]);