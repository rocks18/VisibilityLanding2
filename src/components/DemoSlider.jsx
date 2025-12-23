import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const demos = [
    { id: 1, title: "Create Ticket", color: "bg-blue-500", content: "New Service Request" },
    { id: 2, title: "Assign Engineer", color: "bg-purple-500", content: "Technician Assigned" },
    { id: 3, title: "Live Tracking", color: "bg-green-500", content: "En Route - 5 mins" },
    { id: 4, title: "Completion", color: "bg-orange-500", content: "Job Done & Verified" },
]

export default function DemoSlider() {
    const [active, setActive] = useState(0)

    const nextSlide = () => setActive((prev) => (prev + 1) % demos.length)

    return (
        <div className="relative w-full max-w-sm mx-auto">
            {/* iPhone Frame */}
            <div className="relative z-10 bg-gray-900 rounded-[3rem] p-4 border-4 border-gray-800 shadow-2xl h-[600px] w-[300px] mx-auto overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20" />

                {/* Screen Content */}
                <div className="w-full h-full bg-gray-100 rounded-[2.5rem] overflow-hidden relative cursor-pointer" onClick={nextSlide}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`w-full h-full ${demos[active].color} flex flex-col items-center justify-center text-white p-6 text-center`}
                        >
                            <h3 className="text-2xl font-bold mb-2">{demos[active].title}</h3>
                            <p className="text-white/80">{demos[active].content}</p>
                            <div className="mt-8 text-sm opacity-50">Tap to continue</div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[650px] bg-blue-500/20 blur-3xl -z-10 rounded-full" />
        </div>
    )
}
