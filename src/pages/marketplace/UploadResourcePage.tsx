import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createResource, getResourceCategories } from '@/db/api';
import type { ResourceCategory, ResourceType } from '@/types';

export default function UploadResourcePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'custom' as ResourceType,
    category_id: '',
    price: '0',
    preview_image: '',
    file_data: '{}'
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
      let fileData;
      try {
        fileData = JSON.parse(formData.file_data);
      } catch {
        fileData = { content: formData.file_data };
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

      if (resource) {
        toast({
          title: 'Resource Uploaded',
          description: 'Your resource has been uploaded successfully!'
        });
        navigate(`/marketplace/${resource.id}`);
      } else {
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

              {/* File Data */}
              <div className="space-y-2">
                <Label htmlFor="file_data">
                  Resource Data <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="file_data"
                  placeholder='Enter JSON data or text content for your resource...'
                  value={formData.file_data}
                  onChange={(e) => updateFormData('file_data', e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter the resource configuration as JSON or plain text. This will be stored and made available for download.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Uploading...' : 'Upload Resource'}
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
