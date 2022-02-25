
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import Headroom from "headroom.js";
import { UncontrolledCollapse, NavbarBrand, Navbar, NavItem, Nav, Container, Row, Col, NavLink } from "reactstrap";
import { FormattedMessage } from 'react-intl';

import i1 from '../../assets/img/brand/logo-white-cropped.png';
import i2 from '../../assets/img/brand/logo-clean-2.png';

const DemoNavbar = (props) =>  {
  const [collapseClasses, setCollapseClasses] = useState("");

  useEffect(
    () => {
      const headroom = new Headroom(document.getElementById("navbar-main"));
      headroom.init();
    },[]
  )

  const onExiting = () => setCollapseClasses("collapsing-out");

  const onExited = () => setCollapseClasses("");
    return (
      <>
        <header className="header-global">
          <Navbar
            className={`navbar-main navbar-primary headroom ${props.landing ? 'navbar-landing navbar-transparent' : 'navbar-not-landing navbar-transparent'}`}
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/#home" tag={HashLink} smooth={true}>
                <img
                  alt="..."
                  src={i1}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={collapseClasses}
                onExiting={onExiting}
                onExited={onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={i2}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavLink tag={HashLink} to="/#home" className="text-white" smooth={true} >Acasa</NavLink>
                  <NavLink tag={HashLink} to="/#about" className="text-white" smooth={true} >Despre</NavLink>
                  <NavLink tag={HashLink} to="/#why-us" className="text-white" smooth={true} >De ce noi</NavLink>
                  <NavLink tag={HashLink} to="/#prices" className="text-white" smooth={true} >Preturi</NavLink>
                  <NavLink tag={HashLink} to="/#contact" className="text-white" smooth={true} >Contact</NavLink>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-lg-block ml-lg-4">
                    <a
                      className="btn btn-neutral btn-icon"
                      color="default"
                      href="tel:0771077379"
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-phone mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        <FormattedMessage id="navbar.platform"/>
                      </span>
                    </a>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    )
}

export default DemoNavbar;
