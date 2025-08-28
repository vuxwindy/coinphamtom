#!/usr/bin/env node

/**
 * Build Assets Script
 * Ensures all images and assets are properly included in the build
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Asset directories to check
const assetDirectories = [
  'src/assets/images',
  'src/assets/fonts', 
  'src/assets/media',
  'public',
  'public/images',
  'public/token',
  'public/nft'
]

// File extensions to include
const assetExtensions = [
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',
  '.woff', '.woff2', '.ttf', '.eot', '.otf',
  '.mp4', '.webm', '.ogg', '.mp3', '.wav'
]

function checkAssets() {
  console.log('🔍 Checking assets...')
  
  let totalAssets = 0
  let missingAssets = []
  
  assetDirectories.forEach(dir => {
    const fullPath = path.join(__dirname, dir)
    
    if (fs.existsSync(fullPath)) {
      console.log(`📁 Checking directory: ${dir}`)
      
      const files = getAllFiles(fullPath)
      const assetFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase()
        return assetExtensions.includes(ext)
      })
      
      totalAssets += assetFiles.length
      console.log(`   Found ${assetFiles.length} assets`)
      
      // Check if files are accessible
      assetFiles.forEach(file => {
        try {
          fs.accessSync(file, fs.constants.R_OK)
        } catch (error) {
          missingAssets.push(file)
        }
      })
    } else {
      console.log(`⚠️  Directory not found: ${dir}`)
    }
  })
  
  console.log(`\n📊 Asset Summary:`)
  console.log(`   Total assets found: ${totalAssets}`)
  console.log(`   Missing/inaccessible: ${missingAssets.length}`)
  
  if (missingAssets.length > 0) {
    console.log(`\n❌ Missing assets:`)
    missingAssets.forEach(file => {
      console.log(`   ${file}`)
    })
    process.exit(1)
  } else {
    console.log(`\n✅ All assets are accessible!`)
  }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath)
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file)
    
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
    } else {
      arrayOfFiles.push(fullPath)
    }
  })
  
  return arrayOfFiles
}

// Run asset check
checkAssets()
