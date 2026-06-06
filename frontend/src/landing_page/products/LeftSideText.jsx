function LeftSideText({image, heading, text, link}) {
    return ( 
        <div className="mt-5 flex flex-col md:flex-row items-center justify-between max-w-screen-lg mx-auto px-4 py-12 gap-8 border-b border-[var(--border-color)]">
            {/* Content on the left */}
            <div className="ml-3 w-full md:w-1/2 text-left">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{heading}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                    {text}                
                </p>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition">
                    {link} →
                </a>
            </div>

            {/* Image on the right */}
            <div className="w-full md:w-1/2">
                <img
                    src={image}
                    alt={heading}
                    className="w-full h-auto object-contain rounded-xl shadow-md"
                />
            </div>
        </div>
     );
}

export default LeftSideText;