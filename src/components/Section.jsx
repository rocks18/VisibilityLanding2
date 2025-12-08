import { motion } from 'framer-motion'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Section({ children, className = "", id = "" }) {
    const { isExploding } = useContext(ThemeContext)

    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className={`min-h-screen w-full flex items-center justify-center p-4 md:p-10 ${isExploding ? 'text-black' : 'text-white'} ${className}`}
        >
            <div className="max-w-7xl w-full mx-auto">
                {children}
            </div>
        </motion.section>
    )
}
