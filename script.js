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

    // --- Interactive Whiteboard ---
    const canvas = document.getElementById('myCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const colorPicker = document.getElementById('colorPicker');
        const eraserBtn = document.getElementById('eraserBtn');
        const clearBtn = document.getElementById('clearBtn');

        let isDrawing = false;
        let isErasing = false;
        let lastX = 0;
        let lastY = 0;

        // Set canvas background to white
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        function draw(e) {
            if (!isDrawing) return;
            
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            
            if (isErasing) {
                ctx.strokeStyle = 'white'; // Eraser color
                ctx.lineWidth = 20; // Eraser size
            } else {
                ctx.strokeStyle = colorPicker.value;
                ctx.lineWidth = 5; // Brush size
            }

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            // Adjust for canvas offset
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.lineTo(x, y);
            ctx.stroke();
            [lastX, lastY] = [x, y];
        }

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
        });

        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);

        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
            e.preventDefault();
        });

        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            if (isErasing) {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 20;
            } else {
                ctx.strokeStyle = colorPicker.value;
                ctx.lineWidth = 5;
            }

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            [lastX, lastY] = [x, y];
            e.preventDefault();
        });

        canvas.addEventListener('touchend', () => isDrawing = false);

        eraserBtn.addEventListener('click', () => {
            isErasing = !isErasing;
            eraserBtn.textContent = isErasing ? 'Brush' : 'Eraser';
        });

        clearBtn.addEventListener('click', () => {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        colorPicker.addEventListener('change', () => {
            isErasing = false;
            eraserBtn.textContent = 'Eraser';
        });
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