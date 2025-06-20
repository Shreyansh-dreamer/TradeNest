import { motion } from "framer-motion";

const DiffAccounts = () => {
    return (
        <div className='w-full flex justify-center text-[#424242] font-sans mt-20'>
            <div className='w-[1100px] flex flex-col justify-center items-center p-6 mx-auto'>
                <div className='flex flex-col justify-evenly w-full'>
                    <h1 className='text-center text-4xl font-medium'>Explore different account types</h1>
                    <div className='flex flex-wrap w-full mt-10 gap-10 md:justify-normal justify-center'>
                        <motion.div whileHover={{borderColor:"#378ed1"}} className='border-1 border-black/10 rounded-sm md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5'>
                            <a className='flex flex-col'>
                                <img src='https://zerodha.com/static/images/acop-individual.svg' className='absolute h-10 top-5 -left-5 bg-[#eff6ff] p-2 rounded-full' />
                                <h1 className='text-xl font-medium mt-5 mx-6'>Individual Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8]'>Invest in equity, mutual funds and derivatives</p>
                            </a>
                        </motion.div>
                        <motion.div whileHover={{borderColor:"#378ed1"}} className='border-1 border-black/10 rounded-sm md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5'>
                            <a className='flex flex-col'>
                                <img src='	https://zerodha.com/static/images/acop-huf.svg' className='absolute h-8 top-5 -left-5 bg-[#eff6ff] p-2 rounded-full' />
                                <h1 className='text-xl font-medium mt-5 mx-6'>Individual Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8]'>Invest in equity, mutual funds and derivatives</p>
                            </a>
                        </motion.div>
                        <motion.div whileHover={{borderColor:"#378ed1"}} className='border-1 border-black/10 rounded-sm md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5'>
                            <a className='flex flex-col'>
                                <img src='https://zerodha.com/static/images/acop-nri.svg' className='absolute h-10 top-5 -left-5 bg-[#eff6ff] p-2 rounded-full' />
                                <h1 className='text-xl font-medium mt-5 mx-6'>Individual Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8]'>Invest in equity, mutual funds and derivatives</p>
                            </a>
                        </motion.div>
                        <motion.div whileHover={{borderColor:"#378ed1"}} className='border-1 border-black/10 rounded-sm md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5'>
                            <a className='flex flex-col'>
                                <img src='https://zerodha.com/static/images/acop-minor.svg' className='absolute h-10 top-5 -left-5 bg-[#eff6ff] p-2 rounded-full' />
                                <h1 className='text-xl font-medium mt-5 mx-6'>Individual Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8]'>Invest in equity, mutual funds and derivatives</p>
                            </a>
                        </motion.div>
                        <motion.div whileHover={{borderColor:"#378ed1"}} className='border-1 border-black/10 rounded-sm md:w-[30%] cursor-pointer justify-evenly w-[100%] p-1 relative mb-5'>
                            <a className='flex flex-col'>
                                <img src='https://zerodha.com/static/images/acop-corporate.svg' className='absolute h-10 top-5 -left-5 bg-[#eff6ff] p-2 rounded-full' />
                                <h1 className='text-xl font-medium mt-5 mx-6'>Individual Account</h1>
                                <p className='mt-5 tracking-normal mt-3 mx-6 mb-5 text-[1rem] leading-[1.8]'>Invest in equity, mutual funds and derivatives</p>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export  default DiffAccounts;