import { motion } from "framer-motion";

const DiffAccounts = () => {
    return (
        <div className='w-full flex justify-center text-[var(--text-primary)] font-sans mt-20'>
            <div className='w-[1100px] flex flex-col justify-center items-center p-6 mx-auto'>
                <div className='flex flex-col justify-evenly w-full'>
                    <h1 className='text-center text-4xl font-medium text-[var(--text-primary)]'>Explore different account types</h1>
                    <div className='flex flex-wrap w-full mt-10 gap-10 md:justify-normal justify-center'>
                        <motion.div whileHover={{borderColor:"#3b82f6"}} className='border border-[var(--border-color)] bg-[var(--bg-card)] rounded-xl md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5 shadow-sm transition-colors'>
                            <a className='flex flex-col'>
                                <div className='absolute h-10 top-5 -left-5 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full flex items-center justify-center text-xl'>👤</div>
                                <h1 className='text-xl font-medium mt-5 mx-6 text-[var(--text-primary)]'>Individual Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8] text-[var(--text-secondary)]'>Invest in stocks, derivatives, and mutual funds with full market access</p>
                            </a>
                        </motion.div>
                        <motion.div whileHover={{borderColor:"#3b82f6"}} className='border border-[var(--border-color)] bg-[var(--bg-card)] rounded-xl md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5 shadow-sm transition-colors'>
                            <a className='flex flex-col'>
                                <div className='absolute h-8 top-5 -left-5 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full flex items-center justify-center'>👨‍👩‍👧</div>
                                <h1 className='text-xl font-medium mt-5 mx-6 text-[var(--text-primary)]'>HUF Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8] text-[var(--text-secondary)]'>Perfect for Hindu Undivided Families to manage collective investments</p>
                            </a>
                        </motion.div>
                        <motion.div whileHover={{borderColor:"#3b82f6"}} className='border border-[var(--border-color)] bg-[var(--bg-card)] rounded-xl md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5 shadow-sm transition-colors'>
                            <a className='flex flex-col'>
                                <div className='absolute h-10 top-5 -left-5 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full flex items-center justify-center'>🌍</div>
                                <h1 className='text-xl font-medium mt-5 mx-6 text-[var(--text-primary)]'>NRI Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8] text-[var(--text-secondary)]'>Trade in Indian markets from anywhere in the world</p>
                            </a>
                        </motion.div>
                        <motion.div whileHover={{borderColor:"#3b82f6"}} className='border border-[var(--border-color)] bg-[var(--bg-card)] rounded-xl md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5 shadow-sm transition-colors'>
                            <a className='flex flex-col'>
                                <div className='absolute h-10 top-5 -left-5 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full flex items-center justify-center'>👶</div>
                                <h1 className='text-xl font-medium mt-5 mx-6 text-[var(--text-primary)]'>Minor Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8] text-[var(--text-secondary)]'>Start investing early with guardian oversight and safety controls</p>
                            </a>
                        </motion.div>
                        <motion.div whileHover={{borderColor:"#3b82f6"}} className='border border-[var(--border-color)] bg-[var(--bg-card)] rounded-xl md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5 shadow-sm transition-colors'>
                            <a className='flex flex-col'>
                                <div className='absolute h-10 top-5 -left-5 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full flex items-center justify-center'>🏢</div>
                                <h1 className='text-xl font-medium mt-5 mx-6 text-[var(--text-primary)]'>Corporate Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8] text-[var(--text-secondary)]'>Tailored solutions for companies, partnerships, and organizations</p>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export  default DiffAccounts;