import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { OrdersResponse } from "../../models/order.model";
import { orderQueries } from "../../states/order/order.queries";
import { useProfile } from "./AuthHooks";

export const useQueryRevenue = (startDate?: Date, endDate?: Date) => {
    const { userProfile } = useProfile();

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

    const revenue = useMemo(() => {
        let result = 0;
        if (queryOrderDateRangeValues.data) {
            queryOrderDateRangeValues.data.order.forEach((o) => {
                o.order_items.forEach((item) => {
                    result += item.product.price * item.quantity;
                });
            });
        }
        return result;
    }, [queryOrderDateRangeValues.data]);

    return revenue;
};
