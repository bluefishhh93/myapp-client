// app/blogs/[blogId]/draft/page.tsx
import { getCurrentUser } from "@/lib/session";
import { DraftBlogForm } from "../../draft-blog-form";
import { redirect } from "next/navigation";
import { getBlogById } from "@/data-access/graphql/blogs";
import { NotFoundError } from "@/app/utils";
import { isBlogOwnerUseCase } from "@/use-case/blog";
import { Button } from "@/components/ui/button";
import PreviewButton from "../../preview-button";

export default async function DraftPage({ params }: { params: { blogId: string } }) {
    const { blogId } = params;
    const user = await getCurrentUser();

    if (!user) {
        redirect('/sign-in');
        return null;
    }

    const { post } = await getBlogById(blogId);

    if (!post) {
        throw new NotFoundError("Blog not found");
    }   

    const isAuthor = await isBlogOwnerUseCase(user, blogId);

    return (
        <>
            <div className="flex justify-end items-center mb-4">
                <div className="flex space-x-4">
                    <PreviewButton blogId={blogId} />
                    <Button className="text-white bg-blue-500 border border-blue-500 rounded-full py-2 px-4 hover:bg-blue-600 dark:bg-blue-700 dark:border-blue-700 dark:hover:bg-blue-800">
                        Public
                    </Button>
                </div>
            </div>
            <div className="">

            <DraftBlogForm content={post.content} id={blogId} blogTitle={post.title} isAdminOrAuthor={isAuthor} />
            </div>
        </>
    );
}