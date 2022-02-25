import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { HashLink } from 'react-router-hash-link';
import videoLanding from '../../assets/landing.mov'

export const Header = () => {
  const intl = useIntl();
    return(
      <div className="position-relative">
        <section className="section section-lg section-shaped" id="home" style={
          {
            paddingBottom:"0",
            paddingTop:"0", 
            minHeight:"100vh", 
            maxHeight:"100vh", 
            height:"100vh"
          }}>
          <video autoPlay loop muted className="videoTag w-100 h-100" 
          style=
          {{
              position:"absolute",
              top:"0", 
              left: "0", 
              minWidth:"100vh", 
              minHeight:"100vh",
              maxHeight:"100vh", 
              objectFit:"fill"
          }}>
            <source src={videoLanding} type='video/mp4' />
          </video>
          <Container fluid className="position-relative w-100 h-100">
            <Container fluid className="d-flex h-100 w-100 justify-content-start align-items-center">
              <div className="col px-0 mb-3 pb-5">
                <Row>
                  <Col lg="12">
                    <h1 className="display-1 text-white text-center mb-0" dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'header.h1'})}}></h1>
                    <h2 className='display-3 text-white text-center'><span><FormattedMessage id="header.span" /></span></h2>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-icon mb-3 mb-sm-0"
                        color="info"
                        tag={HashLink}
                        to="/#services"
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fa fa-book" />
                        </span>
                        <span className="btn-inner--text"><FormattedMessage id="header.services" /></span>
                      </Button>
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                        color="default"
                        tag={HashLink}
                        to="/#calculator"
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fa fa-money" />
                        </span>
                        <span className="btn-inner--text">
                          <FormattedMessage id="header.offer" />
                        </span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </Container>
        </section>
      </div>
    )
}

export default Header;