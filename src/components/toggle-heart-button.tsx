"use client";
import { useState, useTransition } from "react";
import { toggleHeartBlogAction } from "@/app/(blog)/action";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TooltipCustom } from "@/app/blog/bottom-bar";

interface ToggleHeartButtonProps {
    blogId: string;
    initialHearted: boolean;
    initialHeartCount: number;
}

export function ToggleHeartButton({ blogId, initialHearted, initialHeartCount }: ToggleHeartButtonProps) {
    const [isHearted, setIsHearted] = useState(initialHearted);
    // const [heartCount, setHeartCount] = useState(initialHeartCount);
    const [isPending, startTransition] = useTransition();

    const queryClient = useQueryClient();

    const handleToggleHeart = async () => {
        startTransition(async () => {
            try {
                const result = await toggleHeartBlogAction({ blogId });
                if (result[1]) {
                    throw new Error(result[1].message);
                }
                setIsHearted(prevState => {
                    const newState = !prevState;
                    toast({
                        title: "Success",
                        description: newState ? "Post liked" : "Post unliked",
                        variant: "success",
                    });
                    // Invalidate the relevant query
                    queryClient.invalidateQueries({
                        queryKey: ['postInteractions', blogId]
                    });
                    return newState;
                });
            } catch (error: any) {
                console.error("Error in handleToggleHeart:", error);
                toast({
                    title: "Error",
                    description: error.message || "Failed to toggle like. Please try again.",
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <TooltipCustom tooltipText={isHearted ? "Unlike" : "Like the Article"}>
            <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleHeart}
                disabled={isPending}
            >
                <Heart className={`${isHearted ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`} />
                {/* <span className="ml-1">{heartCount}</span> */}
            </Button>
        </TooltipCustom>
    );
}