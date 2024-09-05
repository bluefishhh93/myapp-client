"use client";
import { useState } from "react";
import { toggleBookmarkBlogAction } from "@/app/(blog)/action";
import { Button } from "@/components/ui/button";
import { BookmarkPlusIcon, BookmarkCheckIcon } from "lucide-react";
import { useServerAction } from "zsa-react";

interface BookmarkButtonProps {
    blogId: string;
    initialBookmarked: boolean;
}

export function UnBookmarkButton({ blogId }: BookmarkButtonProps) {

    const { execute, isPending, error } = useServerAction(toggleBookmarkBlogAction, {
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
            <BookmarkPlusIcon className="text-gray-600 dark:text-gray-300" />
        </Button>
    );
}