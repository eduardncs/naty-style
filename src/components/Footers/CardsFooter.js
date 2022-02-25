import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
export const CardsFooter = () => {
    return (
      <>
        <footer className="footer has-cards">
          <Container>
            <hr />
            <Row className="align-items-center justify-content-md-between">
              <Col md="12" className="mt-3">
                <div className="copyright text-center" >
                  © {new Date().getFullYear()}{" "}
                  <Link
                    to="/"
                  >
                    K9NCS VETERINARY SALOON
                  </Link>
                  .
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
  );
}

export default CardsFooter;
