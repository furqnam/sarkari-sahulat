import { NextRequest, NextResponse } from 'next/server';
import { sendChatMessage, ChatMessage } from '@/lib/ai/claude-client';

export const runtime = 'edge'; // Use edge runtime for better performance

interface ChatRequest {
    messages: ChatMessage[];
    language?: 'en' | 'ur';
    context?: {
        serviceId?: string;
        serviceName?: string;
        categoryName?: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: ChatRequest = await request.json();

        // Validate request
        if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        // Validate message format
        for (const msg of body.messages) {
            if (!msg.role || !msg.content) {
                return NextResponse.json(
                    { error: 'Each message must have role and content' },
                    { status: 400 }
                );
            }
            if (msg.role !== 'user' && msg.role !== 'assistant') {
                return NextResponse.json(
                    { error: 'Message role must be "user" or "assistant"' },
                    { status: 400 }
                );
            }
        }

        // Limit conversation history to last 10 messages to control costs
        const recentMessages = body.messages.slice(-10);

        // Get AI response
        const response = await sendChatMessage({
            messages: recentMessages,
            language: body.language || 'en',
            context: body.context,
        });

        // Analyze response for quick actions
        const quickActions = extractQuickActions(response, body.language || 'en');

        return NextResponse.json({
            message: response,
            quickActions,
        });
    } catch (error) {
        console.error('Chat API error:', error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to process chat request',
                message: 'I apologize, but I encountered an error. Please try again.'
            },
            { status: 500 }
        );
    }
}

/**
 * Extract quick action suggestions from AI response
 */
function extractQuickActions(response: string, language: 'en' | 'ur'): QuickAction[] {
    const actions: QuickAction[] = [];
    const lowerResponse = response.toLowerCase();

    // Detect if response mentions finding offices
    if (
        lowerResponse.includes('nearest office') ||
        lowerResponse.includes('nadra office') ||
        lowerResponse.includes('passport office') ||
        lowerResponse.includes('قریبی دفتر') ||
        lowerResponse.includes('نادرا دفتر')
    ) {
        actions.push({
            type: 'find_office',
            label: language === 'ur' ? 'قریبی دفاتر تلاش کریں' : 'Find Nearest Offices',
            data: {},
        });
    }

    // Detect if response mentions fees
    if (
        lowerResponse.includes('fee') ||
        lowerResponse.includes('cost') ||
        lowerResponse.includes('pkr') ||
        lowerResponse.includes('rupees') ||
        lowerResponse.includes('فیس') ||
        lowerResponse.includes('روپے')
    ) {
        actions.push({
            type: 'calculate_fee',
            label: language === 'ur' ? 'فیس کا حساب لگائیں' : 'Calculate Fees',
            data: {},
        });
    }

    // Detect if response mentions documents/requirements
    if (
        lowerResponse.includes('document') ||
        lowerResponse.includes('requirement') ||
        lowerResponse.includes('need') ||
        lowerResponse.includes('دستاویز') ||
        lowerResponse.includes('ضرورت')
    ) {
        actions.push({
            type: 'view_checklist',
            label: language === 'ur' ? 'دستاویزات کی فہرست دیکھیں' : 'View Document Checklist',
            data: {},
        });
    }

    return actions;
}

interface QuickAction {
    type: 'find_office' | 'calculate_fee' | 'view_checklist' | 'view_service';
    label: string;
    data: Record<string, any>;
}
