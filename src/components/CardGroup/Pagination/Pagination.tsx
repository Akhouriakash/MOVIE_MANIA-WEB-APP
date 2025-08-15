import { MasterContext } from "@/context/MasterContext";
import { useContext } from "react";

const Pagination = () => {
  const { setPage, page } = useContext(MasterContext);



  return (
    <div className="my-10">
      <div className="flex justify-center">
        <nav aria-label="Pagination">
          <ul className="inline-flex items-center -space-x-px rounded-md text-sm shadow-sm">
            {page <= 1 ? (
              ""
            ) : (
              <li>
                <a
                  onClick={() => {
                    setPage((prev) => (prev > 1 ? prev - 1 : prev)); // Adjusted logic
                  }}
                  className="cursor-pointer inline-flex items-center space-x-2 rounded-l-md border border-gray-500  px-4 py-2 font-medium text-gray-500 hover:bg-gray-200"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Previous</span>
                </a>
              </li>
            )}

            {page <= 1 ? (
              ""
            ) : (
              <>
                {page <= 2 ? (
                  ""
                ) : (
                  <li>
                    <a
                      onClick={() => {
                        setPage((prev) => (prev > 1 ? prev - 2 : prev));
                      }}
                      aria-current="page"
                      className="cursor-pointer z-10 inline-flex items-center border border-gray-500 px-4 py-2 font-medium text-gray-500 hover:bg-gray-200"
                    >
                      {page - 2}
                    </a>
                  </li>
                )}

                <li>
                  <a
                    onClick={() => {
                      setPage((prev) => (prev > 1 ? prev - 1 : prev));
                    }}
                    aria-current="page"
                    className="cursor-pointer z-10 inline-flex items-center border border-gray-500 px-4 py-2 font-medium text-gray-500 hover:bg-gray-200"
                  >
                    {page - 1}
                  </a>
                </li>
              </>
            )}

            <li className="lg:tooltip" data-tip="Current page">
              <a className="inline-flex items-center border border-gray-500  px-4 py-2 cursor-not-allowed text-yellow-500">
                {page}
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setPage((prev) => (prev >= 1 ? prev + 1 : prev));
                }}
                className="cursor-pointer inline-flex items-center border border-gray-500  px-4 py-2 text-gray-500 hover:bg-gray-200"
              >
                {page + 1}
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setPage((prev) => (prev >= 1 ? prev + 2 : prev));
                }}
                className="cursor-pointer inline-flex items-center border border-gray-500  px-4 py-2 text-gray-500 hover:bg-gray-200"
              >
                {page + 2}
              </a>
            </li>

            <li>
              <a
                onClick={() => {
                  setPage((prev) => (prev < 100 ? prev + 1 : prev));
                }}
                className="cursor-pointer inline-flex items-center space-x-2 rounded-r-md border border-gray-500  px-4 py-2 font-medium text-gray-500 hover:bg-gray-200"
              >
                <span>Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
