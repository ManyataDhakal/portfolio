/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPTS
   Owner: Manyata Dhakal
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ===== Initialize Components =====
  initStickyHeader();
  initMobileMenu();
  initTypingEffect();
  initScrollAnimations();
  initActiveLinkHighlighting();
  initScrollToTop();
  initContactForm();
});

/**
 * 1. Sticky Header / Navigation
 * Adds solid blur styling to navbar when scrolled past 50px
 */
function initStickyHeader() {
  const header = document.querySelector(".header-nav");
  
  const toggleSticky = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  // Run on load and scroll
  toggleSticky();
  window.addEventListener("scroll", toggleSticky);
}

/**
 * 2. Mobile Menu Drawer Toggle
 * Handles mobile hamburger toggle and auto-closes menu on link clicks
 */
function initMobileMenu() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll("a");

  if (!navToggle || !navLinks) return;

  // Toggle open class on button and menu
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking outside of the navbar
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    }
  });

  // Close menu when any link is clicked
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

/**
 * 3. Hero Section Typing Effect
 * Dynamic type and delete text loop representing professional roles
 */
function initTypingEffect() {
  const typingSpan = document.getElementById("typingText");
  if (!typingSpan) return;

  const roles = [
    "Computer Science Student",
    "Aspiring Software Developer",
    "Problem Solver",
    "Tech Enthusiast"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Subtract characters
      typingSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      // Add characters
      typingSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Natural typing speed
    }

    // Typing transitions
    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full text
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Cycle to the next role
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Brief pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing loop
  setTimeout(type, 1000);
}

/**
 * 4. Scroll Entrance Animations
 * Uses IntersectionObserver to trigger smooth slide/fade animations
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          // Once animated, no need to track it further
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Slight offset for better feel
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add("reveal-visible"));
  }
}

/**
 * 5. Active Navigation Highlighting on Scroll
 * Automatically sets active classes on links by tracking section viewports
 */
function initActiveLinkHighlighting() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!sections.length || !navLinks.length) return;

  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies the active mid-section of the screen
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          
          navLinks.forEach((link) => {
            // Remove active status from all links
            link.classList.remove("active");
            
            // Add active status to current link
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
}

/**
 * 6. Scroll-To-Top Button
 * Tracks screen scroll position to display button and scrolls smoothly on click
 */
function initScrollToTop() {
  const scrollBtn = document.getElementById("scrollToTop");
  if (!scrollBtn) return;

  // Show/Hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  // Smooth scroll up on click
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * 7. Modern Contact Form Feedback Handler
 * Intercepts form submit to show beautiful feedback
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById("formName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const message = document.getElementById("formMessage").value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    // Simulate sending progress
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Message...";

    setTimeout(() => {
      // Re-enable and reset form
      submitBtn.textContent = "Message Sent Successfully! ✓";
      submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)"; // Success Green Gradient
      
      form.reset();

      // Reset button styling after 3 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = ""; // Restore default theme gradient
      }, 4000);

    }, 1500);
  });
}
