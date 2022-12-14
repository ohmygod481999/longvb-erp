import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
} from "reactstrap";
import Pagination from "../../../Components/Common/Pagination";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { usePagination } from "../../../Components/Hooks/usePagination";
import { useTableCheck } from "../../../Components/Hooks/useTableCheck";
import {
    ProductCategoryResponse,
    ProductsResponse,
} from "../../../models/product.model";
import { StoresResponse } from "../../../models/store.model";
import { GET_PRODUCT_PAGINATION } from "../../../states/product/product.queries";
import { GET_ALL_PRODUCT_CATEGORY } from "../../../states/product/productCategory.queries";
import { GET_ALL_STORES_OF_COMPANY } from "../../../states/store/store.queries";
import { DELETE_MULTI_PRODUCT } from "../../../states/product/product.mutations";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../helpers";

const ListProduct = () => {
    const { userProfile } = useProfile();

    const [selectedStore, setSelectedStore] = useState<SingleValue<{
        value: number;
        label: string;
    }> | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<SingleValue<{
        value: number;
        label: string;
    }> | null>(null);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const handleStoreChange = useCallback(
        (values: SingleValue<{ value: number; label: string }> | null) => {
            setSelectedStore(values);
        },
        []
    );

    const handleCategoryChange = useCallback(
        (values: SingleValue<{ value: number; label: string }> | null) => {
            setSelectedCategory(values);
        },
        []
    );

    const { limit, offset, total, pageCount, setLimit, setOffset, setTotal } =
        usePagination(5);
    const [getProducts, queryProductsValues] = useLazyQuery<ProductsResponse>(
        GET_PRODUCT_PAGINATION
    );
    const queryStoreValues = useQuery<StoresResponse>(
        GET_ALL_STORES_OF_COMPANY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );
    const queryProductCategoryValues = useQuery<ProductCategoryResponse>(
        GET_ALL_PRODUCT_CATEGORY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    const [deleteMultiProduct] = useMutation(DELETE_MULTI_PRODUCT, {
        refetchQueries: [
            {
                query: GET_PRODUCT_PAGINATION,
                variables: {
                    category_exp: selectedCategory
                        ? {
                              _eq: selectedCategory?.value,
                          }
                        : {},
                    company_id: userProfile?.company_id,
                    limit: limit,
                    offset: offset,
                },
            },
        ],
    });
    useEffect(() => {
        getProducts({
            variables: {
                category_exp: selectedCategory
                    ? {
                          _eq: selectedCategory?.value,
                      }
                    : {},
                company_id: userProfile?.company_id,
                limit: limit,
                offset: offset,
            },
            fetchPolicy: "network-only"
        });
    }, [selectedCategory, selectedStore, limit, offset]);

    const storeOptions = useMemo(() => {
        if (queryStoreValues.data) {
            return queryStoreValues.data.store.map((s) => ({
                value: s.id,
                label: s.name,
            }));
        }
        return [];
    }, [queryStoreValues.data]);

    const categoryOptions = useMemo(() => {
        if (queryProductCategoryValues.data) {
            return queryProductCategoryValues.data.product_category.map(
                (s) => ({
                    value: s.id,
                    label: s.name,
                })
            );
        }
        return [];
    }, [queryProductCategoryValues.data]);

    const products = useMemo(() => {
        if (queryProductsValues.data) {
            return queryProductsValues.data.product;
        }
        return null;
    }, [queryProductsValues.data]);

    useEffect(() => {
        if (queryProductsValues.data) {
            setTotal(
                queryProductsValues.data.product_aggregate.aggregate.totalCount
            );
        }
    }, [selectedCategory?.value, queryProductsValues.data]);

    const { check, checkAll, isIdChecked, isCheckAll, checkedIds, resetCheck } =
        useTableCheck(products ? products.map((product) => product.id) : []);

    console.log(products?.map((product) => product.id));
    console.log(checkedIds);

    return (
        <React.Fragment>
            <DeleteModal
                show={isShowModalDelete}
                onCloseClick={() => setIsShowModalDelete(false)}
                onDeleteClick={() => {
                    deleteMultiProduct({
                        variables: {
                            ids: checkedIds,
                        },
                    });
                    setIsShowModalDelete(false);
                    resetCheck();
                }}
            />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Qu???n l?? m??n ??n"
                        pageTitle="Qu???n l?? m??n ??n"
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="card-header-has-action">
                                    <h4 className="card-title mb-0">
                                        Danh s??ch m??n ??n
                                    </h4>
                                    <div>
                                        <Link to={"/restaurant/food/create"}>
                                            <Button
                                                color="success"
                                                className="add-btn me-1"
                                                id="create-btn"
                                            >
                                                <i className="ri-add-line align-bottom me-1"></i>{" "}
                                                T???o
                                            </Button>
                                        </Link>
                                    </div>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-lg-3 col-md-4">
                                                <Select
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    placeholder="Lo???i m??n"
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
                                        {checkedIds.length > 0 && (
                                            <Row>
                                                <Col>
                                                    ???? ch???n {checkedIds.length}{" "}
                                                    b???n ghi.{" "}
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsShowModalDelete(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        X??a
                                                    </a>{" "}
                                                    /{" "}
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            resetCheck();
                                                        }}
                                                    >
                                                        B??? ch???n
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
                                                            T??n m??n
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Ph??n lo???i
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            M?? t???
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Gi?? ti???n
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            ???nh
                                                        </th>
                                                        <th
                                                            className="sort"
                                                            data-sort="customer_name"
                                                        >
                                                            Tr???ng th??i
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
                                                    {products &&
                                                        products.map(
                                                            (product) => (
                                                                <tr
                                                                    key={
                                                                        product.id
                                                                    }
                                                                >
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
                                                                                        product.id
                                                                                    );
                                                                                }}
                                                                                checked={isIdChecked(
                                                                                    product.id
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </th>

                                                                    <td className="customer_name">
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </td>
                                                                    <td className="customer_name">
                                                                        {
                                                                            product
                                                                                .product_category
                                                                                .name
                                                                        }
                                                                    </td>
                                                                    <td className="customer_name">
                                                                        {
                                                                            product.description
                                                                        }
                                                                    </td>
                                                                    <td className="customer_name">
                                                                        {formatMoney(
                                                                            product.price
                                                                        )}
                                                                    </td>
                                                                    <td className="customer_name custom-img">
                                                                        <img
                                                                            src={
                                                                                product.thumbnail
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </td>

                                                                    <td className="status">
                                                                        <span className="badge badge-soft-success text-uppercase">
                                                                            {
                                                                                product.status
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex gap-2">
                                                                            <div className="edit">
                                                                                <Link
                                                                                    to={
                                                                                        "/restaurant/food/" +
                                                                                        product.id
                                                                                    }
                                                                                >
                                                                                    <button className="btn btn-sm btn-success edit-item-btn">
                                                                                        S???a
                                                                                    </button>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
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
};

export default ListProduct;
