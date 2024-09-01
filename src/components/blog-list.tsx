'use client';

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { BlogCard } from "./BlogCard";
import { useBlogs } from "@/hooks/use-blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateReadingTime } from "@/app/utils";
export const Loading: React.FC = () => {
    return (
        <div className="w-full max-w-[700px] rounded-xl overflow-hidden border bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl flex flex-col">
            <div className="px-4 py-2">
                <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-3" />
                    <div>
                        <Skeleton className="w-24 h-4 mb-1" />
                        <Skeleton className="w-32 h-3" />
                    </div>
                </div>
            </div>
            <div className="flex justify-between px-4">
                <div className="w-2/3 py-2">
                    <Skeleton className="w-3/4 h-6 mb-2" />
                    <Skeleton className="w-full h-4 mb-1" />
                    <Skeleton className="w-full h-4 mb-1" />
                    <Skeleton className="w-3/4 h-4" />
                </div>
                <div className="w-1/4 relative h-28">
                    <Skeleton className="w-full h-full rounded" />
                </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                    <Skeleton className="w-8 h-8 rounded" />
                    <Skeleton className="w-8 h-8 rounded" />
                </div>
                <Skeleton className="w-8 h-8 rounded" />
            </div>
        </div>
    );
};

export default function BlogList() {
    const { blogs, isError, isLoading, isReachingEnd, size, setSize } = useBlogs();
    const { ref, inView } = useInView(
        {
            threshold: 0,
        }
    );

    useEffect(() => {
        if (inView && !isReachingEnd) {
            setSize(size + 1);
        }
    }, [inView, isReachingEnd]);

    if (isError) return <div>Error loading blogs</div>;

    return (
        <>
            <div className="grid grid-cols-1 gap-8 place-items-center">
                {blogs.map((post) => (
                    <BlogCard
                        key={post.id}
                        title={post.title}
                        coverImage="/default-cover.jpg"
                        content={post.content}
                        author={{
                            name: `${post.author.firstname} ${post.author.lastname}`,
                            avatar: post.author.image || '/default-avatar.jpg',
                        }}
                        publishedAt={new Date(post.createdAt)}
                        readTime={calculateReadingTime(post.content)}
                        slug={post.id}
                    />
                ))}
                {/* {isLoading && <Loading />} */}
            </div>
            {!isReachingEnd && (
                <div ref={ref} className="flex justify-center mt-8">
                    <Loading />
                </div>
            )}

            {isReachingEnd && <div className="flex justify-center mt-8">You have reached the end!</div>}
        </>
    )
}
