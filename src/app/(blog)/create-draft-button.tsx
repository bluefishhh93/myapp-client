"use client";
import { useState } from "react";
import { FilePlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createDraftAction } from "./action";

export default function CreateBlogButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateDraft = async () => {
      setIsLoading(true);
      try {
        const [draft, error] = await createDraftAction({
          title: 'New Draft',
          content: 'Draft content here...',
        });

        if (draft) {
          router.push(`/draft/${draft.id}`);
          router.refresh(); // This will cause the sidebar to re-render with the new draft
        } else {
          throw new Error(error?.message || 'Unknown error');
        }
      } catch (error: any) {
        console.error('Error creating draft', error);
        // Here you might want to show an error message to the user
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <button
      onClick={handleCreateDraft}
      disabled={isLoading}
      className="flex w-full font-bold text-slate-500 items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-slate-900 dark:text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
      {isLoading ? <Loader2 className="animate-spin" size={20} /> : <FilePlus size={20} />}
      <span className="text-sm">{isLoading ? "Creating..." : "New draft"}</span>
    </button>
  )
}