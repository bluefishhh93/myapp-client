// app/blogs/[blogId]/draft/page.tsx
import { getCurrentUser } from "@/lib/session";
import { DraftBlogForm } from "../../draft-blog-form";
import { notFound, redirect } from "next/navigation";
import { getBlogById } from "@/data-access/graphql/blogs";
import { isBlogOwnerUseCase } from "@/use-case/blog";
import PreviewButton from "../../preview-button";
import PublicButton from "../../public-button";
import { ClockArrowUp, Timer } from "lucide-react";
import CancelRequestButton from "../../cancel-request-button";

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
}

export default async function DraftPage({ params }: { params: { blogId: string } }) {
    const { blogId } = params;
    const user = await getCurrentUser();

    if (!user) {
        redirect('/sign-in');
        return null;
    }

    const { post } = await getBlogById(blogId);

    if (!post) {
        notFound();
    }

    if (!post || post.status.toString() === Status.ACTIVE.toString()) {
        notFound();
    }

    const isAuthor = await isBlogOwnerUseCase(user, blogId);

    if (!isAuthor) {
        redirect('/');
        return null;
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    {post.status.toString() === Status.PENDING.toString() && (
                        <>
                            <ClockArrowUp className="w-6 h-6 text-yellow-800 dark:text-yellow-200" />
                            <span className="text-sm text-yellow-800 dark:text-yellow-200">Pending</span>
                        </>
                    )}
                </div>

                <div className="flex space-x-4">
                    <PreviewButton blog={post} />
                    {
                        post.status.toString() === Status.PENDING.toString() ? (
                            <CancelRequestButton blogId={blogId} />
                        ) : (
                            <PublicButton blogId={blogId} />
                        )
                    }
                </div>
            </div>

            <div className="">
                <DraftBlogForm content={post.content} id={blogId} blogTitle={post.title} isAdminOrAuthor={isAuthor} />
            </div>

        </>
    );
}