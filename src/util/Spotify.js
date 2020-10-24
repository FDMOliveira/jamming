import Playlist from "../Components/Playlist/Playlist";

let myID = "1b90001b050e43508958689b049fd9e4",
    acessPoint = "http://localhost:3000/",
    accessToken = "BQB7KS1BagJ4sC0IdTpc4Zp42tdTcmA_SPYn8Wd27MdgXBw7AkKyKALezgN099asLkCw8aeRwbHROjVPJiwv6rUenZHKldmYVyU1Os6BncaQYb3cRG6wB-8PIeAX2OpMdCeOiqsmmb0",
    secret = "e806d2b3ef104a60b3aabd57801306cd",
    expiresIn = 3600;

window.setTimeout(() => accessToken = '', expiresIn * 1000);
window.history.pushState('Access Token', null, '/');

class Spotify {
    search(term) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (response.ok)
                return response.json();
            throw new Error("Error")
        })
        .then(jsonResponse => {
            if (!jsonResponse.length)
                return []
                
            let tracksArr = jsonResponse.map(track => {
                return {
                    id: track.id,
                    name : track.name,
                    artist : track.artists[0].name,
                    album : track.album.name,
                    url : track.url
                }
            })
            return tracksArr;
        })
    }
    savePlaylist(playlistName, uriTracksArray) {
        if (!playlistName.length && !uriTracksArray.length)
            return
            
        let headers = {
                Authorization: `Bearer ${accessToken}`
            },
            playlistID = "",
            userID = "";

        fetch("https://api.spotify.com/v1/me", headers)
        .then(response => {
            if (response.ok)
                response.json();
            throw new Error("Error")
        })
        .then(jsonResponse => {
            userID = jsonResponse.id
        })
        .then(userID => {
            fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers : {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type" : `application/json` 
                },
                method: `POST`,
                body: {
                    name : playlistName
                }
            })
            .then(response => {
                if (response.ok)
                    return response.json();
                throw new Error("Erro")
            })
            .then(jsonResponse => {
                playlistID = jsonResponse.id;
            })
        });
    }
    getAccessToken() {
        if (accessToken.length) 
            return accessToken
        else {
            fetch(`https://accounts.spotify.com/authorize?client_id=${myID}&response_type=token&redirect_uri=${acessPoint}&state=2456718`).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            }, error => {
                console.log(error.message)
            }).then(jsonResponse => {
                console.log(jsonResponse)
            }) 
        }
    }
}
export default Spotify