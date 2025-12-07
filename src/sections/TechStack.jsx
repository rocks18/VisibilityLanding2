import Section from '../components/Section'

const technologies = [
    "React", "Next.js", "Three.js", "Node.js", "Python", "TensorFlow", "AWS", "Docker"
]

export default function TechStack() {
    return (
        <Section id="tech" className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Powered By <span className="text-accent">Modern Tech</span></h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {technologies.map((tech, index) => (
                    <div key={index} className="px-6 py-3 glass rounded-full text-lg font-medium hover:bg-white/20 transition-colors cursor-default">
                        {tech}
                    </div>
                ))}
            </div>
        </Section>
    )
}
