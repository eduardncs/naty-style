import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import dogImg2 from '../../assets/img/theme/imgDog2.jpg';

const About = () => {

    return(
        <section className="section section-lg" style={{minHeight: "70vh"}} id="about">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={dogImg2}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                    <i className="ni ni-settings-gear-65" />
                  </div>
                  <h3><FormattedMessage id="about.h3"/></h3>
                  <p className="text-justify"><FormattedMessage id="about.p1"/></p>
                  <h4><FormattedMessage id="about.h4"/></h4>
                  <p><FormattedMessage id="about.p2"/></p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            variant='success'
                            className="badge-circle mr-3"
                          >
                            <i className="ni ni-settings-gear-65" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0"><FormattedMessage id="about.l1"/></h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            variant='success'
                            className="badge-circle mr-3"
                          >
                            <i className="ni ni-html5" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0"><FormattedMessage id="about.l2"/></h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            variant='success'
                            className="badge-circle mr-3"
                          >
                            <i className="ni ni-satisfied" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0"><FormattedMessage id="about.l3"/></h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
      </section>
    )
}
export default About;