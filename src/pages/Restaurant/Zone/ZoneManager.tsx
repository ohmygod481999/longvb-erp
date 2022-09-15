import React, { useState, ReactNode } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Table,
    Container,
    Row,
    Modal,
    Button,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import {
    GET_ALL_STORES,
    DELETE_ZONE,
    CREATE_ZONE,
    GET_ALL_ZONE,
    UPDATE_ZONE,
} from "../../../states/store/store.queries";
import { useQuery, useMutation } from "@apollo/client";
import { formatDateTime } from "../../../helpers";
import { Grid, _ } from "gridjs-react";
import { useProfile } from "../../../Components/Hooks/AuthHooks";

export default function ZoneManager() {
    const { userProfile } = useProfile();

    const [modal, setModal] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [editModal, setEditModal] = useState<boolean>(false);
    const [zoneName, setZoneName] = useState<string>("");
    const [storeId, setStoreId] = useState<string>("");
    const [zonesData, setZonesData] = useState<any>({});
    const stores = useQuery(GET_ALL_STORES, {
        variables: {
            company_id: userProfile?.company_id,
        },
    }); // stores.data
    const queryZoneValues = useQuery(GET_ALL_ZONE, {
        variables: {
            company_id: userProfile?.company_id,
        },
        onCompleted: (data) => setZonesData(data),
    }); // zones.data
    const [createZone, createZoneResponse] = useMutation(CREATE_ZONE);
    const [deteleZone, deteleZoneResponse] = useMutation(DELETE_ZONE);
    const [updateZone, updateZoneResponse] = useMutation(UPDATE_ZONE);

    const handleCreateZone = () => {
        // console.log(zoneName, storeId);
        // return;
        if (storeId) {
            createZone({
                variables: {
                    name: zoneName,
                    store_id: Number(storeId),
                    company_id: userProfile?.company_id,
                },
            }).then(() => {
                setModal(false);
                queryZoneValues.refetch({
                    company_id: userProfile?.company_id,
                });
            });
        }
    };

    const handleDeleteZone = (zone_id: any) => {
        console.log(zone_id);
        let isOkay = window.confirm(`Bạn có chắc chắn?`);
        if (isOkay) {
            deteleZone({
                variables: {
                    id: zone_id,
                },
            });
            window.location.reload();
        }
    };
    const [editData, setEditData] = useState<any>({});
    const preUpdateZone = (data: any) => {
        setEditData(data);
        setEditModal(true);
    };
    const handleUpdateZone = () => {
        console.log(storeId, zoneName, editData);

        if (storeId) {
            updateZone({
                variables: {
                    id: editData,
                    new_name: zoneName,
                    new_store_id: Number(storeId),
                },
            });
        }
    };

    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    return (
        <React.Fragment>
            <div className="page-content">
                <Modal isOpen={modal} toggle={toggle} className={""} centered>
                    <ModalHeader className="bg-light p-3">
                        Thêm khu vực
                        <Button
                            onClick={toggle}
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                        ></Button>
                    </ModalHeader>

                    <ModalBody>
                        <div
                            className="mb-3"
                            id="modal-id"
                            style={{ display: "none" }}
                        >
                            <label htmlFor="id-field" className="form-label">
                                ID
                            </label>
                            <input
                                type="text"
                                id="id-field"
                                className="form-control"
                                placeholder="ID"
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="customername-field"
                                className="form-label"
                            >
                                Tên khu vực
                            </label>
                            <input
                                onChange={(e: any) =>
                                    setZoneName(e.target.value)
                                }
                                type="text"
                                id="customername-field"
                                className="form-control"
                                placeholder="Nhập tên khu vực"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="status-field"
                                className="form-label"
                            >
                                Chi nhánh
                            </label>
                            <select
                                onChange={(e: any) =>
                                    setStoreId(e.target.value)
                                }
                                className="form-control"
                                data-trigger
                                name="status-field"
                                id="status-field"
                            >
                                <option value="">{""}</option>
                                {stores?.data?.store &&
                                    stores.data.store.map((store: any) => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button
                                onClick={handleCreateZone}
                                type="submit"
                                className="btn btn-success"
                            >
                                Thêm khu vực
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>

                <Modal
                    isOpen={editModal}
                    toggle={toggleEditModal}
                    className={""}
                    centered
                >
                    <ModalHeader className="bg-light p-3">
                        Sửa khu vực:
                        <Button
                            onClick={toggleEditModal}
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                        ></Button>
                    </ModalHeader>
                    <form>
                        <ModalBody>
                            <div
                                className="mb-3"
                                id="modal-id"
                                style={{ display: "none" }}
                            >
                                <label
                                    htmlFor="id-field"
                                    className="form-label"
                                >
                                    ID
                                </label>
                                <input
                                    type="text"
                                    id="id-field"
                                    className="form-control"
                                    placeholder="ID"
                                    readOnly
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="customername-field"
                                    className="form-label"
                                >
                                    Customer Name
                                </label>
                                <input
                                    onChange={(e: any) =>
                                        setZoneName(e.target.value)
                                    }
                                    type="text"
                                    id="customername-field"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="status-field"
                                    className="form-label"
                                >
                                    Chi nhánh
                                </label>
                                <select
                                    onChange={(e: any) =>
                                        setStoreId(e.target.value)
                                    }
                                    className="form-control"
                                    data-trigger
                                    name="status-field"
                                    id="status-field"
                                >
                                    <option value="">{""}</option>
                                    {stores?.data?.store &&
                                        stores.data.store.map((store: any) => (
                                            <option
                                                key={store.id}
                                                value={store.id}
                                            >
                                                {store.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="hstack gap-2 justify-content-end">
                                <button
                                    onClick={handleUpdateZone}
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Hoàn tất
                                </button>
                            </div>
                        </ModalFooter>
                    </form>
                </Modal>
                <Container fluid>
                    <BreadCrumb
                        title="Zone Manager"
                        pageTitle="Quản trị nhà hàng"
                    />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="card-header-has-action">
                                    <h4 className="card-title mb-0">
                                        Danh sách khu vực
                                    </h4>
                                    <div>
                                        <Button
                                            color="success"
                                            className="add-btn me-1"
                                            onClick={toggle}
                                        >
                                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                                            Thêm
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <Grid
                                            data={
                                                zonesData?.res_zone?.map(
                                                    (
                                                        item: any,
                                                        index: number
                                                    ) => [
                                                        item.id,
                                                        item.name,
                                                        item.store_id,
                                                        formatDateTime(
                                                            item.created_at,
                                                            false
                                                        ),
                                                        item.id,
                                                    ]
                                                ) || []
                                            }
                                            columns={[
                                                {
                                                    name: "ID",
                                                    formatter: (
                                                        cell: ReactNode
                                                    ) =>
                                                        _(
                                                            <span className="fw-semibold">
                                                                {cell}
                                                            </span>
                                                        ),
                                                },
                                                "Tên khu vực",
                                                "Chi nhánh",
                                                "Ngày tạo",
                                                {
                                                    name: "Thao tác",
                                                    formatter: (
                                                        cell: ReactNode
                                                    ) =>
                                                        _(
                                                            <div>
                                                                <a
                                                                    onClick={() =>
                                                                        preUpdateZone(
                                                                            cell
                                                                        )
                                                                    }
                                                                    className="text-reset text-decoration-underline"
                                                                >
                                                                    {" "}
                                                                    Sửa
                                                                </a>{" "}
                                                                /{" "}
                                                                <a
                                                                    onClick={() =>
                                                                        handleDeleteZone(
                                                                            cell
                                                                        )
                                                                    }
                                                                    className="text-reset text-decoration-underline"
                                                                >
                                                                    Xóa{" "}
                                                                </a>
                                                            </div>
                                                        ),
                                                },
                                            ]}
                                            search={true}
                                            sort={true}
                                            pagination={{
                                                enabled: true,
                                                limit: 5,
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}
