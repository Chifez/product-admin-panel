import { ProductCategory } from '@/types/product';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

export const CategoryBadge = (category: ProductCategory) => {
  const mapping: Record<ProductCategory | 'default', string> = {
    Electronics: 'bg-blue-100 text-blue-800',
    Clothing: 'bg-purple-100 text-purple-800',
    Home: 'bg-green-100 text-green-800',
    Books: 'bg-amber-100 text-amber-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return (
    <Badge variant="outline" className={cn('font-normal', mapping[category])}>
      {category}
    </Badge>
  );
};
