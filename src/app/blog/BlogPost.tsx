import { BlogContentRenderer } from './BlogContentRenderer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; // Adjust import path as needed
import { BookOpen } from 'lucide-react';
import { BottomBar } from './bottom-bar';

interface BlogPostProps {
  post: Post;
  author: User;
}

function stripHtmlTags(content: string) {
  return content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function calculateReadingTime(content: string) {
  const plainText = stripHtmlTags(content);
  const wordsPerMinute = 200; // Average reading speed
  const words = plainText.split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

export function BlogPost({ post, author }: BlogPostProps) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <article className="max-w-4xl mx-auto px-6">
      <BottomBar />
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 mb-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={author.image} alt={`${author.firstname} ${author.lastname}`} className="rounded-full" />
              <AvatarFallback>
                {author.firstname?.charAt(0) || ''}{author.lastname?.charAt(0) || ''}
              </AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {author.firstname} {author.lastname}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-md text-gray-600 dark:text-gray-400">
            <p>
              {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span className="flex items-center">
              <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-1" />
              {readingTime} min read
            </span>
          </div>
        </div>
      </header>
      <section className="mt-8">
        <BlogContentRenderer content={post.content} />
      </section>
    </article>
  );
}
