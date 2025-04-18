import Link from "next/link";

export default function Vision() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent">
                    Empowering Dreams, Enriching Lives
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Our vision is to be a catalyst for positive change, empowering people to create lives of abundance.
                </p>
                <div className="h-1 w-24 bg-blue-600 mx-auto mb-12"></div>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
                {/* Financial Freedom */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            <span className="bg-blue-100 px-2">Financial Freedom</span> for All
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We provide innovative pathways to break free from traditional employment limitations, 
                            offering tools and support to build successful, self-sustaining businesses.
                        </p>
                    </div>
                    {/* <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                        <img src="/path-to-illustration.svg" alt="Freedom" className="w-full h-64 object-contain" />
                    </div> */}
                </div>

                {/* Community Section */}
                <div className="bg-gray-50 p-12 rounded-3xl text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Collaborative Success</h3>
                        <p className="text-gray-600 mb-6">
                            We foster a culture where every member thrives through mutual support, creating ripples 
                            of positive change across our global network.
                        </p>
                    </div>
                </div>

                {/* Product Excellence */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Innovations</h3>
                        <p className="text-gray-600">
                            Cutting-edge wellness solutions and lifestyle products designed to enhance daily living.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Ethical Foundation</h3>
                        <p className="text-gray-600">
                            Commitment to transparency and integrity in every business decision and interaction.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Reach</h3>
                        <p className="text-gray-600">
                            Local community impact through entrepreneurship, creating worldwide positive change.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center py-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Transformative Journey</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                        Discover opportunities for financial independence, personal growth, and community impact.
                    </p>
                    <Link href="/" className="bg-gradient-to-r from-green-400 to-green-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
                        Start Your Journey
                    </Link>
                </div>
            </div>
        </div>
    )
}