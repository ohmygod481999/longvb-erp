import { Configuration, V0alpha2Api } from "@ory/client";

export const ory = new V0alpha2Api(new Configuration({
    basePath: "https://longvb.ddns.net:5533",
    baseOptions: {
        // headers: {
        //     withCredentials: true
        // }
    }
}));
export default ory;
