import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { StoresResponse } from "../../models/store.model";
import { ZonesResponse } from "../../models/zone.model";
import {
    GET_ALL_STORES_OF_COMPANY,
    GET_ZONE_BY_STORE_ID,
} from "../../states/store/store.queries";
import { useProfile } from "./AuthHooks";

export const useQueryZone = (store_id?: number) => {
    const { userProfile } = useProfile();

    const queryZoneValues = useQuery<ZonesResponse>(GET_ZONE_BY_STORE_ID, {
        variables: {
            company_id: userProfile?.company_id,
            store_id,
        },
    });

    const zones = useMemo(() => {
        if (!store_id) {
            return undefined
        }
        if (queryZoneValues.data) {
            return queryZoneValues.data.res_zone;
        } else return undefined;
    }, [queryZoneValues.data, store_id]);

    return zones;
};
