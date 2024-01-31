import React from "react";

import './Query.css';
import QueryCard from "../QueryCard/QueryCard";

export default function Query() {
    return(
        <div className="query-container">
            <h1>FAQ</h1>
            <h5>Hope your doubts will be cleared!</h5>

            <QueryCard query={"What this is for?"} ans={"A simple interface to keep your local playlist synced with the one in Spotify."} />
            <QueryCard query={"For how much days a single login persists?"} ans={"Your login data will persist only for 1 hour, so you are required to sign-in again after one hour."} />
            <QueryCard query={"Can it sync playlist from Spotify to local playlist?"} ans={"No, it only support from local to Spotify, not vice-versa."} />
            <QueryCard query={"What type of file it supports?"} ans={"At the moment it supports only .m3u files, if you have anyother format share it with the developer via mail."} />
            <QueryCard query={"Why Sign-in with my Spotify account?"} ans={"Because, to read/write playlist app need permission so you have to :-)"} />
            <QueryCard query={"Will the created playlist be public?"} ans={"No, it will be private!. Later you can change it in App."} />
            <QueryCard query={"Does it add all songs?"} ans={"Tried my best to add as much as possible!, but I can't claim that 100% all of your songs will be added!"} />
            <QueryCard query={"Is it secure?"} ans={"Use only if you beleive me and moreover the code avaliable as open-source"} />
            <QueryCard query={"Does the app collect any of my personal data?"} ans={"Nope, I'm not a data collection company :-), so don't fear"} />
            <QueryCard query={"Naming convention of Playlist?"} ans={"It will be same as the name of file you upload"} />
            <QueryCard query={"Do I need to create playlist manually before using it?"} ans={"Nope, you are not required to do that, if playlist is already present, data will be added to it. If not, new playlist will be created."} />
            <QueryCard query={"How fast it is?"} ans={"Since there is something called rate-limiting, I can't process lots of request at a time. So it will be compartively slower (20songs/min)."} />
        </div>
    )
}