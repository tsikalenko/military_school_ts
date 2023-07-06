import axios from '../utils/instance/instance';

export const getPage = async (name: string) => {
    const { data } = await axios.get(`/pages?name=${name}`);
    return data;
};

export const updatePage = async (_id: string, pageData: object) => {
    const { data } = await axios.put('/pages', { _id, data: pageData });
    return data;
};
