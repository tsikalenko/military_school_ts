import axios from '../utils/instance/instance';
import { IEvent } from './eventsAPI.type';

export const createEvent = async (newEvent: IEvent) => {
    const { data } = await axios.post<IEvent>('/events', newEvent);
    return data;
};

export const getAllEvents = async () => {
    const { data } = await axios.get<IEvent[]>('/events');
    return data;
};

export const getEnableEvents = async () => {
    const { data } = await axios.get<IEvent[]>('/events/enable');
    return data;
};

export const getEvent = async (eventID: number) => {
    const { data } = await axios.get<IEvent>(`/events?id=${eventID}`);
    return data;
};

export const updateEvent = async (eventData: IEvent) => {
    const { data } = await axios.put<IEvent>('/events', eventData);
    return data;
};
