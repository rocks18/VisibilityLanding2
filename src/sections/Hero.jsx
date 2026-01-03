import Section from '../components/Section'

export default function Hero() {
    return (
        <Section id="home" className="pt-20">
            <div className="max-w-4xl px-4 md:px-0">
                <h1 className="text-4xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
                    We Build The <br />
                    <span className="text-gradient-accent">Digital Future</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                    Visibility Labs creates cutting-edge software solutions for visionary companies.
                    Web, Mobile, and immersive 3D Experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#contact" className="px-8 py-4 bg-accent text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(0,243,255,0.5)] text-center">
                        Start Project
                    </a>
                    <a href="#services" className="px-8 py-4 glass rounded-full hover:bg-white/10 transition-all text-center">
                        Explore Services
                    </a>
                </div>
            </div>
        </Section>
    )
}
