import { GraphqlAggregate } from "./global.model";
import { Product } from "./product.model";
import { Store } from "./store.model";
import { Table } from "./table.model";

export enum OrderStatus {
    CREATED = "created",
    SUCCESS = "success",
}

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    order_items: OrderItem[];
    status: OrderStatus; //eslint-disable-line
    updated_at: string;
    created_at: string;
    store: Store;
    res_table: Table;
}

export interface OrdersResponse {
    order: Order[];
    order_aggregate: GraphqlAggregate;
}

export interface OrderResponse {
    order_by_pk: Order;
}