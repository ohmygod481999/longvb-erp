import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { OrdersResponse } from "../../models/order.model";
import { orderQueries } from "../../states/order/order.queries";
import { useProfile } from "./AuthHooks";

export const useQueryOrderCountMonthly = () => {
    const { userProfile } = useProfile();

    const queryOrderDateRangeValues = useQuery<OrdersResponse>(
        orderQueries.GET_ORDER_DATE_RANGE,
        {
            variables: {
                company_id: userProfile?.company_id,
                start: new Date(new Date().getFullYear(), 0, 1), // day start year
                end: new Date(new Date().getFullYear(), 11, 31), // last day year
            },
        }
    );

    const count = useMemo(() => {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (queryOrderDateRangeValues.data) {
            queryOrderDateRangeValues.data.order.forEach((o) => {
                const orderDate = new Date(o.created_at);
                const month = orderDate.getMonth();
                result[month] += 1;
            });
        }
        return result;
    }, [queryOrderDateRangeValues.data]);

    return count;
};
