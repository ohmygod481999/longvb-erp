import { gql, useMutation, useQuery } from "@apollo/client";
import { Grid, _ } from "gridjs-react";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import { formatDateTime } from "../../../../helpers";
import {
  ProductCategory,
  ProductCategoryResponse,
} from "../../../../models/product.model";
import {
  CREATE_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
  GET_ALL_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_CATEGORY,
} from "../../../../states/product/productCategory.queries";

const Categori = () => {
  const [modal_add, setmodal_add] = useState<boolean>(false);
  const [modal_update, setmodal_update] = useState<boolean>(false);
  const [modal_delete, setmodal_delete] = useState<boolean>(false);
  const [idCategory, setIdCategory] = useState<number>(-1);

  const [productCategory, setProductCategory] = useState<ProductCategory[]>([]);
  const [categoryname, setCategoryName] = useState<string>("");

  const [deleteProductCategory] = useMutation(DELETE_PRODUCT_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_PRODUCT_CATEGORY }],
  });
  const [createProductCategory] = useMutation(CREATE_PRODUCT_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_PRODUCT_CATEGORY }],
  });
  const [updateProductCategory] = useMutation(UPDATE_PRODUCT_CATEGORY, {
    refetchQueries: [{ query: GET_ALL_PRODUCT_CATEGORY }],
  });

  const { data, loading, error } = useQuery<ProductCategoryResponse>(
    GET_ALL_PRODUCT_CATEGORY,
    {
      onCompleted: (data) => {
        setProductCategory(data.product_category);
      },
    }
  );

  const tog_add = () => {
    setmodal_add(!modal_add);
  };
  const tog_update = () => {
    setmodal_update(!modal_update);
  };
  const tog_delete = () => {
    setmodal_delete(!modal_delete);
  };
  const handleCreateCategory = () => {
    createProductCategory({
      variables: {
        name: categoryname,
      },
    });
  };
  const handleUpdateCategory = (iid: number, name: string) => {
    if (iid !== -1) {
      updateProductCategory({
        variables: {
          id: iid,
          new_name: name,
        },
      });
    }
  };
  const handleDeleteCategory = (id: number) => {
    if (id !== -1) {
      deleteProductCategory({
        variables: {
          id: id,
        },
      });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Phân loại món ăn" pageTitle="Quản trị món ăn" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h4 className="card-title mb-0 flex-grow-1">
                      Danh sách loại món
                    </h4>
                    <Button
                      color="success"
                      className="add-btn me-1"
                      id="create-btn"
                      onClick={() => tog_add()}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add
                    </Button>
                  </div>
                </CardHeader>

                <CardBody>
                  <div id="table-gridjs">
                    <Grid
                      data={productCategory.map((item) => [
                        item.id,
                        item.name,
                        formatDateTime(item.created_at),
                        item.id + "+" + item.name,
                      ])}
                      columns={[
                        {
                          name: "ID",
                          formatter: (cell: ReactNode) =>
                            _(<span className="fw-semibold">{cell}</span>),
                        },
                        "Tên loại món",
                        "Ngày tạo",
                        {
                          name: "Thao tác",
                          formatter: (cell: ReactNode) =>
                            _(
                              <div className="d-flex gap-2">
                                <div
                                  className="edit"
                                  onClick={() => {
                                    setIdCategory(
                                      Number(cell?.toString().split("+")[0])
                                    );
                                    setCategoryName(
                                      cell?.toString().split("+")[1].toString()!
                                    );
                                    setmodal_update(true);
                                  }}
                                >
                                  <button
                                    className="btn btn-sm btn-success edit-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                  >
                                    Edit
                                  </button>
                                </div>
                                <div
                                  className="remove"
                                  onClick={() => {
                                    setIdCategory(
                                      Number(cell?.toString().split("+")[0])
                                    );
                                    setmodal_delete(true);
                                  }}
                                >
                                  <button className="btn btn-sm btn-danger remove-item-btn">
                                    Remove
                                  </button>
                                </div>
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
      {/* Add Modal */}
      <Modal
        isOpen={modal_add}
        toggle={() => {
          tog_add();
        }}
        centered
      >
        <ModalHeader className="bg-light p-3">
          <div className="flex justify-between items-center">
            Thêm loại món
            <Button
              type="button"
              onClick={() => {
                setmodal_add(false);
              }}
              className="btn-close"
              aria-label="Close"
            ></Button>
          </div>
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="mb-3" id="modal-id" style={{ display: "none" }}>
              <label htmlFor="id-field" className="form-label">
                ID
              </label>
              <input
                type="text"
                id="id-field"
                className="form-control"
                placeholder="ID"
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Tên loại món
              </label>
              <input
                type="text"
                id="customername-field"
                className="form-control"
                placeholder="Nhập loại món"
                onChange={(e: any) => setCategoryName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setmodal_add(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                id="add-btn"
                onClick={() => {
                  handleCreateCategory();
                  setmodal_add(false);
                }}
              >
                Them loai mon
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
      {/* Update Modal */}
      <Modal
        isOpen={modal_update}
        toggle={() => {
          tog_update();
        }}
        centered
      >
        <ModalHeader className="bg-light p-3">
          <div className="flex justify-between items-center">
            Chỉnh sửa loại món
            <Button
              type="button"
              onClick={() => {
                setmodal_update(false);
              }}
              className="btn-close"
              aria-label="Close"
            ></Button>
          </div>
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="mb-3" id="modal-id">
              <label htmlFor="id-field" className="form-label">
                ID
              </label>
              <input
                type="text"
                id="id-field"
                value={idCategory}
                className="form-control"
                placeholder="ID"
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Tên loại món
              </label>
              <input
                type="text"
                id="customername-field"
                className="form-control"
                placeholder="Nhập loại món"
                value={categoryname}
                onChange={(e: any) => setCategoryName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setIdCategory(-1);
                  setmodal_update(false);
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                id="add-btn"
                onClick={() => {
                  handleUpdateCategory(idCategory, categoryname);
                  setmodal_update(false);
                }}
              >
                Xác nhận
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
      {/* Modal delete */}
      <Modal
        id="topmodal"
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
      >
        <ModalHeader
          className="modal-title"
          id="myModalLabel"
          toggle={() => {
            tog_delete();
          }}
        >
          Xác nhận
        </ModalHeader>
        <ModalBody className="text-center p-3">
          <div className="mt-4">
            <h4 className="mb-3">Bạn có chắc chắn muốn xoá ?</h4>
            <div className="hstack gap-2 justify-content-center">
              <button
                className="btn btn-light link-success fw-medium"
                onClick={() => {
                  setIdCategory(-1);
                  tog_delete();
                }}
              >
                <i className="ri-close-line me-1 align-middle"></i> Huỷ
              </button>
              <button
                className="btn btn-danger remove-item-btn"
                onClick={() => {
                  handleDeleteCategory(idCategory);
                  setmodal_delete(false);
                }}
              >
                Xoá
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Categori;
