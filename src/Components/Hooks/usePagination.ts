import { useMemo, useState } from "react";

export const usePagination = (defaultLimit: number) => {
    const [limit, setLimit] = useState(defaultLimit);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    const pageCount = useMemo(() => {
        return Math.ceil(total / limit);
    }, [total, limit]);

    return { limit, offset, total, pageCount, setLimit, setOffset, setTotal };
};
