import { motion } from 'framer-motion'

export default function Section({ children, className = "", id = "" }) {
    return (
        <motion.section
            id={id}
            className={`min-h-screen w-full flex items-center justify-center p-4 md:p-10 ${className}`}
        >
            <div className="max-w-7xl w-full mx-auto">
                {children}
            </div>
        </motion.section>
    )
}
