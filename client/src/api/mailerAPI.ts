import axios from '../utils/instance/instance';
import { ITeamBuilding } from './mailerAPI.type';
import { IParticipants } from './paticipantsAPI.type';

export const sendTeamBuilding = async (data: ITeamBuilding) => {
    await axios.post('/mailer/team-building', data);
};

export const sentEventParticipants = async (participantList: IParticipants[], eventId: number) => {
    await axios.post('/mailer/event', { participantList, eventId });
};
