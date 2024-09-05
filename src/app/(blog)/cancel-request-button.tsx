"use client";
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useServerAction } from 'zsa-react';
import { LoaderCircleIcon } from 'lucide-react';
import { updateBlogStatusAction } from './action';
interface PublicButtonProps {
    blogId: string;
}
enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING'
}

const CancelRequestButton = ({ blogId }: PublicButtonProps) => {
    const { toast } = useToast();
    const { execute, isPending, error } = useServerAction(updateBlogStatusAction, {
        onError: ({ error }: any) => {
            toast({
                title: 'Error',
                description: error,
                variant: 'failure'
            })
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Request to publish the article has been cancelled.',
                variant: 'warning'
            })
        }
    })


    return (
        <Button
              className={`text-white bg-orange-500 border border-orange-500 rounded-full py-2 px-4 hover:bg-orange-600 dark:bg-orange-700 dark:text-white dark:hover:bg-orange-800 dark:border-orange-700
                ${isPending ? 'bg-orange-700 dark:bg-orange-900 cursor-not-allowed' : ''}`}// Darker color and disable cursor
        onClick={() => {
            if (!isPending) {
                execute({ blogId, status: Status.INACTIVE });
                redirect(`/draft/${blogId}`);
            }
        }}
        style={{ width: '80px' }}
        disabled={isPending} // Disable button when request is pending
    >
        {isPending ? (
            <LoaderCircleIcon className="animate-spin" /> // Spinning icon
        ) : (
            "Cancel"
        )}
    </Button>
);
}

export default CancelRequestButton;