import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchCharacters } from "../../services/apiService";
import { useEffect, useCallback } from "react";

const Characters = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery("characters", ({ pageParam = 1 }) => fetchCharacters(pageParam), {
      getNextPageParam: (lastPage) => {
        const nextUrl = lastPage.info.next;
        if (nextUrl) {
          const urlParams = new URL(nextUrl);
          const page = urlParams.searchParams.get("page");
          return page ? Number(page) : undefined;
        }
        return undefined;
      },
    });

  const loadMoreCharacters = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMoreCharacters();
    }
  }, [loadMoreCharacters]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data...</p>;

  return (
    <div className="p-7 mx-[5%]">
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {data?.pages.map((page) =>
          page.results.map((character: any) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Characters;
