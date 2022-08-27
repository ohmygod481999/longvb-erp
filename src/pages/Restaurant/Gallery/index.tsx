import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const Gallery = () => {
  const { userProfile } = useProfile();
  const [length, setLength] = useState<number>(6);
  const [start, setStart] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [modal_upload, setModal_upload] = useState<boolean>(false);
  const [hasmore, setHasmore] = useState<boolean>(true);

  const [galleryValues, setGalleryValue] = useState<gallery[]>([]);

  const [getGallery, queryGalleryValues] = useLazyQuery<GalleryResponse>(
    GET_ALL_GALLERY,
    {
      onCompleted: (data) => {
        setGalleryValue((prev) => prev.concat(data.gallery));
        setTotal(data.gallery_aggregate.aggregate.totalCount);
      },
    }
  );
  console.log(start + "---" + total);
  const tog_upload = () => {
    setModal_upload(!modal_upload);
  };
  useEffect(() => {
    getGallery({
      variables: {
        company_id: userProfile?.company_id,
        limit: length,
        offset: start,
      },
    });
  }, []);
  const fetchMoreData = () => {
    if (galleryValues.length <= total) {
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
  return (
    <React.Fragment>
      <UploadImage modal_upload={modal_upload} tog_upload={tog_upload} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Gallery" pageTitle="Pages" />
          <Row>
            <Col lg={12}>
              <div className="">
                <CardHeader className="card-header-has-action">
                  <h4 className="card-title mb-0">Danh sách ảnh</h4>
                  <div>
                    <Button
                      color="success"
                      className="add-btn me-1"
                      onClick={() => tog_upload()}
                      id="create-btn"
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <InfiniteScroll
                        dataLength={galleryValues.length}
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
                        <div className="row gallery-wrapper">
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
                                  <div className="gallery-container">
                                    <Link
                                      className="image-popup"
                                      to={image.path}
                                      title=""
                                    >
                                      <img
                                        className="gallery-img img-fluid mx-auto"
                                        src={image.path}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                </Card>
                              </Col>
                            ))}
                        </div>
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