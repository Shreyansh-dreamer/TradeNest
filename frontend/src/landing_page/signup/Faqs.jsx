import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Faqs() {
    const [selected, setSelected] = useState(null);
    const [iconToggle, setIconToggle] = useState(null);

    const items = [
        {
            heading: "What is a TradeNest account?",
            desc: "A TradeNest account is a combined demat and trading account that allows you to buy, sell, and hold securities digitally with ease and transparency."
        },
        {
            heading: "What documents are required to open an account?",
            desc: "The following documents are required to open your TradeNest account online:\n• PAN (Permanent Account Number)\n• Aadhaar Card (linked with a phone number for verification)\n• Bank account details (cheque or statement)\n• Income proof (if trading in Futures & Options)"
        },
        {
            heading: "Is account opening completely free?",
            desc: "Yes, opening your TradeNest account is absolutely free with no hidden charges."
        },
        {
            heading: "What are the account maintenance fees?",
            desc: "Account maintenance varies by type. Basic accounts with holdings under ₹4,00,000 have zero charges. Standard accounts are charged ₹300/year + GST, billed quarterly for uninterrupted service."
        },
        {
            heading: "Do I need a bank account to get started?",
            desc: "Yes, a bank account is required to open a TradeNest account. We accept UPI verification for faster setup. If UPI verification isn't possible, provide a cancelled cheque or bank statement to link your account."
        }
    ];

    const handleToggle = (index) => {
        if (selected === index) {
            setSelected(null);
            setTimeout(() => setIconToggle(null), 1000);
        } else {
            setSelected(index);
            setTimeout(() => setIconToggle(index), 1000);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto px-10 mt-7">
            <h1 className="text-4xl mb-2 font-medium text-gray-600">FAQs</h1>
            {items.map((item, index) => (
                <div key={index} className="border-t border-gray-200 group transition-all duration-300">
                    <div className="h-1 w-1/10 group-hover:w-1/8 bg-blue-400 transition-all duration-300 mb-3"></div>

                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleToggle(index)}
                    >
                        <h2 className="text-lg font-medium text-gray-700 mb-3">{item.heading}</h2>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: iconToggle === index ? 180 : 0 }}
                            transition={{ duration: 0.2  }}
                        >
                            <FontAwesomeIcon
                                icon={selected === index ? faAngleUp : faAngleDown}
                                className="text-gray-600"
                            />
                        </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                        {selected === index && (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p className="text-gray-500 whitespace-pre-line mt-3 mb-4">{item.desc}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

export default Faqs;
