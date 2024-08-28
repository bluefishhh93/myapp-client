"use client"
import { useToast } from "@/components/ui/use-toast"
import { useServerAction } from "zsa-react";
import { updateBlogContentAction } from "./action";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { MenuBar, extensions } from "@/lib/tiptap";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";



export const EditBlogForm = ({
    id,
    content,
    isAdminOrAuthor
}: {
    id: string,
    content: string,
    isAdminOrAuthor: boolean
}) => {
    const { toast } = useToast();
    const { execute, isPending } = useServerAction(updateBlogContentAction);
    const htmlRef = useRef<string>(content);

    return (
        // <ScrollArea className="h-[500px]">
        <div className={cn("p-4 rounded space-y-4")}>
            <div className="flex justify-between">
                <div className="flex space-x-4">
                    <Button className="w-full text-slate-500 bg-white border border-slate-300 rounded-full py-2 px-4 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 dark:border-slate-600">
                        Preview
                    </Button>
                    <Button className="w-full text-white bg-blue-500 border border-blue-500 rounded-full py-2 px-4 hover:bg-blue-600 dark:bg-blue-700 dark:border-blue-700 dark:hover:bg-blue-800">
                        Public
                    </Button>
                </div>
                {isAdminOrAuthor && (
                    <div className="flex justify-end">
                        <LoaderButton
                            onClick={() => {
                                execute({ blogId: id, content: htmlRef.current }).then(([, err]) => {
                                    if (err) {
                                        toast({
                                            title: "Un-oh!",
                                            description: "The blog content failed to update",
                                            variant: "failure"
                                        })
                                    } else {
                                        toast({
                                            title: "Success!",
                                            description: "The blog content has been updated",
                                            variant: "success"
                                        })
                                    }
                                })
                            }}
                            isLoading={isPending}
                            className="self-end"
                        >
                            Save Changes
                        </LoaderButton>
                    </div>
                )}
            </div>
            <EditorProvider
                onUpdate={({ editor }) => {
                    htmlRef.current = editor.getHTML();
                }}
                slotBefore={isAdminOrAuthor ? <MenuBar /> : null}
                extensions={extensions}
                content={content}
                editable={isAdminOrAuthor}
            >
            </EditorProvider>

        </div>
        // </ScrollArea>
    )

}