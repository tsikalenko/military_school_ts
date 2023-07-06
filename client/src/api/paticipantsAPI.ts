import axios from '../utils/instance/instance';
import { IDelete, IParticipants } from './paticipantsAPI.type';

export const createParticipant = async (newParticipant: IParticipants) => {
    const { data } = await axios.post<IParticipants>('/participants', newParticipant);
    return data;
};

export const updateParticipant = async (
    _id: string,
    eventID: string,
    participantData: object,
    payment: number,
    token: string
) => {
    const { data } = await axios.put<IParticipants>('/participants', {
        _id,
        eventID,
        data: participantData,
        payment,
        token,
    });
    return data;
};

export const getParticipantOfEvents = async (eventId: string, token: string) => {
    const { data } = await axios.post<IParticipants[]>('/participants/event', {
        eventId,
        token,
    });
    return data;
};

export const getParticipant = async (participantId: string) => {
    const { data } = await axios.get<IParticipants>(`/participants?id=${participantId}`);
    return data;
};

export const deleteParticipant = async (participantId:string) => {
    const { data } = await axios.delete<IDelete>(`/participants/${participantId}`);
    return data;
};
