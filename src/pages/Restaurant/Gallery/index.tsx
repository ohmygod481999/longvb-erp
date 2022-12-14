import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useProfile } from "../../../Components/Hooks/AuthHooks";

import { Link } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { gallery, GalleryResponse } from "../../../models/gallery.model";
import { GET_ALL_GALLERY } from "../../../states/gallery/gallery.query";
import InfiniteScroll from "react-infinite-scroll-component";
import UploadImage from "./UploadImage";
import Masonry from "react-masonry-component";
import { DELETE_MULTI_IMAGE } from "../../../states/gallery/gallery.mutations";
import { toast } from "react-toastify";

const Gallery = () => {
  const { userProfile } = useProfile();
  const [length, setLength] = useState<number>(6);
  const [start, setStart] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [modal_upload, setModal_upload] = useState<boolean>(false);
  const [hasmore, setHasmore] = useState<boolean>(false);

  const [galleryValues, setGalleryValue] = useState<gallery[]>([]);
  const [selectedValue, setSelectedValue] = useState<number[]>([]);

  const [getGallery, queryGalleryValues] = useLazyQuery<GalleryResponse>(
    GET_ALL_GALLERY,
    {
      onCompleted: (data) => {
        setGalleryValue((prev) => prev.concat(data.gallery));
        setTotal(() => data.gallery_aggregate.aggregate.totalCount);
      },
      fetchPolicy: "network-only",
    }
  );

  const [deleteMultiImage] = useMutation(DELETE_MULTI_IMAGE);

  const tog_upload = () => {
    setModal_upload(!modal_upload);
  };
  useEffect(() => {
    getGallery({
      variables: {
        company_id: userProfile?.company_id,
        limit: length,
        offset: 0,
      },
    });
  }, []);

  const fetchMoreData = () => {
    if (galleryValues.length < total) {
      getGallery({
        variables: {
          company_id: userProfile?.company_id,
          limit: length,
          offset: start + length - 1,
        },
      });
      setStart(start + length);
    } else {
      setHasmore(false);
    }
  };

  const handleSelectedImage = (id: number) => {
    if (!selectedValue.includes(id)) {
      setSelectedValue((prev) => prev.concat(id));
    } else {
      const index = selectedValue.findIndex((prev) => prev === id);
      console.log(index);
      setSelectedValue((prev) => prev.filter((item) => item !== id));
    }
  };
  const handleDeleteImage = () => {
    try {
      deleteMultiImage({
        variables: {
          id: selectedValue,
        },
      });
      selectedValue.forEach((id) => {
        setGalleryValue((prev) => prev.filter((item) => item.id !== id));
      });
      toast("Xo?? ???nh th??nh c??ng", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        autoClose: 2000,
        className: "bg-success text-white",
      });
    } catch (error) {
      toast("C?? l???i x???y ra.", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        className: "bg-danger text-white",
      });
    }
  };
  console.log(selectedValue);
  return (
    <React.Fragment>
      <UploadImage
        modal_upload={modal_upload}
        tog_upload={tog_upload}
        setData={setGalleryValue}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Gallery" pageTitle="Pages" />
          <Row>
            <Col lg={12}>
              <div className="">
                <CardHeader className="card-header-has-action">
                  <h4 className="card-title mb-0">Danh s??ch ???nh</h4>
                  <div>
                    {selectedValue.length > 0 ? (
                      <Button
                        color="danger"
                        className="del-btn me-1"
                        onClick={handleDeleteImage}
                        id="delete-btn"
                      >
                        <i className=" ri-delete-bin-line align-bottom me-1"></i>{" "}
                        Xo??
                      </Button>
                    ) : (
                      ""
                    )}

                    <Button
                      color="success"
                      className="add-btn me-1"
                      onClick={() => tog_upload()}
                      id="create-btn"
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Th??m ???nh
                      m???i
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <InfiniteScroll
                        dataLength={galleryValues.length}
                        style={{
                          overflowX: "hidden",
                        }}
                        next={fetchMoreData}
                        hasMore={hasmore}
                        loader={
                          <div className="text-center my-2">
                            <Link to="#" className="text-success">
                              <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "}
                              Load More{" "}
                            </Link>
                          </div>
                        }
                      >
                        {/* @ts-ignore */}
                        <Masonry className="row gallery-wrapper">
                          {galleryValues &&
                            galleryValues.map((image, index) => (
                              <Col
                                xxl={3}
                                xl={4}
                                sm={6}
                                className="element-item project designing development"
                                key={index}
                              >
                                <Card className="gallery-box">
                                  <div
                                    className="gallery-container"
                                    style={{
                                      position: "relative",
                                    }}
                                  >
                                    {selectedValue.findIndex(
                                      (prev) => prev === image.id
                                    ) !== -1 ? (
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "-5px",
                                          left: "-2px",
                                          color: "#0ab39c",
                                          fontSize: "2rem",
                                        }}
                                      >
                                        <i className="ri-checkbox-circle-fill"></i>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div
                                      className="image-popup"
                                      onClick={() => {
                                        handleSelectedImage(image.id);
                                      }}
                                    >
                                      <img
                                        className="gallery-img img-fluid mx-auto"
                                        src={image.path}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </Card>
                              </Col>
                            ))}
                        </Masonry>
                      </InfiniteScroll>
                    </Col>
                  </Row>
                </CardBody>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Gallery;
