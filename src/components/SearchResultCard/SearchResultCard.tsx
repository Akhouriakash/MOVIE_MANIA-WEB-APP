"use client";
import { Movie } from "@/types/MovieTypes";
import Image from "next/image";
import Link from "next/link";

const SearchResultCard = ({ movie }: { movie: Movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link href={`/movies/${movie.id}`} className="my-3 flex gap-2 cursor-pointer hover:border transition:border duration-100">
      <div>
        <Image width={60} height={100} src={imageUrl} alt={movie.title} />
      </div>
      <div className="">
        <h2 className="hover:text-yellow-500">{movie.title}</h2>
        <p>
          {movie.overview.slice(0, 40)}...
          <span className="underline italic hover:text-yellow-500">more</span>
        </p>
        <div className="justify-start">
          <div className="">
            Release Date:{" "}
            <span className="text-[10px] italic ml-2">
              {movie.release_date}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
