'use client';

import type React from 'react';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavItem from './nav-item';

export function Sidebar({
  collapsed,
  setCollapsed,
  isMobile,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
}) {
  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-2">
        {!collapsed && <span className="text-xl font-semibold">Admin</span>}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        )}
      </div>
      <nav className="flex-1 space-y-2 py-4">
        <NavItem
          href="#"
          icon={LayoutDashboard}
          label="Dashboard"
          collapsed={collapsed}
        />
        <NavItem
          href="#"
          icon={Package}
          label="Products"
          collapsed={collapsed}
          active
        />
        <NavItem
          href="#"
          icon={ShoppingCart}
          label="Orders"
          collapsed={collapsed}
        />
        <NavItem
          href="#"
          icon={Users}
          label="Customers"
          collapsed={collapsed}
        />
        <NavItem
          href="#"
          icon={BarChart3}
          label="Analytics"
          collapsed={collapsed}
        />
        <div className="mt-auto border-t py-4">
          <NavItem
            href="/settings"
            icon={Settings}
            label="Settings"
            collapsed={collapsed}
          />
        </div>
      </nav>
    </>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        'hidden md:flex h-[calc(100vh-4rem)] flex-col border-r bg-background p-2 transition-all',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <SidebarContent />
    </aside>
  );
}
