import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { getEndDayOfYear, getFirstDayOfYear } from "../../helpers";
import { OrdersResponse } from "../../models/order.model";
import { orderQueries } from "../../states/order/order.queries";
import { useProfile } from "./AuthHooks";

export const useQueryRevenueMonthly = () => {
    const { userProfile } = useProfile();

    const queryOrderDateRangeValues = useQuery<OrdersResponse>(
        orderQueries.GET_ORDER_DATE_RANGE,
        {
            variables: {
                company_id: userProfile?.company_id,
                start: getFirstDayOfYear(), // day start year
                end: getEndDayOfYear(), // last day year
            },
        }
    );

    const revenue = useMemo(() => {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (queryOrderDateRangeValues.data) {
            queryOrderDateRangeValues.data.order.forEach((o) => {
                const orderDate = new Date(o.created_at);
                const month = orderDate.getMonth();
                let revenue = 0;
                o.order_items.forEach((item) => {
                    revenue += item.product.price * item.quantity;
                });
                result[month] += revenue;
            });
        }
        return result;
    }, [queryOrderDateRangeValues.data]);

    return revenue;
};
