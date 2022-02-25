import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import facebook from '../../assets/img/social/facebook.png';
import instagram from '../../assets/img/social/instagram.png';
import environments from '../../environments/environments';

export const SocialMediaLinks = () => {

    return(
<section className="section p-0 m-0">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <div className="text-center">
                  <h2 className="display-4 mb-5 mt-5">
                    <FormattedMessage id="follow.header" />
                  </h2>
                  <Row className="d-flex justify-content-center">
                    <Col lg="12" xs="12">
                      <a
                        href={environments.social.facebook}
                        target="_blank"
                        className='m-3'
                        rel="noreferrer"
                      >
                        <img
                          alt="Out facebook page"
                          className="img-fluid img-social"
                          src={facebook}
                        />
                      </a>
                      <a
                        href={environments.social.instagram}
                        target="_blank"
                        className='m-3'
                        rel="noreferrer"
                      >
                        <img
                          alt="Our instagram page"
                          className="img-fluid img-social"
                          src={instagram}
                        />
                      </a>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
    )
}

export default SocialMediaLinks;