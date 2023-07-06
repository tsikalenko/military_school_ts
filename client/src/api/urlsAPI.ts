import axios from '../utils/instance/instance';
import { IUrl } from './urlsAPI.type';

export const getUrl = async (name: string) => {
    const { data } = await axios.get<IUrl>(`/urls?name=${name}`);
    return data;
};

export const updateUrl = async (_id: string, url: string) => {
    const { data } = await axios.put<IUrl>('/urls', { _id, url });
    return data;
};
