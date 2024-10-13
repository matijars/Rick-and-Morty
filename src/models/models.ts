export interface CharacterInterface {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: EpisodeInterface[];
  url: string;
  created: string;
}

export interface EpisodeInterface {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
  url: string;
}

export interface LocationInterface {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
