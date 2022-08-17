import React, { useState, ReactNode } from "react";
import "./styles.css";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Grid, _ } from "gridjs-react";
import { useQuery, useMutation } from "@apollo/client";
import { Store, StoresResponse } from "../../../models/store.model";
import {
  GET_ALL_STORES_OF_COMPANY,
  CREATE_STORE,
  DELETE_STORE,
  UPDATE_STORE,
} from "../../../states/store/store.queries";
import { useProfile } from "../../../Components/Hooks/AuthHooks";
import { formatDateTime } from "../../../helpers";
import Modal from "../../../Components/Utils/Modal";

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
  const [insertStoreMode, setInsertStoreMode] = useState<boolean>(false);

  const { data, loading, error } = useQuery<StoresResponse>(
    GET_ALL_STORES_OF_COMPANY,
    {
      variables: {
        company_id: userProfile?.company_id,
      },
    }
  );

  const [createStore, createStoreResponse] = useMutation(CREATE_STORE);
  const [deleteStore, deleteStoreResponse] = useMutation(DELETE_STORE);
  const [updateStore, updateStoreResponse] = useMutation(UPDATE_STORE);

  const handleDeleteStore = (store_id: number) => {
    let isOkay = window.confirm(`Chắc chắn chưa bro ???`);

    if (isOkay) {
      deleteStore({
        variables: {
          id: store_id,
        },
      });
      window.location.reload();
    }
  };

  const handleUpdateStore = (store_id: number) => {
    let txt = window.prompt(`[${store_id}] Nhập tên chi nhánh mới`);
    if (txt) {
      updateStore({
        variables: {
          id: store_id,
          new_name: txt,
        },
      });
      window.location.reload();
    }
  };

  const [storeName, setStoreName] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");

  const handleCreateStore = () => {
    createStore({
      variables: {
        name: storeName,
      },
    });
  };

  return (
    <React.Fragment>
      {insertStoreMode && (
        <Modal toggle={setInsertStoreMode}>
          <div className="insert-store">
            <div className="insert-store-heading">
              <span className="txt">Thêm chi nhánh</span>
              <span
                onClick={() => setInsertStoreMode(false)}
                className="close-modal-btn"
              ></span>
            </div>
            <div className="insert-store-body">
              <input
                onClick={(e: any) => setStoreName(e.target.value)}
                placeholder="Tên chi nhánh"
              />
              <input
                onClick={(e: any) => setCompanyId(e.target.value)}
                placeholder="Mã công ty"
              />
              <button onClick={handleCreateStore}>Hoàn tất</button>
            </div>
          </div>
        </Modal>
      )}
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý chi nhánh" pageTitle="Quản trị nhà hàng" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0 flex list-branch-heading">
                    Danh sách chi nhánh
                    <button
                      onClick={() => setInsertStoreMode(true)}
                      className="add-store-btn"
                    >
                      Thêm chi nhánh
                    </button>
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
                                data.store.map((item, index) => [
                                  item.id,
                                  item.name,
                                  formatDateTime(item.created_at, false),
                                  item.id,
                                ])
                              );
                            }
                          }, 1);
                        })
                      }
                      columns={[
                        {
                          name: "ID",
                          formatter: (cell: ReactNode) =>
                            _(<span className="fw-semibold">{cell}</span>),
                        },
                        "Tên chi nhánh",
                        "Ngày tạo",
                        {
                          name: "Thao tác",
                          formatter: (cell: ReactNode) =>
                            _(
                              <div>
                                <a
                                  onClick={() =>
                                    handleUpdateStore(Number(cell))
                                  }
                                  className="text-reset text-decoration-underline"
                                >
                                  {" "}
                                  Sửa
                                </a>{" "}
                                /{" "}
                                <a
                                  onClick={() =>
                                    handleDeleteStore(Number(cell))
                                  }
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
