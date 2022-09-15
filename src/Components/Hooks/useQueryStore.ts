import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { StoresResponse } from "../../models/store.model";
import { GET_ALL_STORES_OF_COMPANY } from "../../states/store/store.queries";
import { useProfile } from "./AuthHooks";

export const useQueryStore = () => {
    const { userProfile } = useProfile();
    const queryStoreValues = useQuery<StoresResponse>(
        GET_ALL_STORES_OF_COMPANY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    const stores = useMemo(() => {
        if (queryStoreValues.data) {
            return queryStoreValues.data.store;
        } else return undefined;
    }, [queryStoreValues.data]);

    return stores;
};
