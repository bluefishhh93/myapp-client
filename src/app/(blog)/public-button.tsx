"use client";
import {redirect} from 'next/navigation';
import {Button} from '@/components/ui/button';
interface PreviewButtonProps {
    blogId: string;
}

const PreviewButton = ({ blogId }: PreviewButtonProps) => {
    
    return (
        <Button
            className="text-slate-500 bg-white border border-slate-300 rounded-full py-2 px-4 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 dark:border-slate-600"
            onClick={() => {
                redirect(`/edit/${blogId}`);
            }}
        >
            Public
        </Button>
    )
}

export default PreviewButton;