import { getCurrentUser } from "@/lib/session";
import { EditBlogForm } from "../../edit-blog-form";
import { redirect } from "next/navigation";
import { getBlogById } from "@/data-access/graphql/blogs";
import { NotFoundError } from "@/app/utils";
import { isBlogOwnerUseCase } from "@/use-case/blog";

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
        throw new NotFoundError("Blog not found");
    }

    if (!post || !post.published) {
        throw new NotFoundError("Blog not found");
    }

    const isAuthor = await isBlogOwnerUseCase(user, blogId);
    
    if (!isAuthor) {
        redirect('/');
        return null;
    }

    return (
        <>
            <EditBlogForm content={post.content} id={blogId} isAdminOrAuthor={isAuthor} />
        </>
    );
}
