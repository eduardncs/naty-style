import React, { useRef, useState } from 'react';
import { Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Card, CardBody, FormGroup, Input, Button } from 'reactstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import environments from '../../environments/environments';
import { etoast, makeValid, postMan, toast, translateBackendMessage, validateEmail, getLocale, validatePhone } from '../../services/utils';
import { FormattedMessage, useIntl } from 'react-intl';

export const Contact = () => {
    const intl = useIntl();
    const [loading, setLoading] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorCaptcha, setErrorCaptcha] = useState(false);

    const [token, setToken] = useState("");
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const captchaRef = useRef();
    const phoneRef = useRef();

    const sendMessage = async () => {
        setLoading(true);
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;
        const phone = phoneRef.current.value;

        const data = {
            data: {
                name: name,
                email: email,
                phone_number: phone,
                text: message
            },
            language_code:getLocale(),
            token: environments.hCaptchaRequired ? token : ""
        };

        if(!name)
            setErrorName(true);
        else
            setErrorName(false);

        if(!email || !validateEmail(email))
            setErrorEmail(true);
        else
            setErrorEmail(false);

        if(!phone || !validatePhone(phone))
            setErrorPhone(true);
        else
            setErrorPhone(false);

        if(!message)
            setErrorMessage(true);
        else
            setErrorMessage(false);

        if(!token)
            setErrorCaptcha(true);
        else
            setErrorCaptcha(false);
        
        if(!name || !message || !email || !validateEmail(email) || (!token && environments.hCaptchaRequired))
        {
            captchaRef.current.resetCaptcha();
            setToken("");
            setLoading(false);
            return;
        }
        const [response,error] = await postMan("send-mail","POST",data);
        if(error)
        {
            etoast(translateBackendMessage("INTERNAL_ERROR"))
            captchaRef.current.resetCaptcha();
            setToken("");
            setLoading(false);
            return;
        }
        
        const result = response.data;

        if(result)
            toast(translateBackendMessage(result.message));
        
        setToken("");
        captchaRef.current.resetCaptcha();
        setLoading(false);
    }

    const handleVerificationSuccess = (token) => {
        setToken(token);
        setErrorCaptcha(false);
    }

    return(
        <React.Fragment>
            <section className="section section-lg bg-gradient-default">
                <Container className="pt-lg pb-300">
                <Row className="text-center justify-content-center">
                    <Col lg="10">
                    <h2 className="display-3 text-white"><FormattedMessage id="contact.header" /></h2>
                    </Col>
                </Row>
                <Row className="row-grid mt-5">
                    <Col lg="4" className="text-center">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                            <i className="ni ni-square-pin text-primary" />
                        </div>
                        <h5 className="text-white mt-3"><FormattedMessage id="contact.address" /></h5>
                        <div className="text-white mt-3">
                            <address>România, Constanta, str. Tulcea nr. 7</address>
                        </div>
                    </Col>
                    <Col lg="4" className="text-center">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                            <i className="ni ni-building text-primary" />
                        </div>
                        <h5 className="text-white mt-3"><FormattedMessage id="contact.details" /></h5>
                        <div className="text-white mt-3">
                            <FormattedMessage id="contact.details.phone" />: <a href="tel:0771077379">0771 077 379</a> <br/>
                            <FormattedMessage id="contact.details.email" />: <a href={`mailto:${environments.masterEmail}`}>{environments.masterEmail}</a><br />
                        </div>
                    </Col>
                    <Col lg="4" className="text-center">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                            <i className="ni ni-badge text-primary" />
                        </div>
                        <h5 className="text-white mt-3"><FormattedMessage id="contact.legal" /></h5>
                        <div className="text-white mt-3">
                            ONRC: J13/3641/2021<br />
                            CUI: 45164666
                        </div>
                    </Col>
                    <Col lg="12" md="12" className="mt-4">
                    <iframe title='Naty style grooming' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3233.8441336285678!2d28.620172664410035!3d44.200876224769516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x899b0dde49d8c731!2sNaty%20Style%20Grooming!5e0!3m2!1sen!2sro!4v1641142651569!5m2!1sen!2sro" width="100%" height="400" style={{border:"0"}} allowFullScreen="" loading="lazy"></iframe>
                    </Col>
                </Row>
                </Container>
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                >
                    <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                    />
                </svg>
                </div>
            </section>
            <section className="section section-lg pt-lg-0 section-contact-us" id="contact">
                <Container>
                <Row className="justify-content-center mt--300">
                    <Col lg="8">
                    <Card className="bg-gradient-secondary shadow">
                        <CardBody className="p-lg-5">
                        <h4 className="mb-1 text-center"> <FormattedMessage id="contact.form.header" /></h4>
                        <p className="mt-0 text-center"> <FormattedMessage id="contact.form.header-lead" /></p>
                        <FormGroup
                            className={errorName ? `mt-5 has-danger` : `mt-5`  }
                        >
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder={intl.formatMessage({id: 'contact.form.name'})}
                                type="text"
                                innerRef={nameRef}
                                onChange={(event) => makeValid(event)}
                            />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className={errorPhone ? `has-danger` : ``  }>
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faPhone} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="phone_number"
                                placeholder={intl.formatMessage({id: 'contact.form.phone'})}
                                type="text"
                                onChange={(event) => makeValid(event)}
                                innerRef={phoneRef}
                            />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className={errorEmail ? `has-danger` : ``  }>
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder={intl.formatMessage({id: 'contact.form.email'})}
                                type="email"
                                onChange={(event) => makeValid(event)}
                                innerRef={emailRef}
                            />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className={errorMessage ? `mb-4 has-danger` : `mb-4`  }>
                            <Input
                            className="form-control-alternative"
                            cols="80"
                            name="name"
                            placeholder={intl.formatMessage({id: 'contact.form.message'})}
                            rows="4"
                            type="textarea"
                            innerRef={messageRef}
                            onChange={(event) => makeValid(event)}
                            />
                        </FormGroup>
                        {
                            environments.hCaptchaRequired ? 
                            <FormGroup className={errorCaptcha ? `has-danger` : ``}>
                                <HCaptcha
                                    ref={captchaRef}
                                    sitekey={environments.hCaptchaSiteKey}
                                    onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
                                    languageOverride={getLocale()}
                                />
                                {
                                    errorCaptcha ? 
                                    <p className='text-danger'>
                                        <FormattedMessage id="error.captcha" />
                                    </p>
                                    :
                                    <></>
                                }
                            </FormGroup>
                            : <></>
                        }
                        <div>
                            {
                            loading ? 
                            <Button
                                block
                                className="btn-round"
                                color="default"
                                size="lg"
                                type="button"
                                disabled
                            >
                            <FormattedMessage id="loading" />
                            </Button>
                            :
                            <Button
                                block
                                className="btn-round"
                                color="default"
                                size="lg"
                                type="button"
                                onClick={() => sendMessage()}
                            >
                            <FormattedMessage id="contact.form.send-message" />
                            </Button>
                            }
                            
                        </div>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default Contact;