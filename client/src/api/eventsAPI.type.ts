interface IFields {
    name: string;
    description: string;
}
export interface IEvent {
    _id?: string;
    title: string;
    price: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description: string;
    img?: string;
    letterSubject: string;
    letterHtml: string;
    payBtn?: string;
    fields: IFields[];
    maxQuantity: number;
    freeSlots: number;
    enable: boolean;
};