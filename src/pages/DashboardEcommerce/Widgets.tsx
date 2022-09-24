import { useQuery } from "@apollo/client";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { useQueryDishCount } from "../../Components/Hooks/useQueryDishCount";
import { useQueryOrderCount } from "../../Components/Hooks/useQueryOrderCount";
import { useQueryRevenue } from "../../Components/Hooks/useQueryRevenue";
import { useQueryStore } from "../../Components/Hooks/useQueryStore";
import { DashboardResponse } from "../../models/dashboard.model";
import { GET_DASHBOARD } from "../../states/dashboard/dashboard.queries";

const Widgets = () => {
    const { data } = useQuery<DashboardResponse>(GET_DASHBOARD);
    const dashboard = data?.dashboard;

    const revenue = useQueryRevenue(dashboard?.startDate, dashboard?.endDate);
    const orderCount = useQueryOrderCount(dashboard?.startDate, dashboard?.endDate);
    const dishCount = useQueryDishCount(dashboard?.startDate, dashboard?.endDate);
    const stores = useQueryStore()

    return (
        <React.Fragment>
            <Col xl={3} md={6}>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                    Doanh thu
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <h5 className={"fs-14 mb-0 text-success"}>
                                    <i
                                        className={
                                            "fs-13 align-middle ri-arrow-right-up-line"
                                        }
                                    ></i>{" "}
                                    50 %
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                                <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                    <span
                                        className="counter-value"
                                        data-target="559.25"
                                    >
                                        <CountUp
                                            start={0}
                                            // prefix="VND"
                                            suffix="VND"
                                            separator=","
                                            end={revenue}
                                            // decimals={item.decimals}
                                            duration={2}
                                        />
                                    </span>
                                </h4>
                                <Link
                                    to="#"
                                    className="text-decoration-underline"
                                >
                                    {/* View net earnings */}
                                </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                                <span
                                    className={
                                        "avatar-title rounded fs-3 bg-soft-success"
                                    }
                                >
                                    <i
                                        className={`text-success bx bx-dollar-circle`}
                                    ></i>
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={3} md={6}>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                    Đơn hàng
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <h5 className={"fs-14 mb-0 text-danger"}>
                                    <i
                                        className={
                                            "fs-13 align-middle ri-arrow-right-down-line"
                                        }
                                    ></i>{" "}
                                    50 %
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                                <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                    <span
                                        className="counter-value"
                                        data-target="559.25"
                                    >
                                        <CountUp
                                            start={0}
                                            // prefix="VND"
                                            suffix=" đơn"
                                            separator=","
                                            end={orderCount}
                                            // decimals={item.decimals}
                                            duration={3}
                                        />
                                    </span>
                                </h4>
                                <Link
                                    to="#"
                                    className="text-decoration-underline"
                                >
                                    {/* View net earnings */}
                                </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                                <span
                                    className={
                                        "avatar-title rounded fs-3 bg-soft-danger"
                                    }
                                >
                                    <i
                                        className={`text-danger bx bx-shopping-bag`}
                                    ></i>
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={3} md={6}>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                    Số món đã bán
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <h5 className={"fs-14 mb-0 text-danger"}>
                                    <i
                                        className={
                                            "fs-13 align-middle ri-arrow-right-down-line"
                                        }
                                    ></i>{" "}
                                    50 %
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                                <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                    <span
                                        className="counter-value"
                                        data-target="559.25"
                                    >
                                        <CountUp
                                            start={0}
                                            // prefix="VND"
                                            suffix=" món"
                                            separator=","
                                            end={dishCount}
                                            // decimals={item.decimals}
                                            duration={3}
                                        />
                                    </span>
                                </h4>
                                <Link
                                    to="#"
                                    className="text-decoration-underline"
                                >
                                    {/* View net earnings */}
                                </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                                <span
                                    className={
                                        "avatar-title rounded fs-3 bg-soft-warning"
                                    }
                                >
                                    <i
                                        className={`text-warning bx bx-bowl-rice`}
                                    ></i>
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={3} md={6}>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                    Chi nhánh
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <h5 className={"fs-14 mb-0 text-danger"}>
                                    <i
                                        className={
                                            "fs-13 align-middle ri-arrow-right-down-line"
                                        }
                                    ></i>{" "}
                                    50 %
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                                <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                    <span
                                        className="counter-value"
                                        data-target="559.25"
                                    >
                                        <CountUp
                                            start={0}
                                            // prefix="VND"
                                            // suffix=" "
                                            separator=","
                                            end={stores?.length || 0}
                                            // decimals={item.decimals}
                                            duration={3}
                                        />
                                    </span>
                                </h4>
                                <Link
                                    to="#"
                                    className="text-decoration-underline"
                                >
                                    {/* View net earnings */}
                                </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                                <span
                                    className={
                                        "avatar-title rounded fs-3 bg-soft-primary"
                                    }
                                >
                                    <i className="text-primary bx bxs-store-alt"></i>
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default Widgets;
