import React, { Suspense } from "react";
import DemoNavbar from "../components/Navbars/DemoNavbar.js";
import CardsFooter from "../components/Footers/CardsFooter.js";
import MainLoader from '../components/MainLoader.js';
import Header from '../components/Landing/Header';
import LanguageMenu from '../components/LanguageMenu.js';
import CookieBanner from '../components/CookieBanner.js';
import MetaTags from 'react-meta-tags';
import { intlGlobal } from '../index.js';

const About = React.lazy(() => import('./../components/Landing/About'));
const Advantages = React.lazy(() => import('./../components/Landing/Advantages'));
const Prices = React.lazy(() => import('./../components/Landing/Prices'));
const Contact = React.lazy(() => import('./../components/Landing/Contact'));
const SocialMediaLinks = React.lazy(() => import('./../components/Landing/SocialMediaLinks'));

const Landing = () => {
    return (
      <Suspense fallback={<MainLoader/>}>
        <MetaTags>
                <title>{intlGlobal.formatMessage({id: "landing.title"})}</title>
                <meta name="description" content={intlGlobal.formatMessage({id: "landing.description"})} />
        </MetaTags>
        <DemoNavbar landing={true} />
        <main>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
              <About />
              <Advantages />
              <Prices />
              <Contact />
              <SocialMediaLinks />
          </Suspense>
        </main>
        <LanguageMenu />
        <CookieBanner />
        <CardsFooter />
      </Suspense>
    );
  }

export default Landing;