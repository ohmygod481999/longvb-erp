import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Select, { SingleValue } from "react-select";
import { useLazyQuery, useQuery } from "@apollo/client";
import { StoresResponse } from "../../../models/store.model";
import { GET_ALL_STORES_OF_COMPANY } from "../../../states/store/store.queries";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { GET_ORDERS_PAGINATION } from "../../../states/order/order.queries";
import {
    Order,
    OrdersResponse,
    OrderStatus,
} from "../../../models/order.model";
import { usePagination } from "../../../Components/Hooks/usePagination";
import { useTableCheck } from "../../../Components/Hooks/useTableCheck";
import Pagination from "../../../Components/Common/Pagination";
import { formatMoney, timeAgo } from "../../../helpers";
// import avatar1 from "../../../assets/images/users/avatar-1.jpg";
// import SimpleBar from "simplebar-react";

const orderStatusBadgeColor = {
    created: "badge-soft-info",
    pending: "badge-soft-warning",
    success: "badge-soft-success",
};
const orderStatusLabel = {
    created: "Đã tạo",
    pending: "Đang xử lý",
    success: "Hoàn tất",
};

function OrderList() {
    const { userProfile } = useProfile();

    const [selectedStore, setSelectedStore] = useState<SingleValue<{
        value: number;
        label: string;
    }> | null>(null);

    const [selectedStatus, setSelectedStatus] = useState<SingleValue<{
        value: string;
        label: string;
    }> | null>(null);

    const [modalInfo, setModalInfo] = useState<null | Order>(null);
    const [isActiveModalInfo, setActiveModalInfo] = useState(false);
    function togModalInfo(store?: Order) {
        if (store) {
            setModalInfo(store);
        }
        setActiveModalInfo(!isActiveModalInfo);
    }

    const queryStoreValues = useQuery<StoresResponse>(
        GET_ALL_STORES_OF_COMPANY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    const { limit, offset, total, pageCount, setLimit, setOffset, setTotal } =
        usePagination(5);

    const [getOrders, queryOrdersValues] = useLazyQuery<OrdersResponse>(
        GET_ORDERS_PAGINATION
    );

    useEffect(() => {
        getOrders({
            variables: {
                store_exp: selectedStore
                    ? {
                          _eq: selectedStore?.value,
                      }
                    : {},
                status_exp: selectedStatus
                    ? {
                          _eq: selectedStatus?.value,
                      }
                    : {},
                company_id: userProfile?.company_id,
                limit: limit,
                offset: offset,
            },
        });
    }, [selectedStatus, selectedStore, limit, offset]);

    const handleStoreChange = useCallback(
        (values: SingleValue<{ value: number; label: string }> | null) => {
            setSelectedStore(values);
        },
        []
    );

    const handleStatusChange = useCallback(
        (values: SingleValue<{ value: string; label: string }> | null) => {
            setSelectedStatus(values);
        },
        []
    );

    const storeOptions = useMemo(() => {
        if (queryStoreValues.data) {
            return queryStoreValues.data.store.map((s) => ({
                value: s.id,
                label: s.name,
            }));
        }
        return [];
    }, [queryStoreValues.data]);

    const orders = useMemo(() => {
        if (queryOrdersValues.data) {
            return queryOrdersValues.data.order;
        }
        return null;
    }, [queryOrdersValues.data]);

    useEffect(() => {
        if (queryOrdersValues.data) {
            setTotal(
                queryOrdersValues.data.order_aggregate.aggregate.totalCount
            );
        }
    }, [selectedStatus?.value, selectedStore?.value, queryOrdersValues.data]);

    useEffect(() => {
        setOffset(0);
    }, [selectedStatus?.value, selectedStore?.value]);

    const { check, checkAll, isIdChecked, isCheckAll, checkedIds, resetCheck } =
        useTableCheck(orders ? orders.map((order) => order.id) : []);

    return (
        <React.Fragment>
            <Modal
                id="myModal"
                isOpen={isActiveModalInfo}
                toggle={() => {
                    togModalInfo();
                }}
            >
                <ModalHeader
                    className="modal-title"
                    toggle={() => {
                        togModalInfo();
                    }}
                >
                    Order #{modalInfo?.id}
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-15">Chi tiết đơn hàng</h5>
                    {/* <SimpleBar style={{ maxHeight: "215px" }}> */}
                    <ListGroup className="mb-1">
                        {modalInfo?.order_items?.length === 0 && (
                            <ListGroupItem>Trống</ListGroupItem>
                        )}
                        {modalInfo?.order_items?.map((item) => (
                            <ListGroupItem key={item.id}>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 avatar-xs">
                                                <img
                                                    src={item.product.thumbnail}
                                                    alt=""
                                                    className="avatar-xs rounded"
                                                />
                                            </div>
                                            <div className="flex-shrink-0 ms-2">
                                                <h6 className="fs-14 mb-0">
                                                    {item.product.name} x 3{" "}
                                                    <Badge color="success">
                                                        Đã phục vụ
                                                    </Badge>
                                                </h6>
                                                <small className="text-muted">
                                                    Cập nhật{" "}
                                                    {item.created_at &&
                                                        timeAgo(
                                                            new Date(
                                                                item.updated_at
                                                            )
                                                        )}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="text-info">
                                            {formatMoney(item.product.price)} x{" "}
                                            {item.quantity} ={" "}
                                            {formatMoney(
                                                item.product.price *
                                                    item.quantity
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    {/* </SimpleBar> */}
                </ModalBody>
                <div className="modal-footer">
                    <Button
                        color="light"
                        onClick={() => {
                            togModalInfo();
                        }}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Quản lý đơn hàng"
                        pageTitle="Quản trị nhà hàng"
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="card-header-has-action">
                                    <h4 className="card-title mb-0">
                                        Danh sách đơn hàng
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-lg-3 col-md-4">
                                                <Select
                                                    value={selectedStore}
                                                    onChange={handleStoreChange}
                                                    placeholder="Chi nhánh"
                                                    options={storeOptions}
                                                    isClearable
                                                />
                                            </Col>
                                            <Col className="col-lg-3 col-md-4">
                                                <Select
                                                    value={selectedStatus}
                                                    onChange={
                                                        handleStatusChange
                                                    }
                                                    placeholder="Trạng thái"
                                                    options={[
                                                        {
                                                            value: OrderStatus.CREATED,
                                                            label: orderStatusLabel[
                                                                OrderStatus
                                                                    .CREATED
                                                            ],
                                                        },
                                                        {
                                                            value: OrderStatus.SUCCESS,
                                                            label: orderStatusLabel[
                                                                OrderStatus
                                                                    .SUCCESS
                                                            ],
                                                        },
                                                    ]}
                                                    isClearable
                                                />
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
                                                            resetCheck();
                                                        }}
                                                    >
                                                        Bỏ chọn
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
                                                            data-sort="customer_name"
                                                        >
                                                            Order ID
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Trạng thái
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Cơ sở
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Bàn
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Ngày tạo
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
                                                    {queryOrdersValues.loading && (
                                                        <tr>
                                                            <td
                                                                colSpan={100}
                                                                className="text-center"
                                                            >
                                                                Loading...
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {orders &&
                                                        orders.map((order) => (
                                                            <tr key={order.id}>
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
                                                                                    order.id
                                                                                );
                                                                            }}
                                                                            checked={isIdChecked(
                                                                                order.id
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </th>

                                                                <td className="customer_name">
                                                                    #{order.id}
                                                                </td>

                                                                <td className="status">
                                                                    <span
                                                                        className={`badge ${
                                                                            orderStatusBadgeColor[
                                                                                order
                                                                                    .status
                                                                            ]
                                                                        } text-uppercase`}
                                                                    >
                                                                        {
                                                                            orderStatusLabel[
                                                                                order
                                                                                    .status
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </td>

                                                                <td className="customer_name">
                                                                    {
                                                                        order
                                                                            .store
                                                                            .name
                                                                    }
                                                                </td>
                                                                <td className="customer_name">
                                                                    {
                                                                        order
                                                                            .res_table
                                                                            .name
                                                                    }
                                                                </td>

                                                                <td className="customer_name">
                                                                    {
                                                                        // formatDateTime(
                                                                        //     order.created_at
                                                                        // )
                                                                        timeAgo(
                                                                            new Date(
                                                                                order.created_at
                                                                            )
                                                                        )
                                                                        // order.created_at
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="edit">
                                                                            <button
                                                                                className="btn btn-sm btn-success edit-item-btn"
                                                                                onClick={() =>
                                                                                    togModalInfo(
                                                                                        order
                                                                                    )
                                                                                }
                                                                            >
                                                                                Chi
                                                                                tiết
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
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

export default OrderList;
