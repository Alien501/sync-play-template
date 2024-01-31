import React from "react";

import './SignCard.css'
import Button from "../Button/Button";
import { onSignInClick } from "../../services/util";

export default function SignCard() {
    return(
        <div className="sign-in-card-container">
            <div className="head-block">
                Sign-in with Spotify to continue
            </div>

            <div className="permission-block">
                <h3>
                    Required Permission
                </h3>
                <ul>
                    <li>Retrive user playlist</li>
                    <li>Modify/Create playlist</li>
                </ul>
            </div>

            <Button
                name={'Sign-in'}
                onClick={onSignInClick}
                isActive={true}
                buttonStyle={
                    {
                        '--btn-text-color': 'var(--color-white)',
                        '--btn-bg-color': 'var(--color-black)'
                    }
                }
            />

        </div>
    )
}