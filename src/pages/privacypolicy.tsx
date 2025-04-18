export default function PrivacyPolicy() {
    return(
        <div className="container mx-auto px-4 py-8 max-w-4xl mt-[100px] ">

            <div className="attriheading">Privacy Policy</div>
            <p className="text-gray-600 mb-8">
                At Attri Industries, we are committed to protecting your privacy and safeguarding the personal information you entrust to us.
            </p>

            <div className="space-y-8">
                {/* Section 1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Collection of Personal Information</h2>
                    <p className="text-gray-600 mb-4">
                        We collect personal information from our members and customers to provide our products, services, and business opportunities. This information may include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Contact information (name, address, email, phone number)</li>
                        <li>Payment information (credit card details, billing address)</li>
                        <li>Business-related information (business name, tax ID, business address)</li>
                        <li>Demographic information (age, gender, interests)</li>
                    </ul>
                </div>

                {/* Section 2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Use of Personal Information</h2>
                    <p className="text-gray-600 mb-4">We use personal information for the following purposes:</p>
                    <div className="grid gap-3 text-gray-600">
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Providing products and services: Order fulfillment and payment processing</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Business operations: Account management and customer support</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Marketing and promotions: Sending promotional offers and newsletters</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Compliance and legal obligations: Meeting legal requirements and resolving disputes</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Business development: Improving products and marketing strategies</span>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Disclosure of Personal Information</h2>
                    <p className="text-gray-600 mb-4">We may disclose personal information to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                        <li>Service providers assisting with business operations</li>
                        <li>Business partners for joint products/services</li>
                        <li>Legal authorities for compliance and investigations</li>
                    </ul>
                    <p className="text-gray-600">
                        We do not sell or rent your information to third parties for marketing without explicit consent.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Protection of Personal Information</h2>
                    <p className="text-gray-600">
                        We employ technical and organizational measures including encryption, access controls, 
                        and regular security audits to protect your data from unauthorized access or disclosure.
                    </p>
                </div>

                {/* Section 5 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Your Privacy Rights</h2>
                    <div className="grid gap-3 text-gray-600">
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Right to access and correct your information</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Right to delete your data</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Right to opt-out of marketing communications</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-medium mr-2">•</span>
                            <span>Right to object to data processing</span>
                        </div>
                    </div>
                </div>

                {/* Section 6 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Updates to Privacy Policy</h2>
                    <p className="text-gray-600">
                        We may update this policy periodically. Material changes will be notified, 
                        and we will obtain consent where required by law.
                    </p>
                </div>

                {/* Section 7 */}
                {/* <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
                    <div className="space-y-2 text-gray-600">
                        <p className="font-semibold">Attri Industries</p>
                        <p>123 Business Street</p>
                        <p>Mumbai, Maharashtra 400001</p>
                        <p>Phone: +91 22 1234 5678</p>
                        <p>Email: <a href="mailto:info@attri.com" className="text-blue-600 hover:text-blue-800">info@attri.com</a></p>
                        <p>Website: <a href="https://attri.com" className="text-blue-600 hover:text-blue-800">www.attri.com</a></p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}