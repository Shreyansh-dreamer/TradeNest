import { useState } from "react";

const chargesTables = [
    {
        title: "F&O Charges (Mobile Only)",
        content: (
            <table className="w-full text-sm border border-gray-200">
                <thead className="text-base text-gray-500">
                    <tr className="border border-gray-300">
                        <th className="px-4 py-2 text-left"></th>
                        <th className="px-4 py-2 text-left">F&O - Futures</th>
                        <th className="px-4 py-2 text-left">F&O - Options</th>
                    </tr>
                </thead>
                <tbody className="border-b border-gray-200">
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">Brokerage</td>
                        <td className="px-4 py-2">0.03% or Rs. 20/executed order whichever is lower</td>
                        <td className="px-4 py-2">Flat Rs. 20 per executed order</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }} className="border-b border-gray-100">
                        <td className="px-4 py-2">STT/CTT</td>
                        <td className="px-4 py-2">0.02% on the sell side</td>
                        <td className="px-4 py-2">
                            <ul className="list-disc list-inside ml-4">
                                <li>0.0125% of the intrinsic value on options that are bought and exercised</li>
                                <li>0.1% on sell side (on premium)</li>
                            </ul>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">Transaction charges</td>
                        <td className="px-4 py-2">
                            NSE: 0.00173%<br />BSE: 0
                        </td>
                        <td className="px-4 py-2">
                            NSE: 0.03503% (on premium)<br />BSE: 0.0325% (on premium)
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }} className="border-b border-gray-100">
                        <td className="px-4 py-2">GST</td>
                        <td className="px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">SEBI charges</td>
                        <td className="px-4 py-2">₹10 / crore</td>
                        <td className="px-4 py-2">₹10 / crore</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }}>
                        <td className="px-4 py-2">Stamp charges</td>
                        <td className="px-4 py-2">0.002% or ₹200 / crore on buy side</td>
                        <td className="px-4 py-2">0.003% or ₹300 / crore on buy side</td>
                    </tr>
                </tbody>
            </table>
        ),
    },
    {
        title: "Currency Charges",
        content: (
            <table className="w-full text-sm border border-gray-200">
                <thead className="text-base text-gray-500">
                    <tr className="border border-gray-300">
                        <th className="px-4 py-2 text-left"></th>
                        <th className="px-4 py-2 text-left">Currency futures</th>
                        <th className="px-4 py-2 text-left">Currency options</th>
                    </tr>
                </thead>
                <tbody className="border-b border-gray-200">
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">Brokerage</td>
                        <td className="px-4 py-2">0.03% or ₹ 20/executed order whichever is lower</td>
                        <td className="px-4 py-2">₹ 20/executed order</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }} className="border-b border-gray-100">
                        <td className="px-4 py-2">STT/CTT</td>
                        <td className="px-4 py-2">No STT</td>
                        <td className="px-4 py-2">No STT</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">Transaction charges</td>
                        <td className="px-4 py-2">NSE: 0.00035%<br />BSE: 0.00045%</td>
                        <td className="px-4 py-2">NSE: 0.0311%<br />BSE: 0.001%</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }} className="border-b border-gray-100">
                        <td className="px-4 py-2">GST</td>
                        <td className="px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">SEBI charges</td>
                        <td className="px-4 py-2">₹10 / crore</td>
                        <td className="px-4 py-2">₹10 / crore</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }}>
                        <td className="px-4 py-2">Stamp charges</td>
                        <td className="px-4 py-2">0.0001% or ₹10 / crore on buy side</td>
                        <td className="px-4 py-2">0.0001% or ₹10 / crore on buy side</td>
                    </tr>
                </tbody>
            </table>
        ),
    },
    {
        title: "Commodity Charges",
        content: (
            <table className="w-full text-sm border border-gray-200">
                <thead className="text-base text-gray-500">
                    <tr className="border border-gray-300">
                        <th className="px-4 py-2 text-left"></th>
                        <th className="px-4 py-2 text-left">Commodity futures</th>
                        <th className="px-4 py-2 text-left">Commodity options</th>
                    </tr>
                </thead>
                <tbody className="border-b border-gray-200">
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">Brokerage</td>
                        <td className="px-4 py-2">0.03% or Rs. 20/executed order whichever is lower</td>
                        <td className="px-4 py-2">₹ 20/executed order</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }} className="border-b border-gray-100">
                        <td className="px-4 py-2">STT/CTT</td>
                        <td className="px-4 py-2">0.01% on sell side (Non-Agri)</td>
                        <td className="px-4 py-2">0.05% on sell side</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">Transaction charges</td>
                        <td className="px-4 py-2">MCX: 0.0021%<br />NSE: 0.0001%</td>
                        <td className="px-4 py-2">MCX: 0.0418%<br />NSE: 0.001%</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }} className="border-b border-gray-100">
                        <td className="px-4 py-2">GST</td>
                        <td className="px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">SEBI charges</td>
                        <td className="px-4 py-2">Agri:<br />₹1 / crore<br />Non-agri:<br />₹10 / crore</td>
                        <td className="px-4 py-2">₹10 / crore</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }}>
                        <td className="px-4 py-2">Stamp charges</td>
                        <td className="px-4 py-2">0.002% or ₹200 / crore on buy side</td>
                        <td className="px-4 py-2">0.003% or ₹300 / crore on buy side</td>
                    </tr>
                </tbody>
            </table>
        ),
    },
    {
        title: "Equity",
        content: (
            <table className="w-full text-sm border border-gray-200">
                <thead className="text-base text-gray-500">
                    <tr className="border-b border-gray-300">
                        <th className="px-4 py-2 text-left"></th>
                        <th className="px-4 py-2 text-left">Equity delivery</th>
                        <th className="px-4 py-2 text-left">Equity intraday</th>
                        <th className="hidden md:table-cell px-4 py-2 text-left">F&O - Futures</th>
                        <th className="hidden md:table-cell px-4 py-2 text-left">F&O - Options</th>
                    </tr>
                </thead>
                <tbody className="border-b border-gray-100">
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">Brokerage</td>
                        <td className="px-4 py-2">Zero Brokerage</td>
                        <td className="px-4 py-2">0.03% or Rs. 20/executed order whichever is lower</td>
                        <td className="hidden md:table-cell px-4 py-2">0.03% or Rs. 20/executed order whichever is lower</td>
                        <td className="hidden md:table-cell px-4 py-2">Flat Rs. 20 per executed order</td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }} className="border-b border-gray-100">
                        <td className="px-4 py-2">STT/CTT</td>
                        <td className="px-4 py-2">0.1% on buy & sell</td>
                        <td className="px-4 py-2">0.025% on the sell side</td>
                        <td className="hidden md:table-cell px-4 py-2">0.02% on the sell side</td>
                        <td className="hidden md:table-cell px-4 py-2">
                            <ul className="list-disc list-inside ml-4">
                                <li>0.0125% of the intrinsic value on options that are bought and exercised</li>
                                <li>0.1% on sell side (on premium)</li>
                            </ul>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="px-4 py-2">Transaction charges</td>
                        <td className="px-4 py-2">
                            NSE: 0.00297%<br />BSE: 0.00375%
                        </td>
                        <td className="px-4 py-2">
                            NSE: 0.00297%<br />BSE: 0.00375%
                        </td>
                        <td className="hidden md:table-cell px-4 py-2">
                            NSE: 0.00173%<br />BSE: 0
                        </td>
                        <td className="hidden md:table-cell px-4 py-2">
                            NSE: 0.03503% (on premium)<br />BSE: 0.0325% (on premium)
                        </td>
                    </tr>
                    <tr style={{ backgroundColor: "#fbfbfb" }} className="border-b border-gray-100">
                        <td className="px-4 py-2">GST</td>
                        <td className="px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="hidden md:table-cell px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="hidden md:table-cell px-4 py-2">18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">SEBI charges</td>
                        <td className="px-4 py-2">₹10 / crore</td>
                        <td className="px-4 py-2">₹10 / crore</td>
                        <td className="hidden md:table-cell px-4 py-2">₹10 / crore</td>
                        <td className="hidden md:table-cell px-4 py-2">₹10 / crore</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Stamp charges</td>
                        <td className="px-4 py-2">0.015% or ₹1500 / crore on buy side</td>
                        <td className="px-4 py-2">0.003% or ₹300 / crore on buy side</td>
                        <td className="hidden md:table-cell px-4 py-2">0.002% or ₹200 / crore on buy side</td>
                        <td className="hidden md:table-cell px-4 py-2">0.003% or ₹300 / crore on buy side</td>
                    </tr>
                </tbody>
            </table>
        ),
    },
];

export default function ChargesTableComponent() {
    const [selected, setSelected] = useState(3);
    return (
        <>
            <div className="flex flex-wrap items-center w-full mb-4 py-2 border-b border-gray-200 max-w-screen-lg mx-auto md:px-7 lg:px-1 justify-around md:justify-start gap-x-6 md:gap-x-[2.5rem] text-left">
                <a
                    onClick={() => setSelected(3)}
                    className={`text-lg md:text-2xl cursor-pointer ${selected === 3 ? "text-gray-500 underline" : "text-blue-500 hover:text-gray-500"}`}
                >
                    Equity
                </a>

                <a
                    onClick={() => setSelected(0)}
                    className={`text-lg md:text-2xl cursor-pointer inline-block md:hidden ${selected === 0 ? "underline text-gray-500" : "text-blue-500 hover:text-gray-500"}`}
                >
                    F&O
                </a>

                <a
                    onClick={() => setSelected(1)}
                    className={`text-lg md:text-2xl cursor-pointer ${selected === 1 ? "text-gray-500 underline" : "text-blue-500 hover:text-gray-500"}`}
                >
                    Currency
                </a>

                <a
                    onClick={() => setSelected(2)}
                    className={`text-lg md:text-2xl cursor-pointer ${selected === 2 ? "text-gray-500 underline" : "text-blue-500 hover:text-gray-500"}`}
                >
                    Commodity
                </a>
            </div>

            <div className="mb-12 lg:px-0 max-w-screen-lg flex items-center justify-center mx-auto px-3">
                {chargesTables[selected].content}
            </div>
        </>
    );
}