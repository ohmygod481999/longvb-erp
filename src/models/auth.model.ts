export interface AccountInfo {
    id: number;
    name: string;
    company_id: number;
    email: string;
    facebook: string;
    phone: string;
    avatar?: string;
}

export interface Auth {
    user: AccountInfo;
}
