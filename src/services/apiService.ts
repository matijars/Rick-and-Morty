import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com";

export const fetchCharacters = async (page: number, searchQuery = "") => {
  const queryParam = searchQuery ? `&name=${searchQuery}` : "";
  const response = await axios.get(`${BASE_URL}/api/character?page=${page}${queryParam}`);
  return response.data;
};

export const fetchCharacterById = async (id: string | undefined) => {
  const response = await axios.get(`${BASE_URL}/api/character/${id}`);
  return response.data;
};

export const fetchEpisode = async (id: string | undefined) => {
  const response = await axios.get(`${BASE_URL}/api/episode/${id}`);
  return response.data;
};

export const fetchLocation = async (id: string | undefined) => {
  const response = await axios.get(`${BASE_URL}/api/location/${id}`);
  return response.data;
};

export const fetchMultipleCharacters = async (ids: string | undefined) => {
  const response = await axios.get(`${BASE_URL}/api/character/${ids}`);
  return response.data;
};
