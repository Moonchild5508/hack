import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createResource, getResourceCategories } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { ResourceCategory, ResourceType } from '@/types';

export default function UploadResourcePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'custom' as ResourceType,
    category_id: '',
    price: '0',
    preview_image: '',
    file_data: '{}',
    file_url: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCategories();
  }, [user, navigate]);

  const loadCategories = async () => {
    const data = await getResourceCategories();
    setCategories(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'File size must be less than 10MB.',
        variant: 'destructive'
      });
      return;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Only PDF and image files are allowed.',
        variant: 'destructive'
      });
      return;
    }

    setSelectedFile(file);
    
    // Auto-fill title if empty
    if (!formData.title) {
      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      updateFormData('title', fileName);
    }
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!selectedFile || !user) return null;

    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('resource_files')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: 'Upload Failed',
          description: uploadError.message,
          variant: 'destructive'
        });
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resource_files')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: 'Upload Error',
        description: 'An error occurred while uploading the file.',
        variant: 'destructive'
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to upload resources.',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.title.trim()) {
      toast({
        title: 'Title Required',
        description: 'Please enter a title for your resource.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      // Upload file if selected
      let fileUrl = formData.file_url;
      if (selectedFile) {
        const uploadedUrl = await uploadFile();
        if (!uploadedUrl) {
          setLoading(false);
          return;
        }
        fileUrl = uploadedUrl;
      }

      let fileData;
      try {
        fileData = JSON.parse(formData.file_data);
      } catch {
        fileData = { content: formData.file_data };
      }

      // Add file URL to file_data if exists
      if (fileUrl) {
        fileData.file_url = fileUrl;
        fileData.file_name = selectedFile?.name || 'resource_file';
        fileData.file_type = selectedFile?.type || 'application/pdf';
      }

      const resource = await createResource({
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        type: formData.type,
        category_id: formData.category_id || null,
        price: parseFloat(formData.price) || 0,
        creator_id: user.id,
        file_data: fileData,
        preview_image: formData.preview_image.trim() || null,
        is_published: true
      });

      if (resource && resource.id) {
        toast({
          title: 'Resource Uploaded',
          description: 'Your resource has been uploaded successfully!'
        });
        
        // Small delay to ensure database transaction completes
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Navigate to the resource detail page
        navigate(`/marketplace/${resource.id}`);
      } else {
        console.error('Resource creation failed - no resource or ID returned');
        toast({
          title: 'Upload Failed',
          description: 'Failed to upload resource. Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while uploading. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/marketplace">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upload New Resource</CardTitle>
            <p className="text-muted-foreground">
              Share your therapy resource with the community
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter resource title..."
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your resource, its purpose, and how to use it..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">
                  Resource Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => updateFormData('type', value)}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aac_board">AAC Board</SelectItem>
                    <SelectItem value="visual_schedule">Visual Schedule</SelectItem>
                    <SelectItem value="matching_activity">Matching Activity</SelectItem>
                    <SelectItem value="sorting_activity">Sorting Activity</SelectItem>
                    <SelectItem value="custom">Custom Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category_id || 'none'}
                  onValueChange={(value) => updateFormData('category_id', value === 'none' ? '' : value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Category</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0 for free resources"
                  value={formData.price}
                  onChange={(e) => updateFormData('price', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Set to 0 for free resources. Paid resources require payment before download.
                </p>
              </div>

              {/* Preview Image URL */}
              <div className="space-y-2">
                <Label htmlFor="preview_image">Preview Image URL</Label>
                <Input
                  id="preview_image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.preview_image}
                  onChange={(e) => updateFormData('preview_image', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Provide a URL to an image that represents your resource
                </p>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file_upload">
                  Upload File (PDF, Images)
                </Label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="file_upload"
                    className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Choose File</span>
                  </label>
                  <input
                    id="file_upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {selectedFile && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{selectedFile.name}</span>
                      <span className="text-xs">
                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload a PDF document or image file (max 10MB). This will be the downloadable resource.
                </p>
              </div>

              {/* File Data */}
              <div className="space-y-2">
                <Label htmlFor="file_data">
                  Additional Resource Data (Optional)
                </Label>
                <Textarea
                  id="file_data"
                  placeholder='Enter JSON data or text content for your resource (optional)...'
                  value={formData.file_data}
                  onChange={(e) => updateFormData('file_data', e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Additional metadata or configuration in JSON format
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" disabled={loading || uploading} className="flex-1">
                  {uploading ? 'Uploading File...' : loading ? 'Creating Resource...' : 'Upload Resource'}
                </Button>
                <Link to="/marketplace" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
