import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Plus, Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ResourceCard from '@/components/marketplace/ResourceCard';
import ResourceFilters from '@/components/marketplace/ResourceFilters';
import { getResources, getResourceCategories } from '@/db/api';
import { useAuth } from '@/contexts/AuthContext';
import type { Resource, ResourceCategory, ResourceFilters as Filters } from '@/types';

export default function MarketplacePage() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    sort_by: 'newest'
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadResources();
  }, [filters]);

  const loadCategories = async () => {
    const data = await getResourceCategories();
    setCategories(data);
  };

  const loadResources = async () => {
    setLoading(true);
    const data = await getResources(filters);
    setResources(data);
    setLoading(false);
  };

  const handleSearch = () => {
    setFilters({ ...filters, search: searchQuery || undefined });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Marketplace</h1>
              <p className="text-muted-foreground">
                Discover, share, and download therapy resources created by the community
              </p>
            </div>
            {user && (
              <Link to="/marketplace/upload">
                <Button size="lg" className="w-full xl:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Resource
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="xl:hidden">
                  <Filter className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ResourceFilters
                    filters={filters}
                    categories={categories}
                    onFiltersChange={setFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-4">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              <ResourceFilters
                filters={filters}
                categories={categories}
                onFiltersChange={setFilters}
              />
            </div>
          </aside>

          {/* Resources Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                {user && (
                  <Link to="/marketplace/upload">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Upload First Resource
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {resources.length} resource{resources.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {resources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
