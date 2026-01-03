import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function CalendlyModal({ isOpen, onClose }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] relative z-10 overflow-hidden flex flex-col"
                    >
                        {/* Header with Close Button */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
                            <h3 className="text-lg font-bold text-gray-900">Schedule a Demo</h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Calendly Iframe */}
                        <div className="flex-1 w-full h-full bg-gray-50">
                            <iframe
                                src="https://calendly.com/visibilitylabs/candidate-discussion"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="Select a Date & Time - Calendly"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
