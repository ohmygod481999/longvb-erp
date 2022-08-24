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
import { ProductCategoryResponse } from "../../../models/product.model";
import { axiosInstance } from "../../../helpers/api_helper";
import { graphqlClient } from "../../../helpers/graphql-client";
import { productMutations } from "../../../states/product/product.mutations";
import _ from "lodash";
import { toast } from "react-toastify";
import { History } from "history";
import ProductForm from "./ProductForm";

interface ChildComponentProps {
    history: History;
    /* other props for ChildComponent */
}

function CreateProduct(props: ChildComponentProps) {
    const { userProfile } = useProfile();
    const {
        handleSubmit,
        reset,
        watch,
        control,
        register,
        formState: { errors },
    } = useForm();

    const productCategoryQueryValues = useQuery<ProductCategoryResponse>(
        GET_ALL_PRODUCT_CATEGORY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    const categoryOptions = useMemo(() => {
        if (productCategoryQueryValues.data) {
            return productCategoryQueryValues.data.product_category.map(
                (c) => ({
                    value: c.id,
                    label: c.name,
                })
            );
        }
        return [];
    }, [productCategoryQueryValues.data]);

    const onSubmit = async (values: any) => {
        const { name, price, category, thumbnail, description } = values;
        if (thumbnail.length > 0) {
            const formData = new FormData();
            formData.append("file", thumbnail[0]);
            try {
                const uploadResponse = await axiosInstance.post(
                    "/gallery",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                const thumbnailLocation = uploadResponse.data.data.localtion;
                const productRes = await graphqlClient.mutate({
                    mutation: productMutations.CREATE_PRODUCT,
                    variables: {
                        name,
                        price,
                        category_id: category.value,
                        company_id: userProfile?.company_id,
                        description,
                        thumbnail: thumbnailLocation,
                    },
                });
                console.log(productRes);
                if (_.get(productRes, "data.insert_product_one.id")) {
                    // Success
                    toast("Tạo sản phẩm thành công", {
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
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Tạo món ăn" pageTitle="Quản lí món ăn" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">
                                        Tạo món ăn
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

export default CreateProduct;
