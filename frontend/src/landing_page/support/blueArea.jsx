export default function BlueArea() {
  return (
    <div style={{ backgroundColor: "#387ed1" }} className="relative text-white h-[53vh] md:h-[50vh] w-full">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-between w-full px-4 md:px-[3rem] max-w-screen-xl mx-auto h-[2.5rem] md:h-30 items-center">
        <p className="text-lg md:text-xl font-semibold cursor-pointer">
          Support Portal
        </p>
        <p className="text-base md:text-lg underline underline-offset-4 decoration-white cursor-pointer hover:text-gray-500">
          Track tickets
        </p>
      </div>

      <div
        className="absolute md:top-66 top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:px-[3rem] max-w-screen-xl flex flex-col md:flex-row mr-0 sm:mr-auto md:justify-between items-start justify-start px-6 sm:px-8 py-6 md:py-0 gap-10 md:gap-0"
      >
        <div className="w-full sm:w-[calc(100%-2rem)] md:w-[55%]">
          <span className="text-xl md:text-2xl font-medium hidden md:block mb-6">
            Search for an answer or browse help topics to create a ticket
          </span>
          <div className="mb-3 w-full max-w-md sm:max-w-full bg-white shadow-md flex items-center px-6 py-3 rounded-md ml-4 mr-4 md:ml-0 md:mr-0">
            <input
              type="text"
              placeholder="Eg : how do i activate F&O , why is my order getting rejected ..."
              className="flex-grow text-[#828690] placeholder-[#828690] focus:outline-none text-base md:text-lg"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 cursor-pointer"
              fill="none"
              viewBox="0 -2 20 22"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="text-lg flex flex-col md:flex-row flex-wrap gap-x-8 gap-y-2 ml-4 md:ml-0">
            <p className="underline underline-offset-4 decoration-white cursor-pointer hover:text-gray-300">
              Track account opening
            </p>
            <p className="underline underline-offset-4 decoration-white cursor-pointer hover:text-gray-300">
              Track segment activation
            </p>
            <p className="underline underline-offset-4 decoration-white cursor-pointer hover:text-gray-300">
              Intraday margins
            </p>
            <p className="underline underline-offset-4 decoration-white cursor-pointer hover:text-gray-300">
              Kite user manual
            </p>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:ml-12 w-full md:w-auto">
          <p className="text-2xl font-semibold mb-6">Featured</p>
          <ol className="space-y-2">
            <p className="ml-5 md:ml-0 underline underline-offset-4 decoration-white cursor-pointer hover:text-gray-300">
              1. Latest Intraday leverages and Square-off timings
            </p>
            <p className="ml-5 md:ml-0 underline underline-offset-4 decoration-white cursor-pointer hover:text-gray-300">
              2. Offer for sale (OFS) – May 2025
            </p>
          </ol>
        </div>
      </div>
    </div>
  );
}
