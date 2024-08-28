"use client";
import { FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createDraftAction } from "./action";
export default function CreateBlogButton() {
  const router = useRouter();

  const handleCreateDraft = async () => {
    try {
      const [draft, error] = await createDraftAction({
        title: 'New Draft',
        content: 'Draft content here...',
      });

      if (draft) {
        router.push(`/draft/${draft.id}`);
      } else {
        throw new Error(error?.message || 'Unknown error');
      }
    } catch (error: any) {
      throw new Error('Error creating draft', error);
    }
  };

  return (
    <button
      onClick={handleCreateDraft}
      className="flex w-full font-bold text-slate-500 items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-slate-900 dark:text-white rounded-md">
      <FilePlus size={20} />
      <span className="text-sm">New draft</span>
    </button>
  )
}