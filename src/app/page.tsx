import { Suspense } from 'react';
import BlogList from '@/components/blog-list';
// import SearchBar from '@/components/SearchBar';
import { Loading } from '@/components/blog-list';
import { getBookmarkedPostIds } from '@/data-access/graphql/blogs';
import { getCurrentUser } from '@/lib/session';
import { TooltipProvider } from '@/components/ui/tooltip';

export default async function BlogPage() {
  const user = await getCurrentUser();

  let bookmarksId: string[] = [];
  if (user) {
    const { bookmarkedPosts } = await getBookmarkedPostIds(user.accessToken);
    bookmarksId = bookmarkedPosts.map(post => post.id);
  }
  const isSignedIn = !!user;
  const isHearted = false;
  return (
    <TooltipProvider>
      <main className="flex min-h-screen flex-col items-center justify-start p-4">
        <div className="w-full max-w-5xl">
          <Suspense fallback={<Loading />}>
            <BlogList bookmarkIds={bookmarksId} isSignedIn={isSignedIn} isHearted={isHearted}/>
          </Suspense>
        </div>
      </main>
    </TooltipProvider>
  );
}