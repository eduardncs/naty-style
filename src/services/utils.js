import Swal from 'sweetalert2';
import axios from 'axios';
import environments from '../environments/environments';
import { intlGlobal } from '../App.js';

/**
 * Get user prefered locale
 * If use did not set any locale it returns environments default language
 * @returns {string} locale
 */
 export const getLocale = () => {
    const locale = getCookie("IC_LANG");
    return locale ? locale : environments.defaultLanguage;
}

/**
 * Set language function
 * It will reload the page after set
 * @param {string} lang 
 */
export const setLocale = (lang) => {
    setCookie("IC_LANG",lang,365);
    return true;
}

export const setCookie = (name,value,days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/;secure";
}
export const getCookie = (name) => {
    const nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
export const eraseCookie = (name) => {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 * Main connection to the backend.
 * Returns object [data, error]
 * @success [data,null]
 * @error [null,error]
 * @param {string} url Url to the server end point w/o /api/ word, EX: company/get
 * @param {string} method DEF: GET
 * @param {object} data Object containing values you need to passs to the backend
 * @returns {object} [data, error] 
 */
export const postMan = async (func, method='GET', data = {}, language_code=true) =>{
    try{

        console.log(func);
        console.log(method);
        if(data && language_code)
        {
            if(data.data)
                data.data.language_code = getLocale();
            else
                data.language_code = getLocale();
        }

        switch(method)
        {
            case "GET":
                return [ await axios.get(`${environments.apiURL}/api/${func}`, data ? data : {}) , null ];
            case "POST":
                return [ await axios.post(`${environments.apiURL}/api/${func}`, data ? data : {}) , null ];
            case "PUT":
                return [ await axios.put(`${environments.apiURL}/api/${func}`, data ? data : {}) , null ];
            default:
                return [ await axios.post(`${environments.apiURL}/api/${func}`, data ? data : {}) , null ];
        }
    }catch(error)
    {
        return [null, error];
    }
}

/**
 * Encrypt a string using base64 encode algorithm
 * @param {string} string 
 * @returns {string}
 */
 export const encrypt = (string) => {
    const received = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ,'@','$','!','%','*','?','#','&','^','=','(',')','{','}','[',']','.',',','/','"',"'",'»','«',':',';','>','<','+','-'];
    const encrypted = ['E', 'G', 'N', 'M', 'H', 'B', 'Y', 'L', 'Q', 'A', 'J', 'Z', 'C', 'K', 'T', 'X', 'O', 'F', 'S', 'P', 'W', 'R', 'D', 'U', 'I', 'V', 'd', 'l', 'v', 'c', 'o', 'y', 'r', 'w', 'j', 'g', 'h', 'q', 'z', 'p', 'b', 'x', 's', 'a', 'n', 'i', 'm', 't', 'u', 'k', 'f', 'e', '9', '4', '1', '6', '0', '2', '5', '3', '7', '8','!','%','$','*','#','&','?','@',')','[','«',"'",'^','}','=','(',']','.','+','-',',','{','/','>','<','"','»',';',':'];

    let encryptedPass = string.split("");
    encryptedPass.forEach(function(value, key) {
        var index = received.indexOf(value);
        encryptedPass[key] = encrypted[index];
    });
    encryptedPass.forEach(function(value, key) {
        var index = received.indexOf(value);
        encryptedPass[key] = encrypted[index];
    });

    const passString = encryptedPass.toString();
    return passString.replace(/,/g, '');
}
/**
 * Decrypt a scring that was encrypted using base64 algorithm
 * @param {string} string 
 * @returns {string}
 */
export const decrypt = (string) => {
    return atob(string);
}
/**
 * Display an alert message
 * Async function , you can await a response
 * @param {Object} props { title, html, icon (success,error,warning,info), etc... }
 * @returns Promise { isConfirmed: bool , isDenied: bool, isDismissed: bool, value: bool }
 */
export const alert = async(props) => {
    return Swal.fire(props);
}
export const toast = async(title,message)=>{ 
    return Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3}).fire(
        message ? { icon:"success",title:title,html:message } : { icon:"success",title:title }
    )};
export const etoast = async(title,message)=>{ 
    return Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3}).fire(
        message ? { icon:"error",title:title,html:message } : { icon:"error",title:title }
    )};
export const wtoast = async(title,message)=>{ 
    return Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3}).fire(
        message ? { icon:"warning",title:title,html:message } : { icon:"warning",title:title }
    )};
export const itoast = async(title,message)=>{ 
    return Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3}).fire(
        message ? { icon:"info",title:title,html:message } : { icon:"info",html:title }
    )};

/**
 * Validate a string against an iban regex
 * @param {string} iban 
 */
 export const validateIBAN = (iban) => {
    const regex = /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/;
    return regex.test(String(iban).toUpperCase());
}
/**
 * Validate a string against an email regex
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}
/**
 * Validate a string against a phonenumber regex
 * @param {string} email 
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
    const regex = /^(\+)*[0-9]{10,15}$/;
    return regex.test(String(phone).toLowerCase());
}
/**
 * Validate a string against our password regex
 * @param {string} email 
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!:;%*?&^=(){}[\].,\\/~`><+_"-'»«-])[A-Za-z\d@$#!:;%*?&^=(){}[\].,\\/~`><+_"'»«-]{8,50}$/g;
    return regex.test(password);
}

/**
 * Visual function , will append is-valid or is-invalid class forms (text,password,textarea)
 * @param {Event} event 
 */
 export const makeValid = (event,repeatPassword = false, passwordRef=null)=>{
    const target = event.target;
    const minLength = target.getAttribute("minlength") ? target.getAttribute("minlength") : "1";
    const maxLength = target.getAttribute("maxlength") ? target.getAttribute("maxLength") : "999999";
    const value = target.value.length;
    const type = target.getAttribute("type");
    const fg = type === "checkbox" ? event.target.closest(".form-check") : event.target.closest(".form-group");
    if(value >= minLength && value <= maxLength)
    {
        if(type === "email")
        {
            if(validateEmail(target.value))
            {
                target.classList.add("is-valid");
                target.classList.remove("is-invalid");
                fg.classList.add("has-success");
                fg.classList.remove("has-danger");
            }else{
                target.classList.add("is-invalid");
                target.classList.remove("is-valid");
                fg.classList.add("has-danger");
                fg.classList.remove("has-success");
            }
        } else if(type === "password"){
            if(validatePassword(target.value))
            {
                if(passwordRef && repeatPassword)
                {
                    if(passwordRef.current.value === target.value)
                    {
                        target.classList.add("is-valid");
                        target.classList.remove("is-invalid");
                        fg.classList.add("has-success");
                        fg.classList.remove("has-danger");
                    }else{
                        target.classList.add("is-invalid");
                        target.classList.remove("is-valid");
                        fg.classList.add("has-danger");
                        fg.classList.remove("has-success");
                    }
                }else{
                    target.classList.add("is-valid");
                    target.classList.remove("is-invalid");
                    fg.classList.add("has-success");
                    fg.classList.remove("has-danger");
                }
            }else{
                target.classList.add("is-invalid");
                target.classList.remove("is-valid");
                fg.classList.add("has-danger");
                fg.classList.remove("has-success");
            }

        } else if(type === 'checkbox') {
            if(target.checked)
            {
                fg.classList.add("has-success");
                fg.classList.remove("has-danger");
            }else{
                fg.classList.add("has-danger");
                fg.classList.remove("has-success");
            }
        } else {
            if(target.name === "phone_number")
            {
                if(validatePhone(target.value))
                {
                    target.classList.add("is-valid");
                    target.classList.remove("is-invalid");
                    fg.classList.add("has-success");
                    fg.classList.remove("has-danger");
                }else{
                    target.classList.add("is-invalid");
                    target.classList.remove("is-valid");
                    fg.classList.add("has-danger");
                    fg.classList.remove("has-success");
                }
            }else{
                target.classList.add("is-valid");
                target.classList.remove("is-invalid");
                fg.classList.add("has-success");
                fg.classList.remove("has-danger");
            }
        }
    }else{
        target.classList.add("is-invalid");
        target.classList.remove("is-valid");
        fg.classList.add("has-danger");
        fg.classList.remove("has-success");   
    }
  }

export const translateBackendMessage = (message) => {
    return intlGlobal.formatMessage({id: message});
}

export const parseLocaleURL = () => {
    const locale = getLocale();
    if(locale === "ro")
        return String(environments.appURL).replace("$locale",locale);
    else if(locale === "en")
        return String(environments.appURL).replace("$locale","en-ro");
    else
        return String(environments.appURL).replace("$locale","ro");
}