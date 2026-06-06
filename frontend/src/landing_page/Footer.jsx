function Footer() {
    return (
        <div className="border-t border-[var(--border-color)] shadow-sm mt-6 bottom-0 w-full bg-[var(--bg-secondary)]">
            <div className="flex flex-col md:flex-row justify-center max-w-screen-lg mx-auto">
                <div className="p-8 text-left grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400 mb-2">Account</h3>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-500">
                            <li className="mt-5"><a href="#" className="hover:text-blue-500 transition-colors">Open demat account</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Minor demat account</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">NRI demat account</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Commodity trading</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Dematerialisation</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Fund transfer</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">MTF</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Refer a friend</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400 mb-2">Help</h3>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-500">
                            <li className="mt-5"><a href="#" className="hover:text-blue-500 transition-colors">Contact support</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Help center</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">How to file a complaint</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Complaint status</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Bulletin</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Announcements</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">TradeNest Blog</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Downloads</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400 mb-2">Company</h3>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-500">
                            <li className="mt-5"><a href="#" className="hover:text-blue-500 transition-colors">About us</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Our philosophy</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Press & media</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">TradeNest Gives (CSR)</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">TradeNest.tech</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Open source</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400 mb-2">Resources</h3>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-500">
                            <li className="mt-5"><a href="#" className="hover:text-blue-500 transition-colors">Upcoming IPOs</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Brokerage calculator</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Market holidays</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Economic calendar</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Calculators</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Markets overview</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Sector analysis</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-xs text-gray-400 dark:text-gray-500 m-4 max-w-screen-lg mx-auto px-4">
                <p className="mb-2">
                    TradeNest Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through TradeNest Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through TradeNest Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238 Registered Address: TradeNest Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For securities broking complaints please write to{" "}
                    <a href="mailto:complaints@tradenest.in" className="text-blue-500 hover:underline">complaints@tradenest.in</a>, for DP related to{" "}
                    <a href="mailto:dp@tradenest.in" className="text-blue-500 hover:underline">dp@tradenest.in</a>. Please read the Risk Disclosure Document prescribed by SEBI |{" "}
                    <a href="#" className="text-blue-500 hover:underline">ICF</a>
                </p>

                <p className="mb-2">
                    To file a complaint on <strong>SEBI SCORES:</strong> Register on the SCORES portal. Mandatory details: Name, PAN, Address, Mobile Number, Email ID. Benefits: Efficient communication, faster grievance resolution.
                </p>

                <p className="mb-2">
                    <a href="#" className="text-blue-500 hover:underline">Online Dispute Resolution</a> | <a href="#" className="text-blue-500 hover:underline">Grievance Redressal Policy</a>
                </p>

                <p className="mb-2">
                    Investments in securities markets are subject to market risks. Please read all related documents carefully before investing.
                </p>

                <p className="mb-2">
                    Attention investors: 1) Stock brokers can accept securities as margin from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
                    {" "}
                    "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors." As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of TradeNest and offering such services, please{" "}
                    <a href="#" className="text-blue-500 hover:underline">raise a ticket here</a>.
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-gray-400 dark:text-gray-500 mb-3 md:justify-center justify-start text-sm">
                    <a href="#" className="hover:text-blue-500 transition-colors">NSE</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">BSE</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">MCX</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Terms & conditions</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Policies & procedures</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Privacy policy</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Disclosure</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Investor attention</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Investor charter</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;