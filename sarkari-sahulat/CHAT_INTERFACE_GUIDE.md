# AI Chat Interface - Complete Guide

## Overview

The AI Chat Interface is now fully implemented with Claude AI integration, providing intelligent, context-aware responses about Pakistani government services in both English and Urdu.

## Features Implemented

### 1. **Claude AI Integration** ✅
- Uses Claude 3.5 Haiku model (cost-effective)
- Context-aware system prompts
- Bilingual support (English/Urdu)
- Conversation history management (last 10 messages)

### 2. **Chat UI Components** ✅
- **ChatInterface**: Main chat container with message history
- **MessageBubble**: User/assistant message display with timestamps
- **QuickActions**: Actionable buttons based on AI response
- **TypingIndicator**: Animated loading indicator

### 3. **Smart Features** ✅
- Auto-scroll to latest message
- Auto-resizing text input
- Example questions for first-time users
- Quick action detection (find offices, calculate fees, view checklists)
- RTL support for Urdu
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

### 4. **API Route** ✅
- Edge runtime for low latency
- Request validation
- Error handling
- Quick action extraction from responses

## Setup Instructions

### 1. Get Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-...`)

### 2. Add to Environment Variables

Open your `.env.local` file and add:

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

**Important**: Never commit this file to git. It's already in `.gitignore`.

### 3. Restart Development Server

If the server is running, restart it to load the new environment variable:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### 4. Test the Chat

1. Visit http://localhost:3000/en
2. You should see the chat interface on the homepage
3. Try example questions:
   - "How do I renew my passport?"
   - "What documents do I need for CNIC?"
   - "Where is the nearest NADRA office?"

## How It Works

### Message Flow

```
User types message
    ↓
ChatInterface component
    ↓
POST /api/chat
    ↓
Claude AI (with context)
    ↓
Response + Quick Actions
    ↓
Display in chat
```

### Context Awareness

The AI is aware of:
- User's language (English/Urdu)
- Available services in database
- Service categories
- Common processes and fees
- Office locations

### Quick Actions

The system automatically detects when to show action buttons:

- **"Find Offices"** - When AI mentions office locations
- **"Calculate Fees"** - When AI discusses costs
- **"View Checklist"** - When AI mentions documents/requirements

## Customization

### Changing AI Model

Edit `lib/ai/claude-client.ts`:

```typescript
export const CLAUDE_MODEL = 'claude-3-5-sonnet-20241022'; // More capable but expensive
// or
export const CLAUDE_MODEL = 'claude-3-5-haiku-20241022'; // Faster and cheaper (default)
```

### Adjusting System Prompt

Edit the `buildSystemPrompt` function in `lib/ai/claude-client.ts` to:
- Add more context about services
- Change the AI's personality
- Add specific instructions

### Adding More Quick Actions

Edit `app/api/chat/route.ts` in the `extractQuickActions` function to detect new patterns.

## Cost Estimation

**Claude 3.5 Haiku Pricing:**
- Input: $0.80 per million tokens
- Output: $4.00 per million tokens

**Typical conversation:**
- Average message: ~100 tokens
- 10-message conversation: ~1,000 tokens
- Cost per conversation: ~$0.001 (less than 1 cent)

**Monthly estimate (1000 users, 5 conversations each):**
- Total conversations: 5,000
- Estimated cost: ~$5-10/month

## Troubleshooting

### "Failed to get AI response"

**Cause**: Invalid or missing API key

**Solution**:
1. Check `.env.local` has correct `ANTHROPIC_API_KEY`
2. Restart dev server
3. Verify key is valid at console.anthropic.com

### Chat not appearing

**Cause**: Component import error

**Solution**:
1. Check browser console for errors
2. Verify all files in `components/chat/` exist
3. Run `npm run build` to check for TypeScript errors

### Responses in wrong language

**Cause**: Locale not being passed correctly

**Solution**:
1. Check URL has `/en` or `/ur` prefix
2. Verify `useLocale()` hook is working
3. Check API request includes `language` parameter

### Slow responses

**Cause**: Network latency or API throttling

**Solutions**:
- Use edge runtime (already configured)
- Implement response caching for common questions
- Consider upgrading Anthropic plan for higher rate limits

## Future Enhancements

### Planned Features

1. **Streaming Responses** - Show AI typing word-by-word
2. **Voice Input** - Speak questions in Urdu/English
3. **Service Context** - Auto-load service details when mentioned
4. **Chat History** - Save conversations (with user accounts)
5. **Suggested Responses** - Quick reply buttons
6. **Multi-turn Context** - Remember earlier conversation topics
7. **Feedback System** - Rate AI responses

### Implementation Priority

1. ✅ Basic chat (DONE)
2. ✅ Quick actions (DONE)
3. 🔄 Streaming responses (Next)
4. 🔄 Service context integration (Next)
5. ⏳ Voice input
6. ⏳ Chat history

## Testing Checklist

- [ ] Chat loads on homepage
- [ ] Can send messages in English
- [ ] Can send messages in Urdu
- [ ] AI responds appropriately
- [ ] Quick actions appear when relevant
- [ ] Quick action buttons work (navigate to correct pages)
- [ ] Typing indicator shows while loading
- [ ] Messages auto-scroll to bottom
- [ ] Timestamps display correctly
- [ ] Example questions work
- [ ] Error handling works (try with invalid API key)
- [ ] Mobile responsive (test on phone)

## API Reference

### POST /api/chat

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "How do I get a passport?"}
  ],
  "language": "en",
  "context": {
    "serviceId": "optional-uuid",
    "serviceName": "Optional Service Name"
  }
}
```

**Response:**
```json
{
  "message": "To get a passport...",
  "quickActions": [
    {
      "type": "find_office",
      "label": "Find Nearest Offices",
      "data": {}
    }
  ]
}
```

## Security Notes

- API key is server-side only (not exposed to browser)
- Edge runtime provides additional security
- Rate limiting recommended for production
- Input validation prevents injection attacks
- No PII stored in chat logs (currently)

---

**Status**: ✅ AI Chat Interface Complete

**Next Phase**: Services browsing and search
