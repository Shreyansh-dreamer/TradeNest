function RightSideText({image, heading, text}) {
    return ( 
        <div className="flex mt-5 flex-col md:flex-row items-center justify-between max-w-screen-lg mx-auto px-4 py-10 gap-8 border-b border-[var(--border-color)]">
            {/* Image */}
            <div className="w-full md:w-1/2">
                <img 
                    src={image} 
                    alt={heading}
                    className="w-full h-auto object-contain rounded-xl shadow-md"
                />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 text-left ml-[3rem] lg:ml-[8rem]">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{heading}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                    {text}
                </p>
                <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2 mb-4 justify-center md:justify-start">
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition">Live demo →</a>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition">Read more →</a>
                </div>
                <div className="w-40 flex flex-row gap-4 justify-center md:justify-start ml-18 md:ml-0">
                    <img src="/media/images/googlePlayBadge.svg" alt="Google Play" className="h-12 cursor-pointer hover:opacity-70" />
                    <img src="/media/images/appstoreBadge.svg" alt="App Store" className="h-12 cursor-pointer hover:opacity-70" />
                </div>
            </div>
        </div>
     );
}

export default RightSideText;
