"use client";
import { useEffect, useRef, useState } from "react";
import SearchResultCard from "@/components/SearchResultCard/SearchResultCard";

const API_KEY = "c7cf1258a5aa723e8a98f08f639e86b6";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchBox = () => {
  const [results, setResults] = useState<any[]>([]);
  const [response, setResponse] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(event.target.value);
  };

  const clearInput = () => {
    setResponse("");
    setResults([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!response) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${response}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [response]);

  return (
    <>
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center px-2.5">
            {response && (
              <button
                className="border p-1 rounded-full bg-red-400 hover:bg-red-500 active:bg-red-700"
                onClick={clearInput}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="text"
            className="py-1 px-4 text-black placeholder:text-gray-600 block w-full rounded-md border-gray-300 pr-10 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 "
            placeholder="Search"
            onChange={handleInputChange}
          />
        </div>
      </div>
      {response && (
        <div className="p-2 md:w-[600px] min-w-[260px] h-[450px] md:h-[550px] bg-base-300 absolute right-0 overflow-auto">
          {results.map((movie, index) => (
            <SearchResultCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBox;
