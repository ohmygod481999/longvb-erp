import { Grid } from "gridjs-react";
import React, { ReactNode } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Categori = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Phân loại món ăn" pageTitle="Quản trị món ăn" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0 flex-grow-1">
                    Danh sách loại món
                  </h4>
                </CardHeader>

                <CardBody>
                  <div id="table-gridjs">
                    <Grid
                      data={() =>
                        new Promise((resolve) => {
                          setTimeout(() => {}, 2000);
                        })
                      }
                      columns={[
                        {
                          name: "ID",
                          formatter: (cell: ReactNode) => (
                            <span className="fw-semibold">{cell}</span>
                          ),
                        },
                        "Tên loại món",
                        "Ngày tạo",
                        {
                          name: "Thao tác",
                          formatter: (cell: ReactNode) => (
                            <div>
                              <a
                                href="/#"
                                className="text-reset text-decoration-underline"
                              >
                                Sửa
                              </a>

                              <a
                                href="/#"
                                className="text-reset text-decoration-underline"
                              >
                                Xóa
                              </a>
                            </div>
                          ),
                        },
                      ]}
                      search={true}
                      sort={true}
                      pagination={{
                        enabled: true,
                        limit: 5,
                      }}
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
};

export default Categori;
