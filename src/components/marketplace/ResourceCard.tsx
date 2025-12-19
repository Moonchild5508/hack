import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Download, User } from 'lucide-react';
import type { Resource } from '@/types';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
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

  return (
    <Link to={`/marketplace/${resource.id}`}>
      <Card className="h-full hover:shadow-lg transition-all hover:border-primary group">
        <CardHeader className="p-0">
          <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
            {resource.preview_image ? (
              <img
                src={resource.preview_image}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <span className="text-4xl">
                  {resource.type === 'aac_board' && '💬'}
                  {resource.type === 'visual_schedule' && '📅'}
                  {resource.type === 'matching_activity' && '🎯'}
                  {resource.type === 'sorting_activity' && '🔀'}
                  {resource.type === 'custom' && '✨'}
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            <Badge variant={resource.price === 0 ? 'secondary' : 'default'} className="shrink-0">
              {formatPrice(resource.price)}
            </Badge>
          </div>
          
          {resource.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {resource.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {resource.rating_avg > 0 ? resource.rating_avg.toFixed(1) : 'New'}
              </span>
              {resource.rating_count > 0 && (
                <span className="text-xs">({resource.rating_count})</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{resource.downloads_count}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{resource.creator?.username || 'Anonymous'}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {getTypeLabel(resource.type)}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
