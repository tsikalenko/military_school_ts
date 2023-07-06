const createLeadMsg = (data, eventInfo) => {
    const keys = Object.keys(data);
    const fields = keys.map((field) => {
        return `\n<b>${field}</b>: ${data[field]}`;
    });
    return `<b>${eventInfo.title}</b>\n${eventInfo.startDate}, ${eventInfo.startTime}\n${fields}`;
};

export default createLeadMsg;
