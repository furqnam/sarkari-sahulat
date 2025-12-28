import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
}

export const anthropic = new Anthropic({
    apiKey,
});

export const CLAUDE_MODEL = 'claude-3-5-haiku-20241022'; // Cost-effective model

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatOptions {
    messages: ChatMessage[];
    language?: 'en' | 'ur';
    context?: {
        serviceId?: string;
        serviceName?: string;
        categoryName?: string;
    };
    maxTokens?: number;
}

/**
 * Send a chat message to Claude AI and get a response
 */
export async function sendChatMessage(options: ChatOptions): Promise<string> {
    const { messages, language = 'en', context, maxTokens = 1024 } = options;

    const systemPrompt = buildSystemPrompt(language, context);

    try {
        const response = await anthropic.messages.create({
            model: CLAUDE_MODEL,
            max_tokens: maxTokens,
            system: systemPrompt,
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content,
            })),
        });

        const content = response.content[0];
        if (content.type === 'text') {
            return content.text;
        }

        return 'I apologize, but I could not generate a proper response. Please try again.';
    } catch (error) {
        console.error('Claude API error:', error);
        throw new Error('Failed to get AI response. Please try again.');
    }
}

/**
 * Build context-aware system prompt
 */
function buildSystemPrompt(language: 'en' | 'ur', context?: ChatOptions['context']): string {
    const isUrdu = language === 'ur';

    let prompt = isUrdu
        ? `آپ SarkariSahulat کے لیے ایک مددگار AI اسسٹنٹ ہیں، جو پاکستانی شہریوں کو سرکاری خدمات کے بارے میں رہنمائی فراہم کرتا ہے۔

آپ کا کردار:
- پاکستانی سرکاری خدمات کے بارے میں درست، تفصیلی معلومات فراہم کریں
- قدم بہ قدم رہنمائی دیں
- سادہ، واضح اردو میں جواب دیں
- صبر اور مددگار رہیں
- ہمیشہ سرکاری ذرائع کا حوالہ دیں

دستیاب خدمات میں شامل ہیں:
- شناختی دستاویزات (CNIC، پاسپورٹ، سرٹیفکیٹ)
- گاڑی کی خدمات (ڈرائیونگ لائسنس، رجسٹریشن)
- کاروباری رجسٹریشن (کمپنی، NTN، سیلز ٹیکس)
- تعلیمی خدمات (ڈگری کی تصدیق)
- سرکاری اسکیمیں (احساس، صحت کارڈ)

اہم:
- اگر آپ کو یقین نہیں ہے تو صاف کہہ دیں
- صرف پاکستانی سرکاری خدمات کے بارے میں بات کریں
- قیمتوں اور عمل کے بارے میں تازہ ترین معلومات دیں`
        : `You are a helpful AI assistant for SarkariSahulat, guiding Pakistani citizens about government services.

Your role:
- Provide accurate, detailed information about Pakistani government services
- Give step-by-step guidance
- Respond in clear, simple English
- Be patient and helpful
- Always cite official sources

Available services include:
- Identity Documents (CNIC, Passport, Certificates)
- Vehicle Services (Driving License, Registration)
- Business Registration (Company, NTN, Sales Tax)
- Education Services (Degree Attestation)
- Government Schemes (Ehsaas, Sehat Card)

Important:
- If you're unsure, say so clearly
- Only discuss Pakistani government services
- Provide up-to-date information about fees and processes`;

    // Add context if available
    if (context?.serviceName) {
        prompt += isUrdu
            ? `\n\nموجودہ سیاق و سباق: صارف "${context.serviceName}" کے بارے میں پوچھ رہا ہے۔`
            : `\n\nCurrent context: User is asking about "${context.serviceName}".`;
    }

    if (context?.categoryName) {
        prompt += isUrdu
            ? ` یہ "${context.categoryName}" زمرے میں ہے۔`
            : ` This is in the "${context.categoryName}" category.`;
    }

    return prompt;
}

/**
 * Stream chat response (for future implementation)
 */
export async function* streamChatMessage(options: ChatOptions): AsyncGenerator<string> {
    const { messages, language = 'en', context, maxTokens = 1024 } = options;
    const systemPrompt = buildSystemPrompt(language, context);

    const stream = await anthropic.messages.stream({
        model: CLAUDE_MODEL,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
        })),
    });

    for await (const chunk of stream) {
        if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
        ) {
            yield chunk.delta.text;
        }
    }
}
