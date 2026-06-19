export default function PrivacyPolicy() {
    const sections = [
        {
            num: "01",
            title: "Collection of Personal Information",
            content: "We collect personal information from our members and customers to provide our products, services, and business opportunities.",
            items: [
                "Contact information (name, address, email, phone number)",
                "Payment information (credit card details, billing address)",
                "Business-related information (business name, tax ID, business address)",
                "Demographic information (age, gender, interests)",
            ],
        },
        {
            num: "02",
            title: "Use of Personal Information",
            content: "We use personal information for the following purposes:",
            items: [
                "Providing products and services: Order fulfillment and payment processing",
                "Business operations: Account management and customer support",
                "Marketing and promotions: Sending promotional offers and newsletters",
                "Compliance and legal obligations: Meeting legal requirements and resolving disputes",
                "Business development: Improving products and marketing strategies",
            ],
        },
        {
            num: "03",
            title: "Disclosure of Personal Information",
            content: "We may disclose personal information to service providers assisting with business operations, business partners for joint products/services, and legal authorities for compliance and investigations. We do not sell or rent your information to third parties for marketing without explicit consent.",
            items: [],
        },
        {
            num: "04",
            title: "Protection of Personal Information",
            content: "We employ technical and organizational measures including encryption, access controls, and regular security audits to protect your data from unauthorized access or disclosure.",
            items: [],
        },
        {
            num: "05",
            title: "Your Privacy Rights",
            content: "You have the following rights regarding your personal data:",
            items: [
                "Right to access and correct your information",
                "Right to delete your data",
                "Right to opt-out of marketing communications",
                "Right to object to data processing",
            ],
        },
        {
            num: "06",
            title: "Updates to Privacy Policy",
            content: "We may update this policy periodically. Material changes will be notified, and we will obtain consent where required by law.",
            items: [],
        },
    ];

    return (
        <div className="bg-[#FAF9FF] min-h-screen">
            {/* Hero */}
            <div className="bg-[#8B35B8] py-14 md:py-20 text-center px-4">
                <p className="text-[#D4A847] text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-heading italic mb-3">Privacy Policy</h1>
                <p className="text-white/60 text-sm max-w-xl mx-auto">
                    At Attri Industries, we are committed to protecting your privacy and safeguarding the personal information you entrust to us.
                </p>
            </div>

            <div className="container mx-auto px-4 py-10 max-w-3xl space-y-5">
                {sections.map((sec) => (
                    <div key={sec.num} className="bg-white rounded-2xl p-6 shadow-card border border-[#E5E7EB]">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#D4A847]/30 font-heading flex-shrink-0 leading-none mt-0.5">{sec.num}</span>
                            <div>
                                <h2 className="text-base font-bold text-[#1A1A1A] font-heading mb-2">{sec.title}</h2>
                                <p className="text-sm text-[#6B7280] leading-relaxed mb-3">{sec.content}</p>
                                {sec.items.length > 0 && (
                                    <ul className="space-y-1.5">
                                        {sec.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-[#6B7280]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A847] mt-1.5 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}