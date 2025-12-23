import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Section from '../components/Section'

const projects = [
    {
        id: 1,
        title: "Saamagree",
        category: "E-Commerce Platform",
        description: "A comprehensive marketplace for construction materials, streamlining the supply chain with real-time inventory and logistics tracking.",
        url: "https://saamagree.in/",
        image: "https://placehold.co/1200x800/1e293b/60a5fa?text=Saamagree+Preview",
        color: "from-blue-600 to-accent"
    },
    {
        id: 2,
        title: "ServiceGuru",
        category: "SaaS Platform",
        description: "AI-driven service center management solution automating ticketing, engineer assignment, and lifecycle tracking.",
        url: "https://serviceguru.visibilitylabs.in/",
        image: "https://placehold.co/1200x800/1e293b/a855f7?text=ServiceGuru+Preview",
        color: "from-secondary to-purple-500"
    },
    {
        id: 3,
        title: "TechNova",
        category: "Corporate Website",
        description: "Modern corporate identity for a leading tech consultancy, featuring 3D visualizations and interactive case studies.",
        url: "#",
        image: "https://placehold.co/1200x800/1e293b/22c55e?text=TechNova+Preview",
        color: "from-emerald-500 to-teal-400"
    },
    {
        id: 4,
        title: "Your Story?",
        category: "Start Your Journey",
        description: "Ready to write your own success story? Let's build something extraordinary together.",
        url: "#contact",
        image: "https://placehold.co/1200x800/1e293b/f59e0b?text=Start+Project",
        color: "from-orange-500 to-red-500",
        isCTA: true
    }
]

export default function SuccessStories() {
    const [active, setActive] = useState(0)
    const [canAutoPlay, setCanAutoPlay] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const sectionRef = useRef()
    const contentRef = useRef()
    const scroll = useScroll()

    // 1.5s Delay before Auto-Play starts
    useEffect(() => {
        const timer = setTimeout(() => {
            setCanAutoPlay(true)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    // Auto-Play Logic (Active only if allowed and not hovered)
    useEffect(() => {
        if (!canAutoPlay || isHovered) return

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % projects.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [canAutoPlay, isHovered])

    // Scroll-driven logic
    useFrame(() => {
        if (!sectionRef.current || !contentRef.current || !scroll) return

        const el = sectionRef.current
        const content = contentRef.current

        // Get dimensions and positions
        const rect = el.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const totalHeight = el.clientHeight // Should be tall (e.g. 300vh)

        // Calculate scroll progress within the section
        // We are "in view" when rect.top <= 0 and rect.bottom >= viewportHeight
        // Actually, since the parent moves, rect.top changes.
        // When rect.top is 0, we are at the start.
        // When rect.top is -(totalHeight - viewportHeight), we are at the end.

        const scrollDist = -rect.top
        const maxScroll = totalHeight - viewportHeight

        if (scrollDist >= 0 && scrollDist <= maxScroll) {
            // We are inside the scroll zone
            // Pin the content
            content.style.transform = `translateY(${scrollDist}px)`

            // Calculate scroll progress
            const rawProgress = scrollDist / maxScroll

            // BUFFER LOGIC: 
            // First 15% of scroll = Wait (Slide 0)
            // Remaining 85% = Cycle through slides
            let effectiveProgress = 0
            if (rawProgress > 0.15) {
                effectiveProgress = (rawProgress - 0.15) / 0.85
            }

            // Only override auto-play if user is actively scrolling (effectiveProgress > 0)
            // But since we want "user scroll starts works", we map scroll to slides.
            // If we are in the buffer zone, we stick to 0 (or let auto-play work?)
            // Let's say: Scroll overrides auto-play.

            if (rawProgress > 0.15) {
                const slideIndex = Math.min(
                    Math.floor(effectiveProgress * projects.length),
                    projects.length - 1
                )
                if (active !== slideIndex) {
                    setActive(slideIndex)
                    // Disable auto-play once user takes control via scroll
                    setCanAutoPlay(false)
                }
            }

        } else if (scrollDist < 0) {
            // Before section
            content.style.transform = `translateY(0px)`
        } else {
            // After section
            content.style.transform = `translateY(${maxScroll}px)`
        }
    })

    return (
        // Make the section very tall to allow for scrolling "through" it
        <section ref={sectionRef} className="relative w-full" style={{ height: '300vh' }}>
            <div
                ref={contentRef}
                className="w-full h-screen flex items-center justify-center p-4 md:p-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center">

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
                                {/* Image Placeholder */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${projects[active].color} opacity-10`} />

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

                                {/* Placeholder Text for Image Area */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 text-4xl font-bold uppercase tracking-widest pointer-events-none text-center">
                                    {projects[active].title} <br />
                                    <span className="text-2xl opacity-50">{projects[active].isCTA ? "Join Us" : "Preview"}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    )
}
