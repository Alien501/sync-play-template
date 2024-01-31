import { REACT_APP_SPOTIFY_CLIENT_ID } from "./const";

// Returns a list with song name
const extractSongNameM3U = (fileContent) => {
    let songNameList = [];
    let fileContentList = fileContent.split('\n');
    fileContentList.forEach(line => {
        if(line.includes('#EXTINF')){
            // songNameList.push(line.split(':')[1]);
            const songDetail = (line.split(':')[1]).split(',').splice(1)
            if(songDetail.length > 1) {
                songNameList.push(songDetail.join(', '));
            }else {
                songNameList.push(songDetail[0]);
            }
        }
    });
    return songNameList;
}

// Handler for on onFileSelect in PlaylistCard
const onFileSelect = (event, setFileName, setFileContent) => {
    try {
        let {name , type} = event.target.files[0];
        if(type === "audio/x-mpegurl"){
            setFileName(name);
            var reader = new FileReader();

            reader.onload = (event) => {
                var cont = reader.result;
                setFileContent(extractSongNameM3U(cont));
            }
            reader.readAsText(event.target.files[0]);
        }else {
            setFileName('File Not Supported!');
            setFileContent('')
        }
    } catch (error) {
        // Do Something
        console.log('Something fucked up!');
        setFileName('File Not Selected!');
        setFileContent('')
    }
}

// Extract Access token from response
const getReturedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHastag = hash.substring(1);
    const paramsInUrl = stringAfterHastag.split('&');
    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
        const [key, value] = currentValue.split('=');
        accumulator[key] = value;
        return accumulator;
    }, {})

    return paramsSplitUp;
}

// Sigin button Click
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public']
const SCOPES_URL_PARAMS = SCOPES.join('%20');
const cliendId = REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUrl = 'https://sync-play-nu.vercel.app/app';

const onSignInClick = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${cliendId}&redirect_uri=${redirectUrl}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`
}

export {extractSongNameM3U, onFileSelect, onSignInClick, getReturedParamsFromSpotifyAuth};