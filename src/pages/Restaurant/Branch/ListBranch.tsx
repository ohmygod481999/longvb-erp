import React, { ReactNode } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Grid, _ } from "gridjs-react";
import { useQuery } from "@apollo/client";
import { Store, StoresResponse } from "../../../models/store.model";
import { GET_ALL_STORES_OF_COMPANY } from "../../../states/store/store.queries";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { formatDateTime } from "../../../helpers";

const data1 = [
    [
        "01",
        "Jonathan",
        "jonathan@example.com",
        "Senior Implementation Architect",
        "Hauck Inc",
        "Holy See",
    ],
    [
        "02",
        "Harold",
        "harold@example.com",
        "Forward Creative Coordinator",
        "Metz Inc",
        "Iran",
    ],
    [
        "03",
        "Shannon",
        "shannon@example.com",
        "Legacy Functionality Associate",
        "Zemlak Group",
        "South Georgia",
    ],
    [
        "04",
        "Robert",
        "robert@example.com",
        "Product Accounts Technician",
        "Hoeger",
        "San Marino",
    ],
    [
        "05",
        "Noel",
        "noel@example.com",
        "Customer Data Director",
        "Howell - Rippin",
        "Germany",
    ],
    [
        "06",
        "Traci",
        "traci@example.com",
        "Corporate Identity Director",
        "Koelpin - Goldner",
        "Vanuatu",
    ],
    [
        "07",
        "Kerry",
        "kerry@example.com",
        "Lead Applications Associate",
        "Feeney, Langworth and Tremblay",
        "Niger",
    ],
    [
        "08",
        "Patsy",
        "patsy@example.com",
        "Dynamic Assurance Director",
        "Streich Group",
        "Niue",
    ],
    [
        "09",
        "Cathy",
        "cathy@example.com",
        "Customer Data Director",
        "Ebert, Schamberger and Johnston",
        "Mexico",
    ],
    [
        "10",
        "Tyrone",
        "tyrone@example.com",
        "Senior Response Liaison",
        "Raynor, Rolfson and Daugherty",
        "Qatar",
    ],
];

function ListBranch() {
    document.title = "Quản lý chi nhánh";

    const { userProfile } = useProfile();

    const { data, loading, error } = useQuery<StoresResponse>(
        GET_ALL_STORES_OF_COMPANY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    console.log(data?.store);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Quản lý chi nhánh"
                        pageTitle="Quản trị nhà hàng"
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0 flex-grow-1">
                                        Danh sách chi nhánh
                                    </h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <Grid
                                            data={() =>
                                                new Promise((resolve) => {
                                                    setInterval(() => {
                                                        if (data?.store) {
                                                            resolve(
                                                                data.store.map(
                                                                    (item) => [
                                                                        item.id,
                                                                        item.name,
                                                                        formatDateTime(
                                                                            item.created_at,
                                                                            false
                                                                        ),
                                                                        item.id,
                                                                    ]
                                                                )
                                                            );
                                                        }
                                                    }, 1);
                                                })
                                            }
                                            columns={[
                                                {
                                                    name: "ID",
                                                    formatter: (
                                                        cell: ReactNode
                                                    ) =>
                                                        _(
                                                            <span className="fw-semibold">
                                                                {cell}
                                                            </span>
                                                        ),
                                                },
                                                "Tên chi nhánh",
                                                "Ngày tạo",
                                                {
                                                    name: "Thao tác",
                                                    formatter: (
                                                        cell: ReactNode
                                                    ) =>
                                                        _(
                                                            <div>
                                                                <a
                                                                    href="/#"
                                                                    className="text-reset text-decoration-underline"
                                                                >
                                                                    {" "}
                                                                    Sửa
                                                                </a>{" "}
                                                                /{" "}
                                                                <a
                                                                    href="/#"
                                                                    className="text-reset text-decoration-underline"
                                                                >
                                                                    Xóa{" "}
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
}

export default ListBranch;
