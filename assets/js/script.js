/**
 * Kalash Beauty Parlour - Premium UX Architecture Engine
 * Core Execution Script
 */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Initialize System Submodules
    initPremiumLoader();
    initScrollEngine();
    initValidationEngine();
    initCounterAnimation();
    initSwiperSlider();
    initAosLibrary();
});

/* ==========================================================================
   1. PREMIUM LOADING SCREEN SYSTEM
   ========================================================================== */
function initPremiumLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hide");
            }, 600); // Elegant structural visual hold
        });
    }
}

/* ==========================================================================
   2. SCROLL METRICS & NAVIGATION ENGINE
   ========================================================================== */
function initScrollEngine() {
    const navbar = document.querySelector(".main-navbar");
    const scrollProgress = document.getElementById("scroll-progress");
    const backToTopBtn = document.getElementById("backToTop");
    const navLinks = document.querySelectorAll(".main-navbar .nav-link");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Dynamic Scroll Progress Calculation
        if (docHeight > 0 && scrollProgress) {
            const scrolledPercentage = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrolledPercentage}%`;
        }

        // Navbar Background Transformation Matrix
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Back To Top Display Toggle
        if (backToTopBtn) {
            if (scrollTop > 600) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        }

        // Precise Scroll Spy Routine
        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollTop > sectionTop && scrollTop <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // Clean Back To Top Action Execution
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Auto-Collapse Responsive Navbar on Link Intercept
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;
    
    if (navbarCollapse) {
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth < 1200 && navbarCollapse.classList.contains("show")) {
                    bsCollapse.toggle();
                }
            });
        });
    }
}

/* ==========================================================================
   3. HIGH-PRECISION NUMERICAL INTERSECTION COUNTER
   ========================================================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll(".counter-num");
    
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const targetValue = parseInt(targetElement.getAttribute("data-target"), 10);
                let startValue = 0;
                
                // Scale animation step speed dynamically based on total capacity size
                const speedDivider = targetValue > 1000 ? 100 : 30;
                const incrementalStep = Math.ceil(targetValue / speedDivider);
                
                const incrementTimer = setInterval(() => {
                    startValue += incrementalStep;
                    if (startValue >= targetValue) {
                        targetElement.textContent = targetValue.toLocaleString() + "+";
                        clearInterval(incrementTimer);
                    } else {
                        targetElement.textContent = startValue.toLocaleString() + "+";
                    }
                }, 25);

                observer.unobserve(targetElement); // Prevent counter re-triggering loop
            }
        });
    }, { threshold: 0.6, rootMargin: "0px" });

    counters.forEach(counter => counterObserver.observe(counter));
}

/* ==========================================================================
   4. SWIPER.JS CONFIGURATION CORES
   ========================================================================== */
function initSwiperSlider() {
    if (document.querySelector(".testimonialSwiper")) {
        new Swiper(".testimonialSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 }
            },
            loop: true,
            grabCursor: true
        });
    }
}


document.querySelectorAll(".comparison").forEach((comparison)=>{

    const after = comparison.querySelector(".after");
    const divider = comparison.querySelector(".divider");
    const handle = comparison.querySelector(".handle");

    let active = false;

    function moveSlider(x){

        const rect = comparison.getBoundingClientRect();

        let pos = x - rect.left;

        if(pos < 0) pos = 0;

        if(pos > rect.width) pos = rect.width;

        const percent = (pos / rect.width) * 100;

        after.style.width = percent + "%";
        divider.style.left = percent + "%";
        handle.style.left = percent + "%";

    }

    comparison.addEventListener("mousedown",()=> active = true);

    window.addEventListener("mouseup",()=> active = false);

    window.addEventListener("mousemove",(e)=>{

        if(active){

            moveSlider(e.clientX);

        }

    });

    comparison.addEventListener("touchstart",()=> active = true);

    window.addEventListener("touchend",()=> active = false);

    window.addEventListener("touchmove",(e)=>{

        if(active){

            moveSlider(e.touches[0].clientX);

        }

    });

    comparison.addEventListener("click",(e)=>{

        moveSlider(e.clientX);

    });

});
/* ==========================================================================
   5. BOOTSTRAP ADVANCED FORM VALIDATION ENGINE
   ========================================================================== */
function initValidationEngine() {
    const appointmentForm = document.getElementById("appointmentForm");
    const newsletterForm = document.getElementById("newsletterForm");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (event) {
            if (!appointmentForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                appointmentForm.classList.add("was-validated");
            } else {
                event.preventDefault();
                
                // Simulation of premium enterprise API transaction submission
                const submitBtn = appointmentForm.querySelector("button[type='submit']");
                const initialBtnText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Securing Slot...`;
                
                setTimeout(() => {
                    alert("Thank you! Your luxury priority appointment request has been securely dispatched. Our relationship manager will contact you within 60 minutes.");
                    appointmentForm.reset();
                    appointmentForm.classList.remove("was-validated");
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = initialBtnText;
                }, 1800);
            }
        }, false);
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (newsletterForm.checkValidity()) {
                alert("Subscription Successful! Welcome to the exclusive Kalash inner circle.");
                newsletterForm.reset();
            }
        });
    }
}

/* ==========================================================================
   6. AOS ANIMATION ENGINE PARAMETERS
   ========================================================================== */
function initAosLibrary() {
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            easing: "cubic-bezier(0.165, 0.84, 0.44, 1)",
            once: true,
            offset: 50,
            disable: 'mobile' // Gracefully fallback on aging mobile viewports to prevent memory leaks
        });
    }
}


