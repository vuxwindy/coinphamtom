// Vite Assets Configuration
// This file ensures all images and assets are properly handled during build

export const assetsConfig = {
  // Image formats that should be processed
  imageFormats: [
    'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'bmp', 'tiff'
  ],
  
  // Font formats
  fontFormats: [
    'woff', 'woff2', 'eot', 'ttf', 'otf'
  ],
  
  // Media formats
  mediaFormats: [
    'mp4', 'webm', 'ogg', 'mp3', 'wav', 'flac', 'aac'
  ],
  
  // Asset directories to include
  assetDirectories: [
    'src/assets/images',
    'src/assets/fonts',
    'src/assets/media',
    'public',
    'public/images',
    'public/token',
    'public/nft'
  ],
  
  // File patterns to include
  includePatterns: [
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.svg',
    '**/*.webp',
    '**/*.ico',
    '**/*.woff',
    '**/*.woff2',
    '**/*.ttf',
    '**/*.eot',
    '**/*.otf'
  ],
  
  // Build output structure
  buildOutput: {
    images: 'assets/images/[name]-[hash][extname]',
    fonts: 'assets/fonts/[name]-[hash][extname]',
    media: 'assets/media/[name]-[hash][extname]',
    other: 'assets/[name]-[hash][extname]'
  }
}

export default assetsConfig
