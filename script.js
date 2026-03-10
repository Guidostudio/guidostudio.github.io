// Voeg class toe aan navbar bij scrollen voor een glassmorphism effect dat duidelijker wordt
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 17, 21, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 17, 21, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer om elementen in te faden wanneer je ernaar scrollt
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Selecteer alle project kaarten en animatie instellen
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.1}s`;
    observer.observe(card);
});

const sectionHeadings = document.querySelectorAll('section h2, .about-text');
sectionHeadings.forEach((heading) => {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(20px)';
    heading.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    observer.observe(heading);
});
