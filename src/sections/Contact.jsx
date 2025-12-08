import Section from '../components/Section'

export default function Contact() {
    return (
        <Section id="contact">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Form */}
                    <div className="glass p-8 md:p-12 rounded-3xl">
                        <div className="text-left mb-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Build <span className="text-gradient-accent">Something Great</span></h2>
                            <p className="text-gray-400">Ready to start your project? Send us a message.</p>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <input type="text" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <input type="email" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea rows="4" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Tell us about your project..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-accent text-black font-bold py-4 rounded-lg hover:bg-white transition-all transform hover:scale-[1.02]">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Space for Black Hole */}
                    <div className="hidden md:flex flex-col justify-center items-center h-full min-h-[500px]">
                        {/* The Black Hole is rendered in the 3D canvas behind this, positioned to the right */}
                        <div className="text-center opacity-50 pointer-events-none">
                            <p className="text-sm tracking-[0.5em] text-accent uppercase">Event Horizon</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
