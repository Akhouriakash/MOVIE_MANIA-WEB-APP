"use client";
import CardContainer from "@/components/CardGroup/CardContainer/CardContainer";
import MainContext, { MasterContext } from "@/context/MasterContext";
import { useContext, useState } from "react";

const TVshowPage = () => {
  const { setDetailsType, setTrendingOptions } = useContext(MasterContext);
  const [activeTab, setActiveTab] = useState<string>("top_rated");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setDetailsType("tv");
  };

  return (
    <>
      <MainContext>
        <h2 className="text-2xl text-yellow-500 font-bold ml-20 my-8">
          Explore TV Shows
        </h2>
        <div role="tablist" className="tabs tabs-lifted tabs-md my-10 text-xl">
          <a
            role="tab"
            className={`tab hover:text-yellow-500 ${
              activeTab === "popular"
                ? "tab-active text-yellow-500 font-bold"
                : ""
            }`}
            onClick={() => handleTabClick("popular")}
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
              activeTab === "on_the_air"
                ? "tab-active text-yellow-500 font-bold"
                : ""
            }`}
            onClick={() => handleTabClick("on_the_air")}
          >
            On The Air
          </a>
        </div>

        <CardContainer streamingType="tv" activeTab={activeTab} />
      </MainContext>
    </>
  );
};

export default TVshowPage;
