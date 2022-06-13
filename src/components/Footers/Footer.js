import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { environments } from '../../environments/environments';
import { FormattedMessage } from 'react-intl';

const Footer = (props) => {
  const optClass = props.optClass;
  const className = typeof optClass !== typeof undefined ?  `${optClass}` : `py-5`;
  const today = new Date().getFullYear().toString();
  return (
      <footer className={`${className}`}>
        <Container className="py-5 footer-content">
          <Row>
            <Col className="text-start col-6 col-xl-3 col-lg-3 col-md-3 col-sm-6">

            </Col>
            <Col className="text-end col-6 col-md-6 col-sm-6 d-block d-md-none">

            </Col>
            <Col sm={12} md={6} xl={6} className="text-center">
              <h4 className="text-white mb-3"><FormattedMessage id="about.h3"/></h4>
              <p>
                <FormattedMessage id="about.p1"/>
              </p>
            </Col>
            <Col className="text-end col-3 col-xl-3 col-lg-3 col-md-3 d-none d-md-block">

            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}><hr/></Col>
          </Row>
          <Row className="my-4">
            <Col md={12}>
              <h4 className="text-white text-center"><FormattedMessage id="follow.header" /></h4>
              <div className="text-center mt-4">
                <a href={environments.social.facebook} className="text-white"><span className="icon-circle icon-round"><FontAwesomeIcon icon={faFacebook} /></span></a>
                <a href={environments.social.instagram} className="text-white"><span className="icon-circle icon-round"><FontAwesomeIcon icon={faInstagram} /></span></a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="text-center">
              <p className="mb-0 text-white">Copyright © {today} @ K9NCS VETERINARY SALOON SRL</p>
              <p className="fs-6 font-monospace">CREATED BY NEACSU ALEXANDRU-EDUARD PFA</p>
            </Col>
          </Row>
        </Container>
      </footer>
  );
};

export default Footer;
