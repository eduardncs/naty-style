import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import { Button, Row, Col, Container, Carousel, Form } from 'react-bootstrap';
import { encrypt, etoast, makeValid, postMan, toast, validateEmail, validatePassword, getLocale, translateBackendMessage, parseLocaleURL } from '../services/utils';
import MetaTags from 'react-meta-tags';
import { UserContext } from "../index.js";
import LanguageMenu from "../components/LanguageMenu";
import CookieBanner from "../components/CookieBanner";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import environments from './../environments/environments';
import { FormattedMessage, useIntl } from 'react-intl';
import { HashLink } from "react-router-hash-link";
import LogoClean from './../assets/img/logo-clean.png';

const Login = (props) => {
    const action = props.action;
    const intl = useIntl();
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const {sid, token, email} = useParams();
    useEffect(
        () => {
            const verifyEmail = async () => {
                const [resp, error] = await postMan(
                    "verify_email", "POST",
                    {
                        data: {
                            token: token,
                        },
                        sid: sid,
                        email: email
                    }
                    ,getLocale()
                );
                if(error)
                {
                  return etoast(intl.formatMessage({id: 'error.internal'}));
                    
                }
                if(resp['data']['result']['error_msg'])
                {
                  return etoast(translateBackendMessage(resp['data']['result']['error_msg']));
                }
                if(resp['data']['result']['success_msg'])
                {
                  toast(translateBackendMessage(resp['data']['result']['success_msg']));
                  navigate("/login");
                  return;
                }
            }
            const logout = async () => {
                const [resp, error] = await postMan("logout_user","POST",{});
                if(error)
                {
                  return etoast(intl.formatMessage({id: 'error.internal'}));
                }
                console.log("response logout",resp);
                toast(intl.formatMessage({id: 'success'}));
                console.log("nav to login");
                navigate("/login");
            }
            if(action === "verify-email")
            {
              console.log("verify-email");
              verifyEmail();
              return;
            }
            if(action === "logout")
            {
              console.log("logout")
              logout();
              return;
            }
            if(action === "login" && user.id)
            {
              console.log("already logged");
              window.location.assign(parseLocaleURL());
            }
        }, [user.id]
    )

    const setUser = (props) => {
        user.setUser(
            {
                id: props.id,
                first_name: props.first_name,
                last_name: props.last_name,
                email: props.email
            })
    }
    
  return (
    <>
    <MetaTags>
      <title>Autentificare | Platformă online factoring | Invoicecash</title>
      <meta name="description" content="" />
    </MetaTags>
      <Row className="h-100 w-100 m-0 p-0">
        <Col className="h-100 col-lg-4 col-md-4 col-12 col-sm-12 m-0 p-0 d-none d-sm-block">
          <Carousel fade={true} >
            <Carousel.Item className="vh-100 carousel-img-1">
              <Carousel.Caption>
                <h3><FormattedMessage id="login.carousel.title1" /></h3>
                <p><FormattedMessage id="login.carousel.caption1" /></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="vh-100 carousel-img-2">
              <Carousel.Caption>
                <h3><FormattedMessage id="login.carousel.title2" /></h3>
                <p><FormattedMessage id="login.carousel.caption2" /></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="vh-100 carousel-img-3">
              <Carousel.Caption>
                <h3><FormattedMessage id="login.carousel.title3" /></h3>
                <p><FormattedMessage id="login.carousel.caption3" /></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className="bg-white col-12 col-sm-12 col-md-8 pt-4">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <LoginBox intl={intl} setUser={setUser} />
          </div>
        </Col>
      </Row>
      <LanguageMenu />
      <CookieBanner />
    </>
  );
}

const LoginBox = (props) =>{ 
    const intl = props.intl;
    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorCaptcha, setErrorCaptcha] = useState(false);
    const [token, setToken] = useState("");
    const email = useRef();
    const password = useRef();
    const captchaRef = useRef();
    const setUser = props.setUser;

    const validateForm = () => {
        let ret = true;
        if(!email.current.value || !validateEmail(email.current.value))
        {
            setErrorEmail(true);
            ret = false;
        }
        if(!password.current.value || !validatePassword(password.current.value))
        {
            setErrorPassword(true);
            ret = false;
        }
        if(!token)
        {
          setErrorCaptcha(true);
          ret = false;
        }
        return ret;
    }

    const login1 = async (e) => {
        e.preventDefault();
        if(!validateForm())
            return false;
        setErrorCaptcha(false);
        setLoading(true);
        const encPassword = encrypt(password.current.value);
        const [resp,error] = await postMan("login_user","POST",{ 
            data: {
                credential: null,
                email: email.current.value,
                password: encPassword,
                repeatpassword: encPassword,
                welcome_email: true
            }, 
            token: environments.hCaptchaRequired ? token : "",
        });
        if(error)
        {
            etoast(intl.formatMessage({id: 'register.company-name'}));
            captchaRef.current.resetCaptcha();
            return setLoading(false);
        }
        const response = resp.data.result;

        if(response.error_msg)
        {
            etoast(response.error_msg)
            captchaRef.current.resetCaptcha();
            return setLoading(false);
        }

        if(response.id)
        {
            setUser(response);
            setLoading(false);
            toast("SUCCESS");
            captchaRef.current.resetCaptcha();
            window.location.assign(parseLocaleURL());
        }

        setLoading(false);
    }
    const handleVerificationSuccess = (token) => {
      setToken(token);
      setErrorCaptcha(false);
  }
  return(
    <div className="mx-auto col-sm-12 col-md-10 col-lg-9">
      <Container>
        <Row className="justify-content-center">
          <Col lg="12" md="12">
            <HashLink to="/#header"><img src={LogoClean} alt="Invoice cash factoring logo" className="app-logo" /></HashLink>
            <h4 className="mb-0 mt-3">
              <div><FormattedMessage id="login.welcome" /></div>
            </h4>
            <span className="pt-2"><FormattedMessage id="login.welcome-lead" /></span>

            <h6 className="mt-3"><FormattedMessage id="login.no-account" /><Link to="/register" className="text-primary"> <FormattedMessage id="login.sign-up" /></Link></h6>
            <hr className="mb-3" />
            <Form>
              <Row>
                <Col md={6}>
                    <Form.Group controlId="formBasicEmail" className={errorEmail ? `has-danger` : ``}>
                        <Form.Control isInvalid={errorEmail} type="email" placeholder={intl.formatMessage({id: 'email'})} ref={email} required autoComplete="email" minLength="10" maxLength="255" onChange={(event) => makeValid(event)} />
                        <Form.Control.Feedback type="invalid" >
                          <FormattedMessage id="error.required" />
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="password" className={errorPassword ? `has-danger` : ``}>
                        <Form.Control isInvalid={errorPassword} type="password" placeholder={intl.formatMessage({id: 'password'})} ref={password} required autoComplete="new-password" minLength="8" maxLength="50" onChange={(event) => makeValid(event)} />
                        <Form.Control.Feedback type="invalid" >
                          <FormattedMessage id="error.required" />
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={12} className="mt-2">
                {
                    environments.hCaptchaRequired ? 
                    <Form.Group className={errorCaptcha ? `form-captcha has-danger` : `form-captcha`}>
                        <HCaptcha
                            ref={captchaRef}
                            sitekey={environments.hCaptchaSiteKey}
                            onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
                        />
                        {
                            errorCaptcha ? 
                            <p className='text-danger'>
                            <FormattedMessage id="error.captcha" />
                            </p>
                            :
                            <></>
                        }
                    </Form.Group>
                    : <></>
                }
                </Col>
                <Col md={12}><hr style={{marginTop: "0"}} /></Col>
                <Col md={12} className=" d-flex justify-content-between">
                  <div><h6 className="mt-3"><FormattedMessage id="login.forgot-password" /> <Link to="/forgot-password" className="text-primary"><FormattedMessage id="login.click-here" /></Link></h6></div>
                  {
                    loading ? 
                        <Button
                            className="btn-round"
                            color="default"
                            type="submit"
                            disabled
                        >
                        <FormattedMessage id="loading" />
                        </Button>
                        :
                        <Button
                            className="btn-round"
                            color="default"
                            type="submit"
                            onClick={(e) => login1(e) }
                        >
                        <FormattedMessage id="login.login" />
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

export default Login;
