import qs from "qs";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi";
TimeAgo.addDefaultLocale(vi);

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

export const formatMoney = (amount: number) => {
    var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(amount);
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

export const timeAgo = (date: Date) => {
    const tAgo = new TimeAgo("vi-VN");
    return tAgo.format(date);
};
