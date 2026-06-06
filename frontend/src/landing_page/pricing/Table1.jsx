import { useState } from "react";

const chargesTables = [
    {
        title: "F&O Charges (Mobile Only)",
        content: (
            <table className="w-full text-sm border border-[var(--border-color)] text-[var(--text-primary)]">
                <thead className="text-base text-[var(--text-secondary)] bg-[var(--bg-secondary)]">
                    <tr className="border border-[var(--border-color)]">
                        <th className="px-4 py-3 text-left font-medium"></th>
                        <th className="px-4 py-3 text-left font-medium">F&O - Futures</th>
                        <th className="px-4 py-3 text-left font-medium">F&O - Options</th>
                    </tr>
                </thead>
                <tbody className="border-b border-[var(--border-color)]">
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Brokerage</td>
                        <td className="px-4 py-3">0.03% or Rs. 20/executed order whichever is lower</td>
                        <td className="px-4 py-3">Flat Rs. 20 per executed order</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">STT/CTT</td>
                        <td className="px-4 py-3">0.02% on the sell side</td>
                        <td className="px-4 py-3">
                            <ul className="list-disc list-inside ml-4">
                                <li>0.0125% of the intrinsic value on options that are bought and exercised</li>
                                <li>0.1% on sell side (on premium)</li>
                            </ul>
                        </td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Transaction charges</td>
                        <td className="px-4 py-3">
                            NSE: 0.00173%<br />BSE: 0
                        </td>
                        <td className="px-4 py-3">
                            NSE: 0.03503% (on premium)<br />BSE: 0.0325% (on premium)
                        </td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">GST</td>
                        <td className="px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">SEBI charges</td>
                        <td className="px-4 py-3">₹10 / crore</td>
                        <td className="px-4 py-3">₹10 / crore</td>
                    </tr>
                    <tr className="bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Stamp charges</td>
                        <td className="px-4 py-3">0.002% or ₹200 / crore on buy side</td>
                        <td className="px-4 py-3">0.003% or ₹300 / crore on buy side</td>
                    </tr>
                </tbody>
            </table>
        ),
    },
    {
        title: "Currency Charges",
        content: (
            <table className="w-full text-sm border border-[var(--border-color)] text-[var(--text-primary)]">
                <thead className="text-base text-[var(--text-secondary)] bg-[var(--bg-secondary)]">
                    <tr className="border border-[var(--border-color)]">
                        <th className="px-4 py-3 text-left font-medium"></th>
                        <th className="px-4 py-3 text-left font-medium">Currency futures</th>
                        <th className="px-4 py-3 text-left font-medium">Currency options</th>
                    </tr>
                </thead>
                <tbody className="border-b border-[var(--border-color)]">
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Brokerage</td>
                        <td className="px-4 py-3">0.03% or ₹ 20/executed order whichever is lower</td>
                        <td className="px-4 py-3">₹ 20/executed order</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">STT/CTT</td>
                        <td className="px-4 py-3">No STT</td>
                        <td className="px-4 py-3">No STT</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Transaction charges</td>
                        <td className="px-4 py-3">NSE: 0.00035%<br />BSE: 0.00045%</td>
                        <td className="px-4 py-3">NSE: 0.0311%<br />BSE: 0.001%</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">GST</td>
                        <td className="px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">SEBI charges</td>
                        <td className="px-4 py-3">₹10 / crore</td>
                        <td className="px-4 py-3">₹10 / crore</td>
                    </tr>
                    <tr className="bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Stamp charges</td>
                        <td className="px-4 py-3">0.0001% or ₹10 / crore on buy side</td>
                        <td className="px-4 py-3">0.0001% or ₹10 / crore on buy side</td>
                    </tr>
                </tbody>
            </table>
        ),
    },
    {
        title: "Commodity Charges",
        content: (
            <table className="w-full text-sm border border-[var(--border-color)] text-[var(--text-primary)]">
                <thead className="text-base text-[var(--text-secondary)] bg-[var(--bg-secondary)]">
                    <tr className="border border-[var(--border-color)]">
                        <th className="px-4 py-3 text-left font-medium"></th>
                        <th className="px-4 py-3 text-left font-medium">Commodity futures</th>
                        <th className="px-4 py-3 text-left font-medium">Commodity options</th>
                    </tr>
                </thead>
                <tbody className="border-b border-[var(--border-color)]">
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Brokerage</td>
                        <td className="px-4 py-3">0.03% or Rs. 20/executed order whichever is lower</td>
                        <td className="px-4 py-3">₹ 20/executed order</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">STT/CTT</td>
                        <td className="px-4 py-3">0.01% on sell side (Non-Agri)</td>
                        <td className="px-4 py-3">0.05% on sell side</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Transaction charges</td>
                        <td className="px-4 py-3">MCX: 0.0021%<br />NSE: 0.0001%</td>
                        <td className="px-4 py-3">MCX: 0.0418%<br />NSE: 0.001%</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">GST</td>
                        <td className="px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">SEBI charges</td>
                        <td className="px-4 py-3">Agri:<br />₹1 / crore<br />Non-agri:<br />₹10 / crore</td>
                        <td className="px-4 py-3">₹10 / crore</td>
                    </tr>
                    <tr className="bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Stamp charges</td>
                        <td className="px-4 py-3">0.002% or ₹200 / crore on buy side</td>
                        <td className="px-4 py-3">0.003% or ₹300 / crore on buy side</td>
                    </tr>
                </tbody>
            </table>
        ),
    },
    {
        title: "Equity",
        content: (
            <table className="w-full text-sm border border-[var(--border-color)] text-[var(--text-primary)]">
                <thead className="text-base text-[var(--text-secondary)] bg-[var(--bg-secondary)]">
                    <tr className="border-b border-[var(--border-color)]">
                        <th className="px-4 py-3 text-left font-medium"></th>
                        <th className="px-4 py-3 text-left font-medium">Equity delivery</th>
                        <th className="px-4 py-3 text-left font-medium">Equity intraday</th>
                        <th className="hidden md:table-cell px-4 py-3 text-left font-medium">F&O - Futures</th>
                        <th className="hidden md:table-cell px-4 py-3 text-left font-medium">F&O - Options</th>
                    </tr>
                </thead>
                <tbody className="border-b border-[var(--border-color)]">
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Brokerage</td>
                        <td className="px-4 py-3">Zero Brokerage</td>
                        <td className="px-4 py-3">0.03% or Rs. 20/executed order whichever is lower</td>
                        <td className="hidden md:table-cell px-4 py-3">0.03% or Rs. 20/executed order whichever is lower</td>
                        <td className="hidden md:table-cell px-4 py-3">Flat Rs. 20 per executed order</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">STT/CTT</td>
                        <td className="px-4 py-3">0.1% on buy & sell</td>
                        <td className="px-4 py-3">0.025% on the sell side</td>
                        <td className="hidden md:table-cell px-4 py-3">0.02% on the sell side</td>
                        <td className="hidden md:table-cell px-4 py-3">
                            <ul className="list-disc list-inside ml-4">
                                <li>0.0125% of the intrinsic value on options that are bought and exercised</li>
                                <li>0.1% on sell side (on premium)</li>
                            </ul>
                        </td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Transaction charges</td>
                        <td className="px-4 py-3">
                            NSE: 0.00297%<br />BSE: 0.00375%
                        </td>
                        <td className="px-4 py-3">
                            NSE: 0.00297%<br />BSE: 0.00375%
                        </td>
                        <td className="hidden md:table-cell px-4 py-3">
                            NSE: 0.00173%<br />BSE: 0
                        </td>
                        <td className="hidden md:table-cell px-4 py-3">
                            NSE: 0.03503% (on premium)<br />BSE: 0.0325% (on premium)
                        </td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">GST</td>
                        <td className="px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="hidden md:table-cell px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                        <td className="hidden md:table-cell px-4 py-3">18% on (brokerage + SEBI charges + transaction charges)</td>
                    </tr>
                    <tr className="border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">SEBI charges</td>
                        <td className="px-4 py-3">₹10 / crore</td>
                        <td className="px-4 py-3">₹10 / crore</td>
                        <td className="hidden md:table-cell px-4 py-3">₹10 / crore</td>
                        <td className="hidden md:table-cell px-4 py-3">₹10 / crore</td>
                    </tr>
                    <tr className="bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="px-4 py-3">Stamp charges</td>
                        <td className="px-4 py-3">0.015% or ₹1500 / crore on buy side</td>
                        <td className="px-4 py-3">0.003% or ₹300 / crore on buy side</td>
                        <td className="hidden md:table-cell px-4 py-3">0.002% or ₹200 / crore on buy side</td>
                        <td className="hidden md:table-cell px-4 py-3">0.003% or ₹300 / crore on buy side</td>
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
            <div className="flex flex-wrap items-center w-full mb-6 py-4 border-b border-[var(--border-color)] max-w-screen-lg mx-auto md:px-7 lg:px-1 justify-around md:justify-start gap-x-6 md:gap-x-[2.5rem] text-left">
                <button
                    onClick={() => setSelected(3)}
                    className={`text-lg md:text-xl font-medium transition-colors ${selected === 3 ? "text-[var(--text-primary)] border-b-2 border-[var(--accent)] pb-1" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                    Equity
                </button>

                <button
                    onClick={() => setSelected(0)}
                    className={`text-lg md:text-xl font-medium inline-block md:hidden transition-colors ${selected === 0 ? "text-[var(--text-primary)] border-b-2 border-[var(--accent)] pb-1" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                    F&O
                </button>

                <button
                    onClick={() => setSelected(1)}
                    className={`text-lg md:text-xl font-medium transition-colors ${selected === 1 ? "text-[var(--text-primary)] border-b-2 border-[var(--accent)] pb-1" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                    Currency
                </button>

                <button
                    onClick={() => setSelected(2)}
                    className={`text-lg md:text-xl font-medium transition-colors ${selected === 2 ? "text-[var(--text-primary)] border-b-2 border-[var(--accent)] pb-1" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                    Commodity
                </button>
            </div>

            <div className="mb-12 lg:px-0 max-w-screen-lg flex items-center justify-center mx-auto px-3 overflow-x-auto">
                <div className="w-full bg-[var(--bg-card)] rounded-xl shadow-sm border border-[var(--border-color)] overflow-hidden">
                    {chargesTables[selected].content}
                </div>
            </div>
        </>
    );
}