import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Logout = () => {
    const navigate = useNavigate();
    useEffect(
        () => {
            const logout = async () => {
                console.log("logging out!");
            };
            logout();
        },[]
    )
    return(
        <>
        </>
    )
}

export default Logout