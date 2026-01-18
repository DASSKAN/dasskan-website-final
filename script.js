document.addEventListener('DOMContentLoaded', () => {

    // --- Lenis Smooth Scroll Setup ---
    const lenis = new Lenis({
        duration: 2.0, // Increased duration for slower, smoother scroll
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.8, // Reduces scroll speed multiplier
        smoothTouch: false,
        touchMultiplier: 1.5,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows immediately
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // --- Scroll Progress Bar ---
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // --- Mobile Menu ---
    window.toggleMenu = function () {
        const navLinks = document.getElementById('navLinks');
        const btn = document.querySelector('.mobile-menu-btn');
        if (navLinks) {
            navLinks.classList.toggle('active');
            if (btn) btn.classList.toggle('active');
        }
    }

    // --- Team Modal ---
    window.openTeamModal = function (element) {
        const modal = document.getElementById('teamModal');
        const modalImg = document.getElementById('modalImage');
        const imgSrc = element.getAttribute('data-image');

        if (modal && modalImg && imgSrc) {
            modalImg.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    const closeModal = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.getElementById('teamModal');

    function closeTeamModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (closeModal) closeModal.addEventListener('click', closeTeamModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeTeamModal);


    // --- Hero Scroll Animation Sequence ---
    const heroSection = document.querySelector('.hero');
    const heroImage = document.getElementById('heroAnimatedBg');
    const navbar = document.getElementById('navbar');
    const heroContent = document.querySelector('.hero-content');

    if (heroSection && heroImage && navbar) {
        // Configuration
        const frameCount = 240;
        const imagePath = 'image sequence/';
        const scrollHeight = 8400; // Increased to 8400 to slow down the animation sequence noticeably

        // Initial State
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 1.5s ease-out';

        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transition = 'opacity 3s ease-out';
        }

        // Wrapper for Sticky Scrolling (rest of function...)

        // Wrapper for Sticky Scrolling
        const wrapper = document.createElement('div');
        wrapper.className = 'scroll-sequence-container';
        wrapper.style.height = `${scrollHeight}px`;
        wrapper.style.position = 'relative';

        heroSection.parentNode.insertBefore(wrapper, heroSection);
        wrapper.appendChild(heroSection);

        heroSection.style.position = 'sticky';
        heroSection.style.top = '0';
        heroSection.style.width = '100%';
        heroSection.style.height = '100vh';
        heroSection.style.overflow = 'hidden';
        heroSection.style.zIndex = '10';

        // Preload Images
        const frames = [];
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const fileName = i.toString().padStart(5, '0') + '.jpg';
            img.src = `${imagePath}${fileName}`;
            frames.push(img);
        }

        // Animation Scroll Logic
        const handleScroll = () => {
            const wrapperRect = wrapper.getBoundingClientRect();
            // Calculate progress: 0 at top, 1 at bottom
            const maxScroll = scrollHeight - window.innerHeight;
            let progress = -wrapperRect.top / maxScroll;

            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            // Update Frame
            const frameIndex = Math.floor(progress * (frameCount - 1));
            if (frames[frameIndex] && frames[frameIndex].complete) {
                heroImage.src = frames[frameIndex].src;
            }

            // Update Visibility
            // Initial phase: Just image. Header and Content hidden.
            // End phase (>= 85%): Header and Content appear slowly.
            if (progress > 0.85) {
                navbar.style.transform = 'translateY(0)';
                if (heroContent) {
                    heroContent.style.opacity = '1';
                    heroContent.classList.add('animate-content');
                }
            } else {
                navbar.style.transform = 'translateY(-100%)';
                if (heroContent) {
                    heroContent.style.opacity = '0';
                    heroContent.classList.remove('animate-content');
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        // Initial call to set state
        handleScroll();
    }

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.fade-in, .reveal-text, .service-card, .step, .team-member, .quality-item, .opp-item, .contact-item');
    revealElements.forEach(el => observer.observe(el));

    // --- Inquiry Form Handling (Native Post with Redirect) ---
    const inquiryForm = document.getElementById('inquiryForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    // Check if returned from successful submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        if (inquiryForm && thankYouMessage) {
            inquiryForm.style.display = 'none';
            thankYouMessage.style.display = 'block';

            // Scroll to the inquiry section
            const inquirySection = document.getElementById('inquiry');
            if (inquirySection) {
                // slight delay to ensure layout is ready
                setTimeout(() => {
                    inquirySection.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }
    }

    // Set the return URL to the current page dynamically
    if (inquiryForm) {
        const nextInput = inquiryForm.querySelector('input[name="_next"]');
        if (nextInput) {
            // We append ?submitted=true to the current URL for the redirect
            // Handle existing params if any
            const currentUrl = window.location.href.split('?')[0];
            nextInput.value = `${currentUrl}?submitted=true`;
        }
    }

    // Define resetForm globally so the onclick attribute works
    window.resetForm = function () {
        if (inquiryForm && thankYouMessage) {
            // Remove the query param from URL so refresh doesn't show message again
            const url = new URL(window.location);
            url.searchParams.delete('submitted');
            window.history.replaceState({}, '', url);

            thankYouMessage.style.display = 'none';
            inquiryForm.style.display = 'block';
        }
    };

    // ==================== CHATBOT FUNCTIONALITY ====================

    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    // Knowledge base for the chatbot
    const knowledgeBase = {
        greetings: [
            "Hello! I'm the DASSKAN Assistant. How can I help you today?",
            "Hi there! Welcome to DASSKAN Technologies. What would you like to know?",
            "Hey! Great to see you. How can I assist you?"
        ],
        about: "DASSKAN Technologies is a problem-driven technology company focused on designing and developing practical solutions for real-world challenges faced by individuals and small businesses. We combine engineering, design thinking, and execution discipline to build systems that enhance productivity, comfort, and operational efficiency.",
        services: "We offer:\n\n🔬 Solution Research & Prototyping - Taking concepts from discovery to field validation\n\n🌐 IoT & Smart Automation - Sensor-based systems for business workflows\n\n📊 Business Efficiency Tools - Custom dashboards, queue systems, and tracking platforms\n\n🤖 Artificial Intelligence - AI integration for decision-making and automation",
        location: "We're based in Chennai, Tamil Nadu, India. Our team brings together expertise in electronics, software, UI/UX, automation, research, system integration, AI, and digital workflows.",
        contact: "You can reach us at:\n\n📧 Email: dasskantechnologies@gmail.com\n💼 LinkedIn: DASSKAN Technologies\n📱 Instagram: @dass.kan\n\nOr fill out our inquiry form on this website!",
        careers: "We're building a team of curious, driven individuals who want to work on meaningful problems. We look for people who are problem-oriented, detail-driven, curious about systems, comfortable building from zero, and passionate about tools & technology.\n\nOpportunities exist in Research & Field Study, Software & Systems Development, Hardware & Prototyping, Product Design & UX, and Operations & Partnerships.",
        process: "Our methodology follows 5 key steps:\n\n1️⃣ Discover Problems - Engage directly with people and businesses\n2️⃣ Validate & Prioritize - Evaluate for relevance and impact\n3️⃣ Design Solutions - Create ergonomic, efficient systems\n4️⃣ Review & Refine - Collaborate for quality and clarity\n5️⃣ Build & Prototype - Develop solutions in-house",
        team: "Our team consists of talented founders and co-founders:\n\n• Sajjan - Founder\n• Aditya Jayaraj - Founder\n• Annirudh - Co-Founder\n• Duruvaa S - Co-Founder\n• Akshay Kora - Co-Founder\n• Nithin - Co-Founder\n• Sarvesh Manohar - Co-Founder",
        thanks: [
            "You're welcome! Is there anything else you'd like to know?",
            "Happy to help! Feel free to ask if you have more questions.",
            "My pleasure! Let me know if you need anything else."
        ],
        default: "I'm here to help you learn about DASSKAN Technologies! You can ask me about:\n\n• Our company and mission\n• Services we offer\n• How we work\n• Our team\n• Career opportunities\n• Contact information\n\nWhat would you like to know?"
    };

    // Quick reply suggestions
    const quickReplies = [
        { text: "What do you do?", trigger: "services" },
        { text: "How can I contact you?", trigger: "contact" },
        { text: "Tell me about your team", trigger: "team" },
        { text: "Career opportunities", trigger: "careers" }
    ];

    // Toggle chatbot
    function toggleChatbot() {
        chatbotContainer.classList.toggle('active');
        chatbotButton.classList.toggle('active');

        if (chatbotContainer.classList.contains('active')) {
            chatbotInput.focus();
            // Show initial quick replies if no messages yet
            if (chatbotMessages.children.length === 1) {
                setTimeout(() => showQuickReplies(quickReplies), 500);
            }
        }
    }

    // Get current time
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    // Add message to chat
    function addMessage(text, sender = 'bot', showTime = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = text;

        contentDiv.appendChild(bubble);

        if (showTime) {
            const time = document.createElement('div');
            time.className = 'message-time';
            time.textContent = getCurrentTime();
            contentDiv.appendChild(time);
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);

        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';

        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Show quick replies
    function showQuickReplies(replies) {
        const lastMessage = chatbotMessages.lastElementChild;
        if (lastMessage && lastMessage.classList.contains('message')) {
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.className = 'quick-replies';

            replies.forEach(reply => {
                const button = document.createElement('button');
                button.className = 'quick-reply';
                button.textContent = reply.text;
                button.onclick = () => handleQuickReply(reply);
                quickRepliesDiv.appendChild(button);
            });

            lastMessage.querySelector('.message-content').appendChild(quickRepliesDiv);
            scrollToBottom();
        }
    }

    // Handle quick reply click
    function handleQuickReply(reply) {
        // Remove all quick replies
        document.querySelectorAll('.quick-replies').forEach(el => el.remove());

        // Add user message
        addMessage(reply.text, 'user');

        // Process the trigger
        processMessage(reply.trigger);
    }

    // Scroll to bottom of messages
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();

        // Greetings
        if (lowerInput.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
            return {
                text: knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)],
                quickReplies: quickReplies
            };
        }

        // About/Company
        if (lowerInput.match(/\b(about|company|who are you|what is dasskan|tell me about)\b/)) {
            return { text: knowledgeBase.about };
        }

        // Services
        if (lowerInput.match(/\b(service|services|what do you do|offer|solutions|products)\b/)) {
            return { text: knowledgeBase.services };
        }

        // Location
        if (lowerInput.match(/\b(where|location|based|office|address)\b/)) {
            return { text: knowledgeBase.location };
        }

        // Contact
        if (lowerInput.match(/\b(contact|email|phone|reach|get in touch|connect)\b/)) {
            return { text: knowledgeBase.contact };
        }

        // Careers
        if (lowerInput.match(/\b(career|job|hiring|work|join|opportunity|opportunities|position)\b/)) {
            return { text: knowledgeBase.careers };
        }

        // Process
        if (lowerInput.match(/\b(process|how do you work|methodology|approach|workflow)\b/)) {
            return { text: knowledgeBase.process };
        }

        // Team
        if (lowerInput.match(/\b(team|founder|co-founder|people|who|members)\b/)) {
            return { text: knowledgeBase.team };
        }

        // Thanks
        if (lowerInput.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
            return {
                text: knowledgeBase.thanks[Math.floor(Math.random() * knowledgeBase.thanks.length)]
            };
        }

        // Default
        return {
            text: knowledgeBase.default,
            quickReplies: quickReplies
        };
    }

    // Process message
    function processMessage(input) {
        showTypingIndicator();

        // Simulate thinking time
        setTimeout(() => {
            removeTypingIndicator();

            const response = getBotResponse(input);
            addMessage(response.text);

            if (response.quickReplies) {
                setTimeout(() => showQuickReplies(response.quickReplies), 300);
            }
        }, 800 + Math.random() * 400); // Random delay between 800-1200ms
    }

    // Handle send message
    function sendMessage() {
        const message = chatbotInput.value.trim();

        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Process and respond
        processMessage(message);
    }

    // Event listeners
    if (chatbotButton) {
        chatbotButton.addEventListener('click', toggleChatbot);
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', toggleChatbot);
    }

    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

