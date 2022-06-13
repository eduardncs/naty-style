import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col } from "react-bootstrap";
import dogImg2 from './../../assets/img/dogs/imgDog2.jpg';

export const Header = () => {
    return (
        <section>
          <Container>
              <Row className="header-hero home-row">
                  <Col className="col-12 d-block d-md-none">
                      <img className="img-fluid floating pb-5" src={dogImg2} alt="hero 1" width="90%" height="100%" loading="lazy" />
                  </Col>
                  <Col xl={4} lg={5} md={6}>
                      <h2 className="display-1"><FormattedMessage id="header.h1" /></h2>
                      <div className="home-hero-text">
                          <p>
                            <FormattedMessage id="header.span1" />
                          </p>
                          <p>
                            <FormattedMessage id="header.span2" />
                          </p>
                          <p>
                            <FormattedMessage id="header.span3" />
                          </p>
                      </div>
                      <a href="tel:0771077379" className="btn btn-light btn-xl mr-2 mb-2 mt-4">
                        <FormattedMessage id="header.btn" />
                      </a>
                  </Col>
                  <Col className="col-12 col-xl-7 offset-xl-1 col-lg-7 col-md-6  d-none d-md-block">
                      <img className="img-fluid floating" src={dogImg2} alt="hero 1" width="90%" height="100%" loading='lazy' />
                  </Col>
              </Row>
          </Container>
      </section>
    )
}

export default Header;