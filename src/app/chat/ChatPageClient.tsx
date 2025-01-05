'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useChat } from 'ai/react';
import { clsx } from 'clsx';
import { ArticleWithSlug } from '@/lib/shared-types';
import Container from '@/app/_components/container';
import { Spinner } from '@/app/_components/spinner';

const prepopulatedQuestions = [
  "What are the benefits of WebAssembly?",
  "How can I optimize microservices?",
  "What are the best practices for LLM fine-tuning?",
  "Tell me about GraphQL Federation",
  "What are the challenges with embedded Rust?",
  "How do you deploy ML models to production?",
];

export default function ChatPageClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleWithSlug[]>([]);

  const { messages, input, setInput, handleSubmit } = useChat({
    api: '/api/chat',
    onResponse(response) {
      const sourcesHeader = response.headers.get('x-sources');
      const parsedArticles: ArticleWithSlug[] = sourcesHeader
        ? (JSON.parse(atob(sourcesHeader as string)) as ArticleWithSlug[])
        : [];
      setArticles(parsedArticles);
      setIsLoading(false);
    },
    onError() {
      setIsLoading(false);
    }
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleSubmit(e);
  };

  const handleSearch = async (query: string) => {
    setInput(query);
    const customSubmitEvent = {
      preventDefault: () => { },
    } as unknown as React.FormEvent<HTMLFormElement>;
    await handleSubmit(customSubmitEvent);
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto mt-16 sm:mt-32">
        <div className="flex flex-col md:flex-row items-start mb-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl mb-6">
              Chat with the Blog
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
              Ask questions about the blog posts using our RAG-powered chat interface.
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="mb-8">
          <form onSubmit={handleFormSubmit} className="flex gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 p-2 border rounded-md"
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {prepopulatedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSearch(q)}
                className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat messages and related posts */}
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 pr-0 md:pr-6 mb-6 md:mb-0">
            {messages.map((m) => (
              <div
                key={m.id}
                className="mb-4 whitespace-pre-wrap text-lg leading-relaxed"
              >
                <span
                  className={clsx('font-bold', {
                    'text-blue-700': m.role === 'user',
                    'text-green-700': m.role !== 'user',
                  })}
                >
                  {m.role === 'user' ? 'You: ' : 'Assistant: '}
                </span>
                {m.content}
              </div>
            ))}
            {isLoading && <Spinner />}
          </div>
          <div className="md:w-1/3">
            {articles.length > 0 && (
              <div className="">
                <h3 className="mb-4 text-xl font-semibold">Related Posts</h3>
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.slug} className="p-4 border rounded-lg">
                      <Link href={`/posts/${article.slug}`}>
                        <h4 className="font-medium hover:text-blue-500">{article.title}</h4>
                      </Link>
                      <p className="text-sm text-gray-600">{article.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
} 