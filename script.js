// Sticky Navbar & Back to Top
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

// Back to Top Click
backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Trigger reveal on load
document.addEventListener("DOMContentLoaded", reveal);

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        
        // Visual feedback
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const formData = {
            name: contactForm.name.value || document.getElementById('name').value,
            email: contactForm.email.value || document.getElementById('email').value,
            subject: contactForm.subject.value || document.getElementById('subject').value,
            message: contactForm.message.value || document.getElementById('message').value
        };

        // Sending to n8n webhook
        fetch('https://moses123023.app.n8n.cloud/webhook/portfolio-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                formStatus.innerText = "Message sent successfully! I'll get back to you soon.";
                formStatus.className = "form-status success";
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        })
        .catch(error => {
            formStatus.innerText = "Oops! Something went wrong. Please try again later.";
            formStatus.className = "form-status error";
        })
        .finally(() => {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            formStatus.style.display = "block";
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = "none";
                formStatus.className = "form-status";
            }, 5000);
        });
    });
}
