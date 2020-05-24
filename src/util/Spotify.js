let accessToken;
const clientId='37b23b2184b04c92afa0fb0e11399ef0';
//const redirectUri='http://aaronjammming.surge.sh/';
const redirectUri='http://localhost:3000/';

const Spotify = {

    getAccessToken(){
        //if there is an access token return the token and no futher action needed
        if(accessToken){
            return accessToken;
            
        }
        //implicit grand flow retruns a user's access token in the URL
        //if the access token is not already set, check url to check if it has just been obtained
        //check for access token match
        //window.location.href returns current url 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        //if the access token and the expire time are in the url 
        if(accessTokenMatch && expiresInMatch) {
            
            //set access token value
            accessToken = accessTokenMatch[1];
            //set the variable for expire time 
            const expiresIn = Number(expiresInMatch[1]);
            // this clears the parameters from the URL, allowing us to grab a new access token when it expires.
            window.setTimeout(()=> accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token',null,'/');
            return accessToken;
        }
        else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(Term){
        const accessToken = Spotify.getAccessToken(); 
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${Term}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track=>({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            
        })
    },

    savePlaylist(playlistName, trackURIs){
        if(!playlistName || !trackURIs){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, { headers:headers }
        ).then(response=>{
            return response.json();
        }).then(jsonResponse=>{
            userId = jsonResponse.id;
            fetch(`https://api.spotify.com/v1/users/${userId}/playlists/`,
            {   
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response=>{
                return response.json()
            }).then(jsonResponse=> {
                const playlistId = jsonResponse.id; 
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                });     
            })
        })
    }
};

export default Spotify;

