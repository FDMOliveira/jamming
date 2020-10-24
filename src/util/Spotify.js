let acessToken = "",
    myID = "1b90001b050e43508958689b049fd9e4"

class Spotify {
    getAccessToken() {
        if (acessToken.length) 
            return acessToken
        else {
            fetch(`https://accounts.spotify.com/authorize?client_id=${myID}&response_type=token`).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            }, error => {
                console.log(error.message)
            })
        }
    }
}
export default Spotify