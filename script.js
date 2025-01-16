document.addEventListener('DOMContentLoaded', () => {
    showSlide(0); // Initialize the first slide
    setupLightbox();
    loadSection('about'); // Load the default section
});

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

// Function to show a specific slide in the carousel
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

// Navigate to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Navigate to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Load a specific section dynamically into the content area
function loadSection(section) {
    const content = document.getElementById('content');
    if (!content) return;

    switch (section) {
        case 'about':
            content.innerHTML = `
                <section class="about-section">
                    <h2>Welcome to Our Photography Portfolio</h2>
                    <p>
                        Pictures help us hold memories close and dear. Through our photography, we aim to freeze moments
                        and create memories that last forever. 
                    </p>
                    <p>
                        Our mission is to nurture creativity and inspire a love for photography. Join us as we capture
                        life's most beautiful moments and embark on adventures to perfect the art of photography.
                    </p>
                    <h3>Meet Our Team</h3>
                    <div class="team">
                        <div class="team-member">
                            <h4>President</h4>
                            <p>Bhavya Sri Kalapati</p>
                        </div>
                        <div class="team-member">
                            <h4>Vice President</h4>
                            <p>Richa Tiwari</p>
                        </div>
                        <div class="team-member">
                            <h4>Secretary</h4>
                            <p>Ananya Chivukula</p>
                        </div>
                    </div>
                </section>
            `;
            break;

        case 'gallery':
            content.innerHTML = `
                <section>
                    <h2>Gallery</h2>
                    <div class="gallery-grid" id="gallery-grid"></div>
                </section>
            `;
            loadGallery(); // Load the gallery content dynamically
            break;

        case 'contact':
            content.innerHTML = `
                <section>
                    <h2>Contact Us</h2>
                    <p>Email: <a href="mailto:photography.dvhs@gmail.com">photography.dvhs@gmail.com</a></p>
                    <p>Instagram: <a href="https://instagram.com/photography_dvhs" target="_blank">@photography_dvhs</a></p>
                </section>
            `;
            break;

        default:
            content.innerHTML = `<p>Section not found.</p>`;
    }
}

// Function to dynamically load gallery content from GitHub
function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    const githubBase = "https://raw.githubusercontent.com/bhavyaK019/photography-portfolio/main/images/";

    // List of image filenames
    const photos = [
    "portfolio1.jpg",
    "portfolio2.jpg",
    "portfolio3.jpg",
    "portfolio4.jpg",
    "portfolio5.jpg",
    "portfolio6.jpg",
    "portfolio7.jpg",
    "portfolio8.jpg",
    "portfolio9.jpg",
    "portfolio10.jpg",
    "portfolio11.jpg",
    "portfolio12.jpg"
];

    grid.innerHTML = photos
        .map(
            (filename, i) => `
            <div class="gallery-item">
                <img src="${githubBase}${filename}" alt="Photo ${i + 1}" onclick="openLightbox('${githubBase}${filename}')">
                <div class="gallery-caption">Photo ${i + 1}</div>
            </div>
        `
        )
        .join('');
}

// Setup the lightbox functionality
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.getElementById('lightbox-close');

    close.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    window.openLightbox = function (src) {
        lightboxImg.src = src;
        lightbox.classList.remove('hidden');
    };
}
