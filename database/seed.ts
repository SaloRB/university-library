import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import ImageKit from 'imagekit'

import dummyBooks from '../dummyBooks.json'
import { books } from './schema'

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({ client: sql })

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
})

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({ file: url, fileName, folder })

    return response.filePath
  } catch (error) {
    console.error('Error while uploading image:', error)
  }
}

const seed = async () => {
  console.log('Seeding data...')

  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        '/books/covers'
      )) as string

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        '/books/videos'
      )) as string

      await db.insert(books).values({ ...book, coverUrl, videoUrl })
    }

    console.log('Data seeded successfully!')
  } catch (error) {
    console.error('Error while seeding data:', error)
  }
}

seed()
