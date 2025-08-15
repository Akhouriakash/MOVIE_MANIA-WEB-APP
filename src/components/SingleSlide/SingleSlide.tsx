import { Movie } from "@/types/MovieTypes";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "@/components/SingleSlide/SingleSlide.css";

const SingleSlide = ({ movie }: { movie: Movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="carousel-item cursor-pointer relative single-slider-card"
    >
      <Image width={250} height={350} src={imageUrl} alt={movie.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black single-slider-overlay">
        <div className="flex justify-between items-center p-4 single-slider-overlay-top">
          <small className="text-xs text-gray-200">
            Total votes: {movie.vote_count}
          </small>
          <div
            className="tooltip tooltip-bottom"
            data-tip={(movie.vote_average / 2).toFixed(1) + ` / 5`}
          >
            <Rating
              name="read-only"
              readOnly
              size="small"
              value={movie.vote_average / 2}
              precision={0.5}
              max={5}
            />
          </div>
        </div>
        <h3 className="absolute p-4 bottom-0 mx-auto text-xl font-medium text-white single-slider-overlay-bottom">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
};

export default SingleSlide;
