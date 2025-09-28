document.addEventListener('DOMContentLoaded', () => {

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate on Scroll
    const animatedElements = document.querySelectorAll('.mission-card, .committee-card, .team-card, .timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // Team Filtering
    const filterButtons = document.querySelectorAll('.team-filters .filter-btn');
    const teamCards = document.querySelectorAll('.team-grid .team-card');
    if (filterButtons.length > 0 && teamCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                teamCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden');
                         setTimeout(() => {
                           card.style.opacity = 1;
                           card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = 0;
                        card.style.transform = 'translateY(20px)';
                         setTimeout(() => {
                            card.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
    }

    // Registration Form Submission
    const registrationForm = document.getElementById('mun-registration');
    const successMessage = document.getElementById('success-message');
    if (registrationForm && successMessage) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would send data to a server here.
            // For demonstration, we just hide the form and show success.
            registrationForm.style.display = 'none';
            successMessage.style.display = 'block';
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const contactSuccessMessage = document.getElementById('contact-success-message');
    if(contactForm && contactSuccessMessage) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            // In a real app, send data to a server.
            // For now, just show a confirmation.
            contactForm.style.display = 'none';
            contactSuccessMessage.style.display = 'block';
            // Optionally, reset the form after a delay or if user navigates away
            // setTimeout(() => {
            //     contactForm.reset();
            //     contactForm.style.display = 'block';
            //     contactSuccessMessage.style.display = 'none';
            // }, 5000); 
        });
    }

    // Committee Modal
    const committeeCards = document.querySelectorAll('.committee-card');
    const modal = document.getElementById('committee-modal');
    if (committeeCards.length > 0 && modal) {
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalImage = document.getElementById('modal-image');
        const closeModalBtn = document.querySelector('.close-modal');

        const committeeDetails = {
            unsc: {
                title: 'United Nations Security Council (UNSC)',
                description: 'The UNSC is one of the six principal organs of the United Nations, charged with ensuring international peace and security. Delegates in this committee will tackle pressing global conflicts, debate resolutions, and have the power to deploy peacekeeping missions. This committee is ideal for delegates with some MUN experience who enjoy high-stakes diplomacy and strategic negotiation.',
                image: 'https://placehold.co/400x300/4169E1/FFFFFF?text=UNSC+Detail'
            },
            who: {
                title: 'World Health Organization (WHO)',
                description: 'The WHO is a specialized agency of the United Nations responsible for international public health. This committee will focus on creating policies to combat global health crises, improve healthcare access, and respond to pandemics. Delegates will engage in discussions on global health equity, disease prevention, and international health regulations.',
                image: 'https://placehold.co/400x300/4169E1/FFFFFF?text=WHO+Detail'
            },
            unesco: {
                title: 'UNESCO',
                description: 'The United Nations Educational, Scientific and Cultural Organization seeks to build peace through international cooperation in Education, the Sciences and Culture. Delegates will work on preserving world heritage, promoting quality education for all, and fostering scientific collaboration. Topics may include digital literacy, cultural preservation in conflict zones, and ethical implications of AI.',
                image: 'https://placehold.co/400x300/4169E1/FFFFFF?text=UNESCO+Detail'
            },
            unhrc: {
                 title: 'UN Human Rights Council (UNHRC)',
                 description: 'The UNHRC is responsible for the promotion and protection of all human rights around the globe. This committee addresses situations of human rights violations and makes recommendations on them. Delegates will delve into complex issues such as freedom of expression, rights of refugees, and combating discrimination, requiring strong research and advocacy skills.',
                 image: 'https://placehold.co/400x300/4169E1/FFFFFF?text=UNHRC+Detail'
            },
            crisis: {
                title: 'Crisis Committee',
                description: 'A dynamic, fast-paced committee for experienced delegates. You will be responding to a constantly evolving crisis scenario in real-time. Expect the unexpected and be ready for intense debate and quick thinking, as delegates must react to directives and breaking news to achieve their objectives. This committee is highly interactive and requires quick decision-making.',
                image: 'https://placehold.co/400x300/4169E1/FFFFFF?text=CRISIS+Detail'
            },
            disec: {
                title: 'Disarmament and International Security (DISEC)',
                description: 'DISEC is the First Committee of the UN General Assembly. It deals with disarmament, global challenges and threats to peace that affect the international community and seeks out solutions to the challenges in the international security regime. Delegates will discuss topics like nuclear proliferation, cyber warfare, and the regulation of autonomous weapons systems.',
                image: 'https://placehold.co/400x300/4169E1/FFFFFF?text=DISEC+Detail'
            }
        };

        committeeCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent opening modal if "Learn More" button was clicked directly
                if (e.target.classList.contains('committee-learn-more')) {
                    e.preventDefault(); // Stop the default link behavior
                }
                
                const committeeKey = card.dataset.committee;
                const details = committeeDetails[committeeKey];
                if (details) {
                    modalTitle.textContent = details.title;
                    modalDescription.textContent = details.description;
                    modalImage.src = details.image;
                    modalImage.alt = details.title + " image"; // Set alt text for accessibility
                    modal.classList.add('visible');
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove('visible');
        };

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Only close if clicking on the backdrop, not the modal content
                closeModal();
            }
        });
    }
});