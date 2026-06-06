export default function BlueArea() {
  return (
    <div style={{ backgroundColor: "#2563eb" }} className="relative text-white h-[53vh] md:h-[50vh] w-full mt-10">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-between w-full px-4 md:px-[3rem] max-w-screen-xl mx-auto h-[2.5rem] md:h-30 items-center">
        <p className="text-lg md:text-xl font-semibold cursor-pointer">
          Help Center
        </p>
        <p className="text-base md:text-lg underline underline-offset-4 decoration-white cursor-pointer hover:text-blue-200 transition-colors">
          My open tickets
        </p>
      </div>

      <div
        className="absolute md:top-66 top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:px-[3rem] max-w-screen-xl flex flex-col md:flex-row mr-0 sm:mr-auto md:justify-between items-start justify-start px-6 sm:px-8 py-6 md:py-0 gap-10 md:gap-0"
      >
        <div className="w-full sm:w-[calc(100%-2rem)] md:w-[55%]">
          <span className="text-xl md:text-2xl font-medium hidden md:block mb-6">
            Search for help, or browse topics to raise a support ticket
          </span>
          <div className="mb-3 w-full max-w-md sm:max-w-full bg-[var(--bg-card)] shadow-md flex items-center px-6 py-3 rounded-md ml-4 mr-4 md:ml-0 md:mr-0 border border-[var(--border-color)]">
            <input
              type="text"
              placeholder="e.g. why is my order rejected, how to withdraw funds..."
              className="flex-grow text-[var(--text-primary)] bg-transparent placeholder-[var(--text-muted)] focus:outline-none text-base md:text-lg"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[var(--text-muted)] cursor-pointer hover:text-[var(--accent)] transition-colors"
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
            <p className="underline underline-offset-4 decoration-white cursor-pointer hover:text-blue-200 transition-colors">
              Track account opening
            </p>
            <p className="underline underline-offset-4 decoration-white cursor-pointer hover:text-blue-200 transition-colors">
              Activate new segment
            </p>
            <p className="underline underline-offset-4 decoration-white cursor-pointer hover:text-blue-200 transition-colors">
              Intraday margin details
            </p>
            <p className="underline underline-offset-4 decoration-white cursor-pointer hover:text-blue-200 transition-colors">
              Platform user guide
            </p>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:ml-12 w-full md:w-auto">
          <p className="text-2xl font-semibold mb-6">Trending Topics</p>
          <ol className="space-y-2">
            <p className="ml-5 md:ml-0 underline underline-offset-4 decoration-white cursor-pointer hover:text-blue-200 transition-colors">
              1. Updated intraday leverage limits & auto square-off schedule
            </p>
            <p className="ml-5 md:ml-0 underline underline-offset-4 decoration-white cursor-pointer hover:text-blue-200 transition-colors">
              2. OFS (Offer for Sale) open — May 2025
            </p>
          </ol>
        </div>
      </div>
    </div>
  );
}
