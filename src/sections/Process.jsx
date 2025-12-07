import Section from '../components/Section'

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "We dive deep into your goals, requirements, and user needs to build a solid foundation."
    },
    {
        number: "02",
        title: "Design & Prototype",
        description: "We create interactive prototypes and high-fidelity designs to visualize the end product."
    },
    {
        number: "03",
        title: "Development",
        description: "Our engineers build robust, scalable code using the latest technologies."
    },
    {
        number: "04",
        title: "Launch & Scale",
        description: "We deploy your product and help you scale it to reach millions of users."
    }
]

export default function Process() {
    return (
        <Section id="process">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">How We <span className="text-gradient-accent">Work</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    A transparent, agile process designed to deliver results.
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <div className="text-8xl font-bold text-white/5 absolute -top-10 -left-4 z-0">
                            {step.number}
                        </div>
                        <div className="glass p-8 rounded-2xl relative z-10 h-full hover:-translate-y-2 transition-transform duration-300 border-t-4 border-accent">
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <p className="text-gray-400">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}
