import { useState } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function AboutSection() {
    const persons = [
        {
            id: 0,
            image: "/media/images/Nikhil.jpg",
            name: "Nikhil Kamath",
            pos: "Co-founder & CFO",
            bio: "Nikhil is an astute and experienced investor, and he heads financial planning at Zerodha. An avid reader, he always appreciates a good game of chess."
        },
        {
            id: 1,
            image: "/media/images/Kailash.jpg",
            name: "Dr. Kailash Nadh",
            pos: "CTO",
            bio: "Kailash has a PhD in Artificial Intelligence & Computational Linguistics, and is the brain behind all our technology and products. He has been a developer from his adolescence and continues to write code every day."
        },
        {
            id: 2,
            image: "/media/images/Venu.jpg",
            name: "Venu Madhav",
            pos: "COO",
            bio: "Venu is the backbone of Zerodha taking care of operations and ensuring that we are compliant to rules and regulations. He has over a dozen certifications in financial markets and is also proficient in technical analysis. Workouts, cycling, and adventuring is what he does outside of Zerodha."
        },
        {
            id: 3,
            image: "/media/images/Hanan.jpg",
            name: "Hana Delvi",
            pos: "CCO",
            bio: "We take pride in the way we support our clients, and Hanan is responsible for this with his never ending flow of energy. He is the man behind many of our support initiatives that have helped us stay ahead of the game. A free thinker, Hanan can be seen posing as one in his free time."
        },
        {
            id: 4,
            image: "/media/images/Seema.jpg",
            name: "Seema Patil",
            pos: "Director",
            bio: "Seema who has lead the quality team since the beginning of Zerodha, is now a director. She is an extremely disciplined fitness enthusiast."
        },
        {
            id: 5,
            image: "/media/images/karthik.jpg",
            name: "Karthik Rangappa",
            pos: "Chief of Education",
            bio: "Karthik Guru Rangappa single handledly wrote Varsity, Zerodha's massive educational program. He heads investor education initiatives at Zerodha and loves stock markets, classic rock, single malts, and photography."
        },
        {
            id: 6,
            image: "/media/images/Austin.jpg",
            name: "Austin Prakesh",
            pos: "Director Strategy",
            bio: "Austin is a successful self-made entrepreneur from Singapore. His area of specialty revolves around helping organisations including grow by optimizing revenue streams and creating growth strategies. He is a boxing enthusiast and loves collecting exquisite watches."
        }
    ];

    const [show, setShow] = useState({});

    const toggleShow = (id) => {
        setShow(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };


    return (
        <>
            <div className="max-w-screen-lg mx-auto px-4 md:px-8 lg:px-20 xl:px-32 py-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10 leading-snug" style={{ color: "#424242" }}>
                    We pioneered the discount broking model in India.
                    Now, we are breaking ground with our technology.
                </h2>

                <hr className="border-t border-gray-200 mb-14" />

                <div className="grid md:grid-cols-2 gap-12 text-gray-700 text-[16px] leading-[1.8]">
                    {/* Left Column */}
                    <div>
                        <p className="mb-5">
                            We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.
                        </p>
                        <p className="mb-5">
                            Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.
                        </p>
                        <p>
                            Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div>
                        <p className="mb-5">
                            In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
                        </p>
                        <p className="mb-5">
                            <span className="text-blue-600 cursor-pointer hover:text-black transition-colors">
                                Rainmatter
                            </span>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.
                        </p>
                        <p>
                            And yet, we are always up to something new every day. Catch up on the latest updates on our <span className="text-blue-600 cursor-pointer hover:text-black transition-colors">blog</span> or see what the media is <span className="text-blue-600 cursor-pointer hover:text-black transition-colors">saying about us</span> or learn more about our business and product <span className="text-blue-600 cursor-pointer hover:text-black transition-colors">philosophies</span>.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-lg mx-auto px-4 py-2">
                <h2 className="text-3xl font-semibold mb-8 text-center" style={{ color: "#4e4242" }}>People</h2>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 px-4 py-10 max-w-screen-lg mx-auto mb-18">
                    {/* Image Section */}
                    <div className="flex-shrink-0">
                        <img
                            src="/media/images/nithinKamath.jpg"
                            alt="Nithin Kamath"
                            className="w-48 h-48 sm:w-76 sm:h-76 md:w-75 md:h-75 object-cover rounded-full shadow-lg"
                        />
                        <div className="mt-4 text-center mx-auto">
                            <h3 className="font-semibold text-2xl mb-2" style={{ color: "#424242" }}>Nithin Kamath</h3>
                            <p className="text-md text-gray-500">Founder, CEO</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                        <p className="text-gray-600 font-normal mb-4">
                            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
                            hurdles he faced during his decade long stint as a trader. Today,
                            Zerodha has changed the landscape of the Indian broking industry.
                        </p>
                        <p className="text-gray-600 mb-4 font-normal">
                            He is a member of the SEBI Secondary Market Advisory Committee
                            (SMAC) and the Market Data Advisory Committee (MDAC).
                        </p>
                        <p className="text-gray-600 mb-4 font-normal">
                            Playing basketball is his zen.
                        </p>
                        <p className="text-gray-700">
                            Connect on{' '}
                            <a href="#" className="text-blue-600 hover:text-black cursor-pointer">Homepage</a>{' / '}
                            <a href="#" className="text-blue-600 hover:text-black cursor-pointer">TradingQnA</a>{' / '}
                            <a href="#" className="text-blue-600 hover:text-black cursor-pointer">Twitter</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
                    {persons.map((person) => (
                        <div key={person.id} className="flex flex-col items-center text-center">
                            <img
                                src={person.image}
                                alt={person.name}
                                className="w-48 h-48 sm:w-76 sm:h-76 md:w-50 md:h-50 object-cover rounded-full shadow-lg"
                            />
                            <h5 className="font-medium text-2xl mb-2 mt-3" style={{ color: "#424242" }}>{person.name}</h5>
                            <span className="font-normal text-gray-500">{person.pos}</span>
                            <button
                                className="font-semibold text-gray-500 mt-1 cursor-pointer flex items-center gap-1"
                                onClick={() => toggleShow(person.id)}
                            >
                                Bio
                                <FontAwesomeIcon icon={show[person.id] ? faAngleUp : faAngleDown} />
                            </button>

                            {show[person.id] && (
                                <p className=" md:px-13 mt-3 px-4 sm:px-6 text-gray-700 text-[16px] leading-relaxed text-left">
                                    {person.bio}
                                </p>
                            )}


                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AboutSection;
