import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Col, Row } from "reactstrap";
import { useProfile } from "../../Components/Hooks/AuthHooks";
import { getFirstDayOfMonth } from "../../helpers";
import { DashboardResponse } from "../../models/dashboard.model";
import { dashboardMutations } from "../../states/dashboard/dashboard.mutations";
import { GET_DASHBOARD } from "../../states/dashboard/dashboard.queries";

const Section = () => {
    const { userProfile } = useProfile();
    const { data } = useQuery<DashboardResponse>(GET_DASHBOARD);

    const [dateRange, setDateRange] = useState<Date[]>([
        getFirstDayOfMonth(),
        new Date(),
    ]);

    useEffect(() => {
        if (dateRange.length > 1) {
            dashboardMutations.updateDashboard(dateRange[0], dateRange[1]);
        }
    }, [dateRange]);

    const greeting = useMemo(() => {
        var today = new Date();

        var curHr = today.getHours();

        if (curHr < 12) {
            return "Chào buổi sáng";
        } else if (curHr < 18) {
            return "Buổi chiều tốt lành";
        } else {
            return "Chào buổi tối";
        }
    }, []);

    const sidebar = () => {
        const element = document.getElementById("layout-rightside-coll");
        if (element) {
            element.classList.toggle("d-none");
        }
    };

    return (
        <React.Fragment>
            <Row className="mb-3 pb-1">
                <Col xs={12}>
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                            <h4 className="fs-16 mb-1">
                                {greeting}, {userProfile?.email}!
                            </h4>
                            <p className="text-muted mb-0">
                                Tổng quan nhà hàng của bạn.
                            </p>
                        </div>
                        <div className="mt-3 mt-lg-0">
                            <form action="#">
                                <Row className="g-3 mb-0 align-items-center">
                                    <div className="col-sm-auto">
                                        <div className="input-group">
                                            <Flatpickr
                                                // localname="vi"
                                                className="form-control border-0 dash-filter-picker shadow"
                                                options={{
                                                    mode: "range",
                                                    dateFormat: "d M, Y",
                                                    defaultDate: [
                                                        "01 Jan 2022",
                                                        "31 Jan 2022",
                                                    ],
                                                }}
                                                value={
                                                    dateRange
                                                    // data?.dashboard && [
                                                    //     data?.dashboard
                                                    //         .startDate,
                                                    //     data?.dashboard.endDate,
                                                    // ]
                                                }
                                                onChange={(value) => {
                                                    setDateRange(value);
                                                }}
                                            />
                                            <div className="input-group-text bg-primary border-primary text-white">
                                                <i className="ri-calendar-2-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-auto">
                                        <button
                                            type="button"
                                            className="btn btn-soft-success"
                                        >
                                            <i className="ri-add-circle-line align-middle me-1"></i>{" "}
                                            Add Product
                                        </button>
                                    </div> */}
                                    <div className="col-auto">
                                        <button
                                            type="button"
                                            className="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn"
                                            onClick={() => sidebar()}
                                        >
                                            <i className="ri-pulse-line"></i>
                                        </button>
                                    </div>
                                </Row>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Section;
