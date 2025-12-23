import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import ServiceGuru3D from '../components/ServiceGuru3D'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import ServiceGuru3D from '../components/ServiceGuru3D'



export default function ServiceGuru() {
    const features = [
        {
            title: "Job Management",
            description: "Offers Job Creation, Job Allocation and Job Scheduling in easy way to manage and upgrade your small service business.",
            image: "https://placehold.co/800x500/1e293b/60a5fa?text=Job+Management+Screenshot"
        },
        {
            title: "Suitable for all Service Business",
            description: "Save your time and money with Service CRM Lite to Simplify and Streamline day-to-day operations hassle free.",
            image: "https://placehold.co/800x500/1e293b/a855f7?text=Service+Business+Screenshot"
        },
        {
            title: "Quotation and Invoice",
            description: "Spend less time in invoicing with Quoting system to close deals faster with Service CRM Application quickly.",
            image: "https://placehold.co/800x500/1e293b/22c55e?text=Quotation+Invoice+Screenshot"
        },
        {
            title: "App for Service Technician",
            description: "Adorable solution for technician to access customer details to close the jobs as well field management. Service CRM quick and convenient.",
            image: "https://placehold.co/800x500/1e293b/f59e0b?text=Technician+App+Screenshot"
        },
        {
            title: "Location tracking",
            description: "One stop solution for searching field engineer on Google Map in real time location to boost the proficiency of technicians.",
            image: "https://placehold.co/800x500/1e293b/ef4444?text=Location+Tracking+Screenshot"
        },
        {
            title: "Job sheet on site",
            description: "Enable to check Job history with technician details like photo, contact no and work details on client end.",
            image: "https://placehold.co/800x500/1e293b/ec4899?text=Job+Sheet+Screenshot"
        },
        {
            title: "Attendance and leave",
            description: "Allows field engineers to mark attendance and apply leave from App in real-time with location and selfie.",
            image: "https://placehold.co/800x500/1e293b/8b5cf6?text=Attendance+Leave+Screenshot"
        },
        {
            title: "Collection and Reports",
            description: "Analyze your daily collections and reports are now a breeze to makes your service business automate.",
            image: "https://placehold.co/800x500/1e293b/14b8a6?text=Collection+Reports+Screenshot"
        }
    ]

    return (
        <section className="relative w-full min-h-screen py-24 px-4 md:px-10 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* 1. Intro Block */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 mb-6"
                    >
                        Meet ServiceGuru
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-8"
                    >
                        <a
                            href="https://serviceguru.visibilitylabs.in/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                        >
                            Login to ServiceGuru
                        </a>
                    </motion.div>
                </div>

                {/* 2. Why Choose Us Section */}
                <div className="mb-32 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass p-10 rounded-3xl border border-white/10"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose Us?</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            We believe in understanding the essential needs of the service industry and provide best solution through <span className="text-blue-400 font-semibold">Service CRM Software lite</span> to keep the organization stay up-to-date anytime anywhere. The best quality of Service CRM is customization which makes it <span className="text-purple-400 font-semibold">"First Choice"</span> for any kind of organization either it is small, medium or large. Grow up your service business and work smarter to scale up in service industry.
                        </p>
                    </motion.div>
                </div>

                {/* 3. Hero 3D Product Render */}
                <div className="relative w-full h-[500px] mb-32">
                    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#blue" />
                        <ServiceGuru3D />
                    </Canvas>
                </div>

                {/* 4. Detailed Feature List (Alternating Layout) */}
                <div className="space-y-32 mb-32">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                            </div>

                            {/* Image/Screenshot Placeholder */}
                            <div className="flex-1 w-full">
                                <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900/50 backdrop-blur-sm">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Screenshot Placeholder
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 5. Experience Statement */}
                <div className="text-center py-20 border-t border-white/10">
                    <h3 className="text-3xl md:text-4xl font-light text-white leading-relaxed">
                        “ServiceGuru isn’t just software — it’s your entire service center, <br />
                        <span className="font-semibold text-blue-300">unified, intelligent, and beautifully simple.</span>”
                    </h3>
                </div>
            </div>
        </section>
    )
}
