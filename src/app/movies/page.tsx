"use client";
import CardContainer from "@/components/CardGroup/CardContainer/CardContainer";
import MainContext from "@/context/MasterContext";
import { useState } from "react";

const MoviesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("top_rated");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <MainContext>
      <h2 className="text-2xl text-yellow-500 font-bold ml-20 my-8">
        Explore Movies
      </h2>
      <div role="tablist" className="tabs tabs-lifted tabs-md my-10 text-xl">
        <a
          role="tab"
          className={`tab hover:text-yellow-500 ${
            activeTab === "popular"
              ? "tab-active text-yellow-500 font-bold"
              : ""
          }`}
          onClick={() => {
            handleTabClick("popular");
          }}
        >
          Popular
        </a>
        <a
          role="tab"
          className={`tab hover:text-yellow-500 ${
            activeTab === "top_rated"
              ? "tab-active text-yellow-500 font-bold"
              : ""
          }`}
          onClick={() => handleTabClick("top_rated")}
        >
          Top Rated
        </a>
        <a
          role="tab"
          className={`tab hover:text-yellow-500 ${
            activeTab === "upcoming"
              ? "tab-active text-yellow-500 font-bold"
              : ""
          }`}
          onClick={() => handleTabClick("upcoming")}
        >
          Up Coming
        </a>
      </div>
      <CardContainer streamingType="movie" activeTab={activeTab} />
    </MainContext>
  );
};

export default MoviesPage;
