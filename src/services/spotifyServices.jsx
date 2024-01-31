
// All Endpoints
const ALL_PLAYLIST = 'https://api.spotify.com/v1/me/playlists?limit=50'
const USER_DETAILS = 'https://api.spotify.com/v1/me'
const CREATE_PLAYLIST = `https://api.spotify.com/v1/users/`
const SEARCH_TRACK = 'https://api.spotify.com/v1/search'
const ADD_TO_PLAYLIST = 'https://api.spotify.com/v1/playlists/'
const GET_FROM_ALBUM = 'https://api.spotify.com/v1/albums/'

// Get user id
const getUserId = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken != null){
        let response;
        try {
            response = await fetch(
                USER_DETAILS,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            )
            if(response.status === 401){
                alert('Session expired, please login again! 🏃‍♂️')
                localStorage.clear();
                window.location.href = '/signin';
                return;
            }

            if(response.ok){
                const data = await response.json();
                localStorage.setItem('userId', data.id);
                return true;
            }
            return false;

        }catch {
            alert('Something went wrong Even the dev don\'t know what the heck is that!')
        }
    }
}

// Get song from album
const getSongFromAlbumId = async (songName, id, artistDetails) => {
    let res;
    const atk = localStorage.getItem('accessToken');
    try {
        res = fetch(`${GET_FROM_ALBUM}${id}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${atk}`
            }
        })
        if(res.ok){
            const data = await res.json();
            let neededSongFromTrack = searchSongFromTrackList(songName, artistDetails, data.tracks.items);
            return neededSongFromTrack;
        }
    } catch (error) {
        return {status: false, data: null};
    }
}

// function to search from album
const searchSongFromAlbumList = async (songName, artistDetails, responseAlbumList) => {
    const songNameList = responseAlbumList.map(res => {return {title: res.name, artist: [res.artists.map(ar => ar.name)], songUri: res.uri}});
    const requiredIndex = songNameList.findIndex(ele => (ele.title.toLowerCase().includes(songName.toLowerCase()) || songName.toLowerCase().includes(ele.title.toLowerCase())));
    if(requiredIndex != -1){
        let res1 = await getSongFromAlbumId(songName, songNameList[requiredIndex].songUri.split(':')[2], artistDetails);
        return res1;
    }else {
        return {status: false, data: null};
    }
}


// function to search from tracks
const searchSongFromTrackList = (songName, artistDetails, responseTrackList) => {
    const songNameList = responseTrackList.map(res => {return {title: res.name, artist: [res.artists.map(ar => ar.name)], songUri: res.uri}});
    const requiredIndex = songNameList.findIndex(ele => (ele.title.toLowerCase().includes(songName.toLowerCase()) || songName.toLowerCase().includes(ele.title.toLowerCase())));
    if(requiredIndex != -1){
        return {status: true, data: songNameList[requiredIndex]};
    }else {
        return {status: false, data: null};
    }
}

// Function to get song url
const getSongUri = async (songName, artistDetails) => {
    let res;
    const atk = localStorage.getItem('accessToken');
    try {
        res = await fetch(
            `${SEARCH_TRACK}?q=${songName}&artist ${artistDetails}&type=album%2Ctrack&limit=5&offset=0`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${atk}`
                }
            }
        )
        if(res.ok){
            const data = await res.json();
            let neededSongFromTrack = searchSongFromTrackList(songName, artistDetails, data.tracks.items);
            if(neededSongFromTrack.status){
                return neededSongFromTrack.data.songUri;
            }else {
                // Fuck with albums now :-)
                neededSongFromTrack = searchSongFromAlbumList(songName, artistDetails, data.albums.items);
                if(neededSongFromTrack.status){
                    return neededSongFromTrack.data.songUri;
                }
            }
            return null;
        }
    } catch (error) {
        console.log('Fucked up from search');
    }
}

// Function to create a new Playlist
const createNewPlaylist = async (playlistName) => {
    const accessToken = localStorage.getItem('accessToken');

    const currentEndPoint = `${CREATE_PLAYLIST}${localStorage.getItem('userId')}/playlists`

    let res;
    try{
        res = await fetch(
            currentEndPoint,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': playlistName,
                    'description': 'New playlist created with Sync Play',
                    'public': false
                })
            }
        )

        if(res.ok){
            alert(`Playlist ${playlistName} created Successfully!, Please wait until all songs are added, DON'T Close the app!`);
            const data = await res.json();
            return data
        }
    }catch {
        alert('Something went wrong Even the dev don\'t know what the heck is that!')

    }
}

// Function that splits list to have each a 100 item
const splitList = (givenList) => {
    let newList = [];
    for(let i = 0; i < givenList.length; i += 100)
        newList.push(givenList.slice(i, i+100));
    return newList;
}

// Function that add songs to playlist

const addSongToPlaylist = async (songUri, playlistId) => {
    const accessToken = localStorage.getItem('accessToken');
    const splitedList = splitList(songUri);

    try {
        for (let i = 0; i < splitedList.length; i++) {
            const currentList = splitedList[i];
            await new Promise((resolve) => {
                setTimeout(async () => {
                    const res = await fetch(`${ADD_TO_PLAYLIST}${playlistId}/tracks`,
                        {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({'uris': currentList})
                        }
                    );
                    if(res.status === 401) return false;
                    resolve();
                }, 2500);
            })
        }
        return true; // Success
    } catch (error) {
        return false;   // fucked up
    }
}


// Get all playlist of user [Considered as main function for now, need to refactor :->]
const getAllPlaylistIdOfUser = async (fileName) => {
    const accessToken = localStorage.getItem('accessToken');
    getUserId();

    fileName = fileName.split('.')[0]

    if(accessToken != null){
        let response;
        try {
            response = await fetch(`${ALL_PLAYLIST}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            if(response.status === 401){
                alert('Session expired, please login again! 🏃‍♂️')
                localStorage.clear();
                window.location.href = '/signin';
                return;
            }
        } catch(e) {
            console.error(e);
            alert('Something went wrong!');
            return;
        }
        if(response.ok){
            const data = await response.json();
            const playlist_list = await data.items;
            const playlist_name = playlist_list.map(e => e.name);
            if(playlist_list.length != 0){
                if(playlist_name.includes(fileName)){
                    const playlistData = playlist_list[playlist_name.indexOf(fileName)]
                    return playlistData.id;
                }else{
                    const createNewPlaylistResponse = await createNewPlaylist(fileName);
                    return createNewPlaylistResponse.id;
                }
            }
        }
        return null;
    }
}

// Main function
const theWholeReasonForApp = async (fileName, songList, modifyList) => {
    fileName = fileName.split('.')[0];

    const playListId = await getAllPlaylistIdOfUser(fileName);
    let index = [];

    if(playListId != null){
        let songUri = [];
        for (let i = 0; i < songList.length; i++) {
            const song = songList[i];
            await new Promise((resolve) => {
                setTimeout(async () => {
                    const res = await getSongUri(song.props.songData.name, song.props.songData.artist)
                    if(res != null){
                        songUri.push(res);
                        index.push(i);
                    }else{
                        modifyList(i, 1);
                    }
                    resolve();
                }, 1969);
            })
        }
        const resAdd = addSongToPlaylist(songUri, playListId);
        if (resAdd) {
            for (let i = 0; i < index.length; i++) {
                modifyList(index[i], 2);
            }
        } else {
            for (let i = 0; i < index.length; i++) {
                modifyList(index[i], 1);
            }     
        }
        alert('Completed Successfully!')
    }
}

export {
    getUserId,
    theWholeReasonForApp
}