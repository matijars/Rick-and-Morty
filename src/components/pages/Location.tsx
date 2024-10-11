import { Link, useParams } from "react-router-dom";
import { LocationInterface } from "../../models/models";
import { useEffect, useState } from "react";
import { fetchLocation, fetchMultipleCharacters } from "../../services/apiService";
import { useQuery } from "react-query";

const Location = () => {
  const { id } = useParams();
  const [locationData, setLocationData] = useState<LocationInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const data = await fetchLocation(id);
        setLocationData(data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      } finally {
        setLoading(false);
      }
    };

    getLocationData();
  }, [id]);

  const characterIds = locationData?.residents
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

  if (!locationData) {
    return <p>No location data found.</p>;
  }

  if (charactersError) {
    return <p>Error fetching characters data...</p>;
  }

  return (
    <div className="p-7 mx-[5%]">
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

export default Location;
