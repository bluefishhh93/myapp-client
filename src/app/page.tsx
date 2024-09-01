import { Suspense } from 'react';
import BlogList from '@/components/blog-list';
// import SearchBar from '@/components/SearchBar';
import { Loading } from '@/components/blog-list';

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4">
      <div className="w-full max-w-5xl">
        {/* <SearchBar /> */}
        <Suspense fallback={<Loading />}>
          <BlogList />
        </Suspense>
      </div>
    </main>
  );
}