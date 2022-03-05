import React from "react";
import { Nav, Navbar, Container, NavItem } from 'react-bootstrap'
import logo from './../../assets/img/brand/logo-clean-white.png';
import { HashLink } from 'react-router-hash-link';


const NavbarMain = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark navbar-main-home" expand="md">
        <Container className="px-4">
          <Navbar.Brand className="text-brand">
            <HashLink to="/">
              <img src={logo} width="300px" height="120px" alt="logo" />
            </HashLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <NavItem as={HashLink} to="/#home" className="text-white" smooth={true} >ACASA</NavItem>
              <NavItem as={HashLink} to="/#about" className="text-white" smooth={true} >DESPRE NOI</NavItem>
              <NavItem as={HashLink} to="/#prices" className="text-white" smooth={true} >PRETURI</NavItem>
              <NavItem as={HashLink} to="/#contact" className="text-white" smooth={true} >CONTACT</NavItem>
              <NavItem className="ml-2">
                <a className="btn btn-outline-semi-light btn-sm pr-4 pl-4" href="tel:0771077379">
                  <span className="nav-link-inner--text">0771 077 379</span>
                </a>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMain;
