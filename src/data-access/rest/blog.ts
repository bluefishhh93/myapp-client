import {createApi} from ".";

//get blog by id
export const getBlogById = async (id: string) => {
    const api = await createApi();
    return await api.get(`/post/${id}`);
}

export const getLastDraftId = async (token:string) => {
    const api = createApi(token);
    const response =  await api.get(`/post/last-draft-id`);
    return {draftId: response.data};
}