import React, { useEffect, useMemo, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Input,
    Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import styled, { css } from "styled-components";
import tableImage from "../../assets/images/table.png";
import { useQueryStore } from "../../../Components/Hooks/useQueryStore";
import { useQueryZone } from "../../../Components/Hooks/useQueryZone";
import { Store } from "../../../models/store.model";
import { Zone } from "../../../models/zone.model";
import { useQueryTable } from "../../../Components/Hooks/useQueryTable";
import { Table, TableWithOrder } from "../../../models/table.model";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../helpers";
import { Order, OrderStatus } from "../../../models/order.model";
import { graphqlClient } from "../../../helpers/graphql-client";
import { orderMutations } from "../../../states/order/order.mutations";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { useModalWithData } from "../../../Components/Hooks/useModalWithData";
import ModalOrder from "./ModalOrder";
import { config } from "../../../config";

const TableDiv = styled("div")<{ busy?: boolean; chosen?: boolean }>`
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: white;
    cursor: pointer;

    ${(props: any) =>
        props.busy &&
        `
            background: palevioletred;
            color: white;
        `};

    ${(props: any) =>
        props.chosen &&
        `
            border-bottom: 2px solid #0ab39c;
        `};
`;

function Pos() {
    const { userProfile } = useProfile();

    const [isShowModalOrder, showModalOrder, closeModalOrder, modalDataOrder] =
        useModalWithData<Order>();

    const stores = useQueryStore();
    const [currentStore, setCurrentStore] = useState<Store | null>(null);

    useEffect(() => {
        if (stores && !currentStore) {
            setCurrentStore(stores[0]);
        }
    }, [stores, currentStore]);

    const zones = useQueryZone(currentStore?.id);

    const [currentZone, setCurrentZone] = useState<Zone | null>(null);

    useEffect(() => {
        if (zones && !currentZone) {
            setCurrentZone(zones[0]);
        }
    }, [zones, currentZone]);

    const [tables, refetch] = useQueryTable(currentStore?.id, currentZone?.id);

    const [currentTable, setCurrentTable] = useState<TableWithOrder | null>(
        null
    );

    useEffect(() => {
        if (currentTable && tables) {
            const newCurrentTable = tables.find(
                (t) => t.id === currentTable.id
            );
            if (newCurrentTable) setCurrentTable(newCurrentTable);
        }
    }, [currentTable, tables]);

    const totalPrice = useMemo(() => {
        if (!currentTable || !currentTable.order) return null;
        return currentTable.order.order_items.reduce((prev, cur) => {
            return prev + cur.product.price * cur.quantity;
        }, 0);
    }, [currentTable]);

    const handleDeleteOrder = async (order: Order) => {
        let text = "Bạn có chắc chắn muốn hủy.";
        if (confirm(text) == true) {
            const res = await graphqlClient.mutate({
                mutation: orderMutations.DELETE_ORDER,
                variables: {
                    id: order.id,
                },
            });
            refetch();
        } else {
        }
    };

    const handlePaymentOrder = async (order: Order) => {
        let text = "Bạn có chắc chắn muốn thanh toán.";
        if (confirm(text) == true) {
            const res = await graphqlClient.mutate({
                mutation: orderMutations.UPDATE_STATUS_ORDER,
                variables: {
                    id: order.id,
                    status: OrderStatus.SUCCESS,
                },
            });
            refetch();
        } else {
        }
    };

    const handleCreateOrder = async (table: Table) => {
        let text = "Tạo đơn hàng mới cho bàn " + table.name + "?";
        if (confirm(text) == true) {
            const res = await graphqlClient.mutate({
                mutation: orderMutations.CREATE_ORDER,
                variables: {
                    company_id: userProfile?.company_id,
                    store_id: currentStore?.id,
                    table_id: table.id,
                },
            });
            refetch();
        } else {
        }
    };

    return (
        <React.Fragment>
            <ModalOrder
                show={isShowModalOrder}
                onClose={closeModalOrder}
                order={modalDataOrder}
                refetch={refetch}
            />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Bán hàng"
                        pageTitle="Quản trị nhà hàng"
                    />
                    <Row className="g-4 mb-3">
                        {/* <div className="col-sm-auto">
                            <div>
                                <Link
                                    to="/apps-projects-create"
                                    className="btn btn-success"
                                >
                                    <i className="ri-add-line align-bottom me-1"></i>{" "}
                                    Add New
                                </Link>
                            </div>
                        </div> */}
                        <div className="col-sm">
                            <div className="d-flex justify-content-sm-end gap-2">
                                <div className="search-box ms-2">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                    />
                                    <i className="ri-search-line search-icon"></i>
                                </div>

                                <select
                                    className="form-control"
                                    style={{
                                        maxWidth: "110px",
                                    }}
                                    value={currentStore?.id}
                                    onChange={(e) => {
                                        const idStore = parseInt(
                                            e.target.value
                                        );
                                        const _stores = stores?.find(
                                            (s) => s.id === idStore
                                        );
                                        setCurrentStore(_stores || null);
                                    }}
                                    data-choices
                                    data-choices-search-false
                                >
                                    {stores?.map((store) => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="form-control"
                                    style={{
                                        maxWidth: "110px",
                                    }}
                                    data-choices
                                    data-choices-search-false
                                    value={currentZone?.id}
                                    onChange={(e) => {
                                        const idZone = parseInt(e.target.value);
                                        const _zones = zones?.find(
                                            (z) => z.id === idZone
                                        );
                                        setCurrentZone(_zones || null);
                                    }}
                                >
                                    {zones?.map((zone) => (
                                        <option key={zone.id} value={zone.id}>
                                            {zone.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <Col xl={currentTable ? 8 : 12}>
                            <Row className="g-4 mb-3">
                                {tables &&
                                    tables.map((table) => (
                                        <div
                                            key={table.id}
                                            onClick={() => {
                                                setCurrentTable(table);
                                            }}
                                            className="col-sm-3"
                                        >
                                            <TableDiv
                                                busy={
                                                    table.order ? true : false
                                                }
                                                chosen={
                                                    currentTable?.id ===
                                                    table.id
                                                }
                                            >
                                                <div className="text-center">
                                                    <div>{table.name}</div>
                                                    <span>
                                                        {table.order
                                                            ? "(Có khách)"
                                                            : "(Trống)"}
                                                    </span>
                                                </div>
                                            </TableDiv>
                                        </div>
                                    ))}
                            </Row>
                        </Col>
                        {currentTable && (
                            <Col xl={4}>
                                <div className="sticky-side-div mb-3">
                                    <Card>
                                        <CardHeader className="border-bottom-dashed">
                                            <span className="float-end ">
                                                {currentTable.order
                                                    ? `Đơn hàng #${currentTable.order?.id}`
                                                    : "(Trống)"}
                                                <br />
                                                <a
                                                    href={
                                                        config.ORDER_HOST +
                                                        `/#/${userProfile?.company_id}/${currentTable.store.id}/${currentTable.id}/home`
                                                    }
                                                >
                                                    Link đặt hàng
                                                </a>
                                            </span>
                                            <h5 className="card-title mb-0">
                                                {currentTable.name} (
                                                {currentZone?.name})
                                            </h5>
                                        </CardHeader>
                                        {/* <CardHeader className="bg-soft-light border-bottom-dashed">
                                            <div className="text-center">
                                                <h6 className="mb-2">
                                                    <a
                                                        href={
                                                            config.ORDER_HOST +
                                                            `/#/${userProfile?.company_id}/${currentTable.store.id}/${currentTable.id}/home`
                                                        }
                                                    >
                                                        Link đặt hàng
                                                    </a>
                                                </h6>
                                            </div>
                                            <div className="hstack gap-3 px-3 mx-n3">
                                                <input
                                                    className="form-control me-auto"
                                                    type="text"
                                                    placeholder="Enter coupon code"
                                                    aria-label="Add Promo Code here..."
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-success w-xs"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </CardHeader> */}
                                        {currentTable.order ? (
                                            <>
                                                <CardBody className="pt-2">
                                                    <div
                                                        className="table-responsive table-card"
                                                        style={{
                                                            maxHeight: "50vh",
                                                        }}
                                                    >
                                                        <table className="table table-borderless align-middle mb-0">
                                                            <thead className="table-light text-muted">
                                                                <tr>
                                                                    <th
                                                                        style={{
                                                                            width: "90px",
                                                                        }}
                                                                        scope="col"
                                                                    >
                                                                        Món
                                                                    </th>
                                                                    <th scope="col">
                                                                        Thông
                                                                        tin
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="text-end"
                                                                    >
                                                                        Giá
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {currentTable.order?.order_items.map(
                                                                    (
                                                                        item,
                                                                        key
                                                                    ) => (
                                                                        <React.Fragment
                                                                            key={
                                                                                key
                                                                            }
                                                                        >
                                                                            <tr>
                                                                                <td>
                                                                                    <div className="avatar-md bg-light rounded p-1">
                                                                                        <img
                                                                                            src={
                                                                                                item
                                                                                                    .product
                                                                                                    .thumbnail
                                                                                            }
                                                                                            alt=""
                                                                                            className="img-fluid d-block"
                                                                                        />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <h5 className="fs-14">
                                                                                        <Link
                                                                                            to="/apps-ecommerce-product-details"
                                                                                            className="text-dark"
                                                                                        >
                                                                                            {
                                                                                                item
                                                                                                    .product
                                                                                                    .name
                                                                                            }
                                                                                        </Link>
                                                                                    </h5>
                                                                                    <p className="text-muted mb-0">
                                                                                        {formatMoney(
                                                                                            item
                                                                                                .product
                                                                                                .price
                                                                                        )}{" "}
                                                                                        x{" "}
                                                                                        {
                                                                                            item.quantity
                                                                                        }
                                                                                    </p>
                                                                                </td>
                                                                                <td className="text-end">
                                                                                    {formatMoney(
                                                                                        item
                                                                                            .product
                                                                                            .price *
                                                                                            item.quantity
                                                                                    )}
                                                                                </td>
                                                                            </tr>
                                                                        </React.Fragment>
                                                                    )
                                                                )}
                                                                <tr>
                                                                    <td
                                                                        colSpan={
                                                                            3
                                                                        }
                                                                        className="text-center"
                                                                    >
                                                                        <a
                                                                            href="#"
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.preventDefault();
                                                                                if (
                                                                                    currentTable.order
                                                                                ) {
                                                                                    showModalOrder(
                                                                                        currentTable.order
                                                                                    );
                                                                                    // handleAddDish(
                                                                                    //     currentTable.order
                                                                                    // );
                                                                                }
                                                                            }}
                                                                        >
                                                                            +
                                                                            Thêm
                                                                            món
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                                <tr className="table-active">
                                                                    <th
                                                                        colSpan={
                                                                            2
                                                                        }
                                                                    >
                                                                        Tổng
                                                                        cộng
                                                                        (VND) :
                                                                    </th>
                                                                    <td className="text-end">
                                                                        <span className="fw-semibold">
                                                                            {totalPrice &&
                                                                                formatMoney(
                                                                                    totalPrice
                                                                                )}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </CardBody>
                                                <CardFooter className="hstack gap-2">
                                                    <Button
                                                        color="danger"
                                                        className="btn-sm w-100"
                                                        onClick={() => {
                                                            if (
                                                                currentTable.order
                                                            ) {
                                                                handleDeleteOrder(
                                                                    currentTable.order
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <i className="microns-cancel align-bottom me-1"></i>{" "}
                                                        Hủy đơn hàng
                                                    </Button>
                                                    <Button
                                                        color="info"
                                                        className="btn-sm w-100"
                                                        onClick={() => {
                                                            if (
                                                                currentTable.order
                                                            ) {
                                                                handlePaymentOrder(
                                                                    currentTable.order
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <i className="ri-question-answer-line align-bottom me-1"></i>{" "}
                                                        thanh toán
                                                    </Button>
                                                </CardFooter>
                                            </>
                                        ) : (
                                            <CardFooter className="hstack gap-2">
                                                <Button
                                                    color="info"
                                                    className="btn-sm w-100"
                                                    onClick={() => {
                                                        handleCreateOrder(
                                                            currentTable
                                                        );
                                                    }}
                                                >
                                                    <i className="align-bottom me-1"></i>{" "}
                                                    Tạo đơn hàng mới
                                                </Button>
                                            </CardFooter>
                                        )}
                                    </Card>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Pos;
