"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from '@tanstack/react-query';
import { getPostInteractions } from '@/data-access/graphql/blogs';

interface HeartCountDisplayProps {
  postId: string;
  initialHeartCount: number;
}

export function HeartCountDisplay({ postId, initialHeartCount }: HeartCountDisplayProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['postInteractions', postId],
    queryFn: () => getPostInteractions({ blogId: postId }),
    initialData: { heart: initialHeartCount, likedBy: [] },
  });

  if (error) {
    console.error('Error fetching post interactions:', error);
    return <div>Error loading heart count</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <span className='text-sm cursor-pointer hover:underline'>{data.heart}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users who liked this post</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {data.likedBy.map((user) => (
              <div key={user.id} className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.image ?? '/default-avatar.png'} alt={`${user.firstname} ${user.lastname}`} />
                  <AvatarFallback>{user.firstname?.[0] ?? ''}{user.lastname?.[0] ?? ''}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{user.firstname} {user.lastname}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}