import { VideoData } from "@/types/YoutubeType";
import React from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

interface TrailersProps {
  youtubeData: VideoData[] | null;
}

const Trailers: React.FC<TrailersProps> = ({ youtubeData }) => {
  return (
    <div>
      <h2 className="text-2xl text-yellow-500 font-bold ml-20 my-8">
        Trailers
      </h2>
      <div className="flex flex-wrap gap-4 lg:mx-14 m-8 justify-center">
        {youtubeData && youtubeData.length > 0 ? (
          youtubeData.map((video: VideoData, index: number) => (
            <VideoPlayer key={index} video={video} />
          ))
        ) : (
          <p>No trailer videos available</p>
        )}
      </div>
    </div>
  );
};

export default Trailers;
