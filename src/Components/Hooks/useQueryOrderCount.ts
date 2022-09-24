import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { OrdersResponse } from "../../models/order.model";
import { orderQueries } from "../../states/order/order.queries";
import { useProfile } from "./AuthHooks";

export const useQueryOrderCount = (startDate?: Date, endDate?: Date) => {
    const { userProfile } = useProfile();

    const queryOrderCountDateRangeValues = useQuery<OrdersResponse>(
        orderQueries.GET_COUNT_ORDER_DATE_RANGE,
        {
            variables: {
                company_id: userProfile?.company_id,
                start: startDate,
                end: endDate,
            },
        }
    );

    const count = useMemo(() => {
        if (queryOrderCountDateRangeValues.data) {
            return queryOrderCountDateRangeValues.data.order_aggregate.aggregate
                .totalCount;
        }
        return 0;
    }, [queryOrderCountDateRangeValues.data]);

    return count;
};
