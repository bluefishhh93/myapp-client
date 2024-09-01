// import { User } from "@/types";
import { User } from "next-auth";
import { assertBlogOwner } from "./authorizations";
import { updateBlog, createDraft, getUserBlogs } from "@/data-access/graphql/blogs";
import { getLastDraftId } from "@/data-access/rest/blog";


export async function updateBlogContentUseCase(
  authenticatedUser: User,
  {
    blogId,
    content,
    title
  }: {
    blogId: string;
    content: string;
    title: string;
  }
) {
  const updatePayload: { content: string; title?: string } = { content };

  if (title) {
    updatePayload.title = title;
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

export function getLastDraftIdUseCase(
  authenticatedUser: User
) {
  return getLastDraftId(authenticatedUser.accessToken);
}