function LeftSideText({image,heading,text,link}) {
    return ( 
        <div className="mt-5 flex flex-col md:flex-row items-center justify-between max-w-screen-lg mx-auto px-4 py-12 gap-8">
            {/* Content on the left */}
            <div className="ml-3 w-full md:w-1/2 text-left">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">{heading}</h2>
                <p className="text-gray-600 mb-6">
                    {text}                
                </p>
                <a href="#" className="text-blue-600 hover:text-black font-medium transition">
                    {link} →
                </a>
            </div>

            {/* Image on the right */}
            <div className="w-full md:w-1/2">
                <img
                    src={image}
                    alt="Console Dashboard"
                    className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
            </div>
        </div>
     );
}

export default LeftSideText;