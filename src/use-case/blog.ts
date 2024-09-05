// import { User } from "@/types";
import { User } from "next-auth";
import { assertBlogOwner } from "./authorizations";
import { updateBlog, createDraft, getUserBlogs, toggleHeartBlog } from "@/data-access/graphql/blogs";
import {  deletePost, getLastDraftId, toggleBookmarkBlog, unBookmarkBlog, } from "@/data-access/rest/blog";
import { rateLimitByKey } from "@/lib/limiter";


export async function updateBlogContentUseCase(
  authenticatedUser: User,
  {
    blogId,
    content,
    title,
    status
  }: {
    blogId: string;
    content: string;
    title: string;
    status?: Status;
  }
) {
  const updatePayload: { content: string; title?: string; status?: Status } = { content };

  if (title) {
    updatePayload.title = title;
  }

  if (status) {
    updatePayload.status = status;
  }

  await assertBlogOwner(authenticatedUser, blogId);
  await updateBlog(authenticatedUser.accessToken, blogId, updatePayload);
}

export async function updateBlogTitleUseCase(
  authenticatedUser: User,
  {
    blogId,
    title,
  }: {
    blogId: string;
    title: string;
  }
) {
  await assertBlogOwner(authenticatedUser, blogId);
  await updateBlog(authenticatedUser.accessToken, blogId, { title });
}

export async function deleteBlogUseCase(authenticatedUser: User, { blogId }: { blogId: string }) {
  await assertBlogOwner(authenticatedUser, blogId);
  await deletePost(authenticatedUser.accessToken, blogId);
}

export async function updateBlogStatusUseCase(
  authenticatedUser: User,
  {
    blogId,
    status,
  }: {
    blogId: string;
    status: Status;
  }
) {
  await assertBlogOwner(authenticatedUser, blogId);
  await updateBlog(authenticatedUser.accessToken, blogId, { status });
}

export async function createDraftUseCase(
  authenticatedUser: User,
  {
    title,
    content,
  }: {
    title: string;
    content: string;
  }
) {
  const newDraft = await createDraft(authenticatedUser.accessToken, {
    title, content,
  });

  return newDraft;
}

export async function isAdminOrOwnerOfGroupUseCase(
  authenticatedUser: User | undefined,
  blogId: string
) {
  // return isAdminOrOwnerOfGroup(authenticatedUser, blogId);


}

export async function isBlogOwnerUseCase(
  authenticatedUser: User | undefined,
  blogId: string
): Promise<boolean> {
  if (!authenticatedUser) {
    return false;
  }

  try {
    await assertBlogOwner(authenticatedUser, blogId);
    return true;
  } catch (e) {
    return false;
  }
}

export async function getBlogsUserUseCase({
  id,
  published,
  status,
}: {
  id: string;
  published?: boolean;
  status?: Status;
}): Promise<Post[]> {
  const response = await getUserBlogs({ userId: id, published, status });
  return response.userPosts;
}

export async function getLastDraftIdUseCase(
  authenticatedUser: User
) {
  return await getLastDraftId(authenticatedUser.accessToken);
}

export async function toggleBookmarkBlogUseCase(
  authenticatedUser: User,
  blogId: string
): Promise<{ isBookmarked: boolean }> {
  return await toggleBookmarkBlog({ token: authenticatedUser.accessToken, postId: blogId });
}

export async function unBookmarkBlogUseCase(
  authenticatedUser: User,
  blogId: string
) {
  return await unBookmarkBlog({ token: authenticatedUser.accessToken, postId: blogId });
}

export async function toggleHeartBlogUseCase(
  authenticatedUser: User,
  blogId: string
) {
  return await toggleHeartBlog(authenticatedUser.accessToken, blogId);
}