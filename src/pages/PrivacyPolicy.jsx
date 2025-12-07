import Section from '../components/Section'

export default function PrivacyPolicy() {
    return (
        <Section className="pt-32 pb-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>

                <div className="glass p-8 md:p-12 rounded-3xl space-y-6 text-gray-300">
                    <p className="text-lg">Last updated: December 7, 2025</p>

                    <h2 className="text-2xl font-bold text-white mt-8">1. Introduction</h2>
                    <p>Welcome to Visibility Labs. We respect your privacy and are committed to protecting your personal data.</p>

                    <h2 className="text-2xl font-bold text-white mt-8">2. Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data</strong> includes email address and telephone number.</li>
                        <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                    </ul>

                    <h2 class="text-2xl font-bold text-white mt-8">3. Contact Us</h2>
                    <p>If you have any questions about this privacy policy, please contact us at: privacy@visibilitylabs.com</p>
                </div>
            </div>
        </Section>
    )
}
