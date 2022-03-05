import React, { Suspense } from "react";
import MainLoader from '../components/MainLoader.js';
import MetaTags from 'react-meta-tags';
import { intlGlobal } from '../App.js';
import NavbarMain from '../components/Navbars/NavbarMain';
import Footer from '../components/Footers/Footer';
import GoTop from "../components/GoTop.js";

import About from './../components/Landing/About.js';
import Contact from "../components/Landing/Contact.js";
import SocialMediaLinks from "../components/Landing/SocialMediaLinks.js";
import Header from "../components/Landing/Header.js";
import Prices from "../components/Landing/Prices.js";


const Landing = () => {
    return (
      <Suspense fallback={<MainLoader/>}>
        <MetaTags>
                <title>{intlGlobal.formatMessage({id: "landing.title"})}</title>
                <meta name="description" content={intlGlobal.formatMessage({id: "landing.description"})} />
        </MetaTags>
        <div className="app-background landing-page">
          <NavbarMain />
          <div className="app-header">
              <Header />
          </div>
          <About />
          <Prices />
          <Contact />
          <SocialMediaLinks />
          <Footer optClass="footer" />
          <GoTop />
        </div>
      </Suspense>
    );
  }
  
 

export default Landing;