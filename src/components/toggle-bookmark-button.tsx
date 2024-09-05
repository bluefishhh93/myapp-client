"use client";
import { useState, useTransition } from "react";
import { toggleBookmarkBlogAction } from "@/app/(blog)/action";
import { Button } from "@/components/ui/button";
import { BookmarkPlusIcon, BookmarkCheckIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { TooltipCustom } from "@/app/blog/bottom-bar";

interface ToggleBookmarkButtonProps {
    blogId: string;
    initialBookmarked: boolean;
}

export function ToggleBookmarkButton({ blogId, initialBookmarked }: ToggleBookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
    const [isPending, startTransition] = useTransition();

    const handleToggleBookmark = async () => {
        startTransition(async () => {
            try {
                const result = await toggleBookmarkBlogAction({ blogId });
                if (result[1]) {
                    throw new Error(result[1].message);
                }
                setIsBookmarked(prevState => {
                    const newState = !prevState;
                    toast({
                        title: "Success",
                        description: newState ? "Bookmark added" : "Bookmark removed",
                        variant: "success",
                    });
                    return newState;
                });
            } catch (error: any) {
                console.error("Error in handleToggleBookmark:", error);
                toast({
                    title: "Error",
                    description: error.message || "Failed to toggle bookmark. Please try again.",
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <TooltipCustom tooltipText={isBookmarked ? "Remove Bookmark" : "Bookmark the Article"}>
            <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleBookmark}
                disabled={isPending}
            >
                {isBookmarked ? (
                    <BookmarkCheckIcon className="fill-slate-400" />
                ) : (
                    <BookmarkPlusIcon className="text-gray-600 dark:text-gray-300" />
                )}
            </Button>
        </TooltipCustom>
    );
}