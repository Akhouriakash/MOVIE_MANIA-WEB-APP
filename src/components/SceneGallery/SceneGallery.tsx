import Image from "next/image";

interface Scene {
  file_path: string;
}

interface SceneGalleryProps {
  sceneImages: Scene[];
  handleImageClick: (filePath: string) => void;
  mediaType: "movie" | "tv";
}

const SceneGallery: React.FC<SceneGalleryProps> = ({
  sceneImages,
  handleImageClick,
  mediaType,
}) => {
  return (
    <div>
      <h2 className="text-2xl text-yellow-500 font-bold ml-20 my-8">
        {mediaType == "movie" ? "Movie Scenes" : "TV Show Scenes"}
      </h2>
      <div className="flex flex-wrap gap-4 lg:mx-14 m-8 justify-center">
        {sceneImages && sceneImages.length > 0 ? (
          sceneImages.map((scene, index) => (
            <div
              key={index}
              className="relative w-full max-w-sm cursor-pointer sm:hover:scale-[1.04] transition-transform duration-200 ease-in"
              onClick={() => handleImageClick(scene.file_path)}
            >
              <Image
                className="object-cover"
                src={`https://image.tmdb.org/t/p/original/${scene.file_path}`}
                alt={`Scene ${index + 1}`}
                width={500}
                height={281}
              />
            </div>
          ))
        ) : (
          <p>No scene images available</p>
        )}
      </div>
    </div>
  );
};

export default SceneGallery;
