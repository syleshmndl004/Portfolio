document.addEventListener('DOMContentLoaded', function () {
    // --- Dark / Light Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // saves in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // --- Animated Skill Progress Bars ---
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgressBars = entry.target.querySelectorAll('.skill-progress');
                    skillProgressBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-progress');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        skillsObserver.observe(skillsSection);
    }

    // --- Contact Form Data Handling ---
    const form = document.querySelector('#contact-form');
    const formStatus = document.querySelector('#form-status');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();

            if (name && email && message) {
                const newSubmission = { name, email, message, date: new Date().toISOString() };

                // Get existing submissions from localStorage, or create a new array
                let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
                
                // Add the new submission to the array
                submissions.push(newSubmission);
                
                // Save the updated array back to localStorage
                localStorage.setItem('formSubmissions', JSON.stringify(submissions));

                // Redirect to the details page
                window.location.href = 'form-details.html';
            } else {
                formStatus.textContent = "Please fill in all fields.";
                formStatus.style.color = "red";
            }
        });
    }

    // --- Open Portfolio Projects ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });

    // --- Canvas Drawing ---
    const canvas = document.getElementById('myCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            // Draw the image, scaling it to fit the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = 'Files/canvas-art.jpeg'; // Path to your new image
    }
    
    // --- Image Slider ---
    const slides = document.querySelector('.slides');
    if (slides) {
        const slideImages = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function updateSlider() {
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideImages.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
            updateSlider();
        });
    }

    // --- Back-to-Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.onscroll = function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        };

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});