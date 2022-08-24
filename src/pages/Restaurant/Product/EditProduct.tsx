import React, { useEffect, useMemo } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    Label,
    Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Select, { SingleValue } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCT_CATEGORY } from "../../../states/product/productCategory.queries";
import {
    Product,
    ProductCategoryResponse,
    ProductResponse,
} from "../../../models/product.model";
import { axiosInstance } from "../../../helpers/api_helper";
import { graphqlClient } from "../../../helpers/graphql-client";
import { productMutations } from "../../../states/product/product.mutations";
import _ from "lodash";
import { toast } from "react-toastify";
import { History } from "history";
import ProductForm from "./ProductForm";
import { RouteComponentProps } from "react-router-dom";
import { productQueries } from "../../../states/product/product.queries";

interface MatchParams {
    id: string;
}

interface ChildComponentProps extends RouteComponentProps<MatchParams> {
    history: History;
    /* other props for ChildComponent */
}

function EditProduct(props: ChildComponentProps) {
    const { userProfile } = useProfile();
    const {
        handleSubmit,
        reset,
        watch,
        control,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    const id = parseInt(props.match.params.id);

    const productQueryValues = useQuery<ProductResponse>(
        productQueries.GET_PRODUCT_BY_ID,
        {
            variables: {
                id,
            },
        }
    );

    useEffect(() => {
        if (productQueryValues.data) {
            setValue("name", productQueryValues.data.product_by_pk.name);
            setValue("price", productQueryValues.data.product_by_pk.price);
            setValue("category", {
                value: productQueryValues.data.product_by_pk.product_category
                    .id,
                label: productQueryValues.data.product_by_pk.product_category
                    .name,
            });
            setValue(
                "description",
                productQueryValues.data.product_by_pk.description
            );
        }
    }, [productQueryValues.data]);

    const onSubmit = async (values: any) => {
        if (!productQueryValues.data) {
            return;
        }
        const { name, price, category, thumbnail, description } = values;
        let thumbnailLocation = productQueryValues.data.product_by_pk.thumbnail || "";
        try {
            if (thumbnail.length > 0) {
                const formData = new FormData();
                formData.append("file", thumbnail[0]);
                const uploadResponse = await axiosInstance.post(
                    "/gallery",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                thumbnailLocation = uploadResponse.data.data.localtion;
            }
            let variables: any = {
                id,
                name,
                price,
                category_id: category.value,
                company_id: userProfile?.company_id,
                description,
            };
            if (thumbnailLocation) {
                variables.thumbnail = thumbnailLocation;
            }
            const productRes = await graphqlClient.mutate({
                mutation: productMutations.UPDATE_PRODUCT,
                variables,
            });
            console.log(productRes);
            if (_.get(productRes, "data.update_product_by_pk.id")) {
                // Success
                toast("Cập nhật sản phẩm thành công", {
                    position: "top-center",
                    hideProgressBar: true,
                    closeOnClick: false,
                    autoClose: 2000,
                    className: "bg-success text-white",
                });
                props.history.push("/restaurant/food");
            } else {
                throw new Error();
            }
        } catch (err) {
            toast("Có lỗi xảy ra.", {
                position: "top-center",
                hideProgressBar: true,
                closeOnClick: false,
                className: "bg-danger text-white",
            });
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Cập nhật món ăn"
                        pageTitle="Quản lí món ăn"
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">
                                        Cập nhật món ăn
                                    </h4>
                                    <div className="flex-shrink-0"></div>
                                </CardHeader>

                                <CardBody>
                                    <div className="live-preview">
                                        <ProductForm
                                            control={control}
                                            errors={errors}
                                            handleSubmit={handleSubmit}
                                            onSubmit={onSubmit}
                                            register={register}
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

export default EditProduct;
