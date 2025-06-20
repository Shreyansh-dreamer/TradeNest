import LeftSideText from "./LeftSideText";
import RightSideText from "./RightSideText";
import {motion} from "framer-motion";

function Product() {
    const partners = [
        {
            name: "Zerodha Fund House",
            logo: "/media/images/zerodhaFundhouse.png",
            description:
                "Our asset management venture that is creating simple and transparent index funds to help you save for your goals.",
        },
        {
            name: "SENSIBULL",
            logo: "/media/images/sensibullLogo.svg",
            description:
                "Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.",
        },
        {
            name: "TIJORI",
            logo: "/media/images/tijori.svg",
            description:
                "Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.",
        },
        {
            name: "Streak",
            logo: "/media/images/streak-logo.png",
            description:
                "Systematic trading platform that allows you to create and backtest strategies without coding.",
        },
        {
            name: "smallcase",
            logo: "/media/images/smallcaseLogo.png",
            description:
                "Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.",
        },
        {
            name: "ditto",
            logo: "/media/images/dittoLogo.png",
            description:
                "Personalized advice on life and health insurance. No spam and no mis-selling.",
        },
    ];

    return (
        <>
            <div className="flex items-center border-b justify-center py-25 border-b-gray-200 ">
                <div className="flex flex-col max-w-screen-lg justify-center items-center w-full px-4 text-center">
                    <h1 className="text-5xl font-semibold text-gray-700 mb-4">Zerodha Products</h1>
                    <p className="mb-2 text-2xl text-gray-600">Sleek, modern, and intuitive trading platforms</p>
                    <p className="text-lg mt-3">
                        Check out our{' '}
                        <a href="#" className="text-[#387ed4] hover:text-black transition">
                            investment offerings &#8594;
                        </a>
                    </p>
                </div>
            </div>
            <br></br>
            <RightSideText image={"/media/images/kite.png"} heading={"Kite"} text={"Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."} />
            <LeftSideText image={"/media/images/console.png"} heading={"Console"} text={"The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."} link={"Learn more"} />
            <RightSideText image={"/media/images/coin.png"} heading={"Coin"} text={"Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."} />
            <LeftSideText image={"/media/images/kiteconnect.png"} heading={"Kite Connect API"} text={"Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."} link={"Kite Connect"} />

            <p className="max-w-screen-lg mx-auto px-4 py-16 text-gray-600 text-center text-xl">Want to know more about our technology stack? Check out the <a className="text-blue-500 hover:text-black cursor-pointer">Zerodha.tech</a> blog.</p>

            <div className="max-w-screen-lg mx-auto px-4 py-16 text-center">
                {/* Heading */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">The Zerodha Universe</h2>
                <p className="text-gray-600 mb-12">
                    Extend your trading and investment experience even further with our partner platforms
                </p>

                {/* Partner Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <img src={partner.logo} alt={partner.name} className="cursor-pointer hover:opacity-66 h-12 mb-4" />
                            <p className="mx-8 md:mx-0 text-gray-400 text-sm">{partner.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <motion.button
                className="px-6 py-3 text-white rounded text-xl font-semibold flex items-center justify-center mx-auto"
                style={{ backgroundColor: "#387ed1" }}
                whileHover={{ backgroundColor: "#000000" }}
            >
                Sign up for free
            </motion.button>
        </>
    );
}

export default Product;
