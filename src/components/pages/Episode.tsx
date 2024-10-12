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
      <div className="flex justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <h1 className="text-center text-2xl text-blue-700  font-bold">{episodeData.name}</h1>
          <span className="text-xs text-gray-500 font-bold">{episodeData.episode}</span>
        </div>
        <p className="flex gap-2 items-center text-sm font-semibold text-gray-400">
          Air Date: <span className="text-gray-500">{episodeData.air_date}</span>
        </p>
      </div>

      <h2 className="text-center text-xl text-gray-500 font-bold mt-10 mb-3">
        Characters in this episode:
      </h2>
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
