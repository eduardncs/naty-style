import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import marketing1 from './../../assets/img/marketing/marketing1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserPlus, faDog } from '@fortawesome/free-solid-svg-icons';

export const About = () => {
    return(
        <section className="section section-lg" style={{minHeight: "70vh"}} id="about">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="6">
              <img
                alt="..."
                className="img-fluid floating"
                src={marketing1}
                loading="lazy"
              />
            </Col>
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <h3><FormattedMessage id="about.h3"/></h3>
                <p className="text-justify"><FormattedMessage id="about.p1"/></p>
                <h4><FormattedMessage id="about.h4"/></h4>
                <p><FormattedMessage id="about.p2"/></p>
                <ul className="list-unstyled mt-5">
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <Badge
                          pill 
                          bg='success'
                          className="badge-circle me-3 bg-success"
                        >
                          <FontAwesomeIcon icon={faCog} />
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
                          pill
                          bg='success'
                          className="badge-circle me-3 bg-success"
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
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
                          pill
                          bg='success'
                          className="badge-circle me-3 bg-success"
                        >
                          <FontAwesomeIcon icon={faDog} />
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