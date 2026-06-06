import { useState } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function AboutSection() {
    const persons = [
        {
            id: 0,
            image: "/media/images/Nikhil.jpg",
            name: "Shreyansh Mishra",
            pos: "Co-founder & CFO",
            bio: "Shreyansh oversees financial strategy and planning at TradeNest. A disciplined investor and avid reader, he balances analytical thinking with an appreciation for a well-fought game of chess."
        },
        {
            id: 1,
            image: "/media/images/Kailash.jpg",
            name: "Dr. Kailash Nadh",
            pos: "CTO",
            bio: "Kailash holds a PhD in AI and Computational Linguistics and has been coding since his early teens. He architects every product and technology decision at TradeNest, and still writes code every single day."
        },
        {
            id: 2,
            image: "/media/images/Venu.jpg",
            name: "Venu Madhav",
            pos: "COO",
            bio: "Venu ensures TradeNest runs smoothly and stays compliant with evolving regulations. With over a dozen financial certifications and a deep interest in technical analysis, he balances operational excellence with a love for cycling and adventure."
        },
        {
            id: 3,
            image: "/media/images/Hanan.jpg",
            name: "Hana Delvi",
            pos: "CCO",
            bio: "Hana brings boundless energy to client support, pioneering initiatives that keep TradeNest ahead in customer experience. A free spirit and original thinker, he embodies the brand's commitment to putting clients first."
        },
        {
            id: 4,
            image: "/media/images/Seema.jpg",
            name: "Seema Patil",
            pos: "Director",
            bio: "Seema has shaped TradeNest's quality culture since day one. A Director who leads by example, she applies the same rigor to her fitness routines as she does to her operational standards."
        },
        {
            id: 5,
            image: "/media/images/karthik.jpg",
            name: "Karthik Rangappa",
            pos: "Chief of Education",
            bio: "Karthik authored TradeNest's entire learning curriculum — a comprehensive resource used by millions. He leads investor education, and outside of work, you'll find him exploring stock markets, spinning classic rock records, or chasing the perfect photograph."
        },
        {
            id: 6,
            image: "/media/images/Austin.jpg",
            name: "Austin Prakesh",
            pos: "Director Strategy",
            bio: "Austin is a seasoned entrepreneur from Singapore who specializes in growth strategy and revenue optimization. An accomplished boxer and collector of fine timepieces, he brings both precision and ambition to everything he does."
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
            <div className="max-w-screen-lg mx-auto px-4 md:px-8 lg:px-20 xl:px-32 py-10 mt-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10 leading-snug text-[var(--text-primary)]">
                    Reimagining how India trades and invests.
                    Built on technology, transparency, and trust.
                </h2>

                <hr className="border-t border-[var(--border-color)] mb-14" />

                <div className="grid md:grid-cols-2 gap-12 text-[var(--text-secondary)] text-[16px] leading-[1.8]">
                    <div>
                        <p className="mb-5">
                            TradeNest was built to tear down the barriers that kept ordinary Indians from participating in financial markets. Our founding mission was simple: make investing accessible, affordable, and honest.
                        </p>
                        <p className="mb-5">
                            Through relentless focus on technology and transparent practices, we've grown into a platform trusted by millions across the country.
                        </p>
                        <p>
                            Over 1.6 crore clients collectively place billions of orders annually through our ecosystem — representing a significant slice of India's retail trading activity.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div>
                        <p className="mb-5">
                            Our work extends beyond the trading screen. We are deeply invested in financial literacy, community building, and creating tools that help people make better money decisions.
                        </p>
                        <p className="mb-5">
                            <span className="text-[var(--accent)] cursor-pointer hover:text-[var(--accent-hover)] transition-colors">
                                Join our community
                            </span>, uncover new investment ideas, and deepen your knowledge through our <span className="text-[var(--accent)] cursor-pointer hover:text-[var(--accent-hover)] transition-colors">learning center</span>.
                        </p>
                        <p>
                            Stay current with our latest milestones on <span className="text-[var(--accent)] cursor-pointer hover:text-[var(--accent-hover)] transition-colors">our blog</span> and explore how we think about <span className="text-[var(--accent)] cursor-pointer hover:text-[var(--accent-hover)] transition-colors">building great software</span>.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-lg mx-auto px-4 py-2">
                <h2 className="text-3xl font-semibold mb-8 text-center text-[var(--text-primary)]">The People Behind TradeNest</h2>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 px-4 py-10 max-w-screen-lg mx-auto mb-18">
                    {/* Image Section */}
                    <div className="flex-shrink-0">
                        <img
                            src="/media/images/nithinKamath.jpg"
                            alt="Founder"
                            className="w-48 h-48 sm:w-76 sm:h-76 md:w-75 md:h-75 object-cover rounded-full shadow-lg"
                        />
                        <div className="mt-4 text-center mx-auto">
                            <h3 className="font-semibold text-2xl mb-2 text-[var(--text-primary)]">Founder & CEO</h3>
                            <p className="text-md text-[var(--text-secondary)]">Driving the Vision</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                        <p className="text-[var(--text-secondary)] font-normal mb-4">
                            TradeNest's founder started with a simple question: why should investing in Indian markets be complicated and expensive? That belief turned into a mission, and the mission turned into a movement.
                        </p>
                        <p className="text-[var(--text-secondary)] mb-4 font-normal">
                            He actively participates in shaping market regulations and industry standards — contributing meaningfully to how India's financial ecosystem evolves.
                        </p>
                        <p className="text-[var(--text-secondary)] mb-4 font-normal">
                            An advocate for lifelong learning and open discourse, he believes the best investments are always in people and knowledge.
                        </p>
                        <p className="text-[var(--text-primary)]">
                            Find him on{' '}
                            <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] cursor-pointer">Blog</a>{' / '}
                            <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] cursor-pointer">Community</a>{' / '}
                            <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] cursor-pointer">Twitter</a>
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
                            <h5 className="font-medium text-2xl mb-2 mt-3 text-[var(--text-primary)]">{person.name}</h5>
                            <span className="font-normal text-[var(--text-secondary)]">{person.pos}</span>
                            <button
                                className="font-semibold text-[var(--text-secondary)] mt-1 cursor-pointer flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
                                onClick={() => toggleShow(person.id)}
                            >
                                About
                                <FontAwesomeIcon icon={show[person.id] ? faAngleUp : faAngleDown} />
                            </button>

                            {show[person.id] && (
                                <p className="md:px-13 mt-3 px-4 sm:px-6 text-[var(--text-secondary)] text-[15px] leading-relaxed text-left">
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
