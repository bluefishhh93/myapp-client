"use client";
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useServerAction } from 'zsa-react';
import { CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { updateBlogContentAction, updateBlogStatusAction } from './action';
interface PublicButtonProps {
    blogId: string;
}
enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING'
}

const PublicButton = ({ blogId }: PublicButtonProps) => {
    const { toast } = useToast();
    const { execute, isPending, error } = useServerAction(updateBlogStatusAction, {
        onError: ({ error }: any) => {
            toast({
                title: 'Error',
                description: error,
                variant: 'destructive'
            })
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Blog has been requested for review',
                variant: 'success'
            })
        }
    })


    return (
        <Button
              className={`text-white bg-blue-500 border border-blue-500 rounded-full py-2 px-4 hover:bg-blue-600 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800 dark:border-blue-700
                ${isPending ? 'bg-blue-700 dark:bg-blue-900 cursor-not-allowed' : ''}`}// Darker color and disable cursor
        onClick={() => {
            if (!isPending) {
                execute({ blogId, status: Status.PENDING });
                redirect(`/edit/${blogId}`);
            }
        }}
        style={{ width: '80px' }}
        disabled={isPending} // Disable button when request is pending
    >
        {isPending ? (
            <LoaderCircleIcon className="animate-spin" /> // Spinning icon
        ) : (
            "Public"
        )}
    </Button>
);
}

export default PublicButton;