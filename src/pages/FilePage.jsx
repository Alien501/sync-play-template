import React, { useEffect, useState } from "react";

import './FilePage.css'

import FileCard from "../components/FileCard/FileCard";
import PlaylistCard from "../components/PlaylistCard/PlaylistCard";
import SongCard from "../components/SongCard/SongCard";
import Button from "../components/Button/Button";

import { theWholeReasonForApp } from "../services/spotifyServices";
import Loader from "../components/Loader/Loader";


const FilePage = () => {
    const [stat, setStat] = useState(0);
    const [isProcessStarted, setIsProcessStarted]  = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [songList, setSongList] = useState([]);

    
    useEffect(() => {
        if(fileContent.length != 0){
            setSongList(
                prev => {
                    let newSomething = fileContent.map((song, key) => {
                        const splitText = song.split(' - ');
                        const artist = splitText.splice(0, splitText.length-1);
                        const songName = splitText[splitText.length - 1];
                        return <SongCard key={key} songData={{ name: songName, status: 0, artist: artist}}/>
                    })

                    return newSomething
                }
            )
            setStat(0);
            setIsProcessStarted(false);
        }else{
            setSongList([])
        }
        
    }, [fileContent]);

    useEffect(() => {
        if(localStorage.getItem('accessToken') === null) {
            window.location.href = '/signin'
        }
    }, []);

    function modifyList(indexToModify, newStatus) {
        setSongList(prev => {
          const newList = [...prev];
          if (indexToModify >= 0 && indexToModify < newList.length) {
            const newProps = { ...newList[indexToModify].props };
            const newSongData = { ...newProps.songData, status: newStatus };
            newList[indexToModify] = {
              ...newList[indexToModify],
              props: { ...newProps, songData: newSongData }
            };
            return newList;
          }
      
          console.warn('Index out of bounds');
          return prev;
        });

        setStat(prev => {
            return prev + 1
        });
    }

    async function onButtonClick() {
        setIsProcessStarted(true);
        theWholeReasonForApp(fileName, songList, modifyList);
    }

    return(
        <div className="file-page-container">
            <FileCard
                setFileName={setFileName}
                setFileContent={setFileContent}
                fileName={fileName}
            />
            <PlaylistCard
                songList={songList}
            />

            {isProcessStarted && <Loader />}

            {isProcessStarted &&
            <div className="song-status-container-1">
                {`No. of Songs Added: ` + stat}
            </div>
            }


            {!isProcessStarted && <Button
                name={'Start'}
                onClick={onButtonClick}
                isActive={((fileContent.length == 0)? false: true)}
                buttonStyle={
                    {
                        '--btn-text-color': 'var(--color-white)',
                        '--btn-bg-color': 'var(--color-green)',
                        marginBottom: '20px',
                        width: '290px'
                    }
                }
            />}
        </div>
    )
}

export default FilePage;