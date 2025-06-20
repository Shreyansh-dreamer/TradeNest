import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Faqs() {
    const [selected, setSelected] = useState(null);
    const [iconToggle, setIconToggle] = useState(null);

    const items = [
        {
            heading: "What is a Zerodha account?",
            desc: "A Zerodha account is a combined demat and trading account that allows investors to buy, sell, and hold securities digitally."
        },
        {
            heading: "What documents are required to open a demat account?",
            desc: "The following documents are required to open a Zerodha account online:\n• PAN number\n• Aadhaar Card (linked with a phone number for OTP verification)\n• Cancelled cheque or bank account statement (to link your bank account)\n• Income proof (required only if you wish to trade in Futures & Options)"
        },
        {
            heading: "Is Zerodha account opening free?",
            desc: "Yes, it is completely free."
        },
        {
            heading: "Are there any maintenance charges for a demat account?",
            desc: "The account maintenance charges are applicable based on the account type. For Basic Services Demat Account: Zero charges if the holding value is less than ₹4,00,000. For non-Basic Services Demat Accounts: ₹300 per year + GST."
        },
        {
            heading: "Can I open a demat account without a bank account?",
            desc: "To open a demat account, you must have a bank account in your name. If UPI verification is completed successfully, no proof of bank is needed. However, if bank verification fails, you'll need to provide either a cancelled cheque or a bank statement to link your bank account to Zerodha."
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
