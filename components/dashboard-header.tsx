'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  onCreateClick?: () => void;
}

export function DashboardHeader({
  heading,
  text,
  onCreateClick,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      {onCreateClick && (
        <Button onClick={onCreateClick}>
          <PlusCircle className="md:mr-2 h-4 w-4" />
          Add Product
        </Button>
      )}
    </div>
  );
}
