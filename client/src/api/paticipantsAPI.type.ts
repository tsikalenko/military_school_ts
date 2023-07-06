export interface IParticipants{
    eventId: string;
    data: object;
    payment: number
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
}

export interface IDelete {
    message: string;
}