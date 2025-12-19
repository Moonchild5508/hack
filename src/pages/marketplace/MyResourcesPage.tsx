import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Upload, Download } from 'lucide-react';
import ResourceCard from '@/components/marketplace/ResourceCard';
import { getMyResources, getMyDownloads } from '@/db/api';
import { useAuth } from '@/contexts/AuthContext';
import type { Resource, ResourceDownload } from '@/types';

export default function MyResourcesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [myResources, setMyResources] = useState<Resource[]>([]);
  const [myDownloads, setMyDownloads] = useState<ResourceDownload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    const [resources, downloads] = await Promise.all([
      getMyResources(user.id),
      getMyDownloads(user.id)
    ]);
    setMyResources(resources);
    setMyDownloads(downloads);
    setLoading(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Resources</h1>
              <p className="text-muted-foreground">
                Manage your uploaded resources and view your downloads
              </p>
            </div>
            <Link to="/marketplace/upload">
              <Button size="lg" className="w-full xl:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Upload New Resource
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="uploaded" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="uploaded" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Uploaded ({myResources.length})
            </TabsTrigger>
            <TabsTrigger value="downloaded" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Downloaded ({myDownloads.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="uploaded" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : myResources.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📤</div>
                <h3 className="text-xl font-semibold mb-2">No Uploaded Resources</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't uploaded any resources yet. Share your work with the community!
                </p>
                <Link to="/marketplace/upload">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Your First Resource
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {myResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="downloaded" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : myDownloads.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📥</div>
                <h3 className="text-xl font-semibold mb-2">No Downloaded Resources</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't downloaded any resources yet. Explore the marketplace!
                </p>
                <Link to="/marketplace">
                  <Button>
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {myDownloads.map((download) => (
                  download.resource && (
                    <ResourceCard key={download.id} resource={download.resource} />
                  )
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
