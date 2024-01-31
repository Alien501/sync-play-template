import React from "react";

import './PlaylistCard.css';

export default function PlaylistCard({songList}) {
    return(
        <div className="playlist-card-container">
            <div className="playlist-top-container">
                <div className="playlits-top-left">Playlist Content</div>
                <div className="playlits-top-right">Total: {songList.length}</div>
            </div>

            <hr style={
                {
                    backgroundColor: '#A6a6a6',
                    border: '.1px solid transparent'
                }
            }/>

            <div className="playlist-card-heading">
                <div className="playlist-card-head-left">Song Name</div>
                <div className="playlist-card-head-Right">Status</div>
            </div>

            <div className="playlist-song-card-container">
                {songList}
            </div>
            
            <hr style={
                {
                    backgroundColor: '#A6a6a6',
                    border: '.1px solid transparent'
                }
            }/>

            <div className="stat-container">
                <div className="song-status-container"
                    style={
                        {
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            userSelect: 'none'
                        }
                    }
                >
                    <span className="status-circle">
                    </span>
                    <label style={
                        {
                            color: 'var(--color-grey)',
                            marginRight: '8px',
                            marginLeftt: '8px',  
                        }
                    }>Waiting</label>
                    <span className="status-circle completed">
                    </span>
                    <label style={
                        {
                            color: 'var(--color-grey)',
                            marginRight: '8px',
                            marginLeftt: '8px',  
                        }
                    }>Completed</label>
                    <span className="status-circle error">
                    </span>
                    <label style={
                        {
                            color: 'var(--color-grey)',
                            marginRight: '8px',
                            marginLeftt: '8px',  
                        }
                    }>Error</label>
                </div>
            </div>
        </div>
    )
}