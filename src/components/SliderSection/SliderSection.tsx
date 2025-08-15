import { MasterContext } from "@/context/MasterContext";
import { useContext, useEffect, useState } from "react";
import SingleSlide from "@/components/SingleSlide/SingleSlide";

const SliderSection = () => {
  const { sliderData } = useContext(MasterContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <div className="my-10">
      <h2 className="text-2xl text-yellow-500 font-bold ml-16 mb-8 flex justify-between">
        In Cinemas<span className="text-[10px] md:mr-16 mr-4">Slide left to see more &gt;&gt;&gt;</span>
      </h2>
      <div className="carousel carousel-end rounded-box">
        {sliderData.map((movie, index) => {
          return <SingleSlide key={index} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default SliderSection;
