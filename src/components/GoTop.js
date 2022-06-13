import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const GoTop = () => {
    useEffect(
        () => {
            window.onscroll = () => { scrollFunction(); }
        },[]
    )
    const scrollFunction = () => {
        const btn = document.getElementById("scrollTopBtn");
        if(window.scrollY >= 100)
            return btn ? btn.style.display = "block" : undefined;
        return btn ? btn.style.display = "none" : undefined;
    }
    const scrollTop = () => {
        document.querySelector(".navbar-main-home").scrollIntoView();
    }
    return(
        <span id="scrollTopBtn" onClick={scrollTop} className="text-dark btn__top" style={{display:"none"}}><span className="icon-circle icon-round icon-dark"><FontAwesomeIcon icon={faArrowUp} /></span></span>
    )
}
export default GoTop;