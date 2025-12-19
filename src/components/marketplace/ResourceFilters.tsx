import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { ResourceFilters as Filters, ResourceCategory } from '@/types';

interface ResourceFiltersProps {
  filters: Filters;
  categories: ResourceCategory[];
  onFiltersChange: (filters: Filters) => void;
}

export default function ResourceFilters({ filters, categories, onFiltersChange }: ResourceFiltersProps) {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Resource Type</h3>
        <RadioGroup
          value={filters.type || 'all'}
          onValueChange={(value) => updateFilter('type', value === 'all' ? undefined : value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="type-all" />
            <Label htmlFor="type-all" className="cursor-pointer">All Types</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="aac_board" id="type-aac" />
            <Label htmlFor="type-aac" className="cursor-pointer">AAC Boards</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="visual_schedule" id="type-schedule" />
            <Label htmlFor="type-schedule" className="cursor-pointer">Visual Schedules</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="matching_activity" id="type-matching" />
            <Label htmlFor="type-matching" className="cursor-pointer">Matching Activities</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sorting_activity" id="type-sorting" />
            <Label htmlFor="type-sorting" className="cursor-pointer">Sorting Activities</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="type-custom" />
            <Label htmlFor="type-custom" className="cursor-pointer">Custom Activities</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <Select
          value={filters.category_id || 'all'}
          onValueChange={(value) => updateFilter('category_id', value === 'all' ? undefined : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.icon} {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Price</h3>
        <RadioGroup
          value={filters.price_type || 'all'}
          onValueChange={(value) => updateFilter('price_type', value === 'all' ? undefined : value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="price-all" />
            <Label htmlFor="price-all" className="cursor-pointer">All Resources</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="price-free" />
            <Label htmlFor="price-free" className="cursor-pointer">Free Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paid" id="price-paid" />
            <Label htmlFor="price-paid" className="cursor-pointer">Paid Only</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <Select
          value={filters.min_rating?.toString() || '0'}
          onValueChange={(value) => updateFilter('min_rating', value === '0' ? undefined : parseFloat(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any Rating</SelectItem>
            <SelectItem value="4">⭐ 4+ Stars</SelectItem>
            <SelectItem value="3">⭐ 3+ Stars</SelectItem>
            <SelectItem value="2">⭐ 2+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <Select
          value={filters.sort_by || 'newest'}
          onValueChange={(value) => updateFilter('sort_by', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="highest_rated">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
