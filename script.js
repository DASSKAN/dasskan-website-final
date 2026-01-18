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
});
