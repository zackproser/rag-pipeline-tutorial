import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { PineconeRecord } from "@pinecone-database/pinecone"
import { Metadata, getContext } from '../../services/context'
import { importArticleMetadata } from '../../../lib/articles'
import path from 'path';
import { ArticleWithSlug } from '../../../lib/shared-types';
import dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: '.env.local' });

// Check for required environment variables
if (!process.env.OPENAI_API_KEY || !process.env.PINECONE_API_KEY) {
  throw new Error('Missing required environment variables OPENAI_API_KEY or PINECONE_API_KEY');
}

// Allow this serverless function to run for up to 5 minutes
export const maxDuration = 300;

export async function POST(req: Request) {
  console.log("Chat API route hit");
  const { messages } = await req.json();
  console.log("Messages received:", messages);

  const lastMessage = messages[messages.length - 1]
  console.log("Processing message:", lastMessage.content);

  // Get the context from the last message
  const context = await getContext(lastMessage.content, '', 3000, 0.35, false)

  // Create a new set for blog urls and collect relevant text
  let blogUrls = new Set<string>()
  let docs: string[] = [];

  (context as PineconeRecord[]).forEach(match => {
    const metadata = match.metadata as Metadata;
    blogUrls.add(metadata.source);
    docs.push(metadata.text);
  });

  let relatedBlogPosts: ArticleWithSlug[] = []

  // Get metadata for related posts
  for (const blogUrl of blogUrls) {
    // Just use the filename directly since we know it's in _posts
    const filename = path.basename(blogUrl)
    const { slug, ...metadata } = await importArticleMetadata(filename);
    relatedBlogPosts.push({ slug, ...metadata });
  }

  // Join all context documents with clear separators
  const contextText = docs.map((doc, i) => `
    RELEVANT CONTENT ${i + 1}:
    ${doc}
  `).join('\n\n');

  const prompt = `
    You are a helpful and knowledgeable AI assistant.
    You provide accurate, thoughtful responses based on available information.
    You aim to be clear, informative, and friendly in your interactions.
    
    Here is the relevant content to help answer the user's question:

    ${contextText}

    Instructions:
    1. Use ONLY the information provided above to answer the question
    2. If you can't find the answer in the provided content, say "I don't have enough information to answer that question."
    3. Be specific and cite information from the relevant content when possible
    4. Maintain a professional and helpful tone
  `;

  console.log('Prompt being sent to LLM:', prompt);

  const result = streamText({
    model: openai.chat('gpt-4o'),
    system: prompt,
    prompt: lastMessage.content,
  });

  const serializedArticles = Buffer.from(
    JSON.stringify(relatedBlogPosts)
  ).toString('base64')

  return result.toDataStreamResponse({
    headers: {
      'x-sources': serializedArticles
    }
  });
} 