// Firebase Configuration
// Real Firebase configuration for CoinPhantom project
export const firebaseConfig = {
  apiKey: "AIzaSyCoDtDcP6vRaDBzHmxsqrqArCML0dsxjNE",
  authDomain: "coinphantom-e995b.firebaseapp.com",
  projectId: "coinphantom-e995b",
  storageBucket: "coinphantom-e995b.firebasestorage.app",
  messagingSenderId: "784143371426",
  appId: "1:784143371426:web:0185e75229808663331bfb",
  measurementId: "G-ZPL33FRZNP"
}

// Initialize Firebase services with error handling
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

let app, db, auth, analytics

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
  analytics = getAnalytics(app)
} catch (error) {
  console.warn('Firebase initialization failed:', error)
  // Create mock objects for development
  app = { name: 'mock-app' }
  db = { collection: () => ({}) }
  auth = { currentUser: null }
  analytics = null
}

export { app, db, auth, analytics }

// Make Firebase available globally for legacy scripts
if (typeof window !== 'undefined') {
  window.firebase = {
    app: app,
    firestore: db,
    auth: auth,
    // Add legacy Firebase methods for compatibility
    firestore: {
      collection: (path) => {
        const { collection, query, where, getDocs } = require('firebase/firestore')
        return {
          where: (field, op, value) => {
            return {
              get: async () => {
                const q = query(collection(db, path), where(field, op, value))
                const snapshot = await getDocs(q)
                return {
                  docs: snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: () => doc.data()
                  }))
                }
              }
            }
          },
          get: async () => {
            const snapshot = await getDocs(collection(db, path))
            return {
              docs: snapshot.docs.map(doc => ({
                id: doc.id,
                data: () => doc.data()
              }))
            }
          }
        }
      }
    }
  }
}

