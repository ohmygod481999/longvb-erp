import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { RevenueCharts } from "./DashboardEcommerceCharts";
import CountUp from "react-countup";
import { useSelector, useDispatch } from "react-redux";
import { allRevenueData } from "../../common/data";
import { useQueryRevenueMonthly } from "../../Components/Hooks/useQueryRevenueMonthly";
import { useQueryOrderCountMonthly } from "../../Components/Hooks/useQueryOrderCountMonthly";
import { useQuery } from "@apollo/client";
import { DashboardResponse } from "../../models/dashboard.model";
import { GET_DASHBOARD } from "../../states/dashboard/dashboard.queries";
import { useQueryRevenue } from "../../Components/Hooks/useQueryRevenue";
import { useQueryOrderCount } from "../../Components/Hooks/useQueryOrderCount";
import { getEndDayOfYear, getFirstDayOfYear } from "../../helpers";

const Revenue = () => {
    const dispatch = useDispatch();
    // const { data } = useQuery<DashboardResponse>(GET_DASHBOARD);
    // const dashboard = data?.dashboard;

    const revenue = useQueryRevenue(getFirstDayOfYear(), getEndDayOfYear());
    const orderCount = useQueryOrderCount(getFirstDayOfYear(), getEndDayOfYear());

    const revenueMonthly = useQueryRevenueMonthly();
    const orderCountMonthly = useQueryOrderCountMonthly();

    // console.log(orderCountMonthly);

    const [chartData, setchartData] = useState(allRevenueData);

    useEffect(() => {
        const _chartData = [
            {
              name: "Doanh thu",
              type: "bar",
              data: revenueMonthly,
            },
            {
              name: "Đơn hàng",
              // type: "bar",
              type: "line",
              data: orderCountMonthly,
            },
        ];
        console.log(_chartData)
        setchartData(_chartData);
    }, [revenueMonthly, orderCountMonthly]);

    const onChangeChartPeriod = (pType: any) => {
        alert("change Period");
        // dispatch(getRevenueChartsData(pType));
    };

    useEffect(() => {
        // dispatch(getRevenueChartsData("all"));
    }, [dispatch]);
    return (
        <React.Fragment>
            <Card>
                <CardHeader className="border-0 align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Doanh thu năm</h4>
                    {/* <div className="d-flex gap-1">
                        <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm"
                            onClick={() => {
                                onChangeChartPeriod("all");
                            }}
                        >
                            ALL
                        </button>
                        <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm"
                            onClick={() => {
                                onChangeChartPeriod("month");
                            }}
                        >
                            1M
                        </button>
                        <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm"
                            onClick={() => {
                                onChangeChartPeriod("halfyear");
                            }}
                        >
                            6M
                        </button>
                        <button
                            type="button"
                            className="btn btn-soft-primary btn-sm"
                            onClick={() => {
                                onChangeChartPeriod("year");
                            }}
                        >
                            1Y
                        </button>
                    </div> */}
                </CardHeader>

                <CardHeader className="p-0 border-0 bg-soft-light">
                    <Row className="g-0 text-center">
                        <Col xs={6} sm={6}>
                            <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                    <CountUp
                                        start={0}
                                        end={revenue}
                                        duration={3}
                                        separator=","
                                        suffix="đ"
                                    />
                                </h5>
                                <p className="text-muted mb-0">Doanh thu</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={6}>
                            <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                    <CountUp
                                        // suffix="k"
                                        // prefix="$"
                                        start={0}
                                        // decimals={2}
                                        end={orderCount}
                                        duration={3}
                                    />
                                </h5>
                                <p className="text-muted mb-0">Đơn hàng</p>
                            </div>
                        </Col>
                        {/* <Col xs={6} sm={3}>
                            <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                    <CountUp start={0} end={367} duration={3} />
                                </h5>
                                <p className="text-muted mb-0">Refunds</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={3}>
                            <div className="p-3 border border-dashed border-start-0 border-end-0">
                                <h5 className="mb-1 text-success">
                                    <CountUp
                                        start={0}
                                        end={18.92}
                                        decimals={2}
                                        duration={3}
                                        suffix="%"
                                    />
                                </h5>
                                <p className="text-muted mb-0">
                                    Conversation Ratio
                                </p>
                            </div>
                        </Col> */}
                    </Row>
                </CardHeader>

                <CardBody className="p-0 pb-2">
                    <div className="w-100">
                        <div dir="ltr">
                            <RevenueCharts
                                series={chartData}
                                dataColors='["--vz-primary", "--vz-success", "--vz-danger"]'
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Revenue;
