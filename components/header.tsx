'use client';

import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NotificationPopover } from './notification-popover';
import { user } from '@/lib/mock-data';
import { UserMenu } from './user-menu';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center w-full justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 ">
        <Button variant="outline" size="icon" className="md:hidden h-8 w-8">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Image
          src="/brand.png"
          alt="brand Logo"
          width={60}
          height={60}
          priority
        />
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <NotificationPopover>
          <Bell className="h-5 w-5" />
        </NotificationPopover>
        <UserMenu user={user}>
          <div>
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-gradient-to-b to-[#131316] from-[#5C6670] text-white font-semibold">
                  {user
                    ? user?.first_name?.charAt(0) + user?.last_name?.charAt(0)
                    : 'MS'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-xs font-medium">
                  {user
                    ? user?.first_name + ' ' + user?.last_name
                    : 'Main stack'}
                </div>
                <div className="text-xs text-gray-500">
                  {user ? user?.email : 'mainstack@example.com'}
                </div>
              </div>
            </div>
          </div>
        </UserMenu>
      </div>
    </header>
  );
}
