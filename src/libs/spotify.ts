const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
const TRACK_BY_ID_ENDPOINT = 'https://api.spotify.com/v1/tracks'
const AF_ENDPOINT = 'https://api.spotify.com/v1/audio-features'
const RECC_ENDPOINT = 'https://api.spotify.com/v1/recommendations'

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
    limit: '5',
  }).toString()
  return fetch(SEARCH_ENDPOINT + '?' + querystring, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getSearchById = async (refresh_token: string, ids: string) => {
  const { access_token } = await getAccessToken(refresh_token)
  const querystring = new URLSearchParams({
    ids: ids,
  }).toString()

  return fetch(TRACK_BY_ID_ENDPOINT + '?' + querystring, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getAudioFeatures = async (refresh_token: string, ids: string) => {
  const { access_token } = await getAccessToken(refresh_token)
  const querystring = new URLSearchParams({
    ids: ids
  }).toString()
  return fetch(AF_ENDPOINT + '?' + querystring, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getRecommendation = async (
  refresh_token: string,
  interpolation: any,
  limit: number
) => {
  const { access_token } = await getAccessToken(refresh_token)
  const querystring = new URLSearchParams({
    seed_artists: '',
    seed_genres: '',
    seed_tracks: [interpolation.startId, interpolation.endId].join(','),
    limit: String(limit),
    target_energy: interpolation.energy,
    target_danceability: interpolation.danceability,
    //target_loudness: interpolation.loudness,
    target_valence: interpolation.valence,
    target_tempo: interpolation.tempo,
    //target_popularity: '100',

    //target_acousticness: interpolation.acousticness,
    //target_instrumentalness: interpolation.instrumentalness,
    //target_liveness: interpolation.liveness,
    //target_speechiness: interpolation.speechiness,
    //target_duration_ms: String(Math.floor(interpolation.duration_ms)),
    //target_key: String(Math.floor(interpolation.key)),
    //target_mode: String(Math.floor(interpolation.mode)),
    //target_time_signature: String(Math.floor(interpolation.time_signature)),
  }).toString()
  return fetch(RECC_ENDPOINT + '?' + querystring, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const createPlaylist = async (
  refresh_token: string,
  playlistName: string,
  description: string,
  ids: string
) => {
  const { access_token } = await getAccessToken(refresh_token)
  console.log("1", playlistName, ids)
  const me = await fetch('https://api.spotify.com/v1/me/', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }).then(res => res.json())

  const user_id = await me.id
  console.log("2", me, user_id)

  const create_response = await fetch(
    `https://api.spotify.com/v1/users/${user_id}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        public: true,
        description: description
      })
    }
  ).then(res => res.json())

  const playlist_id = await create_response.id
    const querystring = new URLSearchParams({
      uris:ids,
      position: '0',
    }).toString()
  function timeout(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  await timeout(3000)
  const add_response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks` +"?" + querystring,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        position: 0,
        uris: ids
      })})

    return create_response
}
