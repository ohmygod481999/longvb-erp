import React, { useState, ReactNode } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row, Modal, Button, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Grid, _ } from "gridjs-react";
import { useQuery, useMutation } from "@apollo/client";
import { Store, StoresResponse } from "../../../models/store.model";
import { GET_ALL_STORES_OF_COMPANY, GET_ALL_COMPANY, CREATE_STORE, DELETE_STORE, UPDATE_STORE } from "../../../states/store/store.queries";
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
    const [modal, setModal] = useState<boolean>(false)
    const [storeName, setStoreName] = useState<string>("");
    const [companyId, setCompanyId] = useState<number>(NaN);

    const { data, loading, error } = useQuery<StoresResponse>(
        GET_ALL_STORES_OF_COMPANY,
        {
            variables: {
                company_id: userProfile?.company_id,
            },
        }
    );

    const companies = useQuery(GET_ALL_COMPANY, {
        variables: {}
    })

    const [createStore, createStoreResponse] = useMutation(CREATE_STORE)
    const [deleteStore, deleteStoreResponse] = useMutation(DELETE_STORE)
    const [updateStore, updateStoreResponse] = useMutation(UPDATE_STORE)

    const handleCreateStore = () => {
        console.log(storeName)
        createStore({
            variables: {
                name: storeName,
                company_id: userProfile?.company_id,
            },
        })
    }

    const handleDeleteStore = (store_id: number) => {

        let isOkay = window.confirm(`Bạn có chắc chắn ?`)

        if (isOkay) {
            deleteStore({
                variables: {
                    id: store_id
                }
            })
            window.location.reload()
        }
    }

    const handleUpdateStore = (store_id: number) => {
        let txt = window.prompt(`[${store_id}] Nhập tên chi nhánh mới`)
        if (txt) {
            updateStore({
                variables: {
                    id: store_id,
                    new_name: txt
                }
            }); window.location.reload()

        }
    }
    const toggle = () => setModal(!modal)

    return (
        <React.Fragment>
            <Modal isOpen={modal} toggle={toggle} className={""} centered >
                <ModalHeader className="bg-light p-3">
                    Thêm chi nhánh
                    <Button onClick={toggle} type="button" className="btn-close" aria-label="Close" >
                    </Button>
                </ModalHeader>
                <form>
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Tên chi nhánh</label>
                            <input onChange={(e:any) => setStoreName(e.target.value)} type="text" id="customername-field" className="form-control" placeholder="Nhập tên chi nhánh" required />
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Công ty</label>
                            <select onChange={(e: any) => setCompanyId(Number(e.target.value))} className="form-control" data-trigger name="status-field" id="status-field" >
                                {companies.data?.company?.map((c: any, index:number) => <option key={index} value={c.id}>{c.id}-{c.name}</option>)}

                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">

                            <button onClick={handleCreateStore} className="btn btn-success">Thêm Chi Nhánh</button>

                        </div>
                    </ModalFooter>
                </form>
            </Modal>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Quản lý chi nhánh"
                        pageTitle="Quản trị nhà hàng"
                    />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="card-header-has-action">
                                    <h4 className="card-title mb-0">
                                        Danh sách chi nhánh
                                    </h4>
                                    <div>
                                        <Button
                                            color="success"
                                            className="add-btn me-1"
                                            onClick={toggle}
                                        >
                                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                                            Thêm chi nhánh
                                        </Button>
                                    </div>
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
                                                                    (item, index) => [
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
                                                                    onClick={() => handleUpdateStore(Number(cell))}
                                                                    className="text-reset text-decoration-underline"
                                                                >
                                                                    {" "}
                                                                    Sửa
                                                                </a>{" "}
                                                                /{" "}
                                                                <a
                                                                    onClick={() => handleDeleteStore(Number(cell))}
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
