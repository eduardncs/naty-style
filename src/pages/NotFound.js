import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import "../assets/scss/notfound.scss";

export const NotFound = () => {
    return(
        <>
        <div className="error">
                <div className="container-floud">
                    <div className="col-xs-12 ground-color text-center">
                        <div className="container-error-404">
                            <div className="clip"><div className="shadow"><span className="digit thirdDigit">4</span></div></div>
                            <div className="clip"><div className="shadow"><span className="digit secondDigit">0</span></div></div>
                            <div className="clip"><div className="shadow"><span className="digit firstDigit">4</span></div></div>
                            <div className="msg">OH!<span className="triangle"></span></div>
                        </div>
                        <h2 className="h1"><FormattedMessage id="notFound.title" /></h2>
                        <h4 className="h4"><Link to="/" className="btn btn-primary"><FormattedMessage id="back" /></Link></h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound;