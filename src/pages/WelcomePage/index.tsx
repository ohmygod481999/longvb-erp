import React, { useMemo, useState } from "react";
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Col,
    Collapse,
    Container,
    Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { useProfile } from "../../Components/Hooks/AuthHooks";
import classnames from "classnames";

function WelComePage() {
    const { userProfile } = useProfile();

    const [col4, setcol4] = useState(true);
    const [col5, setcol5] = useState(false);
    const [col6, setcol6] = useState(false);
    const [col7, setcol7] = useState(false);

    const t_col4 = () => {
        setcol4(!col4);
        setcol5(false);
        setcol6(false);
        setcol7(false);
    };

    const t_col5 = () => {
        setcol5(!col5);
        setcol4(false);
        setcol6(false);
        setcol7(false);
    };

    const t_col6 = () => {
        setcol6(!col6);
        setcol4(false);
        setcol5(false);
        setcol7(false);
    };

    const t_col7 = () => {
        setcol7(!col7);
        setcol6(false);
        setcol4(false);
        setcol5(false);
    };

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

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Trang chủ" pageTitle="Dashboard" />
                    <Row className="mb-3 pb-1">
                        <Col xs={12}>
                            <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                                <div className="flex-grow-1">
                                    <h4 className="fs-16 mb-1">
                                        {greeting}, {userProfile?.email}!
                                    </h4>
                                    <p className="text-muted mb-0">
                                        Chào mừng bạn đến với hệ thống quản trị
                                        doanh nghiệp.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <Col xxl={12}>
                                <Card>
                                    {/* <PreviewCardHeader title="Hướng dẫn sử dụng quản trị nhà hàng" /> */}
                                    <CardHeader className="align-items-center d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">
                                            Hướng dẫn sử dụng quản trị nhà hàng
                                        </h4>
                                    </CardHeader>

                                    <CardBody>
                                        <p className="">
                                            Hệ thống quản trị nhà hàng smartcard
                                            quản trị nhà hàng theo{" "}
                                            <code>chi nhánh</code>,{" "}
                                            <code>khu vực</code> của chi nhánh
                                            và quản trị từng <code>bàn</code>{" "}
                                            của khu vực đó.
                                        </p>
                                        <p className="">
                                            Ngoài ra, bạn có thể tạo ra những
                                            món ăn trong hệ thống và những món
                                            đó sẽ hiển thị trên menu điện tử
                                        </p>
                                        <p className="">
                                            Để sử dụng hệ thống, bạn cần phải
                                            tạo ra thông tin của các phần nêu
                                            trên, theo thứ tự:
                                            <ol>
                                                <li>Tạo chi nhánh</li>
                                                <li>Tạo khu vực</li>
                                                <li>Tạo bàn ăn</li>
                                                <li>Tạo phân loại món</li>
                                                <li>Tạo món</li>
                                            </ol>
                                        </p>
                                        <div className="live-preview">
                                            {/* @ts-ignore */}
                                            <Accordion
                                                id="default-accordion-example"
                                                flush
                                            >
                                                <AccordionItem>
                                                    <h2
                                                        className="accordion-header"
                                                        id="headingOne"
                                                    >
                                                        <button
                                                            className={classnames(
                                                                "accordion-button",
                                                                {
                                                                    collapsed:
                                                                        !col4,
                                                                }
                                                            )}
                                                            type="button"
                                                            onClick={t_col4}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Chi nhánh là gì ?
                                                        </button>
                                                    </h2>

                                                    <Collapse
                                                        isOpen={col4}
                                                        className="accordion-collapse"
                                                        id="collapseOne"
                                                    >
                                                        <div className="accordion-body">
                                                            <p>
                                                                Bạn sở hữu chuỗi
                                                                nhà hàng với
                                                                nhiều cơ sở khác
                                                                nhau, với hệ
                                                                thống smartcard,
                                                                chúng tôi gọi là
                                                                chi nhánh.
                                                            </p>
                                                            <p>
                                                                Nếu nhà hàng của
                                                                bạn chỉ có 1 địa
                                                                chỉ duy nhất,
                                                                vẫn cần phải tạo
                                                                ra 1 chi nhánh
                                                                để quản trị
                                                            </p>
                                                        </div>
                                                    </Collapse>
                                                </AccordionItem>
                                                <AccordionItem>
                                                    <h2
                                                        className="accordion-header"
                                                        id="headingTwo"
                                                    >
                                                        <button
                                                            className={classnames(
                                                                "accordion-button",
                                                                {
                                                                    collapsed:
                                                                        !col5,
                                                                }
                                                            )}
                                                            type="button"
                                                            onClick={t_col5}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Khu vực là gì ?
                                                        </button>
                                                    </h2>

                                                    <Collapse
                                                        isOpen={col5}
                                                        className="accordion-collapse"
                                                    >
                                                        <div className="accordion-body">
                                                            <p>
                                                                Một khu vực
                                                                thuộc sở hữu của
                                                                một chi nhánh.
                                                                Khu vực ở đây có
                                                                thể là "tầng",
                                                                "phòng", ... hay
                                                                bất cứ không
                                                                gian nào bạn
                                                                muốn nhóm các
                                                                bàn vào để quản
                                                                trị chung.
                                                            </p>
                                                            <p>
                                                                Nếu bạn chỉ có 1
                                                                khu vực hay
                                                                không muốn quản
                                                                trị theo khu
                                                                vực, bạn vẫn cần
                                                                phải tạo ra 1
                                                                khu vực đối với
                                                                mỗi chi nhánh
                                                                của mình
                                                            </p>
                                                        </div>
                                                    </Collapse>
                                                </AccordionItem>
                                                <AccordionItem>
                                                    <h2
                                                        className="accordion-header"
                                                        id="headingThree"
                                                    >
                                                        <button
                                                            className={classnames(
                                                                "accordion-button",
                                                                {
                                                                    collapsed:
                                                                        !col6,
                                                                }
                                                            )}
                                                            type="button"
                                                            onClick={t_col6}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Bàn là gì
                                                        </button>
                                                    </h2>
                                                    <Collapse
                                                        isOpen={col6}
                                                        className="accordion-collapse"
                                                    >
                                                        <div className="accordion-body">
                                                            <p>
                                                                Sau khi tạo xong
                                                                chi nhánh và khu
                                                                vực, bạn có thể
                                                                tạo ra bàn ăn ở
                                                                mỗi chi nhánh -
                                                                khu vực đó.
                                                            </p>
                                                            <p>
                                                                Mỗi bàn ăn sau
                                                                khi tạo sẽ ứng
                                                                với một mã QR
                                                                riêng, bạn có
                                                                thể tải chúng ở
                                                                phần quản trị
                                                                bàn. Sau đó, có
                                                                thể in và đặt ở
                                                                bàn, từ đó khách
                                                                hàng đến quán sẽ
                                                                quét mã QR và sẽ
                                                                hiển thị menu
                                                                điện tử rồi tiến
                                                                hành đặt đồ ăn
                                                                trực tiếp
                                                            </p>
                                                        </div>
                                                    </Collapse>
                                                </AccordionItem>
                                                <AccordionItem>
                                                    <h2
                                                        className="accordion-header"
                                                        id="headingThree"
                                                    >
                                                        <button
                                                            className={classnames(
                                                                "accordion-button",
                                                                {
                                                                    collapsed:
                                                                        !col7,
                                                                }
                                                            )}
                                                            type="button"
                                                            onClick={t_col7}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Phân loại món
                                                        </button>
                                                    </h2>
                                                    <Collapse
                                                        isOpen={col7}
                                                        className="accordion-collapse"
                                                    >
                                                        <div className="accordion-body">
                                                            <p>
                                                                Các món ăn trong
                                                                hệ thống được
                                                                phân chia theo
                                                                phân loại. Bạn
                                                                có thể quản trị
                                                                theo một nhóm
                                                                món khác nhau. VD: Các món về cá, đồ uống, lẩu, ...
                                                            </p>
                                                        </div>
                                                    </Collapse>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default WelComePage;
