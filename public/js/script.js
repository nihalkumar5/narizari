document.addEventListener('DOMContentLoaded', () => {
    // 1. REVEAL ANIMATIONS (IntersectionObserver fallback for non-supporting browsers)
    const revealElements = document.querySelectorAll('.reveal');
    
    // Check if browser natively supports CSS scroll-driven animations
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()') && CSS.supports('animation-range', '0% 100%');
    
    if (!supportsScrollTimeline) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Natively supported, ensure they are visible if CSS handles it
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 2. NAVBAR SCROLL EFFECT
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // 3. ANCHOR SMOOTH SCROLL WITH HEADER OFFSET
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const url = new URL(this.href);
            if (url.origin === window.location.origin && url.pathname === window.location.pathname) {
                e.preventDefault();
                const targetId = url.hash;
                if (targetId) {
                    const target = document.querySelector(targetId);
                    if (target) {
                        const headerOffset = 110; // Height of the fixed navigation pill + spacing
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // 4. PARALLAX HERO ELEMENTS
    const heroVideo = document.querySelector('.hero-video-fs');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroVideo.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0003})`;
        });
    }

    // 5. HOMEPAGE REVENUE GROWTH SLIDER
    const revenueSlider = document.getElementById('revenue-slider');
    const currentRevDisplay = document.getElementById('current-revenue-display');
    const projectedRevDisplay = document.getElementById('projected-revenue-display');
    const projectedLeadDisplay = document.getElementById('projected-leads-display');

    if (revenueSlider) {
        const formatCurrency = (val) => {
            if (val >= 100) {
                return `₹${(val / 100).toFixed(1)} Cr`;
            }
            return `₹${val} Lakh`;
        };

        const updateCalculator = () => {
            const currentVal = parseInt(revenueSlider.value);
            currentRevDisplay.textContent = formatCurrency(currentVal);
            
            // Calculate growth at average 12x ROAS and scaled capacity
            // Projected scaling factor between 2.5x to 4.5x depending on starting size
            let multiplier = 3.5;
            if (currentVal < 5) multiplier = 4.5; // smaller brands scale faster in percentage
            if (currentVal > 25) multiplier = 2.8; // larger brands scale slightly slower in percentage
            
            const projectedVal = Math.round(currentVal * multiplier);
            projectedRevDisplay.textContent = formatCurrency(projectedVal);
            
            // Projected leads generated based on scale
            const projectedLeads = Math.round(currentVal * 120 * (multiplier / 2));
            projectedLeadDisplay.textContent = projectedLeads.toLocaleString('en-IN');
        };

        revenueSlider.addEventListener('input', updateCalculator);
        // Initialize on load
        updateCalculator();
    }

    // 6. MULTI-STEP LUXURY BOOKING QUESTIONNAIRE
    const steps = document.querySelectorAll('.questionnaire-step');
    const progressLine = document.getElementById('step-progress');
    const stepNodes = document.querySelectorAll('.step-node');
    const bookingForm = document.getElementById('saree-booking-form');
    let currentStepIndex = 0;

    // Save questionnaire data
    const bookingData = {
        stage: '',
        bottleneck: '',
        goal: '',
        name: '',
        brandName: '',
        contact: ''
    };

    const updateStepProgress = () => {
        if (!progressLine) return;
        const totalSteps = steps.length;
        const progressPercentage = (currentStepIndex / (totalSteps - 1)) * 100;
        progressLine.style.width = `${progressPercentage}%`;

        stepNodes.forEach((node, idx) => {
            if (idx < currentStepIndex) {
                node.className = 'step-node completed';
            } else if (idx === currentStepIndex) {
                node.className = 'step-node active';
            } else {
                node.className = 'step-node';
            }
        });
    };

    const navigateToStep = (index) => {
        if (index < 0 || index >= steps.length) return;
        
        // Transition step animations
        steps[currentStepIndex].classList.remove('active');
        steps[currentStepIndex].style.display = 'none';
        
        currentStepIndex = index;
        
        steps[currentStepIndex].style.display = 'block';
        setTimeout(() => {
            steps[currentStepIndex].classList.add('active');
        }, 50);

        updateStepProgress();
    };

    // Option selections
    document.querySelectorAll('.luxury-option').forEach(option => {
        option.addEventListener('click', function() {
            const stepGroup = this.closest('.questionnaire-step');
            const stepType = stepGroup.dataset.stepType;
            
            // Toggle selection class
            stepGroup.querySelectorAll('.luxury-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Save selection
            bookingData[stepType] = this.dataset.value;

            // Auto-advance after short delay for high-converting premium feel
            setTimeout(() => {
                navigateToStep(currentStepIndex + 1);
            }, 400);
        });
    });

    // Back buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToStep(currentStepIndex - 1);
        });
    });

    // Final submit action
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect final input details
            bookingData.name = document.getElementById('client-name').value;
            bookingData.brandName = document.getElementById('brand-name').value;
            bookingData.contact = document.getElementById('client-contact').value;

            if (!bookingData.name || !bookingData.contact) {
                alert('Please provide your name and contact details so our strategic partner can reach out.');
                return;
            }

            // Beautiful transition to success screen
            const currentStep = steps[currentStepIndex];
            currentStep.classList.remove('active');
            currentStep.style.display = 'none';
            
            const successState = document.getElementById('booking-success-state');
            if (successState) {
                successState.style.display = 'block';
                setTimeout(() => {
                    successState.style.opacity = '1';
                }, 50);
            }
            
            // Mark all nodes completed
            stepNodes.forEach(node => {
                node.className = 'step-node completed';
            });
            if (progressLine) progressLine.style.width = '100%';

            console.log('Premium Saree Marketing Agency Application Submitted:', bookingData);
        });
    }
});

// Menu Toggle Logic
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menuClose');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-list a');

const toggleMenu = () => {
    if (menuToggle) menuToggle.classList.toggle('active');
    if (menuOverlay) menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuOverlay && menuOverlay.classList.contains('active') ? 'hidden' : 'auto';
};

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

if (menuClose) {
    menuClose.addEventListener('click', toggleMenu);
}

// Close menu when clicking a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});
