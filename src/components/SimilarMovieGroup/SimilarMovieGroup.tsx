import React, { useEffect, useState } from "react";
import MovieCard from "@/components/CardGroup/CardDetails/MovieCard/MovieCard";
import TVshowCard from "@/components/CardGroup/CardDetails/TVshowCard/TVshowCard";

interface SimilarMovieGroupProps {
  movieId: string;
  mediaType: "movie" | "tv";
}

const SimilarMovieGroup: React.FC<SimilarMovieGroupProps> = ({
  movieId,
  mediaType,
}) => {
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (movieId) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/${mediaType}/${movieId}/similar?api_key=c7cf1258a5aa723e8a98f08f639e86b6`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setSimilarMovies(data.results);
        } catch (error) {
          setError(error as Error);
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSimilarMovies();
  }, [mediaType, movieId]);

  if (loading) return <p>Loading similar movies...</p>;
  if (error) return <p>Error fetching similar movies: {error.message}</p>;

  return (
    <>
      <h2 className="text-2xl text-yellow-500 font-bold ml-16 mb-8">
        Similar {mediaType == "movie" ? "Movie" : "TV Shows"}
      </h2>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:mx-14 mx-4">
        {similarMovies
          .filter((movie) => movie.poster_path)
          .map((movie, index) =>
            mediaType == "movie" ? (
              <MovieCard key={index} movie={movie} />
            ) : (
              <TVshowCard key={index} movie={movie} />
            )
          )}
      </div>
    </>
  );
};

export default SimilarMovieGroup;
