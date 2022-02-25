import React, { useRef } from 'react';
import { setLocale, getLocale } from '../services/utils';
import '../assets/scss/languageMenu.scss';
import '../../node_modules/flag-icon-css/sass/flag-icons.scss';

export const LanguageMenu = () => {

    const locale = getLocale();
    const checkbox = useRef();

    const translateLocale = (locale) => {
        if(locale === "ro")
            return 'ro';
        else if(locale === "en")
            return "us";
        else
            return "ro";
    }
    const localeTranslated = translateLocale(locale);

    const handleSetLocale = (localeCode) => {
        setLocale(localeCode);
        document.location.reload();
    }

    return (
        <div className="wrapper">
            <input type="checkbox" ref={checkbox} />
            <div className="fab">
                <span className={`flag-icon flag-icon-${localeTranslated}`}></span>
            </div>
            <div className="fac">
                <span style={{cursor:"pointer"}} onClick={() => handleSetLocale('ro')}><span className="flag-icon flag-icon-ro"></span></span>
                <span style={{cursor:"pointer"}} onClick={() => handleSetLocale('en')}><span className="flag-icon flag-icon-us"></span></span>
            </div>
        </div>
    )
}

export default LanguageMenu;