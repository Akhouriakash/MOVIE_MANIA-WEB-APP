"use client";
import SimilarMovieGroup from "@/components/SimilarMovieGroup/SimilarMovieGroup";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { MasterContext } from "@/context/MasterContext";
import { Rating, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import noImage from "@/assets/no_image.jpg";
import noBanner from "@/assets/no_banner.png";
import Castings from "@/components/Castings/Castings";
import SceneGallery from "@/components/SceneGallery/SceneGallery";
import SceneModal from "@/components/SceneModal/SceneModal";
import Trailers from "@/components/Trailers/Trailers";
import MediaDetails from "@/components/MediaDetails/MediaDetails";

const DetailedTvShowPage = () => {
  const { detailsType } = useContext(MasterContext);
  const [movie, setMovie] = useState<any>(null);
  const [youtubeData, setYoutubeData] = useState<any>(null);
  const pathname = usePathname();
  const [credits, setCredits] = useState<any>(null);
  const segments = pathname?.split("/") || [];
  const numericTvShowId = Number(segments[segments.length - 1]);
  const [sceneImages, setSceneImages] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const imageUrl =
    movie && movie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
      : noImage;

  const backDropImg =
    movie && movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : noBanner;

  const featuredCrew = credits?.crew.filter((member: any) =>
    ["Director", "Producer", "Screenplay", "Writer"].includes(member.job)
  );

  //single details
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(
          `${"https://api.themoviedb.org/3"}/tv/${numericTvShowId}?api_key=${"c7cf1258a5aa723e8a98f08f639e86b6"}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieData();
  }, [numericTvShowId, detailsType]);

  //youtube data
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(
          `${"https://api.themoviedb.org/3"}/tv/${numericTvShowId}/videos?api_key=${"c7cf1258a5aa723e8a98f08f639e86b6"}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setYoutubeData(data.results.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieData();
  }, [numericTvShowId]);

  //crew
  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const res = await fetch(
          `${"https://api.themoviedb.org/3"}/tv/${numericTvShowId}/credits?api_key=${"c7cf1258a5aa723e8a98f08f639e86b6"}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCredits(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieCredits();
  }, [numericTvShowId]);

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const res = await fetch(
          `${"https://api.themoviedb.org/3"}/tv/${numericTvShowId}/images?api_key=${"c7cf1258a5aa723e8a98f08f639e86b6"}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setSceneImages(data.backdrops.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieImages();
  }, [numericTvShowId]);

  const genreNames = movie?.genres
    .map((genre: { name: string }) => genre.name)
    .join(", ");

  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
    const dialog = document.getElementById("scene_modal") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    const dialog = document.getElementById("scene_modal") as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <div>
      {movie ? (
        <>
          <MediaDetails
            movie={movie}
            genreNames={genreNames}
            featuredCrew={credits?.crew}
            handleOpenModal={handleOpenModal}
          />
          <Trailers youtubeData={youtubeData} />
          <Castings cast={credits?.cast || []} />
          <SceneGallery
            mediaType={"movie"}
            sceneImages={sceneImages}
            handleImageClick={handleOpenModal}
          />
          <SceneModal
            selectedImage={selectedImage}
            onClose={handleCloseModal}
          />
          <SimilarMovieGroup
            mediaType={"tv"}
            movieId={numericTvShowId.toString()}
          />
        </>
      ) : (
        <p>Loading... the single tv show page</p>
      )}
    </div>
  );
};

export default DetailedTvShowPage;
