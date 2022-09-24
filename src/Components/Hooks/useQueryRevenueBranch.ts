import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { OrdersResponse } from "../../models/order.model";
import { Store, StoreWithRevenue } from "../../models/store.model";
import { orderQueries } from "../../states/order/order.queries";
import { useProfile } from "./AuthHooks";
import { useQueryStore } from "./useQueryStore";

export const useQueryRevenueBranch = (startDate?: Date, endDate?: Date) => {
    const { userProfile } = useProfile();

    const stores = useQueryStore();

    const queryOrderDateRangeValues = useQuery<OrdersResponse>(
        orderQueries.GET_ORDER_DATE_RANGE,
        {
            variables: {
                company_id: userProfile?.company_id,
                start: startDate,
                end: endDate,
            },
        }
    );

    const storeRevenue = useMemo(() => {
        if (!stores || !queryOrderDateRangeValues.data) return [];

        const storesMap: { [key: number]: StoreWithRevenue } = {};
        stores.forEach((store) => {
            storesMap[store.id] = {
                ...store,
                revenue: 0,
            };
        });

        queryOrderDateRangeValues.data.order.forEach((o) => {
            let orderValue = 0;
            o.order_items.forEach((item) => {
                orderValue += item.product.price * item.quantity;
            });
            storesMap[o.store.id] = {
                ...storesMap[o.store.id],
                revenue: (storesMap[o.store.id].revenue += orderValue),
            };
        });
        return Object.keys(storesMap).map((key) => storesMap[parseInt(key)]);
    }, [queryOrderDateRangeValues.data, stores]);

    return storeRevenue;
};
