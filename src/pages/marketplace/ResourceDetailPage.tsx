import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Star, Download, User, Calendar, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getResourceById,
  downloadResource,
  purchaseResource,
  hasDownloaded,
  hasPurchased,
  getResourceRatings,
  rateResource,
  getUserRating,
  deleteResource
} from '@/db/api';
import type { Resource, ResourceRating } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [resource, setResource] = useState<Resource | null>(null);
  const [ratings, setRatings] = useState<ResourceRating[]>([]);
  const [userRating, setUserRating] = useState<ResourceRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    if (id) {
      loadResource();
      loadRatings();
      if (user) {
        checkAccess();
        loadUserRating();
      }
    }
  }, [id, user]);

  const loadResource = async () => {
    if (!id) return;
    setLoading(true);
    const data = await getResourceById(id);
    setResource(data);
    setLoading(false);
  };

  const loadRatings = async () => {
    if (!id) return;
    const data = await getResourceRatings(id);
    setRatings(data);
  };

  const loadUserRating = async () => {
    if (!id || !user) return;
    const data = await getUserRating(id, user.id);
    setUserRating(data);
    if (data) {
      setNewRating(data.rating);
      setNewReview(data.review || '');
    }
  };

  const checkAccess = async () => {
    if (!id || !user) return;
    const downloaded = await hasDownloaded(id, user.id);
    const purchased = await hasPurchased(id, user.id);
    setHasAccess(downloaded || purchased);
  };

  const handleDownload = async () => {
    if (!id || !user || !resource) return;

    setDownloading(true);

    try {
      if (resource.price > 0 && !hasAccess) {
        // Handle purchase
        const success = await purchaseResource(id, user.id, resource.price);
        if (success) {
          toast({
            title: 'Purchase Successful',
            description: 'Resource purchased and downloaded successfully!'
          });
          setHasAccess(true);
          loadResource(); // Reload to update download count
        } else {
          toast({
            title: 'Purchase Failed',
            description: 'Failed to purchase resource. Please try again.',
            variant: 'destructive'
          });
        }
      } else {
        // Handle free download
        const success = await downloadResource(id, user.id);
        if (success) {
          toast({
            title: 'Download Successful',
            description: 'Resource downloaded successfully!'
          });
          setHasAccess(true);
          loadResource(); // Reload to update download count
        } else {
          toast({
            title: 'Download Failed',
            description: 'Failed to download resource. Please try again.',
            variant: 'destructive'
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleSubmitRating = async () => {
    if (!id || !user || newRating === 0) return;

    setSubmittingRating(true);
    try {
      const result = await rateResource(id, user.id, newRating, newReview || undefined);
      if (result) {
        toast({
          title: 'Rating Submitted',
          description: 'Thank you for your feedback!'
        });
        loadRatings();
        loadUserRating();
        loadResource(); // Reload to update average rating
      } else {
        toast({
          title: 'Failed to Submit Rating',
          description: 'Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmittingRating(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const success = await deleteResource(id);
    if (success) {
      toast({
        title: 'Resource Deleted',
        description: 'Resource has been deleted successfully.'
      });
      navigate('/marketplace');
    } else {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete resource. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      aac_board: 'AAC Board',
      visual_schedule: 'Visual Schedule',
      matching_activity: 'Matching Activity',
      sorting_activity: 'Sorting Activity',
      custom: 'Custom Activity'
    };
    return labels[type] || type;
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `₹${price}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Resource Not Found</h2>
          <p className="text-muted-foreground mb-4">The resource you're looking for doesn't exist.</p>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === resource.creator_id;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/marketplace">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Preview Image */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {resource.preview_image ? (
                    <img
                      src={resource.preview_image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <span className="text-8xl">
                        {resource.type === 'aac_board' && '💬'}
                        {resource.type === 'visual_schedule' && '📅'}
                        {resource.type === 'matching_activity' && '🎯'}
                        {resource.type === 'sorting_activity' && '🔀'}
                        {resource.type === 'custom' && '✨'}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Title and Description */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold">{resource.title}</h1>
                {isOwner && (
                  <div className="flex gap-2">
                    <Link to={`/marketplace/edit/${resource.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resource?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your resource.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>

              {resource.description && (
                <p className="text-muted-foreground text-lg">{resource.description}</p>
              )}
            </div>

            <Separator />

            {/* Ratings Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>

              {user && hasAccess && (
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      {userRating ? 'Update Your Rating' : 'Rate This Resource'}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= newRating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Write your review (optional)..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        rows={4}
                      />
                      <Button
                        onClick={handleSubmitRating}
                        disabled={newRating === 0 || submittingRating}
                      >
                        {submittingRating ? 'Submitting...' : userRating ? 'Update Rating' : 'Submit Rating'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {ratings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No ratings yet. Be the first to rate this resource!
                </p>
              ) : (
                <div className="space-y-4">
                  {ratings.map((rating) => (
                    <Card key={rating.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{rating.user?.username || 'Anonymous'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {rating.review && (
                          <p className="text-muted-foreground">{rating.review}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(rating.created_at)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download/Purchase Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{formatPrice(resource.price)}</span>
                  <Badge variant={resource.price === 0 ? 'secondary' : 'default'}>
                    {resource.price === 0 ? 'Free' : 'Paid'}
                  </Badge>
                </div>

                {user ? (
                  hasAccess ? (
                    <Button className="w-full" disabled>
                      <Download className="w-4 h-4 mr-2" />
                      Already Downloaded
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={handleDownload} disabled={downloading}>
                      <Download className="w-4 h-4 mr-2" />
                      {downloading
                        ? 'Processing...'
                        : resource.price === 0
                        ? 'Download Free'
                        : `Purchase for ${formatPrice(resource.price)}`}
                    </Button>
                  )
                ) : (
                  <Link to="/login">
                    <Button className="w-full">
                      Login to Download
                    </Button>
                  </Link>
                )}

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <Badge variant="outline">{getTypeLabel(resource.type)}</Badge>
                  </div>
                  {resource.category && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">
                        {resource.category.icon} {resource.category.name}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Downloads</span>
                    <span className="font-medium">{resource.downloads_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {resource.rating_avg > 0 ? resource.rating_avg.toFixed(1) : 'New'}
                      </span>
                      {resource.rating_count > 0 && (
                        <span className="text-muted-foreground">({resource.rating_count})</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Creator</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{resource.creator?.username || 'Anonymous'}</p>
                    {resource.creator?.full_name && (
                      <p className="text-sm text-muted-foreground">{resource.creator.full_name}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Published {formatDate(resource.created_at)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
