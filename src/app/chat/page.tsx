import { Metadata } from 'next'
import ChatPageClient from './ChatPageClient'

export const metadata: Metadata = {
  title: 'Chat with the Blog',
  description: 'Ask questions about our blog posts using our RAG-powered chat interface.',
}

export default async function Page() {
  return (
    <main>
      <ChatPageClient />
    </main>
  )
} 