import Image from "next/image";
import "./Castings.css";
interface Actor {
  profile_path: string;
  name: string;
  character: string;
}

interface CastingsProps {
  cast: Actor[];
}

const Castings: React.FC<CastingsProps> = ({ cast }) => {
  return (
    <>
      <h2 className="text-2xl text-yellow-500 font-bold ml-20 my-8">Cast</h2>
      <div className="flex flex-wrap gap-4 lg:mx-14 m-8 justify-center">
        {cast.length > 0 ? (
          cast.slice(0, 10)
          .filter((actor) => actor.profile_path
          )
          .map((actor, index) => (
            <div
              key={index}
              className="relative w-full max-w-[250px] cast-card cursor-pointer"
            >
              <Image
                className="object-top object-fill w-full h-62"
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width={150}
                height={300}
              />
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black to-transparent p-2">
                <div>
                  <p className="text-white text-center">{actor.name}</p>
                  <p className="text-gray-400 text-center text-[12px]">
                    {actor.character}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No cast information available</p>
        )}
      </div>
    </>
  );
};

export default Castings;
