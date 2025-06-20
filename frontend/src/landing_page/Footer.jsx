function Footer() {
    return (
        <div className="border-t border-gray-200 shadow-t-md mt-6 bottom-0 w-full" style={{ backgroundColor: "#f7f7f7" }}>
            <div className="flex flex-col md:flex-row justify-center max-w-screen-lg mx-auto">
                <div className="gap-6 p-5 w-[20rem] h-[16rem] object-cover">
                    <img src="/media/images/logoPlusSocials.png" alt="socials" />
                </div>
                <div className="bg-gray-90 p-8 text-left grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Account */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600 mb-2">Account</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="mt-5.5"><a href="#">Open demat account</a></li>
                            <li><a href="#">Minor demat account</a></li>
                            <li><a href="#">NRI demat account</a></li>
                            <li><a href="#">Commodity</a></li>
                            <li><a href="#">Dematerialisation</a></li>
                            <li><a href="#">Fund transfer</a></li>
                            <li><a href="#">MTF</a></li>
                            <li><a href="#">Referral program</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600 mb-2">Support</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="mt-5.5"><a href="#">Contact us</a></li>
                            <li><a href="#">Support portal</a></li>
                            <li><a href="#">How to file a complaint?</a></li>
                            <li><a href="#">Status of your complaints</a></li>
                            <li><a href="#">Bulletin</a></li>
                            <li><a href="#">Circular</a></li>
                            <li><a href="#">Z-Connect blog</a></li>
                            <li><a href="#">Downloads</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600 mb-2">Company</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="mt-5.5"><a href="#">About</a></li>
                            <li><a href="#">Philosophy</a></li>
                            <li><a href="#">Press & media</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Zerodha Cares (CSR)</a></li>
                            <li><a href="#">Zerodha.tech</a></li>
                            <li><a href="#">Open source</a></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-600 mb-2">Quick links</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="mt-5.5"><a href="#">Upcoming IPOs</a></li>
                            <li><a href="#">Brokerage charges</a></li>
                            <li><a href="#">Market holidays</a></li>
                            <li><a href="#">Economic calendar</a></li>
                            <li><a href="#">Calculators</a></li>
                            <li><a href="#">Markets</a></li>
                            <li><a href="#">Sectors</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-xs text-gray-400 m-4 max-w-screen-lg mx-auto px-4">
                <p className="mb-2">
                    Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to <a href="mailto:complaints@zerodha.com" className="text-blue-500 hover:underline">complaints@zerodha.com</a>, for DP related to <a href="mailto:dp@zerodha.com" className="text-blue-500 hover:underline">dp@zerodha.com</a>. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | <a href="#" className="text-blue-500 hover:underline">ICF</a>
                </p>

                <p className="mb-2">
                    Procedure to file a complaint on <strong>SEBI SCORES:</strong> Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances
                </p>

                <p className="mb-2">
                    <a href="#" className="text-blue-500 hover:underline">Smart Online Dispute Resolution</a> | <a href="#" className="text-blue-500 hover:underline">Grievances Redressal Mechanism</a>
                </p>

                <p className="mb-2">
                    Investments in securities market are subject to market risks; read all the related documents carefully before investing.
                </p>

                <p className="mb-2">
                    Attention investors: 1) Stock brokers can accept securities as margin from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
                </p>

                <p className="mb-2">
                    "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets – once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don’t give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please <a href="#" className="text-blue-500 hover:underline">create a ticket here</a>.
                </p>

                {/* Footer Links */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-gray-400 mb-3 md:justify-center justify-left !text-sm">
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">NSE</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">BSE</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">MCX</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">Terms & conditions</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">Policies & procedures</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">Privacy policy</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">Disclosure</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">For investor's attention</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-150">Investor charter</a>
                </div>
            </div>

        </div>
    );
}

export default Footer;