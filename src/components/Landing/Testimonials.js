import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardFooter } from "reactstrap";
import { FormattedMessage } from 'react-intl';

const Testiomials = (props) => {
  const data = props.data;
  const [auto, setAuto] = useState(true);
  const [state, setIndex] = useState(1);
  const [timeout, setTimeoutState] = useState(true);
  
  useEffect( () => {
    if(!auto) return;

    setTimeoutState(setTimeout(
      () => {
        if(!auto) return;
        state === data.length ? setIndex(1) : setIndex( state + 1);
      },
      4000
    ));
  },[state, auto, data.length])

  const toggleAuto = (state) => {
    if(!state) clearTimeout(timeout);
    setAuto(state);
  }

  return (
    <>
      <section className="section section-lg section-shaped" style={{minHeight:"70vh"}} id="testimonials">
      <div className="shape shape-style-1 shape-default">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <Container className="py-md">
        <Row className="row-grid justify-content-between align-items-center">
          <Col lg="4">
            <h3 className="display-3 text-white"><FormattedMessage id="testimonials.header" /></h3>
            <p className="lead text-white"><FormattedMessage id="testimonials.header-lead" /></p>
          </Col>
          <Col className="mb-lg-auto" lg="7">
            <div className="transform-perspective-right">
              {
                data.map(
                  (item, key) => {
                    return (
                    <Card key={key} className={`bg-secondary shadow border-0 ${key+1 === state ? "testimonial-card-show" : "testimonial-card-hide"}`} onMouseEnter={() =>  toggleAuto(false) } onMouseLeave={() => toggleAuto(true) }>
                      <CardBody className="px-lg-5 py-lg-5 d-flex justify-content-center align-items-center" style={{ minHeight: "350px"}}>
                        <div className="text-center text-muted mb-4">
                          <blockquote><i>"
                            {item.text}
                          "</i></blockquote>
                        </div>
                      </CardBody>
                      <CardFooter className="text-right">
                        {item.name} <br/>
                        <small>{item.title}</small>
                      </CardFooter>
                    </Card>
                    )
                  }
                )
              }
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
    </>
  );
}

export default Testiomials;
