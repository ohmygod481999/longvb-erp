import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { graphqlClient } from "../../helpers/graphql-client";
import { Order, OrdersResponse } from "../../models/order.model";
import {
    Table,
    TablesResponse,
    TableWithOrder,
} from "../../models/table.model";
import { GET_CREATED_ORDER } from "../../states/order/order.queries";
import { GET_TABLES_WHERE } from "../../states/table/table.queries";
import { useProfile } from "./AuthHooks";

export const useQueryTable = (
    store_id?: number,
    zone_id?: number
): [TableWithOrder[] | null, Function] => {
    const { userProfile } = useProfile();
    const [tables, setTables] = useState<TableWithOrder[] | null>(null);

    const queryOrderValues = useQuery<OrdersResponse>(GET_CREATED_ORDER, {
        variables: {
            company_id: userProfile?.company_id,
        },
    });

    const orderTableMap = useMemo(() => {
        if (!queryOrderValues.data) return null;
        const result: { [x: number]: Order } = {};
        queryOrderValues.data.order.forEach((o) => {
            result[o.res_table.id] = o;
        });
        return result;
    }, [queryOrderValues.data]);

    console.log(orderTableMap);

    const fetchTable = () => {
        if (!orderTableMap) {
            return;
        }

        const variables: any = {
            where: {
                company_id: {
                    _eq: userProfile?.company_id,
                },
            },
        };
        if (store_id) {
            variables.where["store_id"] = {
                _eq: store_id,
            };
        }
        if (zone_id) {
            variables.where["zone_id"] = {
                _eq: zone_id,
            };
        }
        graphqlClient
            .query<TablesResponse>({
                query: GET_TABLES_WHERE,
                variables,
                fetchPolicy: "network-only",
            })
            .then(({ data }) => {
                setTables(
                    data.res_table.map((table) => {
                        if (orderTableMap[table.id]) {
                            return {
                                ...table,
                                order: orderTableMap[table.id],
                            };
                        }
                        return {
                            ...table,
                            order: null,
                        };
                    })
                );
                // setTables(data.res_table)
            });
    };

    useEffect(() => {
        fetchTable();
    }, [store_id, zone_id, orderTableMap]);

    console.log(tables)

    return [tables, queryOrderValues.refetch];
};
