import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { Col, Form, FormFeedback, Label, Row } from "reactstrap";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { ProductCategoryResponse } from "../../../models/product.model";
import { GET_ALL_PRODUCT_CATEGORY } from "../../../states/product/productCategory.queries";
import { useProfile } from "../../../Components/Hooks/AuthHooks";

interface Props {
    handleSubmit: Function;
    register: any;
    errors: any;
    control: any;
    onSubmit: Function;
}

function ProductForm({
    handleSubmit,
    register,
    errors,
    control,
    onSubmit,
}: Props) {
    const { userProfile } = useProfile();

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

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
                <Col lg={3}>
                    <Label htmlFor="nameInput" className="form-label">
                        Tên món
                    </Label>
                </Col>
                <Col lg={9}>
                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Trường bắt buộc",
                            },
                        })}
                        type="text"
                        className={`form-control ${
                            errors["name"] ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập tên"
                    />
                    {errors["name"] && (
                        <FormFeedback type="invalid">
                            {errors["name"].message?.toString()}
                        </FormFeedback>
                    )}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col lg={3}>
                    <Label htmlFor="websiteUrl" className="form-label">
                        Giá
                    </Label>
                </Col>
                <Col lg={9}>
                    <input
                        {...register("price", {
                            required: {
                                value: true,
                                message: "Trường bắt buộc",
                            },
                        })}
                        type="number"
                        className={`form-control ${
                            errors["name"] ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập giá"
                    />
                    {errors["price"] && (
                        <FormFeedback type="invalid">
                            {errors["price"].message?.toString()}
                        </FormFeedback>
                    )}
                </Col>
            </Row>

            <Row className="mb-3">
                <Col lg={3}>
                    <Label htmlFor="leaveemails" className="form-label">
                        Phân loại
                    </Label>
                </Col>
                <Col lg={9}>
                    <Controller
                        control={control}
                        name="category"
                        rules={{
                            required: {
                                value: true,
                                message: "Trường bắt buộc",
                            },
                        }}
                        render={({ field: { onChange, value, name, ref } }) => (
                            <Select
                                className={
                                    errors["category"] ? "border-red" : ""
                                }
                                options={categoryOptions}
                                value={value}
                                onChange={(val) =>
                                    onChange(
                                        // @ts-ignore
                                        val
                                    )
                                }
                            />
                        )}
                    />
                    {errors["category"] && (
                        <FormFeedback type="invalid">
                            {errors["category"].message?.toString()}
                        </FormFeedback>
                    )}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col lg={3}>
                    <Label htmlFor="contactNumber" className="form-label">
                        Ảnh
                    </Label>
                </Col>
                <Col lg={9}>
                    <input
                        {...register("thumbnail")}
                        type="file"
                        accept="image/png, image/jpeg"
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col lg={3}>
                    <label htmlFor="meassageInput" className="form-label">
                        Mô tả
                    </label>
                </Col>
                <Col lg={9}>
                    <textarea
                        {...register("description")}
                        className="form-control"
                        rows={3}
                        placeholder="Nhập mô tả"
                    ></textarea>
                </Col>
            </Row>

            <div className="text-end">
                <button type="submit" className="btn btn-primary">
                    Lưu
                </button>
            </div>
        </Form>
    );
}

export default ProductForm;
