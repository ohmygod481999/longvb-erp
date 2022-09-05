import { Configuration, V0alpha2Api } from "@ory/client";

export const ory = new V0alpha2Api(new Configuration({
    basePath: process.env.REACT_APP_KRATOS_URL,
    baseOptions: {
        // headers: {
        //     withCredentials: true
        // }
    }
}));
export default ory;
