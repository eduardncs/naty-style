import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Container, Carousel, Form } from 'react-bootstrap';
import { etoast, makeValid, postMan, toast, translateBackendMessage, parseLocaleURL, validatePassword, encrypt } from '../services/utils';
import { useParams } from 'react-router';
import MetaTags from 'react-meta-tags';
import LanguageMenu from "../components/LanguageMenu";
import CookieBanner from "../components/CookieBanner";
import { FormattedMessage, useIntl } from 'react-intl';
import { HashLink } from "react-router-hash-link";
import LogoClean from './../assets/img/logo-clean.png'
import { UserContext } from "../index.js";

const ForgotPassword = () => {
  const intl = useIntl();
  const user = useContext(UserContext);
  const { sid, token } = useParams();

  useEffect(
      () => {

          if(user.id)
              window.location.assign(parseLocaleURL());
      },[user.id]
  )
  return (
    <>
    <MetaTags>
      <title>Reseteaza parola | Platforma online factoring | Invoicecash</title>
      <meta name="description" content="Reset password" />
    </MetaTags>
      <Row className="h-100 w-100 m-0 p-0">
        <Col className="h-100 col-lg-4 col-md-4 col-12 col-sm-12 m-0 p-0 d-none d-sm-block">
        <Carousel fade={true} >
            <Carousel.Item className="vh-100 carousel-img-1">
              <Carousel.Caption>
                <h3><FormattedMessage id="reset-password.carousel.title1" /></h3>
                <p><FormattedMessage id="reset-password.carousel.caption1" /></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="vh-100 carousel-img-2">
              <Carousel.Caption>
                <h3><FormattedMessage id="reset-password.carousel.title2" /></h3>
                <p><FormattedMessage id="reset-password.carousel.caption2" /></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="vh-100 carousel-img-3">
              <Carousel.Caption>
                <h3><FormattedMessage id="reset-password.carousel.title3" /></h3>
                <p><FormattedMessage id="reset-password.carousel.caption3" /></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className="bg-white col-12 col-sm-12 col-md-8 pt-4">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <ResetBox intl={intl} sid={sid} token={token} />
          </div>
        </Col>
      </Row>
      <LanguageMenu />
      <CookieBanner />
    </>
  );
}

const ResetBox = (props) =>{
    const intl = props.intl;
    const sid = props.sid;
    const resetToken = props.token;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPassword2, setErrorPassword2] = useState(false);

    const password1 = useRef();
    const password2 = useRef();

    const validateForm = (data) => {
        let ret = true;
        if(!data.password || !validatePassword(data.password))
        {
            setErrorPassword(true);
            ret = false;
        }
        if(!data.repeatpassword || !validatePassword(data.repeatpassword) || (data.repeatpassword !== data.password))
        {
            setErrorPassword2(true);
            ret = false;
        }
        return ret;
    }

    const resetPass = async (e) => {
        e.preventDefault();

        const data = {
            password: password1.current.value,
            repeatpassword: password2.current.value
        };

        if(!validateForm(data))
            return false;

        setLoading(true);

        const [resp,error] = await postMan("reset_password","POST",{ 
            data: {
                password: encrypt(data.password),
                repeatpassword: encrypt(data.repeatpassword),
                sid: sid,
                token: resetToken
            },
            sid: sid
        });
        if(error)
        {
            etoast(intl.formatMessage({id: 'error.internal'}));
            return setLoading(false);
        }
        const response = resp.data.result;

        if(response.error_msg)
        {
            etoast(response.error_msg)
            return setLoading(false);
        }

        if(response.id)
        {
            setLoading(false);
            toast(translateBackendMessage("PASSWORD_RESET_SUCCESS"));
            navigate("/login");
        }
        setLoading(false);
    }

    const goBack = () => {
        navigate("/login");
    }
  
  return(
    <div className="mx-auto col-sm-12 col-md-10 col-lg-9">
      <Container>
        <Row className="justify-content-center">
          <Col lg="12" md="12">
            <HashLink to="/#header"><img src={LogoClean} alt="Invoice cash factoring logo" className="app-logo" /></HashLink>
            <h4 className="mb-0 mt-3">
              <div><FormattedMessage id="reset-password.header" /></div>
            </h4>
            <span className="pt-2"><FormattedMessage id="reset-password.header-lead" /></span>

            <h6 className="mt-3"><FormattedMessage id="reset-password.no-account" /><Link to="/register" className="text-primary"><FormattedMessage id="reset-password.register-now" /></Link></h6>
            <hr className="mb-3" />
            <Form>
              <Row>
                <Col md={12}>
                    <Form.Group controlId="password1" className={errorPassword ? `has-danger` : ``}>
                        <Form.Control isInvalid={errorPassword}  type="password" placeholder={intl.formatMessage({id: 'register.password'})} ref={password1} required autoComplete="new-password" minLength="8" maxLength="50" onChange={(event) => makeValid(event)} />
                            <Form.Control.Feedback type="invalid" >
                                <FormattedMessage id="error.password.invalid" />
                            </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group controlId="password2" className={errorPassword2 ? `has-danger` : ``}>
                        <Form.Control isInvalid={errorPassword2} type="password" placeholder={intl.formatMessage({id: 'register.repeat-password'})} ref={password2} required autoComplete="new-password" minLength="8" maxLength="50" onChange={(event) => makeValid(event,true,password1)} />
                            <Form.Control.Feedback type="invalid" >
                                <FormattedMessage id="error.password.notEqual" />
                            </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={12}><hr style={{marginTop: "0"}} /></Col>
                <Col md={12} className=" d-flex justify-content-between">
                    <Button variant="outline-primary" onClick={() => goBack()}>
                    <span id="reg_text">
                      <FormattedMessage id="forgot.back" />
                    </span>
                    </Button>
                    {
                    loading ? 
                    <Button
                    className="btn-round"
                    color="default"
                    type="submit"
                    disabled>
                        <FormattedMessage id="loading" />
                    </Button>
                    :
                    <Button
                        className="btn-round"
                        color="default"
                        type="submit"
                        onClick={(event) => resetPass(event)}>
                        <FormattedMessage id="forgot.reset-now" />
                    </Button>
                    }
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ForgotPassword;
