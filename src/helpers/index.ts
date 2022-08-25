import qs from "qs";

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

export function getCookie(cookieName: string) {
    let cookie: { [key: string]: string } = {};
    document.cookie.split(";").forEach(function (el) {
        let [key, value] = el.split("=");
        cookie[key.trim()] = value;
    });
    return cookie[cookieName];
}

export function deleteCookie(name: string) {
    document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function getQueryParam(locationSearch: string, paramName: string) {
    return qs.parse(locationSearch, { ignoreQueryPrefix: true })[paramName];
}
