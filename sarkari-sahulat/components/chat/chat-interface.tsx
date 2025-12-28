'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, Loader2 } from 'lucide-react';
import { MessageBubble } from './message-bubble';
import { QuickActions } from './quick-actions';
import { TypingIndicator } from './typing-indicator';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    quickActions?: QuickAction[];
}

interface QuickAction {
    type: string;
    label: string;
    data: Record<string, any>;
}

export function ChatInterface() {
    const t = useTranslations();
    const locale = useLocale();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: locale === 'ur'
                ? 'السلام علیکم! میں آپ کی سرکاری خدمات کے بارے میں کیسے مدد کر سکتا ہوں؟'
                : 'Hello! How can I help you with government services today?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
        }
    }, [input]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content,
                    })),
                    language: locale,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.message,
                timestamp: new Date(),
                quickActions: data.quickActions,
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: locale === 'ur'
                    ? 'معذرت، کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔'
                    : 'Sorry, something went wrong. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleExampleClick = (example: string) => {
        setInput(example);
        inputRef.current?.focus();
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
                <h3 className="font-semibold text-lg">{t('chat.title')}</h3>
                <p className="text-sm text-green-100">
                    {locale === 'ur' ? 'AI سے چلنے والا اسسٹنٹ' : 'AI-Powered Assistant'}
                </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 1 && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">{t('chat.examples.title')}</p>
                        <div className="space-y-2">
                            <button
                                onClick={() => handleExampleClick(t('chat.examples.passport'))}
                                className="block w-full text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                            >
                                💼 {t('chat.examples.passport')}
                            </button>
                            <button
                                onClick={() => handleExampleClick(t('chat.examples.cnic'))}
                                className="block w-full text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                            >
                                🆔 {t('chat.examples.cnic')}
                            </button>
                            <button
                                onClick={() => handleExampleClick(t('chat.examples.office'))}
                                className="block w-full text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                            >
                                📍 {t('chat.examples.office')}
                            </button>
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div key={message.id}>
                        <MessageBubble message={message} />
                        {message.quickActions && message.quickActions.length > 0 && (
                            <QuickActions actions={message.quickActions} />
                        )}
                    </div>
                ))}

                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
                <div className="flex gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('chat.placeholder')}
                        className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 max-h-32"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {locale === 'ur'
                        ? 'Enter دبائیں بھیجنے کے لیے'
                        : 'Press Enter to send'}
                </p>
            </div>
        </div>
    );
}
