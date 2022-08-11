import { Company } from "./company.model";

export interface Store {
    id: number;
    name: string;
    company: Company;
    created_at: string;
}

export interface StoresResponse {
    store: Store[];
}
