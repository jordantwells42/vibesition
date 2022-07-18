const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
const TRACK_BY_ID_ENDPOINT = 'https://api.spotify.com/v1/tracks'
const AF_ENDPOINT = 'https://api.spotify.com/v1/audio-features'
const RECC_ENDPOINT = "https://api.spotify.com/v1/recommendations"

const getAccessToken = async (refresh_token: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    })
  })

  return response.json()
}

export const getUsersPlaylists = async (refresh_token: string) => {
  const { access_token } = await getAccessToken(refresh_token)
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getSearch = async (refresh_token: string, query: string) => {
  const { access_token } = await getAccessToken(refresh_token)
  const querystring = new URLSearchParams({
    q: query,
    type: 'track',
    limit: '5'
  }).toString()
  return fetch(SEARCH_ENDPOINT + "?" + querystring, {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
  })
}

export const getSearchById = async (refresh_token: string, id: string) => {
    const { access_token } = await getAccessToken(refresh_token)

    return fetch(TRACK_BY_ID_ENDPOINT + "/" + id, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
    })
  }

export const getAudioFeatures = async (refresh_token: string, ids: string[]) => {
    const { access_token } = await getAccessToken(refresh_token)
    const querystring = new URLSearchParams({
      ids: ids.join(","),
    
    }).toString()
    return fetch(AF_ENDPOINT + "?" + querystring, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
    })
  }

  export const getRecommendation = async (refresh_token: string, interpolation: any) => {
    const { access_token } = await getAccessToken(refresh_token)
    const querystring = new URLSearchParams({
        seed_artists: '',
        seed_genres: '',
        seed_tracks: [interpolation.startId, interpolation.endId].join(","),
        limit: '5',
        target_energy: interpolation.energy,
        target_danceability: interpolation.danceability,
        target_loudness: interpolation.loudness,
        target_valence: interpolation.valence,
        target_tempo: interpolation.tempo,
        target_popularity: '100',
        
        target_acousticness: interpolation.acousticness,
        target_instrumentalness: interpolation.instrumentalness,
        target_liveness: interpolation.liveness,
        target_speechiness: interpolation.speechiness,
        target_duration_ms: String(Math.floor(interpolation.duration_ms)),
        target_key: String(Math.floor(interpolation.key)),
        target_mode: String(Math.floor(interpolation.mode)),
        target_time_signature: String(Math.floor(interpolation.time_signature)),
        
    }).toString()
    console.log(querystring)
    return fetch(RECC_ENDPOINT + "?" + querystring, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
    })
  }