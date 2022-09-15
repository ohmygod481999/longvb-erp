import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { tableMutations } from "../../../states/table/table.mutations";
import { SingleValue } from "react-select";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { useQueryStore } from "../../../Components/Hooks/useQueryStore";
import { useQueryZone } from "../../../Components/Hooks/useQueryZone";
import { Table, TableQrCodeResponse } from "../../../models/table.model";
import { graphqlClient } from "../../../helpers/graphql-client";
import { GET_TABLE_QR_CODE } from "../../../states/table/table.queries";

const ModalQrTable = ({
    show,
    onClose,
    table,
}: {
    show: boolean;
    onClose: Function;
    table: Table | null;
}) => {
    const { userProfile } = useProfile();

    const [base64Url, setBase64Url] = useState("");

    useEffect(() => {
        if (table) {
            graphqlClient
                .query<TableQrCodeResponse>({
                    query: GET_TABLE_QR_CODE,
                    variables: {
                        table_id: table.id,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        setBase64Url(data.tableQrCode.url);
                    }
                });
        } else {
            setTimeout(() => {
                setBase64Url("");
            }, 500);
        }
    }, [table]);

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
                    Mã QR
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
            <ModalBody>
                <div className="text-center">
                    {base64Url && (
                        <img
                            style={{
                                width: "200px",
                            }}
                            src={base64Url}
                        />
                    )}
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
                    {/* <button
                        type="button"
                        className="btn btn-success"
                        // id="add-btn"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Thêm
                    </button> */}
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default ModalQrTable;
