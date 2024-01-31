import React from "react";

import './Button.css'

export default function Button({name, onClick, buttonStyle ,isActive=true, fileName='NA'}) {
    return(
        (isActive) ?
            <button name={fileName} style={
                buttonStyle
            } onClick={(e) => onClick(e)} className="primary-button">
                {name}
            </button>
            :
            <button disabled onClick={onClick} className="primary-button">
                {name}
            </button>
        
    )
}