import { GraphqlAggregate } from "./global.model";
import { Order } from "./order.model";
import { Store } from "./store.model";
import { Zone } from "./zone.model";

export interface Table {
    id: number;
    name: string;
    res_zone: Zone;
    store: Store;
    created_at: string;
}

export interface TableWithOrder extends Table {
    order: Order | null;
}

export interface TablesResponse {
    res_table: Table[];
    res_table_aggregate: GraphqlAggregate;
}

export interface TableQrCodeResponse {
    tableQrCode: {
        url: string;
    };
}
