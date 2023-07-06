import axios from '../utils/instance/instance';
import { IAdmin, ILogin } from './userAPI.type';

export const login = async (username: string, password:string) => {
    const { data } = await axios.post<ILogin>('/auth/login', { username, password });
    return data;
};

export const admin = async (token: string) => {
    const { data } = await axios.post<IAdmin>('/auth/admin', { token });
    return data;
};
