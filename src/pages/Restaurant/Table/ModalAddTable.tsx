import React, { useMemo } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { tableMutations } from "../../../states/table/table.mutations";
import { SingleValue } from "react-select";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { useQueryStore } from "../../../Components/Hooks/useQueryStore";
import { useQueryZone } from "../../../Components/Hooks/useQueryZone";

const ModalAddTable = ({
    show,
    onClose,
    onAddSuccess,
    zone,
    store,
}: {
    show: boolean;
    onClose: Function;
    onAddSuccess: Function;
    zone: SingleValue<{
        value: number;
        label: string;
    }> | null;
    store: SingleValue<{
        value: number;
        label: string;
    }> | null;
}) => {
    const { userProfile } = useProfile();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const stores = useQueryStore();

    const watchStore = watch("store_id");

    const storeId = useMemo(() => {
        if (watchStore) return Number(watchStore);
        else if (stores) {
            return stores[0].id;
        }
        return undefined;
    }, [stores, watchStore]);

    const zones = useQueryZone(storeId);

    const [addTable] = useMutation(tableMutations.ADD_TABLE);

    const onSubmit = (data: any) => {
        const { name, store_id, zone_id } = data;

        addTable({
            variables: {
                name,
                zone_id: zone_id,
                store_id: store_id,
                company_id: userProfile?.company_id,
            },
        }).then(() => {
            onClose();
            onAddSuccess();
        });
        // if (zone && store) {
        // }
    };

    return (
        <Modal
            isOpen={show}
            toggle={() => {
                onClose();
            }}
            centered
        >
            <ModalHeader className="bg-light p-3">
                <div className="flex justify-between items-center">
                    Thêm bàn
                    <Button
                        type="button"
                        onClick={() => {
                            onClose();
                        }}
                        className="btn-close"
                        aria-label="Close"
                    ></Button>
                </div>
            </ModalHeader>
            <form>
                <ModalBody>
                    <div className="mb-3">
                        <label
                            htmlFor="customername-field"
                            className="form-label"
                        >
                            Chi nhánh
                        </label>
                        <select
                            {...register("store_id")}
                            className="form-control"
                            // value={store?.label}
                            // disabled
                        >
                            {stores?.map((store) => {
                                return (
                                    <option value={store.id} key={store.id}>
                                        {store.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="customername-field"
                            className="form-label"
                        >
                            Khu vực
                        </label>
                        <select
                            {...register("zone_id")}
                            id="customername-field"
                            className="form-control"
                            // value={zone?.label}
                            // disabled
                        >
                            {zones?.map((zone) => (
                                <option value={zone.id} key={zone.id}>
                                    {zone.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="customername-field"
                            className="form-label"
                        >
                            Tên bàn
                        </label>
                        <input
                            type="text"
                            id="customername-field"
                            className="form-control"
                            placeholder="Nhập tên bàn"
                            {...register("name")}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => onClose()}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            // id="add-btn"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Thêm
                        </button>
                    </div>
                </ModalFooter>
            </form>
        </Modal>
    );
};

export default ModalAddTable;
