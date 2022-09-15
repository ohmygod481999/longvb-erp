import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Select, { SingleValue } from "react-select";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_ALL_ZONE } from "../../../states/zone/zone.queries";
import { ZonesResponse } from "../../../models/zone.model";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { StoresResponse } from "../../../models/store.model";
import { GET_ALL_STORES_OF_COMPANY } from "../../../states/store/store.queries";
import { GET_TABLES_PAGINATION } from "../../../states/table/table.queries";
import { Table, TablesResponse } from "../../../models/table.model";
import { usePagination } from "../../../Components/Hooks/usePagination";
import Pagination from "../../../Components/Common/Pagination";
import { useTableCheck } from "../../../Components/Hooks/useTableCheck";
import { tableMutations } from "../../../states/table/table.mutations";
import DeleteModal from "../../../Components/Common/DeleteModal";
import ModalAddTable from "./ModalAddTable";
import { config } from "../../../config";
import { toast } from "react-toastify";
import { useModalWithData } from "../../../Components/Hooks/useModalWithData";
import ModalQrTable from "./ModalQrTable";

function ListTable() {
    const { userProfile } = useProfile();

    const [selectedStore, setSelectedStore] = useState<SingleValue<{
        value: number;
        label: string;
    }> | null>(null);

    const [selectedZone, setSelectedZone] = useState<SingleValue<{
        value: number;
        label: string;
    }> | null>(null);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [isShowModalAdd, setIsShowModalAdd] = useState(false);
    const [
        isShowModalQr,
        showModalQr,
        closeModalQr,
        modalDataQr,
    ] = useModalWithData<Table>();
    
    const handleStoreChange = useCallback(
        (values: SingleValue<{ value: number; label: string }> | null) => {
            setSelectedStore(values);
        },
        []
    );

    const handleZoneChange = useCallback(
        (values: SingleValue<{ value: number; label: string }> | null) => {
            setSelectedZone(values);
        },
        []
    );

    const queryStoreValues = useQuery<StoresResponse>(
        GET_ALL_STORES_OF_COMPANY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    const [getZones, queryZoneValues] = useLazyQuery<ZonesResponse>(
        GET_ALL_ZONE,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    const { limit, offset, total, pageCount, setLimit, setOffset, setTotal } =
        usePagination(10);

    const [deleteMultiTables] = useMutation(tableMutations.DELETE_MULTI_TABLE);

    const [getTables, queryTablesValues] = useLazyQuery<TablesResponse>(
        GET_TABLES_PAGINATION,
    );

    useEffect(() => {
        if (selectedStore) {
            getZones({
                variables: {
                    store_id: selectedStore.value,
                },
            });
            setSelectedZone(null);
        }
    }, [selectedStore]);

    const fetchTables = useCallback(
        (getTables: Function) => {
            if (!selectedZone && !selectedStore) {
                getTables({
                    variables: {
                        where: {
                            company_id: {
                                _eq: userProfile?.company_id,
                            },
                        },
                        limit: limit,
                        offset: offset,
                    },
                    fetchPolicy: "network-only"
                });
            } else if (selectedStore && !selectedZone) {
                getTables({
                    variables: {
                        where: {
                            store_id: {
                                _eq: selectedStore.value,
                            },
                        },
                        limit: limit,
                        offset: offset,
                    },
                    fetchPolicy: "network-only"
                });
            } else if (selectedZone) {
                getTables({
                    variables: {
                        where: {
                            zone_id: {
                                _eq: selectedZone.value,
                            },
                        },
                        limit: limit,
                        offset: offset,
                    },
                    fetchPolicy: "network-only"
                });
            }
        },
        [selectedZone, selectedStore, limit, offset]
    );

    useEffect(() => {
        fetchTables(getTables);
    }, [selectedZone, selectedStore, limit, offset]);

    useEffect(() => {
        if (selectedZone?.value && queryTablesValues.data) {
            setTotal(
                queryTablesValues.data.res_table_aggregate.aggregate.totalCount
            );
        }
    }, [selectedZone?.value, queryTablesValues.data]);

    const storeOptions = useMemo(() => {
        if (queryStoreValues.data) {
            return queryStoreValues.data.store.map((s) => ({
                value: s.id,
                label: s.name,
            }));
        }
        return [];
    }, [queryStoreValues.data]);

    const zoneOptions = useMemo(() => {
        if (queryZoneValues.data) {
            return queryZoneValues.data.res_zone.map((s) => ({
                value: s.id,
                label: s.name,
            }));
        }
        return [];
    }, [queryZoneValues.data]);

    const tables = useMemo(() => {
        // if (!selectedZone || !selectedStore) {
        //     return null;
        // }
        if (queryTablesValues.data) {
            return queryTablesValues.data.res_table;
        }
        return null;
    }, [queryTablesValues.data, selectedZone, selectedStore]);

    const { check, checkAll, isIdChecked, isCheckAll, checkedIds, resetCheck } =
        useTableCheck(tables ? tables.map((table) => table.id) : []);

    return (
        <React.Fragment>
            <DeleteModal
                show={isShowModalDelete}
                onCloseClick={() => setIsShowModalDelete(false)}
                onDeleteClick={() => {
                    deleteMultiTables({
                        variables: {
                            ids: checkedIds,
                        },
                    }).then(() => {
                        fetchTables(queryTablesValues.refetch);
                    });
                    setIsShowModalDelete(false);
                    resetCheck();
                }}
            />
            <ModalQrTable
                show={isShowModalQr}
                onClose={closeModalQr}
                table={modalDataQr}
            />
            <ModalAddTable
                show={isShowModalAdd}
                onClose={() => setIsShowModalAdd(false)}
                onAddSuccess={() => {
                    if (!selectedZone && !selectedStore) {
                        console.log("run");
                        queryTablesValues.refetch({
                            variables: {
                                where: {
                                    company_id: {
                                        _eq: userProfile?.company_id,
                                    },
                                },
                                limit: limit,
                                offset: offset,
                            },
                            nextFetchPolicy: "network-only",
                        });
                    } else if (selectedZone) {
                        queryTablesValues.refetch({
                            variables: {
                                where: {
                                    zone_id: {
                                        _eq: selectedZone.value,
                                    },
                                },
                                limit: limit,
                                offset: offset,
                            },
                            nextFetchPolicy: "network-only",
                        });
                    }
                }}
                zone={selectedZone}
                store={selectedStore}
            />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Quản lý bàn ăn"
                        pageTitle="Quản trị nhà hàng"
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="card-header-has-action">
                                    <h4 className="card-title mb-0">
                                        Danh sách bàn ăn
                                    </h4>
                                    <div>
                                        <Button
                                            color="success"
                                            className="add-btn me-1"
                                            onClick={() =>
                                                setIsShowModalAdd(true)
                                            }
                                            id="create-btn"
                                        >
                                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                                            Thêm
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-lg-3 col-md-4">
                                                <Select
                                                    isClearable
                                                    value={selectedStore}
                                                    onChange={handleStoreChange}
                                                    placeholder="Chọn chi nhánh"
                                                    options={storeOptions}
                                                />
                                            </Col>
                                            {selectedStore && (
                                                <Col className="col-lg-3 col-md-4">
                                                    <Select
                                                        isClearable
                                                        value={selectedZone}
                                                        onChange={
                                                            handleZoneChange
                                                        }
                                                        placeholder="Chọn khu vực"
                                                        options={zoneOptions}
                                                    />
                                                </Col>
                                            )}
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input
                                                            type="text"
                                                            className="form-control search"
                                                            placeholder="Search..."
                                                        />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        {checkedIds.length > 0 && (
                                            <Row>
                                                <Col>
                                                    Đã chọn {checkedIds.length}{" "}
                                                    bản ghi.{" "}
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsShowModalDelete(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        Xóa
                                                    </a>
                                                </Col>
                                            </Row>
                                        )}

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            style={{
                                                                width: "50px",
                                                            }}
                                                        >
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="checkAll"
                                                                    value="option"
                                                                    checked={
                                                                        isCheckAll
                                                                    }
                                                                    onChange={
                                                                        checkAll
                                                                    }
                                                                />
                                                            </div>
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            // data-sort="customer_name"
                                                        >
                                                            ID
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            // data-sort="customer_name"
                                                        >
                                                            Tên bàn
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            // data-sort="customer_name"
                                                        >
                                                            Chi nhánh
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            // data-sort="customer_name"
                                                        >
                                                            Khu vực
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            // data-sort="customer_name"
                                                        >
                                                            Trạng thái
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="action"
                                                        >
                                                            Thao tác
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {tables &&
                                                        tables.map((table) => (
                                                            <tr key={table.id}>
                                                                <th scope="row">
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            name="chk_child"
                                                                            value="option1"
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                check(
                                                                                    table.id
                                                                                );
                                                                            }}
                                                                            checked={isIdChecked(
                                                                                table.id
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </th>

                                                                <td className="customer_name">
                                                                    {table.id}
                                                                </td>

                                                                <td className="customer_name">
                                                                    {table.name}
                                                                </td>

                                                                <td className="customer_name">
                                                                    {
                                                                        table
                                                                            .store
                                                                            .name
                                                                    }
                                                                </td>
                                                                <td className="customer_name">
                                                                    {
                                                                        table
                                                                            .res_zone
                                                                            .name
                                                                    }
                                                                </td>

                                                                <td className="status">
                                                                    <span className="badge badge-soft-success text-uppercase">
                                                                        Active
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="edit">
                                                                            <button
                                                                                className="btn btn-sm btn-success edit-item-btn"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#showModal"
                                                                            >
                                                                                Sửa
                                                                            </button>
                                                                        </div>
                                                                        <button className="btn btn-sm btn-primary edit-item-btn" onClick={() => showModalQr(table)}>
                                                                            Mã
                                                                            QR
                                                                        </button>

                                                                        <button
                                                                            className="btn btn-sm btn-info edit-item-btn"
                                                                            onClick={() => {
                                                                                navigator.clipboard.writeText(
                                                                                    config.ORDER_HOST +
                                                                                        `/#/${userProfile?.company_id}/${table.store.id}/${table.id}/home`
                                                                                );
                                                                                toast(
                                                                                    "Copy thành công",
                                                                                    {
                                                                                        position:
                                                                                            "top-center",
                                                                                        hideProgressBar:
                                                                                            true,
                                                                                        closeOnClick:
                                                                                            false,
                                                                                        autoClose: 2000,
                                                                                        className:
                                                                                            "bg-success text-white",
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            Copy
                                                                            link
                                                                            đặt
                                                                            hàng
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                            {/* <div
                                                className="noresult"
                                                style={{
                                                    display:
                                                        selectedStore &&
                                                        selectedZone
                                                            ? "none"
                                                            : "block",
                                                }}
                                            >
                                                <div className="text-center">
                                                    <h5 className="mt-2">
                                                        Vui lòng chọn chi nhánh
                                                        và khu vực
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Chọn chi nhánh và khu
                                                        vực để xem các bàn hiện
                                                        có.
                                                    </p>
                                                </div>
                                            </div> */}
                                            <div
                                                className="noresult"
                                                style={{
                                                    display:
                                                        tables &&
                                                        tables.length == 0
                                                            ? "block"
                                                            : "none",
                                                }}
                                            >
                                                <div className="text-center">
                                                    {/* @ts-ignore */}

                                                    <h5 className="mt-2">
                                                        Hiện chưa có bàn nào ở{" "}
                                                        {selectedStore?.label},{" "}
                                                        {selectedZone?.label}
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setIsShowModalAdd(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Thêm ngay.
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <Pagination
                                                limit={limit}
                                                offset={offset}
                                                setLimit={setLimit}
                                                setOffset={setOffset}
                                                total={total}
                                            />
                                        </div>
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

export default ListTable;
