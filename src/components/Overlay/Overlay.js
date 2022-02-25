import React, { forwardRef } from 'react';
import {Spinner, Card } from 'react-bootstrap';

export const Overlay = forwardRef((props,ref) => (
    <div className={"col-md-"+props.md+" "+props.margin} ref={ref}>
        <Card className={props.customClass}>
            <Card.Body>
                <div className="overlay">
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column my-4">
                        <Spinner animation="border" role="status">
                        </Spinner>
                        <h6>{ props.innerText ? props.innerText : <>We are working on it</> } <span>.</span><span>.</span><span>.</span> </h6>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </div>
    )
)

/**
 * Main entrance to overlay
 * Return a promise that is resolved or rejected
 * Use 2nd argument to do something before showing the overlay
 * Use 3rd argument to do something before resolving the Promise
 * @param {HTMLElement} overlayRef 
 * @param {Function} actionBefore 
 * @param {Function} actionAfter 
 * @returns {Promise}
 */
export const showOverlay = async (overlayRef, actionBefore , actionAfter) => {
    typeof actionBefore !== typeof undefined ? actionBefore() : console.log("No action before");
    overlayRef.current.classList.toggle("d-none");
    return new Promise ( (resolve,reject) => {
        setTimeout(
            () => {
                overlayRef.current.classList.toggle("d-none");
                typeof actionAfter !== typeof undefined ? actionAfter() : console.log("No action after");
                resolve(true);
            },1000
        )
    })
}

export const showRequestOverlay = (overlayRef) => {
    overlayRef.current.classList.toggle("d-none");
}

export const hideRequestOverlay = (overlayRef) => {
    overlayRef.current.classList.toggle("d-none");
}

export default Overlay;