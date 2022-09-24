import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import BestSellingProducts from "./BestSellingProducts";
import RecentActivity from "./RecentActivity";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import Section from "./Section";
import StoreVisits from "./StoreVisits";
import TopSellers from "./TopSellers";
import Widget from "./Widgets";

const DashboardEcommerce = () => {
    document.title = "Dashboard | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Dashboard" pageTitle="Dashboards" />
                    <Row>
                        <Col>
                            <div className="h-100">
                                <Section />
                                <Row>
                                    <Widget />
                                </Row>
                                <Row>
                                    <Col xl={8}>
                                        <Revenue />
                                    </Col>
                                    <StoreVisits />
                                    {/* <SalesByLocations /> */}
                                </Row>
                                {/* <Row>
                                    <BestSellingProducts />
                                    <TopSellers />
                                    <RecentOrders />
                                </Row> */}
                                <Row></Row>
                            </div>
                        </Col>
                        <RecentActivity />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardEcommerce;
