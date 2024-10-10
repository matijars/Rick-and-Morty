import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCharacterById } from "../../services/apiService";
import { Key } from "react";

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery(["character", id], () => fetchCharacterById(id));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching character data...</p>;

  return (
    <div className="p-7 mx-[5%]">
      <div className="bg-white max-w-md p-2 rounded shadow-md">
        <img src={data.image} alt={data.name} className="w-full h-64 object-cover rounded-md" />
        <div className="flex justify-between items-center my-4 ">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <span
            className={`font-bold ${
              data.status === "Alive"
                ? "text-green-500"
                : data.status === "Dead"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {data.status}
          </span>
        </div>
        <div className="text-center">
          <p className="text-md font-semibold text-gray-500 mb-2">
            Species: <span className="text-gray-900">{data.species}</span>
          </p>
          <p className="text-md font-semibold text-gray-500 mb-2">
            Gender: <span className="text-gray-900">{data.gender}</span>
          </p>
          <p className="text-md font-semibold text-gray-500 mb-2">
            Origin: <span className="text-gray-900">{data.origin.name}</span>
          </p>
          <p className="text-md font-semibold text-gray-500">
            Location: <span className="text-gray-900">{data.location.name}</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xl font-semibold text-gray-700 mb-4">Episodes:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {data.episode.map((episodeUrl: string, index: Key | null | undefined) => {
              const episodeNumber = episodeUrl.split("/").pop(); // Get the last part of the URL (episode number)
              return (
                <Link
                  key={index}
                  to={`/episode/${episodeNumber}`} // Navigate to the Episode component
                  className="p-1 bg-blue-100 rounded-lg text-center hover:bg-blue-200 transition"
                >
                  <p className="text-blue-900 font-medium">{episodeNumber}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
