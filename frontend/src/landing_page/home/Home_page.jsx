import { motion } from "framer-motion";

function Home_page() {
    return (
        <div className="w-full overflow-x-hidden">
            {/* Hero Section */}
            <div className="max-w-screen-lg mx-auto mt-13 mb-10 px-4">
                <img
                    src="/media/images/homeHero.png"
                    alt="homeHero"
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* Headline */}
            <div className="max-w-screen-lg mx-auto text-center px-4 mb-16">
                <h1 className="font-semibold text-3xl md:text-5xl text-gray-700 mb-5">
                    Invest in everything
                </h1>
                <p className="text-gray-600 text-xl mb-7">
                    Online platform to invest in stocks, derivatives, mutual funds, ETFs,
                    bonds, and more.
                </p>
                <motion.button
                    className="px-6 py-3 text-white rounded text-xl font-semibold"
                    style={{ backgroundColor: "#387ed1" }}
                    whileHover={{ backgroundColor: "#000000" }}
                    onClick={()=>window.location.href = "http://localhost:5173/signup"}
                >
                    Sign up for free
                </motion.button>
            </div>

            {/* Trust Section */}
            <div className="flex flex-col md:flex-row max-w-screen-lg mx-auto items-start justify-between gap-8 px-4 mb-16">
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-semibold text-[#424242] mb-6">
                        Trust with confidence
                    </h2>

                    {[
                        {
                            title: "Customer-first always",
                            desc: "That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.",
                        },
                        {
                            title: "No spam or gimmicks",
                            desc: `No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. `,
                            link: "Our philosophies",
                        },
                        {
                            title: "The Zerodha universe",
                            desc: "Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.",
                        },
                        {
                            title: "Do better with money",
                            desc: `With initiatives like `,
                            link: "Nudge and Kill Switch",
                        },
                    ].map(({ title, desc, link }, i) => (
                        <div key={i} className="mb-6">
                            <h3 className="text-xl font-semibold text-[#424542] mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-500">
                                {desc}
                                {link && (
                                    <a className="text-blue-500 cursor-pointer ml-1">{link}</a>
                                )}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <img
                        src="/media/images/ecosystem.png"
                        alt="ecosystem"
                        className="w-full max-w-md h-auto mb-4"
                    />
                    <motion.a
                        className="text-blue-500 font-semibold cursor-pointer mb-2"
                        whileHover={{ color: "#000" }}
                    >
                        Try Kite demos →
                    </motion.a>
                    <motion.a
                        className="text-blue-500 font-semibold cursor-pointer"
                        whileHover={{ color: "#000" }}
                    >
                        Explore our products →
                    </motion.a>
                </div>
            </div>

            {/* Newspaper */}
            <div className="w-full max-w-screen-lg mx-auto px-4 mb-16">
                <img
                    src="/media/images/Newspaper.png"
                    alt="Newspaper"
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* Pricing Section */}
            <div className="flex flex-col md:flex-row max-w-screen-lg mx-auto items-start gap-8 px-4 mb-20">
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold mb-3 text-[#424542]">
                        Unbeatable pricing
                    </h1>
                    <p className="text-gray-600 mb-4">
                        We pioneered the concept of discount broking and price transparency
                        in India. Flat fees and no hidden charges.
                    </p>
                    <motion.a
                        className="text-blue-500 font-medium cursor-pointer"
                        whileHover={{ color: "#000" }}
                    >
                        See pricing →
                    </motion.a>
                </div>

                <div className="w-full md:w-1/2 flex flex-wrap justify-center gap-4">
                    {[
                        {
                            img: "pricingMF.svg",
                            text: "Free account opening",
                        },
                        {
                            img: "pricingMF.svg",
                            text: "Free equity delivery and direct mutual funds",
                        },
                        {
                            img: "20.svg",
                            text: "Intraday and F&O",
                        },
                    ].map(({ img, text }, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center w-32 text-center"
                        >
                            <img
                                src={`/media/images/${img}`}
                                alt="icon"
                                className="w-16 h-auto mb-2"
                            />
                            <span className="text-xs text-gray-500">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education Section */}
            <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center px-4 py-10 gap-8">
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="/media/images/education.svg"
                        alt="varsity"
                        className="w-44 sm:w-56 md:w-72 h-auto"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#424542] mb-4">
                        Free and open market education
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Varsity, the largest online stock market education book in the
                        world covering everything from the basics to advanced trading.
                    </p>
                    <a className="text-blue-500 text-sm hover:text-black transition-colors cursor-pointer">
                        Varsity →
                    </a>
                    <p className="text-gray-600 mb-4 mt-4">
                        TradingQ&A, the most active trading and investment community in
                        India for all your market related queries.
                    </p>
                    <a className="text-blue-500 text-sm hover:text-black transition-colors cursor-pointer">
                        TradingQ&A →
                    </a>
                </div>
            </div>

            <div className="mt-15 max-w-screen-lg mx-auto text-center px-4 mb-16">
                <h1 className="font-semibold text-3xl md:text-5xl text-gray-700 mb-5">
                    Open a Zerodha account
                </h1>
                <p className="text-gray-600 text-normal mb-7">
                    Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
                </p>
                <motion.button
                    className="px-6 py-3 text-white rounded text-xl font-semibold"
                    style={{ backgroundColor: "#387ed1" }}
                    whileHover={{ backgroundColor: "#000000" }}
                >
                    Sign up for free
                </motion.button>
            </div>
        </div>
    );
}

export default Home_page;
