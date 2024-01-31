import React from "react";

import './SongCard.css';

// 1 - default 2 - error 3 - uploaded
const stat = ['', 'error', 'completed']; 

export default function SongCard({songData}) {
    return(
        <div key={songData} className="song-card-container">
            <div className="song-name-container">
                {songData.name}
            </div>
            <div className="song-status-container">
                <span className={`status-circle ${stat[songData.status]}`}>
                </span>
            </div>
        </div>
    )
}