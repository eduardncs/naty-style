import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getLocale } from "./services/utils";
import { createIntl, createIntlCache, IntlProvider } from 'react-intl';
import Landing from "./pages/Landing.js";
import NotFound from './pages/NotFound.js';
import CookiePolicy from "./pages/CookiePolicy";
//Languages
import English from './locales/en.json';
import Romanian from './locales/ro.json';

import './assets/scss/App.scss';

const cache = createIntlCache();
const formatIntl = (locale) => {
  switch (locale) {
    case "en-US":
      return English;
    case "en":
      return English;
    case "ro":
      return Romanian;
    default:
      return Romanian;
  }
}

export const intlGlobal = createIntl({ locale: getLocale(), messages: formatIntl(getLocale())}, cache);

export const App = () => {
  const locale = getLocale();
  const [lang, setLang] = useState(Romanian);

  useEffect(() => {
      switch (locale) {
        case "en-US":
          setLang(English);
          break;
        case "en":
          setLang(English);
          break;
        case "ro":
          setLang(Romanian);
          break;
        default:
          setLang(Romanian);
          break;
      }
     },[locale]
  )
  return (
    <IntlProvider locale={locale} messages={lang}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/cookie-policy" exact element={<CookiePolicy />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </IntlProvider>
  )
}

export default App;