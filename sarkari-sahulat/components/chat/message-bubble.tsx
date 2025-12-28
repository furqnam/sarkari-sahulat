'use client';

import { useLocale } from 'next-intl';
import { User, Bot } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const locale = useLocale();
    const isUser = message.role === 'user';
    const isRTL = locale === 'ur';

    return (
        <div
            className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${isRTL ? 'text-right' : 'text-left'
                }`}
        >
            {/* Avatar */}
            <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-green-600' : 'bg-gray-200'
                    }`}
            >
                {isUser ? (
                    <User className="w-5 h-5 text-white" />
                ) : (
                    <Bot className="w-5 h-5 text-gray-600" />
                )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                    className={`rounded-2xl px-4 py-2 ${isUser
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString(locale === 'ur' ? 'ur-PK' : 'en-PK', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </div>
    );
}
