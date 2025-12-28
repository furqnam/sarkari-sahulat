import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Noto_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import { notFound } from 'next/navigation';

const notoSans = Noto_Sans({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const notoNastaliq = Noto_Nastaliq_Urdu({
    variable: "--font-urdu",
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "SarkariSahulat - Your Complete Guide to Pakistani Government Services",
    description: "Access information about all Pakistani government services, find offices, calculate fees, and get AI-powered guidance in English and Urdu.",
    keywords: ["Pakistan", "government services", "NADRA", "passport", "CNIC", "سرکاری سہولت"],
};

const locales = ['en', 'ur'];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!locales.includes(locale)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    const isRTL = locale === 'ur';

    return (
        <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
            <body
                className={`${notoSans.variable} ${notoNastaliq.variable} ${isRTL ? 'font-urdu' : 'font-sans'
                    } antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
