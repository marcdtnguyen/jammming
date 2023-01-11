const clientID = '4cb9a6b6cfc94bf1b3589497978148dc'
const redirectURI = "http://localhost:3000/"
let accessToken = ''
export const Spotify = {
    search(term) {

        if (term === '') return [];

        const accessToken = this.getAccessToken()

        let header = { 'Authorization': `Bearer ${accessToken}` }

        return fetch(
            `https://api.spotify.com/v1/search?q=${term}&type=track`,
            { headers: header })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(jsonResponse => {
                const tracks = jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        URI: track.uri
                    }
                })
                return tracks
            })

    },
    getAccessToken() {
        return accessToken ? accessToken : this.setAccessToken()
    },
    setAccessToken() {
        if (window.location.href.includes('access_token=') && window.location.href.includes('expires_in=')) {
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1]
            const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1]
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            console.log('windowcall from settoken')
            this.toSpotify()
        }
        return accessToken;
    },
    async toSpotify() {
        return await new Promise((resolved, rejected) => {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = url
            console.log('windowcall from toSpotify')
            if (window.location.href === url) {
                resolved()
            } else {
                rejected()
            }
        }).then(onfulfilled => {
            this.setAccessToken()
        }).catch(onrejected => {
            console.log(onrejected)
        })
    },
    async savePlaylist(playlistName, tracks) {
        if (!playlistName || !tracks) return;

        const accessToken = this.getAccessToken()

        let header = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }

        let userID = await fetch(
            'https://api.spotify.com/v1/me',
            { headers: header }
        )
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(jsonResponse => {
                return jsonResponse.id;
            })

        let playlistID = await fetch(
            `https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                headers: header,
                method: 'POST',
                body: JSON.stringify({ 'name': playlistName })
            }
        )
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(jsonResponse => {
                return jsonResponse.id
            })


        console.log('userID: ',userID)
        console.log('playlist: ', playlistID)
    }

}