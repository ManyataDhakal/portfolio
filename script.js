document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const scrollBtn = document.getElementById("scrollToTop");
  const typingText = document.getElementById("typingText");
  const contactForm = document.getElementById("contactForm");

  // Mobile menu
  if (navToggle && navLinks) {
    navToggle.onclick = function () {
      navLinks.classList.toggle("open");
    };

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.onclick = function () {
        navLinks.classList.remove("open");
      };
    });
  }

  // Typing animation
const words = [
  "Aspiring Software Developer",
  "BIT Undergraduate"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1800); // Pause after completing the word
      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(type, isDeleting ? 60 : 120);
}

type();

  // Scroll to top button
  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }
    });

    scrollBtn.onclick = function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }

  // Contact form
  if (contactForm) {
    contactForm.onsubmit = function (e) {
      e.preventDefault();
      alert("Thank you! Your message has been received.");
      contactForm.reset();
    };
  }
});