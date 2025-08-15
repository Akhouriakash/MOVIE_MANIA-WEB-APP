import { MasterContext } from "@/context/MasterContext";
import { useContext, useEffect } from "react";
import Pagination from "@/components/CardGroup/Pagination/Pagination";
import MovieCard from "@/components/CardGroup/CardDetails/MovieCard/MovieCard";
import TVshowCard from "@/components/CardGroup/CardDetails/TVshowCard/TVshowCard";



interface CardGroupProps {
  streamingType: string;
  activeTab: string;
}

const CardContainer: React.FC<CardGroupProps> = ({ streamingType, activeTab }) => {
  const { movies, setMovieOrTv, setTrendingOptions } =
    useContext(MasterContext);

  useEffect(() => {

    setMovieOrTv(streamingType);
  }, [streamingType, setMovieOrTv]);

  setTrendingOptions(activeTab);

  return (
    <>
      <Pagination />
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:mx-14 mx-4">
        {movies
        .filter((movie) => movie.poster_path)
        .map((movie, index) =>
          streamingType == "movie" ? (
            <MovieCard key={index} movie={movie} />
          ) : (
            <TVshowCard key={index} movie={movie} />
          )
        )}
      </div>
      <Pagination />
    </>
  );
};

export default CardContainer;
