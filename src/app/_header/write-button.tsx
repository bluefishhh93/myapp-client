"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import ButtonIcon from "@/components/button-icon";
import { PenLineIcon } from "lucide-react";
import { User } from "next-auth";
import { getLastDraftIdUseCase } from "@/use-case/blog";
import { createDraftAction } from "../(blog)/action";

interface WriteButtonProps {
    user: User;
}

async function handleDraftNavigation(user: User) {
    const  { draftId }  = await getLastDraftIdUseCase(user);

    if (draftId) {
        return draftId;
    }

    const [newDraft , error] = await createDraftAction({
        title: 'New Draft',
        content: 'Draft content here...',
    });

    if (newDraft) {
        return newDraft.id;
    }

    throw new Error(error?.message || 'Unknown error');
}

export default function WriteButton({ user }: WriteButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            try {
                const  draftId  = await handleDraftNavigation(user);
                router.push(`/draft/${draftId}`);
            } catch (error) {
                console.error("Error in WriteButton click handler:", error);
                // TODO: Implement user-facing error handling
            }
        });
    };

    return (
        <ButtonIcon
            className={`rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 ${isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
            icon={PenLineIcon}
            onClick={handleClick}
            disabled={isPending}
        >
            Write
        </ButtonIcon>
    );
}