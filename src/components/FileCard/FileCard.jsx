import React, { useState } from "react";

import './FileCard.css'

import { onFileSelect } from "../../services/util";

export default function FileCard({setFileName, fileName, setFileContent}) {
    return(
        <div className="file-card-container">
            <div className="file-head">
                Upload local playlist file
            </div>

            <div className="file-format">
                Accepted type: m3u
            </div>

            <div className="file-name-container">
                {(fileName == '')? 'File Name': fileName}
            </div>

            <label onChange={(event) => onFileSelect(event, setFileName, setFileContent)} htmlFor="file-upload" className="file-btn">
                Select File
                <input type="file" name="playlist-file" id="file-upload" />
            </label>
        </div>
    )
}