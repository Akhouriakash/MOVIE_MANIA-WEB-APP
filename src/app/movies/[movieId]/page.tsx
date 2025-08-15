"use client";
import noBanner from "@/assets/no_banner.png";
import noImage from "@/assets/no_image.jpg";
import Castings from "@/components/Castings/Castings";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import SceneGallery from "@/components/SceneGallery/SceneGallery";
import SceneModal from "@/components/SceneModal/SceneModal";
import SimilarMovieGroup from "@/components/SimilarMovieGroup/SimilarMovieGroup";
import Trailers from "@/components/Trailers/Trailers";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Simple loader component
const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

const DetailedMoviePage = () => {
  const [movie, setMovie] = useState<any>(null);
  const [youtubeData, setYoutubeData] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [sceneImages, setSceneImages] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const lastPartOfPath = pathname?.split("/movies/")[1];
  const numericMovieId = Number(lastPartOfPath);

  const imageUrl =
    movie && movie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
      : noImage;

  const backDropImg =
    movie && movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : noBanner;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true); // start loader
        const [movieRes, videoRes, creditsRes, imagesRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${numericMovieId}?api_key=c7cf1258a5aa723e8a98f08f639e86b6`),
          fetch(`https://api.themoviedb.org/3/movie/${numericMovieId}/videos?api_key=c7cf1258a5aa723e8a98f08f639e86b6`),
          fetch(`https://api.themoviedb.org/3/movie/${numericMovieId}/credits?api_key=c7cf1258a5aa723e8a98f08f639e86b6`),
          fetch(`https://api.themoviedb.org/3/movie/${numericMovieId}/images?api_key=c7cf1258a5aa723e8a98f08f639e86b6`)
        ]);

        const movieData = await movieRes.json();
        const youtubeData = await videoRes.json();
        const creditsData = await creditsRes.json();
        const imagesData = await imagesRes.json();

        setMovie(movieData);
        setYoutubeData(youtubeData.results.slice(0, 6));
        setCredits(creditsData);
        setSceneImages(imagesData.backdrops.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchAllData();
  }, [numericMovieId]);

  const genreNames = movie?.genres?.map((g: { name: string }) => g.name).join(", ");
  const featuredCrew = credits?.crew.filter((m: any) =>
    ["Director", "Producer", "Screenplay", "Writer"].includes(m.job)
  );

  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
    (document.getElementById("scene_modal") as HTMLDialogElement)?.showModal();
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    (document.getElementById("scene_modal") as HTMLDialogElement)?.close();
  };

  if (loading) return <Loader />;

  return (
    <div>
      {movie && (
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
            mediaType="movie"
            sceneImages={sceneImages}
            handleImageClick={handleOpenModal}
          />
          <SceneModal selectedImage={selectedImage} onClose={handleCloseModal} />
          <SimilarMovieGroup mediaType="movie" movieId={numericMovieId.toString()} />
        </>
      )}
    </div>
  );
};

export default DetailedMoviePage;
