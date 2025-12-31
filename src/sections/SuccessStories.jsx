import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Section from '../components/Section'
import saamagreeImg from '../assets/saamagree.png'
import serviceguruImg from '../assets/serviceguru.png'
import uniyalImg from '../assets/uniyal.png'
import visibilityImg from '../assets/visibilitylabs.png'

const projects = [
    {
        id: 1,
        title: "Saamagree",
        category: "E-Commerce Platform",
        description: "A comprehensive marketplace for construction materials, streamlining the supply chain with real-time inventory and logistics tracking.",
        url: "https://saamagree.in/",
        image: saamagreeImg,
        color: "from-blue-600 to-accent"
    },
    {
        id: 2,
        title: "ServiceGuru",
        category: "SaaS Platform",
        description: "AI-driven service center management solution automating ticketing, engineer assignment, and lifecycle tracking.",
        url: "https://serviceguru.visibilitylabs.in/login",
        image: serviceguruImg,
        color: "from-secondary to-purple-500"
    },
    {
        id: 3,
        title: "Uniyal Transport",
        category: "Logistics & Transport",
        description: "A premier logistics partner delivering reliable transportation solutions with optimized network management and real-time fleet tracking across the nation.",
        url: "https://www.uniyaltransport.com/",
        image: uniyalImg,
        color: "from-orange-500 to-amber-600"
    },
    {
        id: 4,
        title: "Your Story?",
        category: "Start Your Journey",
        description: "Ready to write your own success story? Let's build something extraordinary together.",
        url: "#contact",
        image: visibilityImg,
        color: "from-blue-500 to-cyan-400",
        isCTA: true
    }
]

export default function SuccessStories() {
    const [active, setActive] = useState(0)
    const [canAutoPlay, setCanAutoPlay] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef(null)

    // Use Framer Motion's useScroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // 1.5s Delay before Auto-Play starts
    useEffect(() => {
        const timer = setTimeout(() => {
            setCanAutoPlay(true)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    // Auto-Play Logic
    useEffect(() => {
        if (!canAutoPlay || isHovered) return

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % projects.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [canAutoPlay, isHovered])

    // Scroll Logic to change slides
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Map scroll progress (0 to 1) to slides
            const slideIndex = Math.min(
                Math.floor(latest * projects.length),
                projects.length - 1
            )

            if (active !== slideIndex) {
                setActive(slideIndex)
                setCanAutoPlay(false)
            }
        })
        return () => unsubscribe()
    }, [scrollYProgress, active])

    return (
        <section ref={containerRef} className="relative w-full h-[300vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden py-24 px-4 md:px-10">
                <div
                    className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Left Side: Project List */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">Success <span className="text-accent">Stories</span></h2>
                            <p className="text-gray-400 mb-8">Scroll to explore our impact.</p>
                        </motion.div>

                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    onClick={() => {
                                        setActive(index)
                                        setCanAutoPlay(false)
                                        // Optional: Scroll to the corresponding section of the sticky container
                                        // This is complex with sticky scrolling, so we just set active for now
                                    }}
                                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${active === index
                                        ? 'bg-white/10 border-accent/50 shadow-lg shadow-accent/10'
                                        : 'bg-transparent border-transparent hover:bg-white/5'
                                        }`}
                                >
                                    <h3 className={`text-xl font-bold ${active === index ? 'text-white' : 'text-gray-400'}`}>
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">{project.category}</p>

                                    {/* Progress Bar for Active Item */}
                                    {active === index && (
                                        <motion.div
                                            className="h-1 bg-accent mt-2 rounded-full"
                                            layoutId="activeProgress"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Preview Carousel */}
                    <div className="w-full md:w-2/3 relative h-[400px] md:h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-dark group"
                            >
                                {/* Image Background */}
                                <div className="absolute inset-0">
                                    <img
                                        src={projects[active].image}
                                        alt={projects[active].title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-dark/60 group-hover:bg-dark/40 transition-colors duration-500" />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-dark via-dark/50 to-transparent">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-3xl font-bold text-white mb-2">{projects[active].title}</h3>
                                        <p className="text-gray-300 mb-6 max-w-lg">{projects[active].description}</p>
                                        <a
                                            href={projects[active].url}
                                            target={projects[active].isCTA ? "_self" : "_blank"}
                                            rel={projects[active].isCTA ? "" : "noopener noreferrer"}
                                            className={`inline-flex items-center gap-2 font-semibold transition-colors ${projects[active].isCTA
                                                ? "px-6 py-3 bg-accent text-dark rounded-full hover:bg-white hover:text-dark"
                                                : "text-accent hover:text-white"
                                                }`}
                                        >
                                            {projects[active].isCTA ? "Start Your Project" : "Visit Website"}
                                            {!projects[active].isCTA && <span>→</span>}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
