import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchEpisode, fetchMultipleCharacters } from "../../services/apiService"; // Adjust the import path as needed
import { EpisodeInterface } from "../../models/models";

const Episode = () => {
  const { id } = useParams();
  const [episodeData, setEpisodeData] = useState<EpisodeInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEpisodeData = async () => {
      try {
        const data = await fetchEpisode(id);
        setEpisodeData(data);
      } catch (error) {
        console.error("Error fetching episode data:", error);
      } finally {
        setLoading(false);
      }
    };

    getEpisodeData();
  }, [id]);

  const characterIds = episodeData?.characters
    ?.map((url: string) => url.split("/").pop())
    .join(",");

  const {
    data: charactersData,
    isLoading: charactersLoading,
    error: charactersError,
  } = useQuery(["characters", characterIds], () => fetchMultipleCharacters(characterIds), {
    enabled: !!characterIds,
  });

  if (loading || charactersLoading) {
    return <p>Loading...</p>;
  }

  if (!episodeData) {
    return <p>No episode data found.</p>;
  }

  if (charactersError) {
    return <p>Error fetching characters data...</p>;
  }

  return (
    <div className="p-7 mx-[5%]">
      <h1>{episodeData.name}</h1>
      <p>Air Date: {episodeData.air_date}</p>
      <p>Episode: {episodeData.episode}</p>

      <h2>Characters in this episode:</h2>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {charactersData?.map((character: any) => (
          <Link
            key={character.id}
            to={`/characters/${character.id}`}
            className="p-2 bg-white rounded shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="my-2 text-md text-center font-semibold">{character.name}</h3>
            <div className="text-sm text-center">
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    character.status === "Alive"
                      ? "text-green-500"
                      : character.status === "Dead"
                      ? "text-red-500"
                      : "text-yellow-500" // For "Unknown" or any other status
                  }`}
                >
                  {character.status}
                </span>
              </p>
              <p>Species: {character.species}</p>
              <p>Gender: {character.gender}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Episode;
