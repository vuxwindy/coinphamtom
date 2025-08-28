#!/usr/bin/env node

/**
 * Fix Asset Paths Script
 * Converts all /src/assets/ paths to use public folder
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path mappings from /src/assets/ to public folder
const pathMappings = {
  // Token icons
  '/src/assets/images/bnb-icon.png': '/token/bnb.png',
  '/src/assets/images/ppo-icon.png': '/token/ppo.png',
  '/src/assets/images/usdt-icon.png': '/token/usdt.png',
  '/src/assets/images/usdc-icon.png': '/token/usdc.webp',
  
  // NFT images
  '/src/assets/images/nft1.jpg': '/nft/nft1.jpg',
  '/src/assets/images/nft2.jpg': '/nft/nft2.jpg',
  '/src/assets/images/nft3.jpg': '/nft/nft3.jpg',
  '/src/assets/images/nft4.jpg': '/nft/nft4.jpg',
  '/src/assets/images/nft5.jpg': '/nft/nft5.jpg',
  '/src/assets/images/nft6.jpg': '/nft/nft6.jpg',
  
  // NFT items
  '/src/assets/images/nft-item1.jpg': '/nft/nft-item1.jpg',
  '/src/assets/images/nft-item2.jpg': '/nft/nft-item2.jpg',
  '/src/assets/images/nft-item3.jpg': '/nft/nft-item3.jpg',
  '/src/assets/images/nft-item4.jpg': '/nft/nft-item4.jpg',
  
  // Collections
  '/src/assets/images/collection1.jpg': '/nft/collection1.jpg',
  '/src/assets/images/collection2.jpg': '/nft/collection2.jpg',
  '/src/assets/images/collection3.jpg': '/nft/collection3.jpg',
  '/src/assets/images/collection4.jpg': '/nft/collection4.jpg',
  '/src/assets/images/collection-item1.jpg': '/nft/collection-item1.jpg',
  '/src/assets/images/collection-item2.jpg': '/nft/collection-item2.jpg',
  '/src/assets/images/collection-item3.jpg': '/nft/collection-item3.jpg',
  '/src/assets/images/collection-item4.jpg': '/nft/collection-item4.jpg',
  '/src/assets/images/collection-item5.jpg': '/nft/collection-item5.jpg',
  '/src/assets/images/collection-item6.jpg': '/nft/collection-item6.jpg',
  '/src/assets/images/collection-item7.jpg': '/nft/collection-item7.jpg',
  
  // Creators
  '/src/assets/images/creator1.jpg': '/creators/creator1.jpg',
  '/src/assets/images/creator2.jpg': '/creators/creator2.jpg',
  '/src/assets/images/creator3.jpg': '/creators/creator3.jpg',
  '/src/assets/images/creator4.jpg': '/creators/creator4.jpg',
  '/src/assets/images/creator5.jpg': '/creators/creator5.jpg',
  '/src/assets/images/creator6.jpg': '/creators/creator6.jpg',
  '/src/assets/images/creator7.jpg': '/creators/creator7.jpg',
  '/src/assets/images/creator8.jpg': '/creators/creator8.jpg',
  '/src/assets/images/creator-banner1.jpg': '/creators/creator-banner1.jpg',
  '/src/assets/images/creator-banner2.jpg': '/creators/creator-banner2.jpg',
  '/src/assets/images/creator-banner3.jpg': '/creators/creator-banner3.jpg',
  
  // Clients/Avatars
  '/src/assets/images/clients-item1.jpg': '/avatars/client1.jpg',
  '/src/assets/images/clients-item2.jpg': '/avatars/client2.jpg',
  '/src/assets/images/clients-item3.jpg': '/avatars/client3.jpg',
  '/src/assets/images/clients-item4.jpg': '/avatars/client4.jpg',
  '/src/assets/images/clients-item-lg1.jpg': '/avatars/client-lg1.jpg',
  '/src/assets/images/clients-item-lg2.jpg': '/avatars/client-lg2.jpg',
  '/src/assets/images/clients-item-lg3.jpg': '/avatars/client-lg3.jpg',
  '/src/assets/images/clients-item-lg4.jpg': '/avatars/client-lg4.jpg',
  
  // Game previews
  '/src/assets/images/arrow-game-preview.png': '/games/arrow-game-preview.png',
  '/src/assets/images/arrow-game-modern-preview.png': '/games/arrow-game-modern-preview.png',
  '/src/assets/images/plinko-preview.png': '/games/plinko-preview.png',
  '/src/assets/images/snake-preview.png': '/games/snake-preview.png',
  '/src/assets/images/fishing-preview.png': '/games/fishing-preview.png',
  
  // Other images
  '/src/assets/images/banner-lg1.jpg': '/images/banner-lg1.jpg',
  '/src/assets/images/spotlight-artwork.jpg': '/images/spotlight-artwork.jpg',
  '/src/assets/images/footer-pattern.png': '/images/footer-pattern.png',
  '/src/assets/images/header-icon.png': '/images/header-icon.png',
  '/src/assets/images/default-avatar.png': '/avatars/default-avatar.png',
}

// Files to process
const filesToProcess = [
  'src/views/Swap.vue',
  'src/views/Home.vue',
  'src/views/Blindbox.vue',
  'src/views/Collection.vue',
  'src/views/Creators.vue',
  'src/views/Footer.vue',
  'src/views/NFTInvestment.vue',
  'src/views/Leaderboard.vue',
  'src/views/Referral.vue',
  'src/views/Profile.vue',
  'src/views/Marketplace.vue',
  'src/views/Game.vue',
  'src/components/NFTCollection.vue',
  'src/components/Footer.vue',
]

function fixAssetPaths() {
  console.log('🔧 Fixing asset paths...')
  
  let totalFiles = 0
  let totalReplacements = 0
  
  filesToProcess.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath)
    
    if (fs.existsSync(fullPath)) {
      console.log(`📁 Processing: ${filePath}`)
      
      let content = fs.readFileSync(fullPath, 'utf8')
      let fileReplacements = 0
      
      // Replace all mapped paths
      Object.entries(pathMappings).forEach(([oldPath, newPath]) => {
        const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
        const matches = content.match(regex)
        
        if (matches) {
          content = content.replace(regex, newPath)
          fileReplacements += matches.length
          console.log(`   ✅ ${oldPath} → ${newPath} (${matches.length} times)`)
        }
      })
      
      if (fileReplacements > 0) {
        fs.writeFileSync(fullPath, content, 'utf8')
        totalReplacements += fileReplacements
        console.log(`   📝 Updated ${fileReplacements} paths`)
      } else {
        console.log(`   ⏭️  No changes needed`)
      }
      
      totalFiles++
    } else {
      console.log(`⚠️  File not found: ${filePath}`)
    }
  })
  
  console.log(`\n📊 Summary:`)
  console.log(`   Files processed: ${totalFiles}`)
  console.log(`   Total replacements: ${totalReplacements}`)
  
  if (totalReplacements > 0) {
    console.log(`\n✅ Asset paths fixed successfully!`)
    console.log(`\n📋 Next steps:`)
    console.log(`   1. Move images from src/assets/images/ to public/ folder`)
    console.log(`   2. Organize them according to the new paths`)
    console.log(`   3. Run npm run build to test`)
  } else {
    console.log(`\nℹ️  No asset paths found to fix`)
  }
}

// Run the fix
fixAssetPaths()
