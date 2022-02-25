import React, { useState } from 'react';
import cookie from '../assets/img/icons/common/cookie.png';
import { getCookie, setCookie } from '../services/utils';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import '../assets/scss/cookieBanner.scss';

export const CookieBanner = () => {
    const [consent, setConsent] = useState(getCookie('cookie_consent'));

    const handleSetConsent = () => {
        setConsent(true);
        setCookie("cookie_consent",true,30);
    }
    return(
        !consent ? 
        <div id="cookieBanner" className="cookie-message">
            <img src={cookie} alt="Cookie Icon" />
            <span style={{display: "inline-block"}}>
                <span style={{borderRight:"0"}} ><FormattedMessage id="cookies.text" /></span>
                <Link to='/cookie-policy' ><FormattedMessage id="cookies.learn-more" /></Link>.
            </span>
            <span className="close" onClick={() => handleSetConsent()}>x</span>
        </div>
        : <></>
    )
}

export default CookieBanner;