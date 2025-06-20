function AccountTable() {
    return (
        <div className="max-w-screen-lg mt-20 mx-auto  text-gray-800">
            {/* Charges for account opening */}
            <div className="mb-10 mx-6">
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Charges for account opening</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-b border-gray-300">
                        <thead className="text-gray-500">
                            <tr className=" border-t border-gray-300">
                                <th className="text-left p-3 border-b border-l border-gray-300">Type of account</th>
                                <th className="text-left p-3 border-b border-r border-gray-300">Charges</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr>
                                <td className="p-3 border-b border-l border-gray-100">Online account</td>
                                <td className="p-3 border-b border-r border-gray-100 text-green-600 font-semibold"><div style={{backgroundColor: "#4caf50"}} className="bg-green-500 text-white w-12 h-5 flex justify-center items-center text-xs">FREE</div></td>
                            </tr>
                            <tr style={{backgroundColor:"#fbfbfb"}}>
                                <td className="p-3 border-b border-l border-gray-100">Offline account</td>
                                <td className="p-3 border-b border-r border-gray-100 text-green-600 font-semibold"><div style={{backgroundColor: "#4caf50"}} className="bg-green-500 text-white w-12 h-5 flex justify-center items-center text-xs">FREE</div></td>
                            </tr>
                            <tr>
                                <td className="p-3 border-b border-l border-gray-100">NRI account (offline only)</td>
                                <td className="p-3 border-b border-r border-gray-100">₹ 500</td>
                            </tr>
                            <tr style={{backgroundColor:"#fbfbfb"}}>
                                <td className="p-3 border-b border-l border-gray-100">
                                    Partnership, LLP, HUF, or Corporate accounts (offline only)
                                </td>
                                <td className="p-3 border-b border-r border-gray-100">₹ 500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Charges for optional value added services */}
            <div>
                <h2 className="text-2xl font-semibold mb-4 mx-6">Charges for optional value added services</h2>
                <div className="overflow-x-auto mx-6 mb-8">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="text-left p-3 border-t border-b border-l border-gray-300">Service</th>
                                <th className="text-left p-3 border-t border-b border-gray-300">Billing Frequency</th>
                                <th className="text-left p-3 border-t border-b border-r border-gray-300">Charges</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 text-gray-600">
                                <td className="p-3">Tickertape</td>
                                <td className="p-3">Monthly / Annual</td>
                                <td className="p-3">Free: 0 | Pro: 249/2399</td>
                            </tr>
                            <tr style={{backgroundColor:"#fbfbfb"}} className="border-b border-gray-100 text-gray-600">
                                <td className="p-3">Smallcase</td>
                                <td className="p-3">Per transaction</td>
                                <td className="p-3">Buy & Invest More: 100 | SIP: 10</td>
                            </tr>
                            <tr className="border-b border-gray-100 text-gray-600">
                                <td className="p-3">Kite Connect</td>
                                <td className="p-3">Monthly</td>
                                <td className="p-3">Connect: 500 | Historical: 500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AccountTable;
