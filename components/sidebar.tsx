"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "group relative flex h-screen flex-col border-r bg-background p-2 transition-all",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-2">
        {!collapsed && <span className="text-xl font-semibold">Admin</span>}
        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 space-y-2 py-4">
        <NavItem href="/" icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
        <NavItem href="/products" icon={Package} label="Products" collapsed={collapsed} active />
        <NavItem href="/orders" icon={ShoppingCart} label="Orders" collapsed={collapsed} />
        <NavItem href="/customers" icon={Users} label="Customers" collapsed={collapsed} />
        <NavItem href="/analytics" icon={BarChart3} label="Analytics" collapsed={collapsed} />
      </nav>
      <div className="mt-auto border-t py-4">
        <NavItem href="/settings" icon={Settings} label="Settings" collapsed={collapsed} />
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  collapsed: boolean
  active?: boolean
}

function NavItem({ href, icon: Icon, label, collapsed, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
        collapsed ? "justify-center" : "",
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}
