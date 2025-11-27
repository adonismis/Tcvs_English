document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                // Scroll with offset for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active state in sidebar if present
                updateActiveSidebarLink(targetId);
            }
        });
    });

    // Highlight active sidebar link on scroll
    const sections = document.querySelectorAll('.unit-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    if (sections.length > 0 && sidebarLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Offset for sticky header
                if (scrollY >= (sectionTop - 150)) {
                    current = '#' + section.getAttribute('id');
                }
            });

            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function updateActiveSidebarLink(targetId) {
        if (!sidebarLinks.length) return;
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
});
