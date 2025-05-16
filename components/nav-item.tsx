import { cn } from '@/lib/utils';

import Link from 'next/link';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
  active?: boolean;
}

function NavItem({ href, icon: Icon, label, collapsed, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground',
        active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
        collapsed ? 'justify-center' : ''
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
export default NavItem;
