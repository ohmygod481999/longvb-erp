export const getDataGraphqlResult = (data: any) => {
    const key = Object.keys(data).length > 0 ? Object.keys(data)[0] : null;
    if (key) return data[key];
    return null;
};

export const formatDateTime = (date: string, isHaveTime: boolean = true) => {
    const d = new Date(date);
    return `${isHaveTime ? `${String(d.toLocaleTimeString())}, ` : ""}${String(
        d.toLocaleDateString("vi-VN")
    )}`;
};
