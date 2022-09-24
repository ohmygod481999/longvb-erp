import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Pagination from "../../../Components/Common/Pagination";
import { useQueryProduct } from "../../../Components/Hooks/useQueryProduct";
import { useTableCheck } from "../../../Components/Hooks/useTableCheck";
import { formatMoney } from "../../../helpers";
import { Order } from "../../../models/order.model";
import Select, { SingleValue } from "react-select";
import { useQueryCategory } from "../../../Components/Hooks/useQueryCategory";
import { graphqlClient } from "../../../helpers/graphql-client";
import { orderMutations } from "../../../states/order/order.mutations";

function ModalOrder({
    show,
    onClose,
    order,
    refetch,
}: {
    show: boolean;
    onClose: Function;
    refetch: Function;
    order: Order | null;
}) {
    const categories = useQueryCategory();
    const categoryOptions = useMemo(() => {
        return categories.map((cate) => ({
            value: cate.id,
            label: cate.name,
        }));
    }, [categories]);

    const [selectedCategory, setSelectedCategory] = useState<SingleValue<{
        value: number;
        label: string;
    }> | null>(null);

    const [products, pagination] = useQueryProduct(selectedCategory?.value);
    const { limit, offset, total, pageCount, setLimit, setOffset, setTotal } =
        pagination;

    const { check, checkAll, isIdChecked, isCheckAll, checkedIds, resetCheck } =
        useTableCheck(
            products ? products.map((product) => product.id) : [],
            false
        );

    const handleAdd = useCallback(() => {
        if (checkedIds.length > 0 && order) {
            const productId = checkedIds[0];
            graphqlClient
                .mutate({
                    mutation: orderMutations.ADD_ITEM_ORDER,
                    variables: {
                        order_id: order.id,
                        product_id: productId,
                    },
                })
                .then(() => {
                    // success
                    refetch()
                    onClose();
                });
        }
    }, [checkedIds]);

    const handleCategoryChange = useCallback(
        (values: SingleValue<{ value: number; label: string }> | null) => {
            setSelectedCategory(values);
        },
        []
    );

    return (
        <Modal
            size="xl"
            isOpen={show}
            toggle={() => {
                onClose();
            }}
        >
            <ModalHeader
                className="modal-title"
                id="myExtraLargeModalLabel"
                toggle={() => {
                    onClose();
                }}
            >
                Đơn hàng #{order?.id}
            </ModalHeader>
            <ModalBody>
                <Row className="g-4 mb-3">
                    <Col className="col-lg-3 col-md-4">
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            placeholder="Loại món"
                            options={categoryOptions}
                            isClearable
                        />
                    </Col>
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
                    <table className="table align-middle table-nowrap">
                        <thead className="table-light">
                            <tr>
                                <th
                                    scope="col"
                                    style={{
                                        width: "50px",
                                    }}
                                >
                                    {/* <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="checkAll"
                                            value="option"
                                            checked={isCheckAll}
                                            onChange={checkAll}
                                        />
                                    </div> */}
                                </th>
                                <th className="sort" data-sort="customer_name">
                                    Tên món
                                </th>
                                <th className="sort" data-sort="customer_name">
                                    Phân loại
                                </th>
                                <th className="sort" data-sort="customer_name">
                                    Mô tả
                                </th>
                                <th className="sort" data-sort="customer_name">
                                    Giá tiền
                                </th>
                                <th className="sort" data-sort="customer_name">
                                    Ảnh
                                </th>
                                <th className="sort" data-sort="customer_name">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody className="list form-check-all">
                            {products &&
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <th scope="row">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="chk_child"
                                                    value="option1"
                                                    onChange={(e) => {
                                                        check(product.id);
                                                    }}
                                                    checked={isIdChecked(
                                                        product.id
                                                    )}
                                                />
                                            </div>
                                        </th>

                                        <td className="customer_name">
                                            {product.name}
                                        </td>
                                        <td className="customer_name">
                                            {product.product_category.name}
                                        </td>
                                        <td className="customer_name">
                                            {product.description}
                                        </td>
                                        <td className="customer_name">
                                            {formatMoney(product.price)}
                                        </td>
                                        <td className="customer_name custom-img">
                                            <img
                                                src={product.thumbnail}
                                                alt=""
                                            />
                                        </td>

                                        <td className="status">
                                            <span className="badge badge-soft-success text-uppercase">
                                                {product.status}
                                            </span>
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
            </ModalBody>
            <div className="modal-footer">
                <Link
                    to="#"
                    className="btn btn-link link-success fw-medium"
                    onClick={() => onClose()}
                >
                    <i className="ri-close-line me-1 align-middle"></i> Đóng
                </Link>
                <Button
                    color="primary"
                    onClick={handleAdd}
                    disabled={checkedIds.length === 0}
                >
                    Thêm món
                </Button>
            </div>
        </Modal>
    );
}

export default ModalOrder;
