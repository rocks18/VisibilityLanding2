import Section from '../components/Section'

const services = [
    {
        title: "Web Development",
        description: "High-performance web applications using React, Next.js, and modern frameworks.",
        icon: "💻"
    },
    {
        title: "3D Experiences",
        description: "Interactive 3D elements and WebGL scenes that captivate your audience.",
        icon: "🧊"
    },
    {
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        icon: "📱"
    },
    {
        title: "AI Solutions",
        description: "Integration of AI and Machine Learning models to power intelligent features.",
        icon: "🤖"
    }
]

export default function Services() {
    return (
        <Section id="services">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-secondary">Expertise</span></h2>
                    <p className="text-gray-400 text-lg mb-8">
                        We don't just write code; we craft digital experiences. Our team specializes in the intersection of design and technology.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                            <p className="text-gray-400 text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
