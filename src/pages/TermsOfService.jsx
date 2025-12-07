import Section from '../components/Section'

export default function TermsOfService() {
    return (
        <Section className="pt-32 pb-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>

                <div className="glass p-8 md:p-12 rounded-3xl space-y-6 text-gray-300">
                    <p className="text-lg">Last updated: December 7, 2025</p>

                    <h2 className="text-2xl font-bold text-white mt-8">1. Acceptance of Terms</h2>
                    <p>By accessing and using the Visibility Labs website, you accept and agree to be bound by the terms and provision of this agreement.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">2. Use License</h2>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Visibility Labs' website for personal, non-commercial transitory viewing only.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">3. Disclaimer</h2>
                    <p>The materials on Visibility Labs' website are provided on an 'as is' basis. Visibility Labs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">4. Limitations</h2>
                    <p>In no event shall Visibility Labs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Visibility Labs' website.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">5. Governing Law</h2>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of the State of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                </div>
            </div>
        </Section>
    )
}
