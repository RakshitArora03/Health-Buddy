import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    console.log('Attempting to connect to database...')
    const { db } = await connectToDatabase()
    console.log('Connected to database successfully')
    
    console.log('Creating index on users collection...')
    await db.collection('users').createIndex({ uniqueId: 1 }, { unique: true })
    console.log('Index created successfully')
    
    res.status(200).json({ message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Error initializing database:', error)
    res.status(500).json({ message: 'Error initializing database', error: error.toString() })
  }
}
