import { Company } from "./company.model";

export interface AccountInfo {
    id: number;
    // name: string;
    company_id: number;
    company: Company;
    email: string;
    account_info: {
        name?: string;
        facebook?: string;
        phone?: string;
        avatar?: string;
    };
}

export interface Auth {
    user: AccountInfo;
}
