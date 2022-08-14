import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_ZONE } from "../../../states/zone/zone.queries";
import { ZonesResponse } from "../../../models/zone.model";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { StoresResponse } from "../../../models/store.model";
import { GET_ALL_STORES_OF_COMPANY } from "../../../states/store/store.queries";
import { GET_TABLES_PAGINATION } from "../../../states/table/table.queries";
import { TablesResponse } from "../../../models/table.model";
import { usePagination } from "../../../Components/Hooks/usePagination";
import { useEffectAllDepsChange } from "../../../Components/Hooks/useEffectAllDepsChange";
import Pagination from "../../../Components/Common/Pagination";

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
        usePagination(2);

    const [getTables, queryTablesValues] = useLazyQuery<TablesResponse>(
        GET_TABLES_PAGINATION
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

    useEffect(() => {
        if (selectedZone) {
            getTables({
                variables: {
                    zone_id: selectedZone.value,
                    limit: limit,
                    offset: offset,
                },
            });
        }
    }, [selectedZone, limit, offset]);

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
        if (queryTablesValues.data) {
            return queryTablesValues.data.res_table;
        }
        return null;
    }, [queryTablesValues.data]);

    return (
        <React.Fragment>
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
                                            // onClick={() =>
                                            //     tog_list()
                                            // }
                                            id="create-btn"
                                        >
                                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                                            Add
                                        </Button>
                                        <Button
                                            className="btn btn-soft-danger"
                                            // onClick="deleteMultiple()"
                                        >
                                            <i className="ri-delete-bin-2-line"></i>
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-lg-3 col-md-4">
                                                <Select
                                                    value={selectedStore}
                                                    onChange={handleStoreChange}
                                                    placeholder="Chọn chi nhánh"
                                                    options={storeOptions}
                                                />
                                            </Col>
                                            {selectedStore && (
                                                <Col className="col-lg-3 col-md-4">
                                                    <Select
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

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table
                                                className="table align-middle table-nowrap"
                                                id="customerTable"
                                            >
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
                                                                />
                                                            </div>
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Tên bàn
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Trạng thái
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="action"
                                                        >
                                                            Action
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
                                                                        />
                                                                    </div>
                                                                </th>

                                                                <td className="customer_name">
                                                                    {table.name}
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
                                                                                Edit
                                                                            </button>
                                                                        </div>
                                                                        <div className="remove">
                                                                            <button
                                                                                className="btn btn-sm btn-danger remove-item-btn"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#deleteRecordModal"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                            <div
                                                className="noresult"
                                                style={{
                                                    display:
                                                        tables &&
                                                        tables.length > 0
                                                            ? "none"
                                                            : "block",
                                                }}
                                            >
                                                <div className="text-center">
                                                    {/* @ts-ignore */}

                                                    <h5 className="mt-2">
                                                        Sorry! No Result Found
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        We've searched more than
                                                        150+ Orders We did not
                                                        find any orders for you
                                                        search.
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
                                            {/* <div className="pagination-wrap hstack gap-2">
                                                <Link
                                                    className="page-item pagination-prev disabled"
                                                    to="#"
                                                >
                                                    Previous
                                                </Link>
                                                <ul className="pagination listjs-pagination mb-0">
                                                    <li className="active">
                                                        <a
                                                            className="page"
                                                            href="#"
                                                            data-i={1}
                                                            data-page={3}
                                                        >
                                                            1
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="page"
                                                            href="#"
                                                            data-i={2}
                                                            data-page={3}
                                                        >
                                                            2
                                                        </a>
                                                    </li>
                                                </ul>

                                                <Link
                                                    className="page-item pagination-next"
                                                    to="#"
                                                >
                                                    Next
                                                </Link>
                                            </div> */}
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
