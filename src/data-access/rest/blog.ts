import api from ".";

//get blog by id
export const getBlogById = async (id: string) => {
    return await api.get(`/post/${id}`);
}
