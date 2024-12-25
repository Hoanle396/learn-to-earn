export const appConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL! ?? 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL! ?? 'http://localhost:3001/api/v1',
};

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  appUrl: appConfig.appUrl,
  name: 'Learn To Earn - Blockchain Platform',
  metaTitle: 'Learn To Earn - Blockchain Platform',
  description: 'Learn To Earn - Blockchain Platform',
  ogImage: `${appConfig.appUrl}/og-image.jpg`,
};

export const IPFS_URL = process.env.NEXT_PUBLIC_IPFS_URL || 'http://localhost:5002';
export const IPFS_KEY = process.env.NEXT_PUBLIC_IPFS_KEY || '123456789';
