import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChatInterface } from '@/components/chat/chat-interface';
import { MessageSquare, FileText, MapPin, Gift, Calculator, CheckSquare, Sparkles } from 'lucide-react';

export default function HomePage() {
    const t = useTranslations();

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 animate-fade-in">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{t('app.name')}</h1>
                                <p className="text-xs text-gray-600">{t('app.tagline')}</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex gap-6">
                            <Link href="/services" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
                                {t('nav.services')}
                            </Link>
                            <Link href="/offices" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
                                {t('nav.offices')}
                            </Link>
                            <Link href="/schemes" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
                                {t('nav.schemes')}
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <MessageSquare className="w-4 h-4" />
                        AI-Powered Assistant
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                        {t('chat.title')}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Get instant answers about Pakistani government services, find offices, and complete your documentation with AI assistance.
                    </p>
                </div>

                {/* Chat Interface */}
                <div className="max-w-3xl mx-auto mb-16 animate-scale-in">
                    <ChatInterface />
                </div>

                {/* Features Grid */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        Everything You Need in One Place
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<FileText className="w-8 h-8 text-green-600" />}
                            title={t('nav.services')}
                            description="Browse 100+ government services with complete details, requirements, and fees"
                            href="/services"
                            delay="0ms"
                        />
                        <FeatureCard
                            icon={<MapPin className="w-8 h-8 text-green-600" />}
                            title={t('nav.offices')}
                            description="Find nearest government offices with interactive maps and directions"
                            href="/offices"
                            delay="100ms"
                        />
                        <FeatureCard
                            icon={<Gift className="w-8 h-8 text-green-600" />}
                            title={t('nav.schemes')}
                            description="Discover government schemes, benefits, and eligibility criteria"
                            href="/schemes"
                            delay="200ms"
                        />
                        <FeatureCard
                            icon={<Calculator className="w-8 h-8 text-green-600" />}
                            title={t('tools.calculator.title')}
                            description="Calculate total fees including urgency charges and additional costs"
                            href="/tools/calculator"
                            delay="300ms"
                        />
                        <FeatureCard
                            icon={<CheckSquare className="w-8 h-8 text-green-600" />}
                            title={t('tools.checklist.title')}
                            description="Generate printable checklists of required documents"
                            href="/tools/checklist"
                            delay="400ms"
                        />
                        <FeatureCard
                            icon={<MessageSquare className="w-8 h-8 text-green-600" />}
                            title="AI Chat Assistant"
                            description="Ask questions and get instant answers about any government service"
                            href="#chat"
                            delay="500ms"
                        />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <StatItem number="100+" label="Government Services" />
                            <StatItem number="50+" label="Office Locations" />
                            <StatItem number="10+" label="Active Schemes" />
                            <StatItem number="24/7" label="AI Support" />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-white font-bold text-lg mb-4">{t('app.name')}</h3>
                            <p className="text-sm text-gray-400">
                                Your complete guide to Pakistani government services
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Services</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/services" className="hover:text-white transition-colors">Browse Services</Link></li>
                                <li><Link href="/offices" className="hover:text-white transition-colors">Find Offices</Link></li>
                                <li><Link href="/schemes" className="hover:text-white transition-colors">Government Schemes</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Tools</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/tools/calculator" className="hover:text-white transition-colors">Fee Calculator</Link></li>
                                <li><Link href="/tools/checklist" className="hover:text-white transition-colors">Document Checklist</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Languages</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/en" className="hover:text-white transition-colors">English</Link></li>
                                <li><Link href="/ur" className="hover:text-white transition-colors">اردو</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>© 2025 SarkariSahulat - Empowering Pakistani Citizens</p>
                        <p className="text-gray-500 mt-2">Information platform - Not affiliated with government</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description, href, delay }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    delay: string;
}) {
    return (
        <Link
            href={href}
            className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 card-hover"
            style={{ animationDelay: delay }}
        >
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {title}
            </h3>
            <p className="text-sm text-gray-600">
                {description}
            </p>
        </Link>
    );
}

function StatItem({ number, label }: { number: string; label: string }) {
    return (
        <div className="animate-fade-in">
            <div className="text-3xl md:text-4xl font-bold mb-1">{number}</div>
            <div className="text-sm text-green-100">{label}</div>
        </div>
    );
}
