"use client";
import { useState } from "react";
import { toggleBookmarkBlogAction, unBookmarkBlogAction } from "@/app/(blog)/action";
import { Button } from "@/components/ui/button";
import { BookmarkPlusIcon, BookmarkCheckIcon } from "lucide-react";
import { useServerAction } from "zsa-react";

interface UnBookmarkButtonProps {
    blogId: string;
    initialBookmarked: boolean;
}

export function UnBookmarkButton({ blogId }: UnBookmarkButtonProps) {

    const { execute, isPending, error } = useServerAction(unBookmarkBlogAction, {
        onError: ({ error }: any) => {
            console.error(error);
        },
        onSuccess: () => {
        },
    });

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => {
                if (!isPending) {
                    execute({ blogId });
                }
            }}
        >
            <BookmarkCheckIcon className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 fill-current" />
        </Button>
    );
}