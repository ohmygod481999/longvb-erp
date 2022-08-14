import { Company } from "./company.model";
import { Store } from "./store.model";

export interface Zone {
    id: number;
    name: string;
    store: Store;
    created_at: string;
}

export interface ZonesResponse {
    res_zone: Zone[];
}
