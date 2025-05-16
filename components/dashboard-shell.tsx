'use client';

import type React from 'react';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useEffect } from 'react';
import { useState } from 'react';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setCollapsed(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-30">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isMobile={isMobile}
          />
        </div>
        <div
          style={{
            width: isMobile ? 0 : collapsed ? '4rem' : '16rem',
            transition: 'width 200ms ease-in-out',
          }}
          className="flex-shrink-0"
        />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6">
          <div className="mx-auto max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
