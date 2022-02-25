import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faThumbsUp, faArchway, faClock } from '@fortawesome/free-solid-svg-icons';
import grooming1 from './../../assets/img/grooming-1.png';

const Advantages = () => {
  return (
    <section className="section section-lg bg-gradient-primary" style={{minHeight:"70vh"}} id="why-us">
        <Container className="pb-3">
                <Row className="justify-content-center text-center">
                <Col lg="8">
                    <h2 className="display-3 text-white"><FormattedMessage id="advantages.header" /></h2>
                    <p className="lead text-white"><FormattedMessage id="advantages.header-lead" /></p>
                </Col>
                </Row>
        </Container>
        <Container className="py-md">
            <Row className="row-grid justify-content-between align-items-center">
              <Col className="mb-lg-auto d-block d-sm-none" lg={6}>
                  <div className="transform-perspective-right">
                      <img src={grooming1} className="img-fluid" alt="dog taking bath" width="700" height="200%" loading="lazy" />
                  </div>
              </Col>
              <Col lg="6">
                  <div className="d-flex px-3 py-2">
                      <div>
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                            <FontAwesomeIcon className="text-primary" icon={faLongArrowAltRight} />
                        </div>
                      </div>
                      <div className="pl-4">
                        <p className="text-white">
                          <FormattedMessage id="advantages.s1" />
                        </p>
                      </div>
                  </div>
                  <div className="d-flex px-3 py-2">
                      <div>
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <FontAwesomeIcon className="text-primary" icon={faThumbsUp} />
                        </div>
                      </div>
                      <div className="pl-4">
                        <p className="text-white">
                        <FormattedMessage id="advantages.s2" />
                        </p>
                      </div>
                  </div>
                  <div className="d-flex px-3 py-2">
                      <div>
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <FontAwesomeIcon className="text-primary" icon={faArchway} />
                        </div>
                      </div>
                      <div className="pl-4">
                        <p className="text-white">
                        <FormattedMessage id="advantages.s3" />
                        </p>
                      </div>
                  </div>
                  <div className="d-flex px-3 py-2">
                      <div>
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <FontAwesomeIcon className="text-primary" icon={faClock} />
                        </div>
                      </div>
                      <div className="pl-4">
                        <p className="text-white">
                        <FormattedMessage id="advantages.s4" />
                        </p>
                      </div>
                  </div>
              </Col>
              <Col className="mb-lg-auto d-none d-sm-block" lg={6}>
                  <div className="transform-perspective-right">
                      <img src={grooming1} className="img-fluid" alt="dog taking bath" width="700" height="500" loading="lazy" />
                  </div>
              </Col>
            </Row>
        </Container>
        {/* SVG separator */}
        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
    </section>
  );
}

export default Advantages;
