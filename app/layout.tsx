import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Product Management Dashboard',
  description: 'Manage All your Product',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <Toaster richColors />
        </ToastProvider>
      </body>
    </html>
  );
}
