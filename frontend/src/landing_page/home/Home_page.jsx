import { motion } from "framer-motion";

function Home_page() {
    return (
        <div className="w-full overflow-x-hidden bg-[var(--bg-primary)]">

            {/* Hero Section */}
            <div className="max-w-screen-lg mx-auto pt-32 pb-16 px-4">
                <div className="text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-extrabold text-5xl md:text-7xl text-[var(--text-primary)] mb-6 tracking-tight leading-tight"
                    >
                        Invest in everything,<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                            all at once.
                        </span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[var(--text-secondary)] text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light"
                    >
                        One seamless platform to grow your wealth — stocks, F&O, mutual funds, ETFs, bonds, and beyond.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="px-10 py-4 text-white rounded-full text-xl font-semibold shadow-xl bg-[var(--accent)]"
                        whileHover={{ scale: 1.05, backgroundColor: "var(--accent-hover)", boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = import.meta.env.VITE_SIGNUP_URL}
                    >
                        Open free account
                    </motion.button>
                </div>
            </div>

            {/* Hero Image / Mockup replacing the old image */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-screen-xl mx-auto px-4 mb-24 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)] z-10 bottom-0 h-1/3"></div>
                <img
                    src="/media/images/homeHero.png"
                    alt="TradeNest platform preview"
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-t-3xl border border-[var(--border-color)] border-b-0"
                />
            </motion.div>

            {/* Feature Grid - Replaces old built on trust list & ecosystem image */}
            <div className="max-w-screen-xl mx-auto px-4 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                        Grounded in integrity
                    </h2>
                    <p className="text-[var(--text-secondary)] text-xl max-w-2xl mx-auto font-light">
                        We prioritize clean design, honest pricing, and your financial growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Clients always first",
                            desc: "Over 1.5 crore investors choose TradeNest, accounting for a meaningful share of daily retail volume.",
                            icon: "🤝"
                        },
                        {
                            title: "No clutter, no gimmicks",
                            desc: "Clean, honest apps. No spam, no gamification, no intrusive alerts. Just tools you need.",
                            icon: "✨"
                        },
                        {
                            title: "A complete ecosystem",
                            desc: "Beyond trading — a connected network covering research, insurance, automation, and more.",
                            icon: "🌐"
                        },
                        {
                            title: "Build better habits",
                            desc: "Smart nudges, position risk alerts, and bite-sized insights for well-considered decisions.",
                            icon: "🧠"
                        },
                    ].map(({ title, desc, icon }, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-colors"
                        >
                            <span className="text-4xl mb-4 block">{icon}</span>
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                                {title}
                            </h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                {desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pricing Section - Modernized */}
            <div className="w-full bg-[var(--bg-secondary)] border-y border-[var(--border-color)] py-24 mb-32">
                <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]">
                            Pricing you can trust
                        </h2>
                        <p className="text-[var(--text-secondary)] text-xl mb-8 font-light leading-relaxed">
                            We changed the industry with fair, flat-fee brokerage. No percentage cuts, no hidden charges — just straightforward costs from the start.
                        </p>
                        <motion.a
                            className="inline-block border border-[var(--accent)] text-[var(--accent)] px-8 py-3 rounded-full font-medium cursor-pointer hover:bg-[var(--accent)] hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                        >
                            View detailed pricing
                        </motion.a>
                    </div>

                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                        {[
                            { value: "₹0", text: "account opening fee" },
                            { value: "Free", text: "equity delivery & direct MFs" },
                            { value: "₹20", text: "intraday & F&O flat fee" },
                            { value: "0%", text: "hidden charges ever" },
                        ].map(({ value, text }, i) => (
                            <div key={i} className="flex flex-col justify-center p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl">
                                <span className="text-3xl font-black text-[var(--text-primary)] mb-2">{value}</span>
                                <span className="text-sm text-[var(--text-secondary)] font-medium">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-screen-lg mx-auto text-center px-4 pb-32">
                <h1 className="font-bold text-4xl md:text-6xl text-[var(--text-primary)] mb-6">
                    Ready to start trading?
                </h1>
                <p className="text-[var(--text-secondary)] text-xl mb-10 font-light">
                    Join millions of investors on India's most trusted platform.
                </p>
                <motion.button
                    className="px-12 py-5 text-white rounded-full text-xl font-bold shadow-2xl bg-[var(--accent)]"
                    whileHover={{ scale: 1.05, backgroundColor: "var(--accent-hover)", boxShadow: "0 25px 30px -5px rgba(37, 99, 235, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = "/signup"}
                >
                    Get started free
                </motion.button>
            </div>
        </div>
    );
}

export default Home_page;
