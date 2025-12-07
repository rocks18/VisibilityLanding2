import Section from '../components/Section'

export default function Clients() {
    return (
        <Section id="clients">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted By <span className="text-accent">Innovators</span></h2>
                <p className="text-gray-400">Powering the next generation of tech companies.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Client Logos (Placeholders with text for now) */}
                {["NEXUS", "VORTEX", "QUANTUM", "CYBERDYNE"].map((client, index) => (
                    <div key={index} className="glass p-8 rounded-xl flex items-center justify-center hover:border-accent/50 transition-colors group cursor-pointer">
                        <span className="text-xl font-bold text-gray-500 group-hover:text-white transition-colors">{client}</span>
                    </div>
                ))}
            </div>
        </Section>
    )
}
