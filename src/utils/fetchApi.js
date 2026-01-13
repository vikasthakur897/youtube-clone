import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_ENDPOINT

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
}

export const fetchApi = async (endpoint) => {
  const { data } = await axios.get(`${BASE_URL}/${endpoint}`, options)
  return data
}
