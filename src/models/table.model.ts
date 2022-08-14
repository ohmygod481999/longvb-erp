import { GraphqlAggregate } from "./global.model";
import { Zone } from "./zone.model";

export interface Table {
    id: number;
    name: string;
    res_zone: Zone;
    created_at: string;
}

export interface TablesResponse {
    res_table: Table[];
    res_table_aggregate: GraphqlAggregate;
}
