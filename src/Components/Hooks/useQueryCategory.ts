import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { graphqlClient } from "../../helpers/graphql-client";
import { Order, OrdersResponse } from "../../models/order.model";
import {
    ProductCategory,
    ProductCategoryResponse,
} from "../../models/product.model";
import {
    Table,
    TablesResponse,
    TableWithOrder,
} from "../../models/table.model";
import { GET_CREATED_ORDER } from "../../states/order/order.queries";
import { GET_ALL_PRODUCT_CATEGORY } from "../../states/product/productCategory.queries";
import { GET_TABLES_WHERE } from "../../states/table/table.queries";
import { useProfile } from "./AuthHooks";

export const useQueryCategory = (): ProductCategory[] => {
    const { userProfile } = useProfile();

    const queryProductCategoryValues = useQuery<ProductCategoryResponse>(
        GET_ALL_PRODUCT_CATEGORY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    const categories = useMemo(() => {
        if (queryProductCategoryValues.data) {
            return queryProductCategoryValues.data.product_category;
        }
        return [];
    }, [queryProductCategoryValues.data]);

    return categories;
};
