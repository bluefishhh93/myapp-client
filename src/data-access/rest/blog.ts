import { createApi } from ".";

//get blog by id
export const getBlogById = async (id: string) => {
    const api = createApi();
    return await api.get(`/post/${id}`);
}

export const getLastDraftId = async (token: string) => {
    const api = createApi(token);
    const response = await api.get(`/post/last-draft-id`);
    return { draftId: response.data };
}

export const deletePost = async (token: string, id: string) => {
    const api = createApi(token);
    return await api.delete(`/post/${id}`);
}

export const toggleBookmarkBlog = async ({ token, postId }: { token: string, postId: string }): Promise<{ isBookmarked: boolean }> => {
    const api = createApi(token);
    const response = await api.put(`/post/${postId}/toggle-bookmark`);
    return response.data;
}

export const bookmarkBlog = async ({ token, postId }: { token: string, postId: string }): Promise<{ isBookmarked: boolean }> => {
    const api = createApi(token);
    const response = await api.put(`/post/${postId}/bookmark`);
    return response.data;
}

export const unBookmarkBlog = async ({ token, postId }: { token: string, postId: string }) => {
    const api = createApi(token);
    return await api.delete(`/post/${postId}/unbookmark`);
}

export const isBookmarked = async ({ userId, postId }: { userId: string; postId: string }): Promise<boolean> => {
    const api = createApi();
    const response = await api.get(`/post/${userId}/${postId}`);
    return response.data.saved;
};

