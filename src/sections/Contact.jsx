import { useState } from 'react'
import Section from '../components/Section'
import SuccessPopup from '../components/SuccessPopup'

export default function Contact() {
    const [showSuccess, setShowSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                source: "Contact Page"
            }

            const response = await fetch('https://sgbackend.visibilitylabs.in/api/inquiries/public', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                setShowSuccess(true)
                setFormData({ name: '', email: '', message: '' })
            } else {
                alert("Failed to send message. Please try again.")
            }
        } catch (error) {
            console.error('Error:', error)
            alert("Network error. Please try again.")
        }
    }

    return (
        <Section id="contact">
            <div className="max-w-3xl mx-auto w-full">
                <div className="glass p-8 md:p-12 rounded-3xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Build <span className="text-gradient-accent">Something Great</span></h2>
                        <p className="text-gray-400">Ready to start your project? Send us a message.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                placeholder="Tell us about your project..."
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-accent text-black font-bold py-4 rounded-lg hover:bg-white transition-all transform hover:scale-[1.02]">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Message Sent!"
                message="Thanks for reaching out. We'll get back to you as soon as possible."
            />
        </Section>
    )
}
