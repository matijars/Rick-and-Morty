import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (page: number) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data;
};
