function UpperSection() {
    const charges = [
        {
            logo: "/media/images/pricing0.svg",
            name: "Zero-cost equity delivery",
            description: "Buy and hold stocks on NSE and BSE without paying any brokerage — ₹0, always."
        },
        {
            logo: "/media/images/20.svg",
            name: "Flat ₹20 for intraday & F&O",
            description: "A single flat fee of ₹20 or 0.03% per executed order (whichever is lower) across equity, currency, and commodity intraday trades. ₹20 flat on all options."
        },
        {
            logo: "/media/images/pricing0.svg",
            name: "Free direct mutual funds",
            description: "Invest in any direct mutual fund with zero commissions and no DP charges — keep every rupee of return you earn."
        }
    ]
    return (
        <>
            <div className="mt-15 mb-35 flex flex-col max-w-screen-lg mx-auto justify-center items-center">
                <h1 className="text-5xl font-semibold text-[var(--text-primary)] mb-4">Fee Schedule</h1>
                <p className="mb-2 text-2xl text-[var(--text-secondary)]">Clear pricing. No fine print. No surprises.</p>
            </div>

            <div className="flex justify-center items-center mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-screen-lg mx-5">
                    {charges.map((charge, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:shadow-lg hover:border-[var(--accent)] transition-all duration-300">
                            <img src={charge.logo} alt={charge.name} className="h-28 md:h-42 mb-4 drop-shadow-sm" />
                            <p className="mx-4 mb-4 md:mx-0 font-semibold text-[var(--text-primary)] text-2xl">{charge.name}</p>
                            <p className="mx-5 md:mx-0 text-[var(--text-secondary)] text-md">{charge.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UpperSection;