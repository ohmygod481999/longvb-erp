// @ts-nocheck

import { useCallback, useState } from "react";

export const useModalWithData = <T>(): [
    boolean,
    (data: T) => void,
    () => void,
    T | null
] => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [modalData, setModalData] = useState<T | null>(null);

    const show = useCallback(
        (data: T) => {
            setModalData(data);
            setIsShow(true);
        },
        [isShow]
    );

    const close = useCallback(
        () => {
            setModalData(null);
            setIsShow(false);
        },
        [isShow]
    );

    return [isShow, show, close, modalData];
};
