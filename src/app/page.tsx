import { BlogCard } from "@/components/BlogCard";
import Image from "next/image";
const blogPosts = [
  {
    title: "Introduction to Next.js",
    excerpt: "Learn the basics of Next.js and why it's a great framework for React applications.",
    coverImage: "/default-cover.jpg",
    author: {
      name: "John Doe",
      avatar: "/images/john-doe-avatar.jpg",
    },
    publishedAt: new Date("2023-08-01"),
    readTime: 5,
    slug: "introduction-to-nextjs",
  },
  // ... more blog posts
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-8 place-items-center">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </main>
  );
}

