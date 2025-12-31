import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import ServiceGuru3D from '../components/ServiceGuru3D'
import ProcessFlow from '../components/ProcessFlow'
import jobManagementImg from '../assets/job_management.png'
import attendanceImg from '../assets/attendance.png'
import invoiceImg from '../assets/invoice.png'
import jobsheetImg from '../assets/jobsheet.png'
import locationImg from '../assets/location.png'
import reportsImg from '../assets/reports.png'
import serviceBusinessImg from '../assets/service_business.jpg'
import technicianAppImg from '../assets/technician_app.jpg'

export default function ServiceGuru() {
    const [activeTab, setActiveTab] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        source: '',
        location: ''
    })

    const features = [
        {
            category: "Management",
            items: [
                {
                    title: "Job Management",
                    description: "Offers Job Creation, Job Allocation and Job Scheduling in easy way to manage and upgrade your small service business.",
                    image: jobManagementImg
                },
                {
                    title: "Quotation and Invoice",
                    description: "Spend less time in invoicing with Quoting system to close deals faster with Service Guru Application quickly.",
                    image: invoiceImg
                },
                {
                    title: "Collection and Reports",
                    description: "Analyze your daily collections and reports are now a breeze to makes your service business automate.",
                    image: reportsImg
                }
            ]
        },
        {
            category: "Field Operations",
            items: [
                {
                    title: "App for Service Technician",
                    description: "Adorable solution for technician to access customer details to close the jobs as well field management. Service Guru quick and convenient.",
                    image: technicianAppImg
                },
                {
                    title: "Location tracking",
                    description: "One stop solution for searching field engineer on Google Map in real time location to boost the proficiency of technicians.",
                    image: locationImg
                },
                {
                    title: "Attendance and leave",
                    description: "Allows field engineers to mark attendance and apply leave from App in real-time with location and selfie.",
                    image: attendanceImg
                }
            ]
        },
        {
            category: "Client & Admin",
            items: [
                {
                    title: "Suitable for all Service Business",
                    description: "Save your time and money with Service Guru Lite to Simplify and Streamline day-to-day operations hassle free.",
                    image: serviceBusinessImg
                },
                {
                    title: "Job sheet on site",
                    description: "Enable to check Job history with technician details like photo, contact no and work details on client end.",
                    image: jobsheetImg
                }
            ]
        }
    ]

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form Submitted:", formData)
        alert("Thank you! We will contact you soon.")
    }

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setFormData({
                    ...formData,
                    location: `${position.coords.latitude}, ${position.coords.longitude}`
                })
            }, () => {
                alert("Unable to retrieve location.")
            })
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    return (
        <section className="relative w-full min-h-screen py-24 px-4 md:px-10 bg-white z-40">
            {/* Background Gradients - Subtle for Light Theme */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* 1. Intro Block */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
                    >
                        Meet <span className="text-blue-600">ServiceGuru</span>
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
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
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
                        className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We believe in understanding the essential needs of the service industry and provide best solution through <span className="text-blue-600 font-semibold">ServiceGuru</span> to keep the organization stay up-to-date anytime anywhere. The best quality of Service Guru is customization which makes it <span className="text-purple-600 font-semibold">"First Choice"</span> for any kind of organization either it is small, medium or large. Grow up your service business and work smarter to scale up in service industry.
                        </p>
                    </motion.div>
                </div>

                {/* 3. Hero 3D Product Render */}
                <div className="relative w-full h-[500px] mb-32">
                    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                        <ambientLight intensity={0.8} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />
                        <ServiceGuru3D />
                    </Canvas>
                </div>

                {/* 4. Process Flow Module */}
                <div className="mb-20">
                    <ProcessFlow />
                </div>

                {/* 5. Tabbed Feature List */}
                <div className="mb-32">
                    {/* Tab Headers */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {features.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${activeTab === index
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                                    }`}
                            >
                                {tab.category}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-24"
                            >
                                {features[activeTab].items.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                                    >
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                            <p className="text-gray-600 text-lg leading-relaxed">{feature.description.replace(/Service CRM/g, "Service Guru")}</p>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <div className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-2xl bg-white">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <img
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* 6. Contact Form Section */}
                <div id="contact" className="max-w-3xl mx-auto mb-32">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get Started with ServiceGuru</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Company Name *</label>
                                    <input
                                        type="text"
                                        name="company"
                                        required
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="Acme Inc."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">How did you hear about us?</label>
                                    <select
                                        name="source"
                                        value={formData.source}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="google">Google</option>
                                        <option value="social_media">Social Media</option>
                                        <option value="referral">Referral</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Location</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="City, Country"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleGetLocation}
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 rounded-xl transition-colors"
                                            title="Get Current Location"
                                        >
                                            📍
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] transition-all duration-300"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>

                {/* 6. Experience Statement */}
                <div className="text-center py-20 border-t border-gray-200">
                    <h3 className="text-3xl md:text-4xl font-light text-gray-900 leading-relaxed">
                        “ServiceGuru isn’t just software — it’s your entire service center, <br />
                        <span className="font-semibold text-blue-600">unified, intelligent, and beautifully simple.</span>”
                    </h3>
                </div>
            </div>
        </section>
    )
}
