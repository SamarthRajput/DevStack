"use client"
import Link from "next/link"
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";
import SmallNav from "./ReTractableNav";

export default function Navbar(){
    return (
     <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease:"easeOut", duration: 0.5 }}
        className="border-b bg-black z-50 relative bg-opacity-50"
    >
        <div className="flex items-center justify-between p-5 lg:container">
            <div className="flex items-center gap-5 ml-[60px]">
                <Link href="/" className="text-xl font-bold">Sam</Link>

                <div className="sm:flex hidden items-center gap-5 ml-16">
                    <Link href="/#aboutme" className="text-sm hover:text-gray-400 cursor-pointer">Skills</Link>
                    <Link href="/projects" className="text-sm hover:text-gray-400 cursor-pointer">Projects</Link>
                    <Link href="/#experience" className="text-sm hover:text-gray-400 cursor-pointer">Experience</Link>
                    <Link href="/#contactme" className="text-sm hover:text-gray-400 cursor-pointer">Contact</Link>
                </div>
            </div>

            <div className="sm:flex hidden items-center sm:gap-5 gap-3">
                <Link href={"https://www.linkedin.com/in/samarthrajput/"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin className="text-2xl" />
                </Link>

                <Link   href={"https://github.com/SamarthRajput"} 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub className="text-2xl" />
                </Link>

                <Link href={"https://x.com/Samarth__24"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTwitter className="text-2xl"/>
                </Link>

            </div>
            <SmallNav />
        </div>

    </motion.div>
    )
}