import React, { useState, useRef, useEffect, useContext } from "react";
import { Button , Container, Row, Col, Carousel, Form, Alert } from 'react-bootstrap';
import Select from 'react-select';
import SelectCompanies from './../components/SelectCompanies';
import { encrypt, getLocale, makeValid, postMan, translateBackendMessage, validateEmail, validatePassword, parseLocaleURL, validatePhone } from "../services/utils";
import { Link, useNavigate } from "react-router-dom";
import Overlay from '../components/Overlay/Overlay';
import { fetchCompanies } from "./../services/companies";
import { FormGroup, Input, Label } from 'reactstrap';
import LanguageMenu from "../components/LanguageMenu";
import CookieBanner from "../components/CookieBanner";
import MetaTags from 'react-meta-tags';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import environments from './../environments/environments';
import { FormattedMessage, useIntl } from 'react-intl';
import { HashLink } from "react-router-hash-link";
import LogoClean from '../assets/img/logo-clean.png';
import { UserContext } from "../index.js";

export const Register = () => {
    const intl = useIntl();
    const user = useContext(UserContext);

    useEffect(
        () => {

            if(user.id)
                window.location.assign(parseLocaleURL());
        },[user.id]
    )
  return (
    <React.Fragment>
        <MetaTags>
            <title>Înregistrare | Platformă online factoring | Invoicecash</title>
            <meta name="description" content="Creează un cont în platforma Invoicecash, scontează facturi, instant factoring, platformă online factoring" />
        </MetaTags>
      <Row className="h-100 w-100 m-0 p-0 register-box">
        <Col lg={4} className="h-100 col-lg-4 col-md-4 col-12 col-sm-12 m-0 p-0 register-carousel d-none d-sm-block">
          <Carousel fade={true} >
            <Carousel.Item className="vh-100 carousel-img-1">
              <Carousel.Caption>
                <h3><FormattedMessage id="register.carousel.title1" /></h3>
                <p><FormattedMessage id="register.carousel.caption1" /></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="vh-100 carousel-img-2">
              <Carousel.Caption>
                <h3><FormattedMessage id="register.carousel.title2" /></h3>
                <p><FormattedMessage id="register.carousel.caption2" /></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="vh-100 carousel-img-3">
              <Carousel.Caption>
                <h3><FormattedMessage id="register.carousel.title3" /></h3>
                <p><FormattedMessage id="register.carousel.caption3" /></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col lg={8} md={12} sm={12} className="d-flex bg-white justify-content-center align-items-center">
          <RegisterBox intl={intl} />
        </Col>
      </Row>
      <LanguageMenu />
      <CookieBanner />
    </React.Fragment>
  );
}

const RegisterBox = (props) =>{
  const intl = props.intl;
  const navigate = useNavigate(); 
  const [step, setStep] = useState(1);
  const [registerResponse, setRegisterResponse] = useState('');
  const [securityQuestions, setSecurityQuestions] = useState(null);
  const [genders, setUserTitles] = useState(null);
  const [company, setCompany] = useState([]);
  const [companyReg, setCompanyReg] = useState();
  const [gender, setGender] = useState('');
  const [squestion1, setSquestion1] = useState('');
  const [squestion2, setSquestion2] = useState('');
  const [token, setToken] = useState('');

  const registerData = {};

  const [errorCaptcha, setErrorCaptcha] = useState(false);
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPassword2, setErrorPassword2] = useState(false);
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(false);
  const [errorSecurityQuestion1, setErrorSecurityQuestion1] = useState(false);
  const [errorSecurityQuestion2, setErrorSecurityQuestion2] = useState(false);
  const [errorSecurityAnswer1, setErrorSecurityAnswer1] = useState(false);
  const [errorSecurityAnswer2, setErrorSecurityAnswer2] = useState(false);
  const [errorGdpr, setErrorGdpr] = useState(false);
  const [errorFraud, setErrorFraud] = useState(false);
  //REFS
  const first_name = useRef();
  const last_name = useRef();
  const email = useRef();
  const password1 = useRef();
  const password2 = useRef();
  const phone_number = useRef();
  const gdpr = useRef();
  const tos = useRef();
  const marketing = useRef();
  const overlayRef = useRef();
  const securityAnswer1 = useRef();
  const securityAnswer2 = useRef();
  const captchaRef = useRef();

  const [oldSecurityQuestions, setOldSecurityQuestions] = useState(null);

  const fetchOtherQuestionsExcept = (value) => oldSecurityQuestions.filter(i => i.value !== value);

  const onSetSquestion1 = (input) => {
      setSquestion1(input.value);
      setErrorSecurityQuestion1(false);
      setSecurityQuestions(fetchOtherQuestionsExcept(input.value));
  }
  const onSetSquestion2 = (input) => {
      setSquestion2(input.value);
      setErrorSecurityQuestion2(false);
      setSecurityQuestions(fetchOtherQuestionsExcept(input.value));
  }
  const onSetGender = (input) => {
      setGender(input.value);
      setErrorGender(false);
  }

  useEffect(
    () => {
      const fetchSecurityQuestions = async () => {
        const [data,error] = await postMan("get_security_questions_v2","POST",{data:{}, timeout:3000});

        if(error)
          return console.error("Something went wrong => ",error);
        
        if(data.data.result)
        {
          var sq = [];
          for (const item of data.data.result) {
            sq.push({label:item.question , value: item.id})
          }
          setSecurityQuestions(sq);
          setOldSecurityQuestions(sq);
        }
      }
      const fetchGenders = async () => {
        const [data,error] = await postMan("get_genders","POST",{data:{}, timeout:3000});

        if(error)
          return console.error("Something went wrong => ",error);
        
        if(data.data.result)
        {
          var genders = [];
          for (const item of data.data.result) {
            genders.push({label:item.title , value: item.id})
          }
          setUserTitles(genders);
        }
      }
      fetchSecurityQuestions();
      fetchGenders();
    }, []
  )

  const parseCompany = (value) => {
      return String(value).split("|");
  }

  const handleSetCompany = (value) => {
    const [id,reg_number] = parseCompany(value.value);
    const obj = {
        name: value.label,
        id: id,
        reg_number: reg_number
    };
    setCompany(value);
    setCompanyReg(obj);
    if(!company)
        setErrorCompany(true);
    else
        setErrorCompany(false);
  }
  const setChecksFalse = () => {
        setErrorFirstName(false);
        setErrorLastName(false);
        setErrorEmail(false);
        setErrorPhoneNumber(false);
        setErrorPassword(false);
        setErrorPassword2(false);
        setErrorPasswordRepeat(false);
        setErrorSecurityQuestion1(false);
        setErrorSecurityQuestion2(false);
        setErrorSecurityAnswer1(false);
        setErrorSecurityAnswer2(false);
        setErrorCompany(false);
        setErrorGender(false);
        setErrorGdpr(false);
        setErrorFraud(false);
  }

  const checkRegisterData = (registerData) => {
    let ret = true;
    if(!registerData.first_name)
    {
        setErrorFirstName(true);
        ret = false;
    }
    if(!registerData.last_name)
    {
        setErrorLastName(true);
        ret = false;
    }
    if(!registerData.email || !validateEmail(registerData.email))
    {
        setErrorEmail(true);
        ret = false;
    }
    if(!registerData.phone || !validatePhone(registerData.phone))
    {
        setErrorPhoneNumber(true);
        ret = false;
    }
    if(!registerData.password || !validatePassword(registerData.password))
    {
        setErrorPassword(true);
        ret = false;
    }
    if(!registerData.repeatpassword || !validatePassword(registerData.repeatpassword) || (registerData.repeatpassword !== registerData.password))
    {
        setErrorPassword2(true);
        ret = false;
    }
    if(!registerData.securityQuestion1)
    {
        setErrorSecurityQuestion1(true);
        ret = false;
    }
    if(!registerData.securityQuestion2)
    {
        setErrorSecurityQuestion2(true);
        ret = false;
    }
    if(!registerData.answerSecurityQuestion1)
    {
        setErrorSecurityAnswer1(true);
        ret = false;
    }
    if(!registerData.answerSecurityQuestion2)
    {
        setErrorSecurityAnswer2(true);
        ret = false;
    }
    if(!registerData.sellerCompany)
    {
        setErrorCompany(true);
        ret = false;
    }
    if(!registerData.gender)
    {
        setErrorGender(true);
        ret = false;
    }
    if(!registerData.gdpr)
    {
        setErrorGdpr(true);
        ret = false;
    }
    if(!registerData.fraud)
    {
        setErrorFraud(true);
        ret = false;
    }
    if(!token)
    {
        setErrorCaptcha(true);
        ret = false;
    }
    return ret;
  }

  const register = async () => {

    registerData.welcome_email = true;
    registerData.answerSecurityQuestion1 = securityAnswer1.current.value;
    registerData.answerSecurityQuestion2 = securityAnswer2.current.value;
    registerData.securityQuestion1 = squestion1;
    registerData.securityQuestion2 = squestion2;
    registerData.gender = gender;
    registerData.credential = null;
    registerData.email = email.current.value;
    registerData.phone = phone_number.current.value;
    registerData.password = password1.current.value;
    registerData.repeatpassword = password2.current.value;
    registerData.first_name = first_name.current.value;
    registerData.last_name = last_name.current.value;
    registerData.fraud = tos.current.checked ? "1" : "0";
    registerData.gdpr = gdpr.current.checked ? "1" : "0";
    registerData.marketing = marketing.current.checked ? "1" : "0";
    registerData.sellerCompany = companyReg;

    if(!checkRegisterData(registerData))
    {
        return setRegisterResponse({variant: "danger", text: intl.formatMessage({id: 'error.fill-all-fields'})});
    }else{
        setRegisterResponse({});
        setChecksFalse();
    }
    
    registerData.password = encrypt(registerData.password);
    registerData.repeatpassword = encrypt(registerData.repeatpassword);

    setStep(2);
    const [resp,error] = await postMan("save_user","POST",
    {
        data: registerData,
        token: environments.hCaptchaRequired ? token : "",
        language_code: getLocale()
    }, false);
  
    if(error) {
      setRegisterResponse({variant: "danger", text: intl.formatMessage({id: 'error.internal'})});
      setStep(1);
      captchaRef.current.resetCaptcha();
      setToken("")
      return false;
    }
    
    if(resp['data']['result']['error_type'])
    {
        if(resp['data']['result']['error_type'] === "1")
        {
            setRegisterResponse({variant: "danger",text:translateBackendMessage(resp['data']['result']['error_code'])});
            setStep(1);
            captchaRef.current.resetCaptcha();
            setToken("")
            return false;
        }else if(resp['data']['result']['error_type'] === "2")
        {
            //AICI E DEFAPT SUCCESSUL
            setRegisterResponse({variant:"success",text:translateBackendMessage(resp['data']['result']['error_msg'])});
            setStep(1);
            captchaRef.current.resetCaptcha();
            return true;
        }
    }else{
        setRegisterResponse({variant: "danger",text:translateBackendMessage(resp['data']['result']['error_msg'])});
        setStep(1);
        setToken("")
        captchaRef.current.resetCaptcha();
        return false;
    }
  }
  const goBack = () => {
    navigate("/login");
  }

  const handleVerificationSuccess = (token) => {
      setToken(token);
      setErrorCaptcha(false);
  }

  return(
    <div className="mx-auto col-sm-12 col-md-11 col-lg-10 registerForm">
        <Overlay ref={overlayRef} md={12} margin="mt-3" customClass={`border-0 ${step === 2 ? "d-block" : "d-none"}`} innerText="Processing your request" />
        <Container id="register-step-1" style={{
            display: step === 1 ? "block" : "none"
            }}>
            <Row className="justify-content-center">
                <Col md={12}>
                <HashLink to="/#header"><img src={LogoClean} alt="Invoice cash factoring logo" className="app-logo" /></HashLink>
                <h4 className="mt-2">
                    <div><FormattedMessage id="register.header" /></div>
                </h4>
                <span className="pt-2"><FormattedMessage id="register.header-lead" /> <Link to="/login"><b><FormattedMessage id="register.click-here" /></b></Link>.</span>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={12} md={12} className="mt-3">
                    <Form role="form">
                        <Row>
                            <Container className={registerResponse ? "d-block" : "d-none"}>
                            {
                                registerResponse ? 
                                <Row>
                                    <Col md={12}>
                                        <Alert variant={registerResponse.variant}>
                                            {registerResponse.text}
                                        </Alert>
                                    </Col>
                                </Row>
                                :
                                <></>
                            }
                            </Container>
                            <Col md={12} className="select-companies-col">
                                <Form.Group className={errorCompany ? `form-group-companies has-danger` : `form-group-companies`}>
                                    <SelectCompanies
                                        value={company}
                                        placeholder={intl.formatMessage({id: 'register.company-name'})}
                                        fetchOptions={fetchCompanies}
                                        onChange={(newValue) => {
                                            handleSetCompany(newValue);
                                        }}
                                        style={{
                                        width: '100%',
                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={12} className="mb-1">
                                <Form.Group className={errorGender ? `form-group-select has-danger` : ``}>
                                    <Select id="titulatura" options={genders} placeholder={intl.formatMessage({id: 'register.gender'})} defaultValue="Select gender" name="titulatura" isSearchable={false} onChange={onSetGender}/>
                                    <input type="hidden" id="titulatura" name="titulatura" value={gender}/>
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="first_name" className={errorFirstName ? `has-danger` : ``}>
                                    <Form.Control isInvalid={errorFirstName} type="text" placeholder={intl.formatMessage({id: 'register.first-name'})} ref={first_name} required autoComplete="given-name" minLength="1" maxLength="255" onChange={(event) => makeValid(event)} />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="last_name" className={errorLastName ? `has-danger` : ``}>
                                    <Form.Control isInvalid={errorLastName} type="text" placeholder={intl.formatMessage({id: 'register.last-name'})} ref={last_name} required autoComplete="family-name" minLength="1" maxLength="255" onChange={(event) => makeValid(event)} />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="email" className={errorEmail ? `has-danger` : ``}>
                                    <Form.Control isInvalid={errorEmail} type="email" placeholder={intl.formatMessage({id: 'register.email'})}ref={email} required autoComplete="email" minLength="10" maxLength="255" onChange={(event) => makeValid(event)} />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="phone_number" className={errorPhoneNumber ? `has-danger` : ``}>
                                    <Form.Control isInvalid={errorPhoneNumber} name="phone_number" type="text" placeholder={intl.formatMessage({id: 'register.phone-number'})} ref={phone_number} required autoComplete="phone" minLength="10" maxLength="255" onChange={(event) => makeValid(event)} />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="password1" className={errorPassword ? `has-danger` : ``}>
                                    <Form.Control isInvalid={errorPassword}  type="password" placeholder={intl.formatMessage({id: 'register.password'})} ref={password1} required autoComplete="new-password" minLength="8" maxLength="50" onChange={(event) => makeValid(event)} />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.password.invalid" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="password2" className={errorPassword2 ? `has-danger` : ``}>
                                    <Form.Control isInvalid={errorPassword || errorPasswordRepeat} type="password" placeholder={intl.formatMessage({id: 'register.repeat-password'})} ref={password2} required autoComplete="new-password" minLength="8" maxLength="50" onChange={(event) => makeValid(event,true,password1)} />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.password.notEqual" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className={errorSecurityQuestion1 ? `form-group-select has-danger` : ``}>
                                    <Select options={securityQuestions} placeholder={intl.formatMessage({id: 'register.security-question-1'})} defaultValue="Security question 1" isSearchable={false} onChange={onSetSquestion1}/>
                                    <input type="hidden" id="squestion1" name="squestion1" value={squestion1}/>
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="SecurityAnswer1" className={errorSecurityAnswer1 ? `has-danger mt-3` : `mt-3`}>
                                    <Form.Control isInvalid={errorSecurityAnswer1} type="text" placeholder={intl.formatMessage({id: 'register.security-answer-1'})} ref={securityAnswer1} required minLength="1" maxLength="255" onChange={(event) => makeValid(event)} />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className={errorSecurityQuestion2 ? `form-group-select has-danger` : ``}>
                                    <Select options={securityQuestions} placeholder={intl.formatMessage({id: 'register.security-question-2'})} defaultValue="Security question 2" isSearchable={false} onChange={onSetSquestion2}/>
                                    <input type="hidden" id="squestion2" name="squestion2" value={squestion2}/>
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="securityAnswer2" className={errorSecurityAnswer2 ? `has-danger mt-3` : `mt-3`}>
                                    <Form.Control isInvalid={errorSecurityAnswer2} type="text" placeholder={intl.formatMessage({id: 'register.security-answer-2'})} ref={securityAnswer2} required minLength="1" maxLength="255" onChange={(event) => makeValid(event)} />
                                    <Form.Control.Feedback type="invalid" >
                                        <FormattedMessage id="error.required" />
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={12} className="mt-2">
                                <FormGroup check className={errorGdpr ? `has-danger` : ``}>
                                    <Input type="checkbox" id="gdpr" innerRef={gdpr} onChange={(event) => makeValid(event)} />
                                    <Label check for="gdpr">
                                    <FormattedMessage id="register.gdpr1" /><Link to="/privacy-policy" target="_blank"><b><FormattedMessage id="register.gdpr2" /></b></Link>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={12} className="mt-2">
                                <FormGroup check className={errorFraud ? `has-danger` : ``}>
                                    <Input type="checkbox" id="tos" innerRef={tos} onChange={(event) => makeValid(event)} />
                                    <Label check for="tos">
                                    <FormattedMessage id="register.tos1" /> <Link to="/anti-fraud" target="_blank"><b><FormattedMessage id="register.tos2" /></b></Link> <FormattedMessage id="register.tos3" /> <Link to="/terms-and-conditions" target="_blank"><b><FormattedMessage id="register.tos4" /></b></Link>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={12} className="mt-2">
                                <FormGroup check>
                                    <Input type="checkbox" id="marketing" innerRef={marketing} />
                                    <Label check for="marketing">
                                    <FormattedMessage id="register.marketing" />
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={12} className="mt-2">
                            {
                                environments.hCaptchaRequired ? 
                                <FormGroup className={errorCaptcha ? `form-captcha has-danger` : `form-captcha`}>
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
                            </Col>
                            <Col md={12} className="text-end d-flex justify-content-between">
                                <Button className="mt-3 mb-2" variant="outline-primary" onClick={() => goBack()}>
                                <span id="reg_text">
                                    <FormattedMessage id="register.back" />
                                </span>
                                </Button>
                                <Button className="mt-3 mb-2" variant="primary" onClick={() => register()}>
                                    <span id="reg_text">
                                        <FormattedMessage id="register.register-now" />
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Register;
