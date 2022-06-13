import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import bichon from './../../assets/img/dogs/bichon.jpg';
import corgi from './../../assets/img/dogs/corgi.jpg';
import rex from './../../assets/img/dogs/rex.jpg';
import cat from './../../assets/img/dogs/cat.jpg';
import preturi from './../../assets/img/marketing/Preturi.png';

export const Prices = () => {
    return (
    <React.Fragment>
        <section className="section section-lg background" id="prices">
            <Container className="text-center pb-4 mb-5">
                    <h2 className="display-3"><FormattedMessage id="services.header" /></h2>
            </Container>
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <div className="profile-card-4 text-center">
                            <img alt="Pachet servicii feline frizerie canina constanta " src={cat} className="img img-responsive" width={400} height={300} loading='lazy' />
                            <div className="profile-content">
                                <div className="profile-name">
                                    <FormattedMessage id="services.feline" />
                                </div>
                                <div className="profile-description">
                                    <div><FormattedMessage id="services.s1" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s2" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s3" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s4" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s5" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s6" /></div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="profile-card-4 text-center">
                            <img alt="Pachet servicii talie mica frizerie canina constanta" src={bichon} className="img img-responsive" width={400} height={300} loading='lazy' />
                            <div className="profile-content">
                                <div className="profile-name">
                                <FormattedMessage id="services.small" />
                                </div>
                                <div className="profile-description">
                                    <div><FormattedMessage id="services.s1" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s2" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s3" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s4" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s5" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s6" /></div>
                                    <hr className='m-1' />
                                    <div><FormattedMessage id="services.s7" /></div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="profile-card-4 text-center">
                            <img alt="Pachet servicii talie medie frizerie canina constanta" src={corgi} className="img img-responsive" width={400} height={300} loading='lazy' />
                            <div className="profile-content">
                                <div className="profile-name">
                                <FormattedMessage id="services.medium" />
                                </div>
                                <div className="profile-description">
                                    <div><FormattedMessage id="services.s1" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s2" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s3" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s4" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s5" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s6" /></div>
                                    <hr className='m-1' />
                                    <div><FormattedMessage id="services.s7" /></div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="profile-card-4 text-center">
                            <img alt="Pachet servicii talie mare frizerie canina constanta" src={rex} className="img img-responsive" width={400} height={300} loading='lazy' />
                            <div className="profile-content">
                                <div className="profile-name">
                                <FormattedMessage id="services.large" />
                                </div>
                                <div className="profile-description">
                                    <div><FormattedMessage id="services.s1" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s2" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s3" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s4" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s5" /></div>
                                    <hr className="m-1" />
                                    <div><FormattedMessage id="services.s6" /></div>
                                    <hr className='m-1' />
                                    <div><FormattedMessage id="services.s7" /></div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>       
        </section>
        <section className="section section-lg">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={12}><h2 className='text-center mb-5 pb-3'><FormattedMessage id="prices.header" /></h2></Col>
                <Col md={8} className="d-flex justify-content-center align-items-center">
                    <img src={preturi} className="img-fluid" loading='lazy' alt="preturile naty-style"/>
                </Col>
            </Row>
        </section>

        <section className="section section-lg background">
            <Container>
            <Card className="bg-gradient-warning shadow-lg border-0">
                <div className="p-5">
                <Row className="align-items-center">
                    <Col lg="8">
                    <h3 className="text-white">
                        <FormattedMessage id="order-now" />!
                    </h3>
                    <p className="lead text-white mt-3">
                    <FormattedMessage id="order-lead" />
                    </p>
                    </Col>
                    <Col className="ml-lg-auto" lg="3">
                    <Button
                        block
                        className="btn-white"
                        color="default"
                        href="tel:0771077379"
                        size="lg"
                    >
                        <FormattedMessage id="order" /> <br/>
                        0771 077 379
                    </Button>
                    </Col>
                </Row>
                </div>
            </Card>
            </Container>
        </section>
    </React.Fragment>
    )
}

export default Prices;