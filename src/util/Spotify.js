
let clientId = "77e94be7eb784d01801810018234bd19",
    redirectUri = "http://Jamming_App.surge.sh",
    secret = "e806d2b3ef104a60b3aabd57801306cd",
    expiresIn = 3600,
    spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-private&client_id=${clientId}&redirect_uri=${redirectUri}`,
    accessToken = undefined;    

module.exports = {
    search(term) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
        .then(response => {
            if (response.ok)
                return response.json();
            throw new Error("Error")
        })
        .then(jsonResponse => {
            if (!jsonResponse)
                return []

            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name : track.name,
                    artist : track.artists[0].name,
                    album : track.album.name,
                    uri : track.uri
                }
            })
        })
    }, 
    savePlaylist(playlistName, uriTracksArray) {
        if (!playlistName && !uriTracksArray)
            return

        this.getAccessToken();

        let headers = {
                Authorization: `Bearer ${accessToken}`
            },
            playlistID = "",
            userID = "";

        fetch("https://api.spotify.com/v1/me", {
            headers : headers
        })
        .then(response => {
            if (response.ok) 
                return response.json();
            throw new Error("Error")
        })
        .then(jsonResponse => {
            return jsonResponse.id
        })
        .then(userID => {
            fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers : {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type" : `application/json` 
                },
                method: `POST`,
                body: JSON.stringify({
                    name : playlistName
                })
            })
            .then(response => {
                if (response.ok) 
                    return response.json();

                throw new Error("Erro")
            })
            .then(jsonResponse => {
                playlistID = jsonResponse.id;
            })
            .then(()=> {
                fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    headers : {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type" : `application/json` 
                    },
                    method: `POST`,
                    body: JSON.stringify({
                        uris : uriTracksArray
                    })
                })
            });
        })

    },
    getAccessToken() {
        if (accessToken) 
            return accessToken

        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/),
            urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } 
        else {
            window.location = spotifyUrl;
        }
    }
}