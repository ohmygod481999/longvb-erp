import { useEffect, useState } from "react";
import { graphqlClient } from "../../helpers/graphql-client";
import { Product, ProductsResponse } from "../../models/product.model";
import { productQueries } from "../../states/product/product.queries";
import { useProfile } from "./AuthHooks";
import { usePagination } from "./usePagination";

export const useQueryProduct = (
    category_id?: number
): [
    Product[],
    {
        limit: number;
        offset: number;
        total: number;
        pageCount: number;
        setLimit: Function;
        setOffset: Function;
        setTotal: Function;
    }
] => {
    const { userProfile } = useProfile();
    const { limit, offset, total, pageCount, setLimit, setOffset, setTotal } =
        usePagination(5);

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const variables: any = {
            company_id: userProfile?.company_id,
            limit,
            offset,
            category_exp: {}
        };
        if (category_id) {
            variables["category_exp"] = {
                _eq: category_id,
            };
        }
        graphqlClient
            .query<ProductsResponse>({
                query: productQueries.GET_PRODUCT_PAGINATION,
                variables,
            })
            .then(({ data }) => {
                setProducts(data.product);
                setTotal(data.product_aggregate.aggregate.totalCount);
            });
    }, [limit, offset, category_id]);

    return [
        products,
        { limit, offset, total, pageCount, setLimit, setOffset, setTotal },
    ];
};
