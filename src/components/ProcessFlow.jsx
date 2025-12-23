import { motion } from 'framer-motion'

export default function ProcessFlow() {
    const steps = [
        { id: 1, label: "Client calls" },
        { id: 2, label: "Job created" },
        { id: 3, label: "Scheduling" },
        { id: 4, label: "Complete job" },
        { id: 5, label: "Invoice" },
        { id: 6, label: "Payment" },
        { id: 7, label: "Reconciliation" }
    ]

    const handleScroll = (e) => {
        e.preventDefault()
        const element = document.getElementById('contact')
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            })
        } else {
            window.location.href = '#contact'
        }
    }

    return (
        <div className="w-full py-12 px-4">
            {/* Call to Action Button */}
            <div className="mb-16">
                <button
                    onClick={handleScroll}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
                >
                    <span className="text-xl">📞</span>
                    Get a Call Back
                </button>
            </div>

            {/* Process Steps */}
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 hidden md:block" />

                <div className="grid grid-cols-2 md:grid-cols-7 gap-8 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center gap-4 relative z-10"
                        >
                            <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg shadow-lg">
                                {step.id}
                            </div>
                            <span className="text-gray-400 text-sm md:text-base font-medium text-center">
                                {step.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
