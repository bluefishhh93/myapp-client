// app/blogs/[blogId]/draft/page.tsx
import { getCurrentUser } from "@/lib/session";
import { DraftBlogForm } from "../../draft-blog-form";
import { notFound, redirect } from "next/navigation";
import { getBlogById } from "@/data-access/graphql/blogs";
import { NotFoundError } from "@/app/utils";
import { isBlogOwnerUseCase } from "@/use-case/blog";
import { Button } from "@/components/ui/button";
import PreviewButton from "../../preview-button";
import PublicButton from "../../public-button";

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
}

export default async function DraftPage({ params }: { params: { blogId: string } }) {
    const { blogId } = params;
    const user = await getCurrentUser();
    
    if (!user) {
        redirect('/sign-in');
        return null;
    }

    const { post } = await getBlogById(blogId);

    if(!post) {
        notFound();
    }

    if (!post || post.status.toString() === Status.ACTIVE.toString()) {
        notFound();
    }   

    const isAuthor = await isBlogOwnerUseCase(user, blogId);

    return (
        <>
            <div className="flex justify-end items-center mb-4">
                <div className="flex space-x-4">
                    <PreviewButton blog={post} />
                    <PublicButton blogId={blogId} />
                </div>
            </div>
            <div className="">

            <DraftBlogForm content={post.content} id={blogId} blogTitle={post.title} isAdminOrAuthor={isAuthor} />
            </div>
        </>
    );
}