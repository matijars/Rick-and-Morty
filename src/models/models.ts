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
