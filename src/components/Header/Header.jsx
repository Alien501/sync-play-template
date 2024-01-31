import React, { useEffect, useState } from "react";

import './Header.css';
import Button from "../Button/Button";

export default function Header() {
    const [isLogoutClicked, setIsLogoutClicked] = useState(false);
    const [isLogOutCondition, setIsLogOutCondition] = useState('');

    useEffect(() => {
        if(localStorage.getItem('accessToken') === null) {
            setIsLogOutCondition(false);
        }else{
            setIsLogOutCondition(true);
        }
    }, [isLogoutClicked])

    function onClick() {
        setIsLogoutClicked(prev => !prev);
    }

    function onLogoutClicked() {
        try{
            localStorage.clear();
            alert('Signout successfull!')
            setIsLogoutClicked(prev => !prev);
            window.location.href = '/sigin';
        }catch {
            alert('Something went wrong!, Couldn\'t logout!');
        }
    }

    return (
        <>
        <header className="header-container">
            <div className="app-name">
                Sync Play
            </div>

            <div className="icon-container" onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-x" viewBox="0 0 16 16">
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
                </svg>
            </div>

        </header>

        {isLogoutClicked && <div className="overlay"></div>}

        <div className={`sign-out-pop-up ${isLogoutClicked? 'active': ''}`}>
            <p>Do you wish to sign-out?</p>
            <Button
                name={'Sign-out'}
                onClick={onLogoutClicked}
                buttonStyle={
                    {
                        '--btn-text-color': 'var(--color-white)',
                        '--btn-bg-color': 'var(--color-black-1)'
                    }
                }
                isActive={isLogOutCondition}
            />
                        <Button
                name={'Cancel'}
                onClick={onClick}
                buttonStyle={
                    {
                        '--btn-text-color': 'var(--color-white)',
                        '--btn-bg-color': 'var(--color-black)'
                    }
                }
                isActive={true}
            />
        </div>
        </>
    );
}