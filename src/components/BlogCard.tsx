import { Bookmark, Heart, MessagesSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    title: string;
    excerpt: string;
    coverImage: string;
    author: {
        name: string;
        avatar: string;
    };
    publishedAt: Date;
    readTime: number;
    slug: string;
}

export function BlogCard({ title, excerpt, coverImage, author, publishedAt, readTime, slug }: BlogCardProps) {
    return (
      <div className="w-full max-w-[700px] rounded-xl overflow-hidden border bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl flex flex-col">
         <div className="px-4 py-2">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{author.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(publishedAt, { addSuffix: true })} · {readTime} min read
              </p>
            </div>
          </div>
        </div>
        <Link href={`/blog/${slug}`}>
          <div className="flex justify-between px-4">
            <div className="w-2/3  py-2">
              <h2 className="font-bold text-lg mb-1 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                {title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{excerpt}</p>
            </div>
            <div className="w-1/4 relative h-30">
              <Image
                src={coverImage}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 hover:opacity-80 rounded-r"
              />
            </div>
          </div>
        </Link>
      
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <MessagesSquare className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400" />
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Bookmark className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400" />
          </Button>
        </div>

      </div>
    );
  }