import { useCallback, useMemo, useState } from "react";

export const useTableCheck = (allIds: number[], isMulti = true) => {
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const check = useCallback(
        (id: number) => {
            if (!isMulti) {
                setCheckedIds([id]);
                return;
            }
            // id hasn't checked
            if (!checkedIds.includes(id)) {
                // add id to checkedIds
                setCheckedIds([...checkedIds, id]);
            }
            // id has checked
            else {
                // remove id from checkedIds
                setCheckedIds(checkedIds.filter((i) => i !== id));
            }
        },
        [checkedIds]
    );

    const isIdChecked = useCallback(
        (id: number) => {
            return checkedIds.includes(id);
        },
        [checkedIds]
    );

    const isCheckAll = useMemo(() => {
        if (allIds.length === 0) {
            return false;
        }
        let result = true;
        for (let id of allIds) {
            if (!checkedIds.includes(id)) {
                result = false;
                break;
            }
        }
        return result;
    }, [allIds, checkedIds]);

    const checkAll = useCallback(() => {
        console.log(allIds);
        if (isCheckAll) {
            setCheckedIds(checkedIds.filter((id) => !allIds.includes(id)));
        } else {
            const checkedIdsFromOtherPage = checkedIds.filter(
                (id) => !allIds.includes(id)
            );
            setCheckedIds([...checkedIdsFromOtherPage, ...allIds]);
        }
    }, [isCheckAll, allIds, checkedIds]);

    const resetCheck = useCallback(() => {
        setCheckedIds([]);
    }, []);

    return { check, checkAll, isIdChecked, isCheckAll, checkedIds, resetCheck };
};
