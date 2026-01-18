# DASSKAN Technologies Chatbot

## Overview
A modern, premium chatbot has been successfully integrated into your DASSKAN Technologies website. The chatbot features a stunning glassmorphism design, smooth animations, and intelligent responses about your company.

## Features

### 🎨 **Premium Design**
- **Glassmorphism UI** - Modern, translucent design with backdrop blur effects
- **Smooth Animations** - Typing indicators, message slide-ins, and micro-interactions
- **Pulsing Button** - Eye-catching floating button with pulse animation
- **Gradient Accents** - Matches your website's color scheme (#2563FF, #5FF4E7, #F8D100)
- **Mobile Responsive** - Fully optimized for all screen sizes

### 💬 **Chat Functionality**
- **Intelligent Responses** - Answers questions about:
  - Company information and mission
  - Services offered (IoT, AI, Business Tools, Prototyping)
  - Team members and founders
  - Career opportunities
  - Contact information
  - Work process and methodology
  - Location

- **Quick Reply Buttons** - Suggested questions for easy interaction
- **Typing Indicators** - Animated dots showing the bot is "thinking"
- **Time Stamps** - Each message shows when it was sent
- **Natural Conversations** - Recognizes greetings, thanks, and various question formats

### ⚡ **User Experience**
- **Instant Responses** - Bot responds within 800-1200ms
- **Smooth Scrolling** - Auto-scrolls to latest messages
- **Keyboard Support** - Press Enter to send messages
- **Click to Close** - Easy to open and close
- **Focus Management** - Auto-focuses input when opened

## Files Modified

### 1. **styles.css**
Added comprehensive chatbot styling (~480 lines):
- Chatbot button with pulse animation
- Chat container with glassmorphism
- Message bubbles (user and bot)
- Typing indicator animation
- Quick reply buttons
- Input field and send button
- Mobile responsive styles

### 2. **index.html**
Added chatbot HTML structure:
- Floating chat button
- Chat container with header
- Messages area
- Input field and send button
- Welcome message

### 3. **script.js**
Added chatbot functionality (~270 lines):
- Knowledge base with company information
- Message handling and display
- Typing indicator logic
- Quick reply system
- Natural language processing for user queries
- Event listeners for user interactions

## How to Use

### For Website Visitors:
1. Click the floating chat button (💬) in the bottom right corner
2. Type your question or click a quick reply button
3. The bot will respond with relevant information
4. Continue the conversation or close the chat

### For Developers:

#### Customizing Responses
Edit the `knowledgeBase` object in `script.js`:

```javascript
const knowledgeBase = {
    greetings: ["Your greeting messages"],
    about: "Your company description",
    services: "Your services information",
    // ... add more topics
};
```

#### Customizing Quick Replies
Edit the `quickReplies` array in `script.js`:

```javascript
const quickReplies = [
    { text: "Your question", trigger: "topic_key" },
    // ... add more quick replies
];
```

#### Styling Customization
All chatbot styles are in `styles.css` under the `/* CHATBOT STYLES */` section. You can modify:
- Colors and gradients
- Animation speeds
- Sizes and spacing
- Border radius
- Shadows and effects

## Technical Details

### Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling with animations and glassmorphism
- **Vanilla JavaScript** - No dependencies, pure JS

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight (~750 lines total)
- No external dependencies
- Smooth 60fps animations
- Minimal memory footprint

## Customization Tips

### Change Colors
Update these CSS variables in the chatbot styles:
- Primary: `#2563FF`
- Secondary: `#5FF4E7`
- Accent: `#F8D100`
- Background: `#0B1020`

### Adjust Animation Speed
Modify the animation durations in CSS:
- Pulse animation: `chatbotPulse 2s`
- Typing dots: `typingDot 1.4s`
- Message slide-in: `messageSlideIn 0.3s`

### Add New Topics
1. Add a new key to `knowledgeBase` in `script.js`
2. Add pattern matching in `getBotResponse()` function
3. Optionally add a quick reply button

## Demo Recording
A browser recording demonstrating the chatbot functionality has been created and saved. The chatbot successfully:
- Opens and closes smoothly
- Responds to user messages
- Shows typing indicators
- Displays contact information
- Handles thank you messages

## Future Enhancements (Optional)
- Connect to a backend API for dynamic responses
- Add conversation history persistence
- Integrate with email/CRM systems
- Add file upload capability
- Multi-language support
- Voice input/output
- Analytics tracking

## Support
For questions or customization help, refer to the code comments in:
- `script.js` - Chatbot logic
- `styles.css` - Chatbot styling
- `index.html` - Chatbot structure

---

**Created for DASSKAN Technologies**
*Engineering Solutions for Real-World Problems*
