import { motion } from "framer-motion";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Product() {
    const mainProducts = [
        {
            heading: "Nexus",
            text: "Our flagship trading terminal — lightning-fast, beautifully designed, and packed with professional-grade charts and analytics. Available on web and mobile.",
            linkText: "Launch Nexus",
            gradient: "from-blue-500/20 to-transparent",
            icon: "⚡"
        },
        {
            heading: "Ledger",
            text: "Your TradeNest command center. Track portfolio performance, download reports, review transaction history, and stay on top of corporate actions — all in one place.",
            linkText: "Learn more",
            gradient: "from-purple-500/20 to-transparent",
            icon: "📊"
        },
        {
            heading: "Invest",
            text: "Commission-free direct mutual funds, credited straight to your demat account. Build and manage diversified portfolios effortlessly on any device.",
            linkText: "Start investing",
            gradient: "from-green-500/20 to-transparent",
            icon: "🌱"
        },
        {
            heading: "NestAPI",
            text: "Programmatic access to markets via our robust REST and WebSocket APIs. Ideal for algo traders, fintech builders, and developers who want full trading control.",
            linkText: "API Docs",
            gradient: "from-orange-500/20 to-transparent",
            icon: "⚙️"
        }
    ];

    const partners = [
        {
            name: "TradeNest Capital",
            logo: "/media/images/zerodhaFundhouse.png",
            description: "Our asset management arm building low-cost, transparent index funds — so your money grows steadily over time without the noise.",
        },
        {
            name: "OptionFlow",
            logo: "/media/images/sensibullLogo.svg",
            description: "A powerful options analytics suite to design strategies, visualize payoffs, and understand your real risk before placing a trade.",
        },
        {
            name: "InsightHub",
            logo: "/media/images/tijori.svg",
            description: "In-depth equity and sector research with supply chain analysis — giving you an information edge in a crowded market.",
        },
        {
            name: "Automate",
            logo: "/media/images/streak-logo.png",
            description: "Design, backtest, and deploy trading strategies with our no-code automation platform — no programming experience needed.",
        },
        {
            name: "Basket",
            logo: "/media/images/smallcaseLogo.png",
            description: "Invest in curated thematic portfolios aligned with ideas and trends — diversified, rebalanced, and easy to manage.",
        },
        {
            name: "SafeGuard",
            logo: "/media/images/dittoLogo.png",
            description: "Unbiased, transparent insurance advice matched to your life situation — helping you protect what matters most.",
        },
    ];

    return (
        <div className="w-full bg-[var(--bg-primary)] min-h-screen pt-20">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] mb-6 text-center"
                >
                    Our Ecosystem
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-[var(--text-secondary)] text-center max-w-2xl font-light"
                >
                    Purposefully built tools for every kind of market participant, designed with clarity and speed in mind.
                </motion.p>
            </div>

            {/* Main Products Grid - Replaces old massive images */}
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {mainProducts.map((product, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -5 }}
                            className={`flex flex-col justify-between p-8 md:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden relative group`}
                        >
                            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            
                            <div className="relative z-10">
                                <span className="text-4xl mb-6 block">{product.icon}</span>
                                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">{product.heading}</h2>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                                    {product.text}
                                </p>
                            </div>
                            
                            <div className="relative z-10 mt-auto">
                                <a className="inline-flex items-center text-[var(--accent)] font-semibold text-lg cursor-pointer hover:text-[var(--accent-hover)] transition-colors group/link">
                                    {product.linkText} 
                                    <ArrowRightAltIcon className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="w-full border-t border-b border-[var(--border-color)] bg-[var(--bg-secondary)] py-16 mt-12">
                <div className="max-w-screen-lg mx-auto px-4 text-center">
                    <p className="text-[var(--text-primary)] text-xl md:text-2xl font-light">
                        Curious about how we build? Read our <a className="text-[var(--accent)] font-medium hover:underline cursor-pointer">Engineering Blog</a>.
                    </p>
                </div>
            </div>

            {/* Partner Ecosystem */}
            <div className="max-w-screen-xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">Partner Ecosystem</h2>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                        Specialized tools that integrate seamlessly with TradeNest to enhance your investment experience
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex flex-col p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-colors group">
                            <img src={partner.logo} alt={partner.name} className="h-10 w-auto object-contain mb-6 opacity-80 group-hover:opacity-100 transition-opacity self-start" />
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                {partner.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pb-24 px-4">
                <motion.button
                    className="px-8 py-4 text-white rounded-full text-xl font-bold shadow-lg bg-[var(--accent)]"
                    whileHover={{ scale: 1.05, backgroundColor: "var(--accent-hover)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    Create your free account
                </motion.button>
            </div>
        </div>
    );
}

export default Product;
