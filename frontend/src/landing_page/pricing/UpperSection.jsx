function UpperSection() {
    const charges = [
        {
            logo: "/media/images/pricing0.svg",
            name: "Free equity delivery",
            description: "All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage."
        },
        {
            logo: "/media/images/20.svg",
            name: "Intraday and F&O trades",
            description: "Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades."
        },
        {
            logo: "/media/images/pricing0.svg",
            name: "Free direct MF",
            description: "All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges."
        }
    ]
    return (
        <>
            <div className="mt-15 mb-35 flex flex-col max-w-screen-lg mx-auto justify-center items-center">
                <h1 className="text-5xl font-semibold text-gray-700 mb-4">Charges</h1>
                <p className="mb-2 text-2xl text-gray-600">List of all charges and taxes</p>
            </div>

            <div className="flex justify-center items-center mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-screen-lg mx-5">
                    {charges.map((charge, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <img src={charge.logo} alt={charge.name} className="h-28 md:h-42 mb-4" />
                            <p className="mx-4 mb-4 md:mx-0 font-semibold text-gray-600 text-3xl">{charge.name}</p>
                            <p className="mx-5 md:mx-0 text-gray-500 text-md">{charge.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UpperSection;