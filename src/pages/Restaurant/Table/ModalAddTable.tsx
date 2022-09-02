import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { tableMutations } from "../../../states/table/table.mutations";
import { SingleValue } from "react-select";

const ModalAddTable = ({
    show,
    onClose,
    onAddSuccess,
    zone,
    store
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
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [addTable] = useMutation(tableMutations.ADD_TABLE);

    const onSubmit = (data: any) => {
        if (zone && store) {
            const { name } = data;

            addTable({
                variables: {
                    name,
                    zone_id: zone.value,
                    store_id: store.value
                },
            }).then(() => {
                onClose();
                onAddSuccess(zone.value);
            });
        }
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
                        <input
                            type="text"
                            id="customername-field"
                            className="form-control"
                            value={store?.label}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="customername-field"
                            className="form-label"
                        >
                            Khu vực
                        </label>
                        <input
                            type="text"
                            id="customername-field"
                            className="form-control"
                            value={zone?.label}
                            disabled
                        />
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
