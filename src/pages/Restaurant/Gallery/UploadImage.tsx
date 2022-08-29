/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../helpers/api_helper";
import { toast } from "react-toastify";
import { useProfile } from "../../../Components/Hooks/AuthHooks";

interface Props {
  modal_upload: any;
  tog_upload: any;
  setData: any;
}

const UploadImage = ({ modal_upload, tog_upload, setData }: Props) => {
  const { userProfile } = useProfile();
  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const uploadFile = async () => {
    console.log(111);
    if (selectedFiles.length > 0) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFiles[0]);
        const uploadResponse = await axiosInstance.post("/gallery", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast("Upload ảnh thành công", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          autoClose: 2000,
          className: "bg-success text-white",
        });
        console.log(uploadResponse.data.data);
        setData((prev: any) => [
          {
            path: uploadResponse.data.data.localtion,
            id: uploadResponse.data.data.id,
          },
          ...prev,
        ]);
      } catch (error) {
        console.log(error);
        toast("Có lỗi xảy ra.", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-danger text-white",
        });
      }
    }
  };
  return (
    <React.Fragment>
      <Modal
        isOpen={modal_upload}
        toggle={() => {
          setselectedFiles([]);
          tog_upload();
        }}
        centered
      >
        <ModalHeader className="bg-light p-3">
          <div className="flex justify-between items-center">
            Upload ảnh
            <Button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={tog_upload}
            ></Button>
          </div>
        </ModalHeader>
        <form>
          <ModalBody>
            {selectedFiles.length < 1 ? (
              <Dropzone
                onDrop={(acceptedFiles) => {
                  handleAcceptedFiles(acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone dz-clickable">
                    <div className="dz-message needsclick" {...getRootProps()}>
                      <div className="mb-3">
                        <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                      </div>
                      <h4>Drop files here or click to upload.</h4>
                    </div>
                  </div>
                )}
              </Dropzone>
            ) : (
              ""
            )}
            <div className="list-unstyled mb-0" id="file-previews">
              {selectedFiles.map((f: any, i) => {
                return (
                  <Card
                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                    key={i + "-file"}
                  >
                    <div className="p-2">
                      <Row className="align-items-center">
                        <Row className="row-auto">
                          <img
                            data-dz-thumbnail=""
                            height="auto"
                            alt={f.name}
                            src={f.preview}
                          />
                        </Row>
                        <Row>
                          <Link to="#" className="text-muted font-weight-bold">
                            {f.name}
                          </Link>
                          <p className="mb-0">
                            <strong>{f.formattedSize}</strong>
                          </p>
                        </Row>
                      </Row>
                    </div>
                  </Card>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setselectedFiles([]);
                  tog_upload();
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-success"
                id="add-btn"
                onClick={() => {
                  uploadFile();
                  setselectedFiles([]);
                  tog_upload();
                }}
              >
                Xác nhận
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default UploadImage;
