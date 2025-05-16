import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { getCategoryBadgeColor } from '@/lib/helpers';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <p className="font-semibold text-lg">Description</p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <p className="font-semibold text-lg">Price</p>
              <p className="text-xl  text-muted-foreground">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="grid gap-2">
              <p className="font-semibold text-lg">Stock</p>
              <p className="text-xl text-muted-foreground">
                {product.stock} units
              </p>
            </div>
            <div className="grid gap-2">
              <p className="font-semibold text-lg">Product ID</p>
              <p className="text-xl text-muted-foreground">{product.id}</p>
            </div>
            <div className="grid gap-2">
              <p className="font-semibold text-lg">Category</p>
              <Badge
                className={cn(
                  'w-fit text-base px-3 py-1',
                  getCategoryBadgeColor(product.category)
                )}
              >
                {product.category}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsModal;
