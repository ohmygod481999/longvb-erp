import { Company } from "./company.model";

export interface Store {
    id: number;
    name: string;
    company: Company;
    created_at: string;
}

export interface StoreWithRevenue extends Store {
    revenue: number;
}

export interface StoresResponse {
    store: Store[];
}
