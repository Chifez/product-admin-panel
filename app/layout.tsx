import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Inventrack - Product Management Dashboard',
  description:
    'Manage and track your products and inventories, all in one place',
  openGraph: {
    title: 'Inventrack - Product Management Dashboard',
    description:
      'Manage and track your products and inventories, all in one place',
    type: 'website',
    locale: 'en-US',
    url: 'https://inventrack-admin.netlify.app',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 620,
        alt: 'Inventrack - Product Management Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inventrack - Product Management Dashboard',
    description:
      'Manage and track your products and inventories, all in one place',
    images: ['/twitter-image.png'],
  },
  metadataBase: new URL('https://inventrack-admin.netlify.app'),
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
